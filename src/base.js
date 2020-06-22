const { Command: BaseCommand } = require("@oclif/command");
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
}

module.exports = Command;
