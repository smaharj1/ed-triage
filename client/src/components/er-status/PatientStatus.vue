<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import {
  getAllPatients,
  getBeds,
  putPatientToBed,
  dischargePatientFromER,
} from "../../services";
import { PatientResponse } from "../../types";
import BedViz from "./BedViz.vue";
import PatientQueue from "../patient/PatientQueue.vue";
import { BedResponse } from "../../types/bed.types";
import { ElCard, ElLoading } from "element-plus";

const state = reactive({
  patients: [],
  beds: [],
});

onMounted(async () => {
  await refreshData();
});

const refreshData = async () => {
  const [patientData, bedsData] = await Promise.all([
    getAllPatients(),
    getBeds(),
  ]);

  state.patients = patientData;
  state.beds = bedsData;
};

const addPatientToBed = async (bed: any) => {
  if (!bed?.patient || !bed?._id) return;

  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const resp = await putPatientToBed(bed?.patient, bed?._id);

    await refreshData();
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
};

const dischargePatient = async (bed: BedResponse) => {
  if (!bed?.patient?._id) return;

  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const resp = await dischargePatientFromER(bed?.patient?._id);

    await refreshData();
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
};
</script>

<template>
  <div class="patient-status">
    <div class="current left">
      <ElCard>
        <template #header>
          <div class="card-header">
            <p>Current Beds & Patients</p>
          </div>
        </template>
        <div>
          <BedViz
            :beds="state.beds"
            :patients="state.patients"
            @add-patient-to-bed="addPatientToBed"
            @discharge-patient="dischargePatient"
          />
        </div>
      </ElCard>
    </div>
    <div class="waiting">
      <PatientQueue :patients="state.patients" />
    </div>
  </div>
</template>

<style scoped>
.patient-status {
  border-right: 2px solid #dbdbdb;
  min-height: 600px;
  padding-right: 1em;
}

.waiting {
  margin-top: 1em;
}
</style>
