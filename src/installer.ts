import chalk from "chalk";
import ora from "ora";
import shell from "shelljs";

export const installer = async (title: string, value: string, desc: string) => {
  const spinner = ora(title).start();
  const log = console.log;

  if (shell.exec(value).code !== 0) {
    spinner.fail();
    log(chalk.red(desc));
  } else {
    spinner.succeed();
    if ("Starting project file" == desc) {
      log(chalk.green(`Server started successfully`))
      shell.exit(1);
    }
  }
};
