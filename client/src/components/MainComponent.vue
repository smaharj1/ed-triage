<script setup lang="ts">
import { ref } from "vue";
import Dashboard from "./Dashboard.vue";
import PatientAssessment from "./patient-assessment/PatientAssessment.vue";
import ErStatus from "./er-status/ErStatus.vue";

const menuItems = ref([
  {
    name: "Dashboard",
    slug: "dashboard",
  },
  {
    name: "Patient Assessment",
    slug: "patient-assessment",
  },
  {
    name: "ER Status",
    slug: "er-status",
  },
  {
    name: "On Call",
    slug: "on-call",
  },
]);

const activeMenu = ref(menuItems.value[0]);

const menuSelected = (item: any) => {
  activeMenu.value = item;
};
</script>

<template>
  <div>
    <div class="menu">
      <span v-for="(item, ind) in menuItems" :key="ind">
        <el-button
          round
          :type="item.slug === activeMenu.slug ? 'primary' : ''"
          @click="menuSelected(item)"
          >{{ item.name }}</el-button
        >
      </span>
    </div>
    <div class="content">
      <div v-if="activeMenu.slug === 'dashboard'">
        <Dashboard />
      </div>
      <div v-else-if="activeMenu.slug === 'patient-assessment'">
        <PatientAssessment />
      </div>
      <div v-else-if="activeMenu.slug === 'er-status'">
        <ErStatus />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  text-align: left;
}
.menu > span {
  margin-right: 10px;
}
</style>
