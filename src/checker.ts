import shelljs from "shelljs";
import ora from "ora";
import chalk from "chalk";

export const checker = (value: string): Boolean => {
  const log = console.log;
  const spinner = ora(`Checking ${value}`).start();
  const has = shelljs.which(value);
  if (has) {
    spinner.succeed();
    return true;
  } else {
    spinner.fail();
    if (value == "mysql") {
      log(
        chalk.red(
          `Please install or  add ${value} to environmental variable  and continue.`
        )
      );
      return false;
    }
    log(chalk.red(`Please install ${value} and continue.`));
    return false;
  }
};
