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

.c-body {
  background: url('@/assets/matrix_animation.gif');
}
</style>
