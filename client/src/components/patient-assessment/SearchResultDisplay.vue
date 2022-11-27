<script setup lang="ts">
import { Bundle, BundleEntry, Patient } from "fhir/r5";
import PatientCard from "./PatientCard.vue";

const props = defineProps<{
  searchResult: Bundle<Patient>;
}>();

const emit = defineEmits<{
  (event: "patientSelected", ...args: [Patient]): void;
}>();

const patientSelected = (patient: Patient) => emit("patientSelected", patient);
</script>

<template>
  <div>
    <h2>Search Result:</h2>
    <p>
      Total found:
      {{
        searchResult?.total || searchResult?.entry?.length > 0
          ? "More than 20"
          : 0
      }}
    </p>

    <div
      v-for="entry in searchResult?.entry"
      :key="entry.fullUrl"
      class="search-result"
    >
      <patient-card
        :patient="entry.resource"
        @patientSelected="patientSelected"
      />
    </div>
  </div>
</template>

<style scoped>
.patient-name {
  font-size: 1.5em;
  font-weight: bold;
}
.search-result {
  max-height: 600px;
  overflow-y: scroll;
}
</style>
