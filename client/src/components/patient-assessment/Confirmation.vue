<script setup lang="ts">
import { PatientResponse } from "../../types";
import { DateTime } from "luxon";

const props = defineProps<{
  patient: PatientResponse;
}>();

const formatDate = (date: string) => {
  const d = DateTime.fromISO(date);

  return d.toLocaleString(DateTime.DATETIME_MED);
};
</script>

<template>
  <div>
    <div v-if="patient?._id" class="confirmation">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h1>Confirmation</h1>
          </div>
        </template>
        <div>
          <p>
            Patient Name:
            <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
          </p>
          <p>
            Patient ID: <strong>{{ patient.pid }}</strong>
          </p>
          <p>
            Assessment Date:
            <strong>{{ formatDate(patient.createdAt) || "N/A" }}</strong>
          </p>
          <p>
            Priority Determined Priority:
            <strong>{{ patient.priority }}</strong>
          </p>
          <p>
            Patient Status: <strong>{{ patient.status }}</strong>
          </p>
          <p v-if="patient.bed?._id">
            Since the patient is determined to be high priority, they are
            assigned bed: <strong> {{ patient.bed.bedNumber }} </strong>
          </p>
        </div>
      </el-card>
    </div>
    <div v-else>
      <h1>There was some error with the add</h1>
    </div>
  </div>
</template>

<style scoped>
.confirmation {
  text-align: center;
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 620px;
  margin: 4em auto;
}
</style>
