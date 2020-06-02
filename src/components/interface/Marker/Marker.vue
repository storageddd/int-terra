<template>
  <span :class="classes"></span>
</template>

<script>
import { Variants } from './const';

export default {
  name: 'IvMarker',
  props: {
    variant: {
      type: String,
      default: 'waiting',
      validator: value => {
        const available = Object.values(Variants);
        return value.match(new RegExp(`(${available.join('|')})`));
      }
    }
  },
  computed: {
    classes() {
      return {
        [this.$style.marker]: true,
        [this.$style.waiting]: this.variant === 'waiting',
        [this.$style.success]: this.variant === 'success',
        [this.$style.warning]: this.variant === 'warning',
        [this.$style.error]: this.variant === 'error'
      }
    }
  }
}
</script>

<style lang="scss" module>
  .marker {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 10px;
    top: -1px;
    border-radius: 5px;
    vertical-align: middle;
  }

  .success {
    background-color: var(--color-feedback-success);
  }

  .warning {
    background-color: var(--color-feedback-warning);
  }

  .error {
    background-color: var(--color-feedback-error);
  }

  .waiting {
    background-color: var(--color-feedback-waiting);
  }
</style>
