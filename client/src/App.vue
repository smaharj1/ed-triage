<script setup lang="ts">
import MainComponent from "./components/MainComponent.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header class="app-header">Hospital ED Triage</el-header>
      <el-main>
        <MainComponent />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.app-header {
  background-color: #6da5ed;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: xx-large;
}
</style>
