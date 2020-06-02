<template>
  <div :class="$style.filter">
    <label
      v-for="(option, index) in options"
      :key="index"
      :class="getOptionClasses(option)"
    >
      <input
        type="radio"
        :value="option.value"
        :checked="isChecked(option)"
        v-on="listeners(option)"
      >
      <strong>{{ option.text }}</strong>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CompletionFilter',
  props: {
    model: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'model',
    event: 'change'
  },
  data() {
    return {
      options: [
        {
          text: this.$parseHint('PLANNED_OPERATIONS'),
          value: false
        },
        {
          text: this.$parseHint('COMPLETED_OPERATIONS'),
          value: true
        }
      ]
    }
  },
  methods: {
    getOptionClasses(option) {
      return {
        'text-uppercase': true,
        link: option.value !== this.model
      }
    },
    listeners(option) {
      return {
        ...this.$listeners,
        change: () => this.onChange(option)
      };
    },
    onChange(option) {
      this.$emit('change', option.value);
    },
    isChecked(option) {
      return option.value === this.model;
    }
  }
}
</script>

<style lang="scss" module>
  .filter {
    display: flex;
    flex-direction: column;
    user-select: none;

    label:not(:global(.link)) {
      pointer-events: none;
    }

    label + label {
      margin: 10px 0 0;
    }

    input {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  }

  @media (min-width: 768px) {
    .filter {
      flex-direction: row;

      label + label {
        margin: 0 0 0 18px;
      }
    }
  }
</style>
