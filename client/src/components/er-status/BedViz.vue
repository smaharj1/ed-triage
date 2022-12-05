<script setup lang="ts">
import { BedResponse, BedRequest } from "../../types/bed.types";
import { reactive, ref } from "vue";
import { PatientResponse } from "../../types";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  beds: any;
  patients: any;
}>();

const emit = defineEmits<{
  (event: "addPatientToBed", ...args: [BedRequest]): void;
  (event: "dischargePatient", ...args: [BedResponse]): void;
}>();

const state = reactive({
  showPatientModal: false,
  showDischargeModal: false,
  activeBed: {} as BedResponse,
});

const form = reactive({
  patient: "",
});

const patientName = (bed: BedResponse) => {
  if (!bed?.patient || !bed?.occupied) {
    return "Available";
  }

  const name = bed.patient?.firstName + " " + bed.patient?.lastName;

  return name.length < 15 ? name : name.substring(0, 15) + "...";
};

const triggerAddModal = (bed: BedResponse) => {
  state.activeBed = bed;
  state.showPatientModal = true;
  state.showDischargeModal = false;
};

const queuePatients = computed(() => {
  return props.patients?.filter((p: PatientResponse) => p.status === "QUEUE");
});

const cancelModal = () => {
  state.showPatientModal = false;
  state.showDischargeModal = false;
  state.activeBed = {} as BedResponse;
};

const addPatient = () => {
  const patient = props.patients?.find(
    (p: PatientResponse) => p._id === form.patient
  );

  if (patient) {
    emit("addPatientToBed", { ...state.activeBed, ...form });
  }
  cancelModal();
};

const triggerDischargeModal = (bed: BedResponse) => {
  state.activeBed = bed;
  state.showPatientModal = false;
  state.showDischargeModal = true;
};

const dischargePatient = () => {
  const patient = props.patients?.find(
    (p: PatientResponse) => p._id === state.activeBed?.patient?._id
  );

  if (patient) {
    emit("dischargePatient", state.activeBed);
  }

  cancelModal();
};
</script>

<template>
  <div class="bed-viz">
    <i>Click on the patient to add/discharge</i>
    <div class="beds">
      <div class="bed" v-for="(bed, ind) in props.beds" :key="ind">
        <div>
          <div v-if="bed.occupied">
            <div class="bed-number occupied">Bed No. {{ bed.bedNumber }}</div>
            <div class="bed-status dir" @click="triggerDischargeModal(bed)">
              {{ patientName(bed) }}
            </div>
          </div>
          <div v-else>
            <div class="bed-number available">Bed No. {{ bed.bedNumber }}</div>
            <div class="bed-status">
              <ElButton round @click="triggerAddModal(bed)"
                >Add Patient</ElButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Do the dialog modal -->
    <el-dialog
      v-model="state.showPatientModal"
      :title="`Add a patient to bed number ${state.activeBed?.bedNumber}`"
      width="40%"
      align-center
    >
      <span>Select the patient from the queue</span>
      <div>
        <el-select v-model="form.patient" placeholder="Select a patient">
          <el-option
            v-for="patient in queuePatients"
            class="left"
            :key="patient.id"
            :label="`${patient.firstName} ${patient.lastName}: ${patient.pid}`"
            :value="patient._id"
          ></el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModal()">Cancel</el-button>
          <el-button type="primary" @click="addPatient()"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Do the dialogue for discharge  -->
    <el-dialog
      v-model="state.showDischargeModal"
      :title="`Confirm Discharge`"
      width="40%"
      align-center
    >
      <span
        >Confirm Discharge of {{ patientName(state.activeBed) }} from Bed
        Number: <strong>{{ state.activeBed?.bedNumber }}</strong></span
      >

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModal()">Cancel</el-button>
          <el-button type="primary" @click="dischargePatient()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.bed-viz {
  height: 300px;
  overflow-y: scroll;
}
.bed {
  display: inline-block;
  width: 150px;
  height: 80px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  box-shadow: 0 0 10px #dbdbdb;
  margin: 0.5em;
  /* padding: 0.5em; */
}

.occupied {
  background-color: #ff4d4f;
  padding: 0.5em;
  color: white;
}

.available {
  background-color: #52c41a;
  padding: 0.5em;
  color: white;
}

.dir {
}

.bed-status {
  padding: 0.5em;
  text-align: center;
  cursor: pointer;
}
</style>
