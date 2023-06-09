import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const query = await getQuery(event);

  let code = "";

  try {
    // Get vue code from path in query
    const filePath = path.join(process.cwd() + "/pages/", query.path + ".vue");
    try {
      code = fs.readFileSync(filePath, "utf8");
      return {
        statusCode: 200,
        message: "Code successfully loaded",
        data: code,
      };
    } catch (error) {
      console.log("File not found");
    }

    // Check if there is NuxtPage component in code
    if (code.includes("NuxtPage") || !code) {
      const filePathIndex = path.join(
        process.cwd() + "/pages/",
        query.path + "/index.vue"
      );
      code = fs.readFileSync(filePathIndex, "utf8");
    }

    return {
      statusCode: 200,
      message: "Code successfully loaded",
      data: code,
      mode: "index",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "File not found",
    };
  }
});
