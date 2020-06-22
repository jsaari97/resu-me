const BaseCommand = require("../base");
const { flags } = require("@oclif/command");

class BuildCommand extends BaseCommand {
  async run() {
    const { flags } = this.parse(BuildCommand);
    const name = flags.name || "world";
    this.log(`hello ${name} from ./src/commands/build.js`);
  }
}

BuildCommand.description = `Describe the command here
...
Extra documentation goes here
`;

BuildCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = BuildCommand;
