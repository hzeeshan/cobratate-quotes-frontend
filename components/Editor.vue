<template>
  <div id="text-editor">
    <div class="toolbar" v-if="editor">
      <div class="align-dropdown">
        <v-btn class="dropbtn">Heading {{ activeHeading }} ▼</v-btn>
        <div class="dropdown-content">
          <a
            v-for="index in 6"
            :class="{ active: editor.isActive('heading', { level: index }) }"
            :style="{ fontSize: 20 - index + 'px' }"
            @click="onHeadingClick(index)"
            :key="index"
            role="button"
          >
            H{{ index }}
          </a>
        </div>
      </div>

      <v-btn
        v-for="{ slug, option, active, icon, label } in textActions"
        :class="{ active: editor.isActive(active) }"
        :key="label"
        @click="onActionClick(slug, option)"
      >
        <v-icon :icon="icon"></v-icon>
        <!--  {{ label }} -->
      </v-btn>
    </div>

    <editor-content :editor="editor" />

    <div v-if="editor" class="footer">
      <span class="characters-count" :class="maxLimit ? limitWarning : ''">
        {{ charactersCount }}
        {{ maxLimit ? `/ ${maxLimit} characters` : "characters" }}
      </span>
      |
      <span class="words-count"> {{ wordsCount }} words </span>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CharacterCount from "@tiptap/extension-character-count";

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    maxLimit: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
      activeHeading: null,
      textActions: [
        {
          slug: "bold",
          icon: "mdi-format-bold",
          active: "bold",
          label: "Bold",
        },
        {
          slug: "italic",
          icon: "mdi-format-italic",
          active: "italic",
          label: "Italic",
        },
        {
          slug: "underline",
          icon: "mdi-format-underline",
          active: "underline",
          label: "underline",
        },
        {
          slug: "strike",
          icon: "mdi-format-strikethrough",
          active: "strike",
          label: "strike",
        },
        {
          slug: "align",
          option: "left",
          icon: "mdi-format-align-left",
          active: { textAlign: "left" },
          label: "left",
        },
        {
          slug: "align",
          option: "center",
          icon: "mdi-format-align-center",
          active: { textAlign: "center" },
          label: "center",
        },
        {
          slug: "align",
          option: "right",
          icon: "mdi-format-align-right",
          active: { textAlign: "right" },
          label: "right",
        },
        {
          slug: "align",
          option: "justify",
          icon: "mdi-format-align-justify",
          active: { textAlign: "justify" },
          label: "justify",
        },
        {
          slug: "bulletList",
          icon: "mdi-format-list-bulleted",
          active: "bulletList",
          label: "bulletList",
        },
        {
          slug: "orderedList",
          icon: "mdi-format-list-checks",
          active: "orderedList",
          label: "orderedList",
        },
        {
          slug: "subscript",
          icon: "mdi-format-subscript",
          active: "subscript",
          label: "subscript",
        },
        {
          slug: "superscript",
          icon: "mdi-format-superscript",
          active: "superscript",
          label: "superscript",
        },
        {
          slug: "undo",
          icon: "mdi-undo",
          active: "undo",
          label: "undo",
        },
        {
          slug: "redo",
          icon: "mdi-redo",
          active: "redo",
          label: "redo",
        },
        {
          slug: "clear",
          icon: "mdi-format-clear",
          active: "clear",
          label: "clear",
        },
        {
          slug: "code",
          icon: "mdi-code-braces",
          active: "code",
          label: "code",
        },
      ],
    };
  },
  computed: {
    charactersCount() {
      return this.editor.storage.characterCount.characters();
    },
    wordsCount() {
      return this.editor.storage.characterCount.words();
    },
    limitWarning() {
      const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
      const isMax = this.charactersCount === this.maxLimit;

      if (isCloseToMax && !isMax) return "warning";
      if (isMax) return "danger";

      return "";
    },
  },
  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(this.modelValue, false);
    },
  },
  methods: {
    onActionClick(slug, option = null) {
      const vm = this.editor.chain().focus();
      const actionTriggers = {
        bold: () => vm.toggleBold().run(),
        italic: () => vm.toggleItalic().run(),
        underline: () => vm.toggleUnderline().run(),
        strike: () => vm.toggleStrike().run(),
        bulletList: () => vm.toggleBulletList().run(),
        orderedList: () => vm.toggleOrderedList().run(),
        align: () => vm.setTextAlign(option).run(),
        subscript: () => vm.toggleSubscript().run(),
        superscript: () => vm.toggleSuperscript().run(),
        undo: () => vm.undo().run(),
        redo: () => vm.redo().run(),
        clear: () => {
          vm.clearNodes().run();
          vm.unsetAllMarks().run();
        },
        code: () => vm.toggleCodeBlock().run(),
      };

      actionTriggers[slug]();
    },
    onHeadingClick(index) {
      this.activeHeading = index;
      const vm = this.editor.chain().focus();
      vm.toggleHeading({ level: index }).run();
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
        CharacterCount.configure({
          limit: this.maxLimit,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });

    this.$nextTick(() => {
      let proseMirrorElement = document.querySelector(".ProseMirror");
      if (proseMirrorElement) {
        proseMirrorElement.style.height = "300px";
        proseMirrorElement.style.overflowY = "auto";
        proseMirrorElement.style.paddingLeft = "20px";
        proseMirrorElement.style.paddingTop = "15px";
        proseMirrorElement.style.paddingRight = "20px";
        proseMirrorElement.style.outline = "none";
      }
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="less" scoped>
#text-editor {
  border: 1px solid #808080;

  .toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #808080;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      height: 32px;

      font-weight: bold;
      background: #fff;
      color: #333;
      border: none;
      border-radius: 2px;
      margin: 0.5em 4px;
      -webkit-appearance: none;
      cursor: pointer;

      &.active {
        background: #333;
        color: #fff;
      }
    }
  }

  .align-dropdown {
    position: relative;
    display: inline-block;
    margin: 0.5em 8px;

    > button {
      height: 32px;
      background: #fff;
      color: #333;
      border: none;
      border-radius: 2px;
      -webkit-appearance: none;
      cursor: pointer;
    }

    > .dropdown-content {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      border: 1px solid #333;
      outline: 1px solid #fff;
      border-radius: 2px;
      background-color: #fff;
      z-index: 1;

      a {
        display: block;
        padding: 6px 12px;
        text-align: center;
        cursor: pointer;

        &:hover,
        &.active {
          background: #333;
          color: #fff;
        }
      }
    }

    &:hover .dropdown-content {
      display: block;
    }
  }

  .divider {
    width: 1px;
    height: 24px;
    background: #333;
    margin-right: 6px;
  }

  .footer {
    color: #808080;
    font-size: 14px;
    text-align: right;
    padding: 6px;

    .characters-count {
      &.warning {
        color: orange;
      }

      &.danger {
        color: red;
      }
    }
  }

  .ProseMirror {
    background-color: red !important;
    height: 300px;
    overflow-y: auto;
    padding-left: 0.5em;
    padding-right: 0.5em;
    outline: none;

    > p:first-child {
      margin-top: 0.5em;
    }

    > h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:first-child {
        margin-top: 0.5em;
      }
    }
  }
}
</style>
