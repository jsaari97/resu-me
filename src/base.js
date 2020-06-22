const { Command: BaseCommand } = require("@oclif/command");
const loadConfigFile = require("rollup/dist/loadConfigFile");
const path = require("path");

class Command extends BaseCommand {
  async loadConfig() {
    try {
      const pathName = path.join(process.cwd(), "./resu-me.config.js");
      const config = require(pathName);

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async loadRollupConfig() {
    try {
      const pathName = path.join(__dirname, "../rollup.config.js");

      const config = await loadConfigFile(pathName, {
        format: "es",
      });

      if (config.warnings.count) {
        this.log(`We currently have ${config.warnings.count} warnings`);

        config.warnings.flush();
      }

      return Promise.resolve(config);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Command;
