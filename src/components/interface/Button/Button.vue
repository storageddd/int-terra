<template>
  <button :class="classes" v-on="$listeners">
    <slot />
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'IvButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    hasIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        [this.$style.button]: true,
        [this.$style['has-icon']]: this.hasIcon
      }
    }
  }
}
</script>

<style lang="scss" module>
  .button {
    position: relative;
    display: inline-block;
    height: 40px;
    padding: 0 15px;
    background-color: var(--color-background-primary);
    border: none;
    border-radius: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: var(--font-size-m);
    line-height: var(--font-height-m);
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
    user-select: none;
    transition: box-shadow 0.15s ease-in-out;

    > * {
      margin-right: 3px;
    }

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:active {
      background-color: var(--color-background-secondary);
    }
  }

  @media (max-width: 767px) {
    .has-icon {
      width: 40px;
      overflow: hidden;
      color: transparent;

      i {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }
    }
  }
</style>
