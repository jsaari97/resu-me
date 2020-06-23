const { Command: BaseCommand } = require("@oclif/command");
const { render } = require("./ui/render");
const path = require("path");
const copyfiles = require("copyfiles");
const fs = require("fs").promises;

function insertBeforeLastOccurrence(strToSearch, strToFind, strToInsert) {
  const n = strToSearch.lastIndexOf(strToFind);
  if (n < 0) return strToSearch;
  return strToSearch.substring(0, n) + strToInsert + strToSearch.substring(n);
}

class Command extends BaseCommand {
  get sourceHtml() {
    return path.join(process.cwd(), "public/index.html");
  }

  get buildHtml() {
    return path.join(process.cwd(), "build/index.html");
  }

  get buildPath() {
    return path.join(process.cwd(), "build");
  }

  get sourcePath() {
    return path.join(process.cwd(), "public");
  }

  get configPath() {
    return path.join(process.cwd(), "./resu-me.config.js");
  }

  async loadConfig() {
    try {
      const config = require(this.configPath);

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  _copyFiles() {
    return new Promise((resolve, reject) => {
      copyfiles(
        ["public/**/*", "build"],
        { up: true, exclude: "**/index.html" },
        (error) => {
          if (error) {
            return reject(error);
          }

          return resolve();
        }
      );
    });
  }

  async buildSite(html, css) {
    try {
      await this._copyFiles();

      let file = await fs.readFile(this.sourceHtml, "utf8");

      file = insertBeforeLastOccurrence(file, "</body>", html);

      if (css) {
        file = insertBeforeLastOccurrence(
          file,
          "</head>",
          `<style>${css}</style>`
        );
      }

      await fs.writeFile(this.buildHtml, file, "utf8");

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  async renderTree(item) {
    return render(item);
  }

  async build() {
    const config = await this.loadConfig();

    const branches = await Promise.all(config.main.map(this.renderTree));

    const [html, css] = branches.reduce(
      (acc, cur) => [acc[0] + cur.html, acc[1] + cur.css],
      ["", ""]
    );

    await this.buildSite(html, css);
  }
}

module.exports = Command;
