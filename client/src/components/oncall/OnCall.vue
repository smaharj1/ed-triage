<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getOnCallStaff } from "../../services/api";
import OnCallCard from "./OnCallCard.vue";

const state = reactive({
  onCallStaff: [],
  originalStaffList: [],
});

const filter = ref("all");

onMounted(async () => {
  const staffs = await getOnCallStaff();
  state.onCallStaff = staffs;
  state.originalStaffList = staffs;
});

const filterStaff = () => {
  if (filter.value === "all") {
    state.onCallStaff = state.originalStaffList;
  } else {
    state.onCallStaff = state.originalStaffList.filter(
      (staff) => staff.type === filter.value
    );
  }
};
</script>

<template>
  <div class="oncall">
    <el-row>
      <el-col :span="3" class="oncall-col oncall-height">
        <el-icon color="#fff" size="50"><Cellphone /></el-icon>
        <p><strong>ON CALL</strong></p>

        <el-button>Call First Available</el-button>
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
              <on-call-card :staff="staff" />
            </li>
          </div>
        </div>
      </el-col>
    </el-row>
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

.staff-list li {
  display: inline-block;
  list-style: none;
}
.staff-list {
  max-height: 250px;
  overflow-y: scroll;
}

.oncall-height {
  height: 300px;
}

.filter {
  padding: 10px;
}
</style>
