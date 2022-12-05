<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getPatientsInQueue } from "../../services";
import chroma from "chroma-js";

const scale = chroma.scale(["yellow", "red"]).domain([0, 10]);
const state = reactive({
  patientQueue: [],
});
const patientQueue = ref([]);

onMounted(async () => {
  const data = await getPatientsInQueue();
  data.sort((a, b) => b.priority - a.priority);
  state.patientQueue = data;
});

const priorityBoxStyle = (p) => ({
  width: "100%",
  height: "1.8em",
  "background-color": scale(p.priority).hex(),
  "margin-left": "1.5em",
});
</script>

<template>
  <el-container class="patient-queue">
    <el-header class="patient-header">Patient Queue</el-header>
    <ElMain class="patients">
      <div>
        <li v-for="(patient, pid) in state.patientQueue" :key="pid">
          <el-row class="patient-row">
            <el-col :span="17" class="left">
              {{ patient.firstName }} {{ patient.lastName }}
            </el-col>

            <el-col :span="7" class="right">
              <div :style="priorityBoxStyle(patient)"></div>
            </el-col>
          </el-row>
        </li>
      </div>
    </ElMain>
  </el-container>
</template>

<style scoped>
.patient-header {
  background-color: #6da5ed;
  color: #fff;
  font-size: larger;
  padding-top: 1em;
}

.patients {
  height: 500px;
  overflow-y: auto;
}

.patient-row {
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}
</style>
