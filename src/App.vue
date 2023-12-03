<template>
  <div class="c-body">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

:root {
  --content-bg: #1a1a1a;
  --computer-bg: #333;
  --screen-bg: #000;
}

html[data-theme="green"] {
  --text-color: #27c93f;
  --color-icon: 204deg
}

html[data-theme="yellow"] {
  --text-color: #ffbd2e;
  --color-icon: -217deg
}

html[data-theme="red"] {
  --text-color: #ff5f56;
  --color-icon: 107deg
}
</style>
