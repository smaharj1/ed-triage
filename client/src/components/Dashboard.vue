<script setup lang="ts">
import OnCall from "./oncall/OnCall.vue";
import PatientQueue from "./patient/PatientQueue.vue";
import StatsBoard from "./stats/StatsBoard.vue";
</script>

<template>
  <div>
    <on-call />
    <el-row class="section">
      <el-col :span="6">
        <patient-queue />
      </el-col>
      <el-col :span="18"> <stats-board /> </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.section {
  padding-top: 1em;
}
</style>
