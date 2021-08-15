import * as fs from "fs";
import { generate } from "generate-password";
import ora from "ora";

function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

export const generateEnv = (
  username: string,
  password: string,
  database: string,
  hostname: string,
  port: number
) => {
  let url;
  const spinner = ora(`Creating .env file`);
  spinner.start();
  if (!password.trim()) {
    url = `mysql://${fixedEncodeURIComponent(
      username
    )}@${hostname}:${port}/${fixedEncodeURIComponent(database)}`;
  } else {
    url = `mysql://${fixedEncodeURIComponent(
      username
    )}:${fixedEncodeURIComponent(
      password
    )}@${hostname}:${port}/${fixedEncodeURIComponent(database)}`;
  }

  const data = `DATABASE_URL="${url}"
JWT_KEY="${generate({ length: 32, numbers: true })}"
JWT_REFRESH_KEY="${generate({ length: 32, numbers: true })}"
  `;

  fs.writeFileSync(".env", data);
  spinner.succeed();
};
