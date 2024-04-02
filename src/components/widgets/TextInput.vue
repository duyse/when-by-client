<template>
  <div class="group">
    <label :for="id">
      <slot></slot>
    </label>
    <input :type="type" :placeholder="placeholder" class="textInput" required v-model="inputValue" @input="$emit('input', $event.target.value)" />
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
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value);
    }
  },
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