const BaseCommand = require("../base");
const { saveAsPdf } = require("../pdf");

class BuildCommand extends BaseCommand {
  async run() {
    try {
      await this.build();

      await saveAsPdf(`file://${this.buildHtml} `);
    } catch (error) {
      this.error(error);
    }
  }
}

BuildCommand.description = `Builds your resume
...
Extra documentation goes here
`;

module.exports = BuildCommand;
