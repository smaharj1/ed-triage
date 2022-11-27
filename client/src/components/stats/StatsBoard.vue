<script setup lang="ts">
import TotalStats from "./TotalStats.vue";
import { ref, onMounted } from "vue";
import { getBeds, getPatientsInQueue } from "../../services";

const totalBeds = ref([]);
const patientQueue = ref([]);

onMounted(async () => {
  totalBeds.value = await getBeds();

  const data = await getPatientsInQueue();
  patientQueue.value = data;
});
</script>

<template>
  <div class="stats">
    <ElRow :gutter="30">
      <ElCol :span="8">
        <total-stats
          :resources="totalBeds"
          title="Total Beds Available"
          statKey="status"
          statValue="available"
        />
      </ElCol>
      <ElCol :span="8">
        <total-stats
          :resources="totalBeds"
          title="Total Beds Occupied"
          statKey="status"
          statValue="occupied"
        />
      </ElCol>
      <ElCol :span="8">
        <total-stats :resources="patientQueue" title="Total Patients Waiting" />
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.stats {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
