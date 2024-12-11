<template>
    <MdEditor v-model="text" language="en-US" noUploadImg :toolbars="toolbar_settings" />
</template>

<script setup>
import { ref } from 'vue'
import { MdEditor, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const toolbar_settings = [
    "bold",
    "underline",
    "italic",
    "-",
    "title",
    "strikeThrough",
    "sub",
    "sup",
    "quote",
    "unorderedList",
    "orderedList",
    "-",
    "codeRow",
    "code",
    "link",
    "image",
    "table",
    "katex",
    "-",
    "revoke",
    "next",
];

config({
    editorConfig: {
        languageUserDefined: {
            "en-US": {
                toolbarTips: {
                    strikeThrough: "strikethrough",
                    revoke: "undo",
                    next: "repeat",
                },
                titleItem: {
                    h1: "H1",
                    h2: "H2",
                    h3: "H3",
                    h4: "H4",
                    h5: "H5",
                    h6: "H6",
                },
                footer: {
                    scrollAuto: "Auto Scroll",
                },
            },
        },
    },
});

const text = ref('Hola mundo!');

defineExpose({
    text,
})
</script>