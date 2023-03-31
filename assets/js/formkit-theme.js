// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
const textClassification = {
  label:
    "block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger",
  inner: `
    flex
    items-center
    justify-center
    align-center
    w-full
    border
    border-slate-200
    dark:border-slate-700
    formkit-invalid:border-red-500
    dark:formkit-invalid:border-danger
    rounded-lg mb-1
    overflow-hidden
    focus-within:border-primary-400
    mb-0
  `,
  input: `
    w-full 
    h-10 
    px-3 
    border-none 
    text-sm 
    text-gray-700 
    dark:text-gray-200
    bg-white
    dark:bg-slate-800
    border-slate-200
    dark:border-slate-700
    placeholder-secondary 
    focus:outline-none 
    focus:shadow-outline
    `,
  prefix: `ml-2`,
  message: "formkit-invalid:text-red-500 dark:formkit-invalid:text-danger",
};
const boxClassification = {
  inner: "relative",
  fieldset:
    "max-w-md border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2",
  legend: "font-bold text-sm",
  wrapper: "flex items-center mb-3 cursor-pointer",
  help: "mb-3",
  input: `flex items-center 
          form-check-input
          appearance-none
          mr-2
          border-2 
          border-slate-200
          dark:border-slate-700
          checked:border-transparent 
          checked:bg-primary-400
          bg-white
          dark:bg-slate-800
          dark:checked:bg-primary-400
          rounded-md
          checked:shadow-sm checked:shadow-primary-500/30 
          focus:outline-none focus:ring-0 transition duration-200`,
  label:
    "text-sm text-gray-700 formkit-disabled:text-gray-300 dark:formkit-disabled:text-gray-700",
  message: "formkit-invalid:text-red-500 dark:formkit-invalid:text-danger",
};
const buttonClassification = {
  wrapper: "mb-1",
  input:
    "bg-primary-400 hover:bg-primary-500 text-white text-sm font-normal py-2 px-5 rounded-lg",
};
const OtpClassification = {
  label:
    "block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger",
  inner: `
        flex
        items-center
        justify-left
        align-center
        rounded-lg mb-1
        overflow-hidden
        mb-0
  `,
  digit: `
    w-10 h-10 mr-2
    text-center
    rounded-lg
    border
    border-slate-200
    dark:border-slate-700   
    text-sm 
    text-gray-700 
    dark:text-gray-200
    bg-white
    dark:bg-slate-800
    placeholder-secondary
    focus-within:border-primary-400
    focus:outline-none 
    focus:shadow-outline
`,
  message: "formkit-invalid:text-red-500 dark:formkit-invalid:text-danger",
};

// export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export default {
  // the global key will apply to all inputs
  global: {
    label: "text-gray-700 dark:text-gray-200",
    outer: "mb-4 formkit-disabled:opacity-50",
    help: "text-xs text-gray-500 dark:text-secondary mt-1",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-red-500 mb-1 text-xs",
    wrapper: "",
  },
  button: buttonClassification,
  color: {
    label: "block mb-1 font-bold text-sm",
    input: "w-16 h-8 cursor-pointer rounded-lg mb-2",
  },
  date: textClassification,
  "datetime-local": textClassification,
  checkbox: boxClassification,
  email: textClassification,
  file: {
    label: "block mb-1 font-bold text-sm",
    inner: "w-full cursor-pointer",
    input:
      "w-full cursor-pointer border rounded-lg text-gray-600 text-sm mb-1 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:bg-primary-400 file:text-white hover:file:bg-primary-500",
    noFiles: "block text-gray-800 text-sm my-1",
    fileItem: "block flex text-gray-800 text-sm my-1",
    removeFiles: "ml-auto text-blue-500 text-sm",
  },
  month: textClassification,
  number: textClassification,
  password: textClassification,
  radio: {
    ...boxClassification,
    input: boxClassification.input.replace("rounded-sm", "rounded-full"),
  },
  range: {
    input:
      "form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none",
  },
  search: textClassification,
  select: { ...textClassification, option: "p-2" },
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    ...textClassification,
    input: `
      block 
      w-full 
      px-3 py-2
      border-none 
      text-sm 
      text-gray-700 
      dark:text-gray-200
      bg-white
      dark:bg-slate-800
      placeholder-secondary 
      focus:outline-none 
      focus:shadow-outline `,
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
  otp: OtpClassification,
  mask: textClassification,
  dropzone: {
    ...textClassification,
    inner: "w-full",
    dropzone:
      "border-2 border-gray-500 border-dashed p-6 active:bg-gray-100 dark:active:bg-gray-700",
  },
};
