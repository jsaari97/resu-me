const BaseCommand = require("../base");
const bs = require("browser-sync").create();

class StartCommand extends BaseCommand {
  async run() {
    try {
      await this.build();

      bs.watch("{resu-me.config.js,src/**/*,public/**/*}").on(
        "change",
        async () => {
          delete require.cache[require.resolve(this.configPath)];
          await this.build();
          bs.reload();
        }
      );

      bs.init({
        server: this.buildPath,
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
