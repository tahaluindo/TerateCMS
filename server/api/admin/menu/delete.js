import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Get file path
    const filePath = path.join(
      process.cwd() + "/pages/",
      body.filePath + ".vue"
    );

    // delete file
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log("successfully deleted file");
    });

    return {
      statusCode: 200,
      message: "Menu successfully added!",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
