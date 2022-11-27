<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  staff: any;
}>();

const cardStyle = computed(() => ({
  padding: "0.5em",
  "border-left": `8px solid ${
    props.staff.type === "nurse" ? "#FF647F" : "#6da5ed"
  }`,
}));
</script>

<template>
  <div class="oncall-card">
    <el-card shadow="hover" :body-style="cardStyle">
      <el-row>
        <el-col :span="20">{{ staff?.name }}</el-col>
        <el-col :span="4" class="right">
          <el-icon><PhoneFilled /></el-icon>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.oncall-card {
  width: 250px;
  margin: 10px;
}
</style>
