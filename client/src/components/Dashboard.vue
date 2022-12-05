<script setup lang="ts">
import OnCall from "./oncall/OnCall.vue";
import PatientQueue from "./patient/PatientQueue.vue";
import StatsBoard from "./stats/StatsBoard.vue";
import { getAllPatients } from "../services";
import { reactive, onMounted } from "vue";

const state = reactive({
  patients: [],
});

onMounted(async () => {
  const data = await getAllPatients();
  state.patients = data;
});
</script>

<template>
  <div>
    <on-call />
    <el-row class="section">
      <el-col :span="6">
        <patient-queue :patients="state.patients" />
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
