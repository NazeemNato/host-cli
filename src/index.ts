import { checker } from "./checker";
import { environment } from "./data/environment";
import prompts from "prompts";
import { generateEnv } from "./dotenv";
import { npm } from "./data/npm";
import { installer } from "./installer";
import chalk from "chalk";

const main = async () => {
  const log = console.log;
  try {
    log(chalk.bgGreen(`Probat installer starting....`));
    environment.map(({ value }) => {
      const has = checker(value);
      if (has == false) {
        throw "bye";
      }
    });

    const response = await prompts([
      {
        type: "text",
        message: "Please enter mysql username",
        name: "username",
        initial: "root",
      },
      {
        type: "text",
        message: "Please enter mysql password",
        name: "password",
      },
      {
        type: "text",
        message: "Please enter mysql hostname",
        name: "hostname",
        initial: "localhost",
      },
      {
        type: "number",
        message: "Please enter mysql port number",
        name: "port",
        initial: 3306,
      },
      {
        type: "text",
        message: "Please enter mysql database name",
        name: "database",
        initial: "probat_dev",
      },
    ]);

    const { username, database, password, hostname, port } = response;
    generateEnv(username, password, database, hostname, port);
    npm.map(({ title, value, desc }) => {
      installer(title, value, desc);
    });
  } catch (error: unknown) {
    log();
  }
};

main();
