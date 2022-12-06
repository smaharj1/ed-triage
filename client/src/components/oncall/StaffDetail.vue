<script setup lang="ts">
import { StaffResponse } from "../../types";
import { ref, watch } from "vue";
import { ElLoading } from "element-plus";
import { staffClockInOut } from "../../services";
const props = defineProps<{
  staff: StaffResponse;
}>();

const dialogOn = ref(true);

const emit = defineEmits<{
  (event: "close", ...args: any[]): void;
}>();

const closeDialog = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  console.log("HEREEE");

  try {
    const resp = await staffClockInOut(props.staff);
  } catch (error) {
    console.log(error);
  } finally {
    loading.close();
  }

  emit("close", { refresh: true });
  dialogOn.value = false;
};

watch(dialogOn, (newV, old) => {
  if (newV === false) {
    emit("close");
  }
});
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogOn"
      title="Staff Details"
      width="40%"
      align-center
    >
      <div class="staff-detail left">
        <p>
          Please look into the following information to give the staff a call.
        </p>

        <ElRow>
          <ElCol :span="12">
            <p>Name</p>
            <p>Current Status</p>
            <p>Email</p>
          </ElCol>
          <ElCol :span="12" class="bold">
            <p>{{ staff.firstName }} {{ staff.lastName }}</p>
            <p>{{ staff.shiftStatus }}</p>
            <p>{{ staff.email || "" }}</p>
          </ElCol>
        </ElRow>

        <div class="call-box">
          <p>{{ staff.phone }}</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="closeDialog()">
            {{
              staff.shiftStatus === "ONCALL" ? "Check In" : "Leave for the day"
            }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.staff-detail {
  min-height: 300px;
  font-size: medium;
}

.call-box {
  height: 100px;
  background-color: rgb(211, 212, 215);
  font-size: xx-large;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
}
</style>
