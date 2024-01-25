# HTML Templates

- The content of a `<template>` tag (created via HTML syntax or via JavaScript API) is parsed, interpreted, HTML elements are created **BUT** it is not attached to the DOM until you instruct it to do it via JavaScript
- Any media reference contained in tags like `<img>`, `<script>` or `<link>` is not executed, i. e. GET HTTP requests are not automatically performed
