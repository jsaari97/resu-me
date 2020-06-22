const BaseCommand = require("../base");
const rollup = require("rollup");

class BuildCommand extends BaseCommand {
  async run() {
    const config = await this.loadConfig();
    this.log(config);

    // set Node env
    process.env.NODE_ENV = "production";

    const { options } = await this.loadRollupConfig();

    await rollup.rollup(options[0]);
  }
}

BuildCommand.description = `Describe the command here
...
Extra documentation goes here
`;

module.exports = BuildCommand;
