<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getAllPatients, getAllStaffs } from "../../services";
import PatientStatus from "./PatientStatus.vue";
import StaffStatus from "./StaffStatus.vue";
</script>

<template>
  <div class="status-container">
    <ElRow :gutter="20">
      <ElCol class="section">
        <PatientStatus />
      </ElCol>
      <!-- <ElCol :span="12" class="section">
        <StaffStatus />
      </ElCol> -->
    </ElRow>
  </div>
</template>

<style scoped>
.status-container {
  padding-top: 2em;
}

.section {
  min-height: 600px;
}
</style>
