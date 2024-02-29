require("dotenv").config();

const { writeFileSync, mkdirSync } = require("fs");

const targetPath = "./src/environments/environment.ts";
const envFileContent = `
    export const environment = {
      backendUrl:"${process.env.BACK_URL}/gpt",
    };
  `;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
