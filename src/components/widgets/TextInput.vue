<template>
  <div class="group">
    <label :for="id">
      <slot></slot>
    </label>
    <input :type="type" :placeholder="placeholder" class="textInput" required :value="inputValue"
      @input="updateInput($event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputValue: String,
  },
  methods: {
    updateInput(inputValue) {
      this.$emit('update:inputValue', inputValue); // Emitting an event to update the value
    },
  }
}
</script>

<style scoped>
.group {
  margin-bottom: 20px;
}

.group label {
  display: block;
  margin-bottom: 10px;
  color: #666;
  text-align: left;
}

.group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>