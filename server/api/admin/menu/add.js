import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if last character is a slash
    if (body.formData.path.slice(-1) == "/") {
      body.formData.path = body.formData.path + body.formData.name;
    }

    // Create new file path
    const newFilePath = path.join(
      process.cwd() + "/pages/",
      body.formData.path + ".vue"
    );

    // if the folder doesn't exist, create it
    if (!fs.existsSync(path.dirname(newFilePath))) {
      fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
    }

    // Create new file
    fs.writeFileSync(
      newFilePath,
      `<script setup>
        definePageMeta({
          title: "${body.formData.title ? body.formData.title : body.formData.name}",
        });
    </script>
    <template>
      <div>
        <LayoutsBreadcrumb />
      </div>
    </template>
    `
    );

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
