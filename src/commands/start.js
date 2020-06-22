const BaseCommand = require("../base");
const loadConfigFile = require("rollup/dist/loadConfigFile");
const path = require("path");
const rollup = require("rollup");

class StartCommand extends BaseCommand {
  async run() {
    const config = await this.loadConfig();
    this.log(config);

    // set Node env
    process.env.NODE_ENV = "development";

    loadConfigFile(path.resolve(__dirname, "../../rollup.config.js"), {
      format: "es",
    }).then(async ({ options, warnings }) => {
      // "warnings" wraps the default `onwarn` handler passed by the CLI.
      // This prints all warnings up to this point:
      this.log(`We currently have ${warnings.count} warnings`);

      // This prints all deferred warnings
      warnings.flush();

      const bundle = await rollup.rollup(options[0]);

      this.log(bundle);

      // You can also pass this directly to "rollup.watch"
      const watcher = rollup.watch(options);

      watcher.on("change", () => {
        this.log("bundle updated");
      });
    });
  }
}

StartCommand.description = `Describe the command here
...
Extra documentation goes here
`;

module.exports = StartCommand;
