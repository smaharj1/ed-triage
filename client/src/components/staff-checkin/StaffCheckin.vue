<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref, reactive, onMounted } from "vue";
import { getStaffs } from "../../services";
import { StaffResponse } from "../../types";
import OnCallCard from "../oncall/OnCallCard.vue";
import { Search } from "@element-plus/icons-vue";
import StaffDetail from "../oncall/StaffDetail.vue";
const state = reactive({
  originalStaffList: [],
  staffSelected: {} as StaffResponse,
  search: "",
});

const filter = ref("all");

onMounted(async () => {
  await refreshComponent();
});

const refreshComponent = async () => {
  const staffs = await getStaffs();
  state.originalStaffList = staffs;
};

const workingStaff = computed(() => {
  return state.originalStaffList.filter(
    (staff: StaffResponse) => staff.shiftStatus === "WORKING"
  );
});

const onCallStaff = computed(() => {
  return state.originalStaffList.filter(
    (staff: StaffResponse) => staff.shiftStatus === "ONCALL"
  );
});

const staffClicked = (staff: StaffResponse) => {
  state.staffSelected = staff;
};

const searchChange = () => {
  console.log(state.search);
};

const closeTrigger = ({ refresh = false } = {}) => {
  if (refresh) {
    refreshComponent();
  }
  state.staffSelected = {} as StaffResponse;
};
</script>

<template>
  <div class="staff-checkin">
    <h1>Staff Management</h1>
    <!-- <div>
      <el-input
        v-model="state.search"
        placeholder="Search Staff by Name"
        prefix-icon="Search"
        clearable
        size="large"
        class="search-box"
        v-debounce:1s="searchChange()"
      ></el-input>
    </div> -->
    <ElRow :gutter="20">
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <div>Staff Working</div>
          </template>
          <div class="staff-list mgmt">
            <li
              v-for="(staff, ind) in workingStaff"
              :key="ind"
              class="staff-list"
            >
              <on-call-card :staff="staff" @click="staffClicked(staff)" />
            </li>
          </div> </ElCard
      ></ElCol>
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <div>Staff On Call</div>
          </template>
          <div class="staff-list mgmt">
            <li
              v-for="(staff, ind) in onCallStaff"
              :key="ind"
              class="staff-list"
            >
              <on-call-card :staff="staff" @click="staffClicked(staff)" />
            </li>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <div v-if="state.staffSelected?._id">
      <staff-detail :staff="state.staffSelected" @close="closeTrigger" />
    </div>
  </div>
</template>

<style scoped>
.staff-checkin {
  padding-top: 1em;
}

.mgmt {
  min-height: 500px;
  height: 500px;
  text-align: left;
  overflow-y: scroll;
}

.search-box {
  padding: 2em 0;
}
</style>
