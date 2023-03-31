import { generateClasses } from "@formkit/themes";
import defaultTheme from "@/assets/js/formkit-theme.js";
import customInput from "@/assets/js/formkit-custom.js";

export default {
  config: {
    classes: generateClasses(defaultTheme),
  },
  inputs: customInput,
};
