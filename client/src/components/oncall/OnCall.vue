<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getStaffs } from "../../services/api";
import OnCallCard from "./OnCallCard.vue";
import { StaffResponse } from "../../types";
import StaffDetail from "./StaffDetail.vue";

const state = reactive({
  onCallStaff: [],
  originalStaffList: [],
  staffSelected: {} as StaffResponse,
});

const filter = ref("all");

onMounted(async () => {
  await refreshComponent();
});

const filterStaff = () => {
  if (filter.value === "all") {
    state.onCallStaff = state.originalStaffList;
  } else {
    state.onCallStaff = state.originalStaffList.filter(
      (staff) => (staff as any).type === filter.value
    );
  }
};

const callFirstAvailable = () => {
  state.staffSelected = state.onCallStaff[0];
};

const staffClicked = (staff: StaffResponse) => {
  state.staffSelected = staff;
};

const refreshComponent = async () => {
  const staffs = await getStaffs("oncall");
  state.onCallStaff = staffs;
  state.originalStaffList = staffs;
};

const closeTrigger = ({ refresh = false } = {}) => {
  if (refresh) {
    refreshComponent();
  }
  state.staffSelected = {} as StaffResponse;
};
</script>

<template>
  <div class="oncall">
    <el-row>
      <el-col :span="3" class="oncall-col oncall-height">
        <el-icon color="#fff" size="50"><Cellphone /></el-icon>
        <p><strong>ON CALL</strong></p>

        <el-button @click="callFirstAvailable()"
          >Call First Available</el-button
        >
      </el-col>
      <el-col :span="21" class="oncall-height">
        <div class="left">
          <div class="filter">
            Filter

            <el-select
              v-model="filter"
              placeholder="Select"
              @change="filterStaff"
            >
              <el-option label="All" value="all" />
              <el-option label="Nurse" value="nurse" />
              <el-option label="Doctor" value="doctor" />
            </el-select>
          </div>
          <div class="staff-list">
            <li v-for="(staff, ind) in state.onCallStaff" :key="ind">
              <on-call-card :staff="staff" @click="staffClicked(staff)" />
            </li>
          </div>
        </div>
      </el-col>
    </el-row>

    <div v-if="state.staffSelected?._id">
      <staff-detail :staff="state.staffSelected" @close="closeTrigger" />
    </div>
  </div>
</template>

<style scoped>
.oncall {
  margin-top: 20px;
}

.oncall-col {
  background-color: #6da5ed;
  color: #fff;

  padding-top: 2em;
  padding-bottom: 2em;
}

.oncall-height {
  height: 300px;
}

.filter {
  padding: 10px;
}
</style>
