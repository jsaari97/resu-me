const BaseCommand = require("../base");
const rollup = require("rollup");
const sirv = require("sirv");
const polka = require("polka");

class BuildCommand extends BaseCommand {
  async run() {
    const config = await this.loadConfig();
    this.log(config);

    // set Node env
    process.env.NODE_ENV = "production";

    const { options } = await this.loadRollupConfig();

    await rollup.rollup(options[0]);

    const app = polka().use(sirv("public")).listen(5000);

    setTimeout(() => app.server.close(), 2000);
  }
}

BuildCommand.description = `Describe the command here
...
Extra documentation goes here
`;

module.exports = BuildCommand;
