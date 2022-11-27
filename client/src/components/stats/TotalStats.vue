<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  resources: any;
  statKey?: string;
  statValue?: string;
  title: string;
}>();

const availableResources = computed(() => {
  return props.resources.filter((res) => {
    if (!props.statKey || !props.statValue) {
      return true;
    }
    return res[props.statKey] === props.statValue;
  });
});
</script>

<template>
  <div>
    <ElCard class="bedcard">
      <p>{{ title }}</p>
      <p class="big-text">{{ availableResources.length }}</p>
    </ElCard>
  </div>
</template>

<style scoped>
.big-text {
  font-size: 4.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}
</style>
