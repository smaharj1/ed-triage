<script setup lang="ts">
import { Patient, BundleEntry } from "fhir/r5";

const props = defineProps<{
  patient: Patient | undefined;
  hideButton?: boolean;
}>();

const emit = defineEmits<{
  (event: "patientSelected", ...args: [Patient]): void;
}>();

const getPatientName = (p: any) => {
  return `${p.name[0].given.join(" ")} ${p.name[0].family}`;
};

const getPatientAddress = (p: any) => {
  if (!p.address) return "Not Found in File";
  return `${p?.address?.[0]?.line?.join(", ")} ${p?.address?.[0].city} ${
    p?.address?.[0].state
  } ${p.address?.[0].postalCode}`;
};

const patientSelected = (patient: any) => emit("patientSelected", patient);
</script>

<template>
  <div>
    <ElCard class="result-card" shadow="hover">
      <ElRow>
        <ElCol :span="8" class="left">
          <span class="patient-name">{{ getPatientName(patient) }}</span>
          | {{ patient?.name?.[0].use }}
          <p class="left">
            Gender: <strong>{{ patient?.gender }}</strong>
          </p>
        </ElCol>
        <ElCol :span="8">
          <p class="no-margin">
            DOB: <strong>{{ patient?.birthDate }}</strong>
          </p>
        </ElCol>
        <ElCol :span="8">
          <p class="right no-margin">
            Patient ID: <strong>{{ patient?.id }}</strong>
          </p>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="18">
          <p class="left no-margin">
            Address:
            <strong>{{ getPatientAddress(patient) }}</strong>
          </p>
        </ElCol>
        <ElCol :span="6" class="right">
          <ElButton type="success" v-if="!hideButton">
            <span class="button-text" @click="patientSelected(patient)">
              Select Patient</span
            >
          </ElButton>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<style scoped>
.button-text {
  margin-right: 0.5em;
}

.result-card {
  margin-bottom: 1em;
}

.no-margin {
  margin: 0;
}
</style>
