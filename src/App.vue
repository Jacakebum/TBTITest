<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <div class="container">
    <RouterView/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif;
}

.container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
}
</style>
