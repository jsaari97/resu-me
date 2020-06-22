const BaseCommand = require("../base");
const rollup = require("rollup");

class StartCommand extends BaseCommand {
  async run() {
    try {
      const config = await this.loadConfig();
      this.log(config);

      // set env
      process.env.NODE_ENV = "development";

      const { options } = await this.loadRollupConfig();

      await rollup.rollup(options[0]);

      const watcher = rollup.watch(options);

      watcher.on("change", () => {
        this.log("bundle updated");
      });
    } catch (error) {
      this.error(error);
    }
  }
}

StartCommand.description = `Describe the command here
...
Extra documentation goes here
`;

module.exports = StartCommand;
