const BaseCommand = require("../base");
const bs = require("browser-sync").create();
const path = require("path");

class StartCommand extends BaseCommand {
  async run() {
    try {
      await this.build();

      bs.watch("public/*").on("change", async () => {
        await this.build();
        bs.reload();
      });

      bs.watch(
        "{resu-me.config.js,src/*.{svelte,html}}",
        async (_event, file) => {
          delete require.cache[require.resolve(path.join(process.cwd(), file))];
          delete require.cache[require.resolve(this.configPath)];

          await this.build();
          bs.reload();
        }
      );

      bs.init({
        server: this.buildPath,
        open: false,
      });
    } catch (error) {
      this.error(error);
    }
  }
}

StartCommand.description = `Develop your resume
...
Extra documentation goes here
`;

module.exports = StartCommand;
