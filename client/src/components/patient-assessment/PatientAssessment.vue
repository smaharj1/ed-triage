<script setup lang="ts">
import { reactive, ref } from "vue";
import { addPatientToDB, searchHapiFhir } from "../../services";
import { Bundle, Patient } from "fhir/r5";
import SearchResultDisplay from "./SearchResultDisplay.vue";
import { ElLoading } from "element-plus";
import Assessment from "./Assessment.vue";
import Confirmation from "./Confirmation.vue";

const search = ref("");
const activeStep = ref(1);
const searchResult = ref({} as Bundle<Patient>);

const selectedPatient = ref(undefined as unknown as Patient);
const savedPatient = ref({});

const startSearch = async () => {
  if (!search.value) return;
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    if (isNaN(search.value)) {
      // Do the patient name search
      console.log("Searching for patient name: ", search.value);
      searchResult.value = (await searchHapiFhir({
        name: search.value,
      })) as Bundle<Patient>;
    } else {
      // Do the patient id search
      console.log("Searching for patient id: ", search.value);
      searchResult.value = (await searchHapiFhir({
        id: search.value,
      })) as Bundle<Patient>;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
};

const patientSelected = (patient: Patient) => {
  console.log("Patient selected: ", patient);

  selectedPatient.value = patient;

  activeStep.value = 2;
};

const formCompleted = async (data: any) => {
  // console.log("Form completed: ", { ...data, ...selectedPatient.value });
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const response = await addPatientToDB({
      ...data,
      ...selectedPatient.value,
    });

    savedPatient.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
    activeStep.value = 3;
  }
};
</script>

<template>
  <div class="patient-assessment">
    <el-steps :active="activeStep" align-center>
      <el-step
        title="Patient Search"
        description="Search for patients to add"
        @click="activeStep = 1"
      />
      <el-step
        title="Patient Assessment"
        @click="activeStep > 2 ? (activeStep = 2) : null"
      />
      <el-step title="Confirmation" description="Confirm" />
    </el-steps>
    <div class="search" v-if="activeStep === 1">
      <ElInput
        v-model="search"
        placeholder="Search with Patient ID/Name and press Enter"
        @keyup.enter="startSearch"
        :clearable="true"
      />

      <div v-if="searchResult?.entry?.length > 0">
        <search-result-display
          :searchResult="searchResult"
          @patientSelected="patientSelected"
        />
      </div>
      <div v-else>
        <p class="nada">
          The patient with the above search criteria does not exist.
        </p>
      </div>
    </div>

    <div class="assessment" v-if="activeStep === 2 && selectedPatient">
      <assessment
        :patient="selectedPatient"
        @assessmentComplete="formCompleted"
      />
    </div>

    <div class="confirmation" v-if="activeStep === 3">
      <p><confirmation :patient="savedPatient" /></p>
    </div>
  </div>
</template>

<style scoped>
.patient-assessment {
  padding-top: 2em;
}

.search {
  padding-top: 2em;
}

.nada {
  font-size: 2em;
  color: #dbdbdb;
  padding-top: 10em;
}
</style>
