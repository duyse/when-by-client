<template>
  <div>
    <button class="custom-button" @click="onClick">
      <span>
        <slot></slot>
      </span>
      <i v-if="this.icon" id="icon" :class="iconClass"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
    }
  },
  computed: {
    iconClass() {
      return 'fa-solid fa-' + this.icon;
    },
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.$emit('click', e);
    }
  },
  name: "CustomButton",
}
</script>

<style scoped>
.custom-button {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s ease;
}

.custom-button:hover {
  background-color: #0056b3;
}

#icon {
  margin-left: 5px;
}
</style>