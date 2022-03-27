<template>
  <div>
    <span class="checkbox-container" v-for="(tech, index) in techs" :key="tech.label">
      <label :for="tech.label">{{ tech.label }}</label>
      <input
        :id="tech.label"
        type="checkbox"
        :key="tech.name"
        class="p-default p-curve"
        color="success"
        v-on:change="emit(index)"
        :checked="tech.checked"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: ['techs'],
  methods: {
    emit(index) {
      this.$emit('checked', index)
    }
  }
}
</script>

<style scoped>
.checkbox-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}
label {
  font-size: 15px;
}
</style>
