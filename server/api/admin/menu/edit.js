import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.filePath != body.formData.path) {
    try {
      // Get old file path
      const oldFilePath = path.join(
        process.cwd() + "/pages/",
        body.filePath + ".vue"
      );

      // Check if last character is a slash
      if (body.formData.path.slice(-1) == "/") {
        body.formData.path = body.formData.path + body.formData.name;
      }

      // Get new file path
      const newFilePath = path.join(
        process.cwd() + "/pages/",
        body.formData.path + ".vue"
      );

      // if the folder doesn't exist, create it
      if (!fs.existsSync(path.dirname(newFilePath))) {
        fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
      }

      // copy old file to new file
      fs.copyFileSync(oldFilePath, newFilePath);

      // delete old file
      fs.unlink(oldFilePath, (err) => {
        if (err) throw err;
        console.log("successfully deleted old file");
      });

      return {
        statusCode: 200,
        message: "Menu successfully saved",
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error,
      };
    }

    // fs.writeFile;
  }

  return {
    statusCode: 200,
    message: "null",
  };
});
