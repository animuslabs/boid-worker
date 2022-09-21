import dotenv from "dotenv";
import log from "loglevel";
import prefix from "loglevel-plugin-prefix";
import chalk from "chalk";
dotenv.config();
const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red
};
prefix.reg(log);
prefix.apply(log, {
    format(level, name, timestamp) {
        return `${chalk.gray(`[${timestamp}]`)} ${name} ${colors[level.toUpperCase()](level)}:`;
    }
});
prefix.apply(log.getLogger("critical"), {
    format(level, name, timestamp) {
        return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
    }
});
prefix.apply(log);
const levels = Object.keys(log.levels);
let envLogLevel = process.env.LOGLEVEL;
if (envLogLevel) {
    const valid = levels.includes(envLogLevel.toUpperCase());
    if (!valid)
        throw new Error("invalid env LOGLEVEL! Valid values are: " + levels + " default is INFO");
    log.setLevel(envLogLevel.toUpperCase());
}
else
    log.setLevel("INFO");
log.info("logging level set to:", log.getLevel());
export default log;
//# sourceMappingURL=logger.js.map