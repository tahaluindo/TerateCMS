// import esline vue
import { ESLint } from "eslint";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (body.code === undefined) {
      return {
        statusCode: 400,
        message: "Bad Request",
      };
    }

    // run linter
    const code = body.code;

    // enable babel-eslint parser and requireConfigFile: false
    // ignore code export default defineEventHandler((event) => {

    const eslint = new ESLint({
      overrideConfig: {
        parser: "@babel/eslint-parser",
        extends: ["@kiwicom"],
        parserOptions: {
          requireConfigFile: false,
          ecmaVersion: 2020,
          sourceType: "module",
        },
      },
      useEslintrc: false,
    });

    const results = await eslint.lintText(code);

    if (results[0].messages.length > 0) {
      const messages = results[0].messages[0];

      if (messages.fatal === true) {
        return {
          statusCode: 400,
          message: "Bad Linter Test",
          data: messages,
        };
      }

      return {
        statusCode: 200,
        message: "Good Linter test",
        data: messages,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errror: error,
    };
  }
});
