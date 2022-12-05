<script setup lang="ts">
import { Patient } from "fhir/r5";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import PatientCard from "./PatientCard.vue";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  weight: 165,
  height: 170,
  injuries: 1,
  notes: "",
  conditionAcute: false,
  activeMedication: 1,
  preexistingConditions: 0,
});

const props = defineProps<{
  patient: Patient | undefined;
}>();

const emit = defineEmits<{
  (event: "assessmentComplete", ...args: [any]): void;
}>();

const rules = reactive<FormRules>({
  weight: [{ required: true, message: "Please add a weight", trigger: "blur" }],
  height: [{ required: true, message: "Please add a height", trigger: "blur" }],
  injuries: [
    {
      required: true,
      message: "Please add total number of visible injuries",
      trigger: "blur",
    },
  ],
  activeMedication: [
    {
      required: true,
      message: "Please add total active medications that the patient is on",
      trigger: "blur",
    },
  ],
  preexistingConditions: [
    {
      required: true,
      message: "Please add total number of pre-existing conditions",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("assessmentComplete", ruleForm);
    } else {
      console.log("error submit!", fields);
    }
  });
};

// const addToQueue = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       emit("assessmentComplete", {
//         ...ruleForm,
//         type: "queue",
//       });
//     } else {
//       console.log("error submit!", fields);
//     }
//   });
// };

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="assessment">
    <patient-card :patient="props.patient" :hideButton="true" />
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="180px"
      label-position="right"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Height" prop="height" type="number">
        <el-input v-model="ruleForm.height" />
      </el-form-item>
      <el-form-item label="Weight" prop="weight">
        <el-input v-model="ruleForm.weight" />
      </el-form-item>

      <el-form-item label="Condition Acute" prop="conditionAcute">
        <el-switch v-model="ruleForm.conditionAcute" />
      </el-form-item>

      <el-form-item label="Total Injuries" prop="injuries">
        <el-input v-model="ruleForm.injuries" />
      </el-form-item>

      <el-form-item label="Active Medication" prop="activeMedication">
        <el-input v-model="ruleForm.activeMedication" />
      </el-form-item>

      <el-form-item label="Preexisting Conditions" prop="preexistingConditions">
        <el-input v-model="ruleForm.preexistingConditions" />
      </el-form-item>

      <el-form-item label="Notes" prop="notes" size="large">
        <el-input v-model="ruleForm.notes" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm(ruleFormRef)"
          >Assign Resource to Patient</el-button
        >

        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.assessment {
  padding-top: 2em;
}
</style>
