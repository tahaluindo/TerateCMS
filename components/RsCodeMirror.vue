<script setup>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

import emmet from "@emmetio/codemirror-plugin";

// modes
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/javascript/javascript.js";

// addons
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/display/fullscreen.js";

// import all theme
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/moxer.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/zenburn.css";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: "text/x-vue",
  },
  height: {
    type: String,
    default: "77vh",
  },
  modelValue: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "monokai",
  },
  readOnly: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const el = ref(null);

const code = props.modelValue
  ? ref(props.modelValue)
  : props.mode == "application/json"
  ? ref(`{}`)
  : ref(`<template></template>`);

const addonOptions = {
  readOnly: props.readOnly,
  autoCloseBrackets: true,
  autoCloseTags: true,
  foldGutter: true,
  gutters: [
    "CodeMirror-linenumbers",
    "CodeMirror-foldgutter",
    "CodeMirror-lint-markers",
  ],
  lint: true,
  extraKeys: {
    Tab: "emmetExpandAbbreviation",
    Esc: "emmetResetAbbreviation",
    Enter: "emmetInsertLineBreak",
    "Ctrl-/": "toggleComment",
    F11: function (cm) {
      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    },
    Esc: function (cm) {
      if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
    },
  },
  hintOptions: {
    completeSingle: false,
  },
};

async function initEditor() {
  const editor = CodeMirror(el.value, {
    value: code.value,
    theme: props.theme,
    mode: props.mode,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions,
  });
  editor.on("change", () => {
    emits("update:modelValue", editor?.getValue());
  });

  // watchEffect(() => {
  //   editor!.setValue(props.value)
  // })
  watchEffect(() => {
    editor.refresh();
  });
}

onMounted(() => {
  emmet(CodeMirror);
  nextTick(async () => await initEditor());
});
</script>

<template>
  <div ref="el" class="editor"></div>
</template>

<style>
.editor > .CodeMirror {
  height: v-bind("props.height");
  border-radius: 0.5rem;
}

.emmet-abbreviation-preview {
  z-index: 10;
  background-color: #212121;
}

.emmet-abbreviation-preview > .CodeMirror {
  background-color: #212121;
  border: 1px solid rgb(50, 50, 50);
}

.CodeMirror-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  z-index: 100;
}
</style>
