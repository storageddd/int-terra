<template>
  <transition name="fade">
    <div v-if="active" :class="$style.overlay">
      <div :class="$style.loader"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'IvLoading',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-background-neutral);
    opacity: 0.6;
  }

  .loader {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: var(--color-background-dark-02);
    text-indent: -9999em;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;

    &,
    &::before,
    &::after {
      background: var(--color-background-dark-02);
      animation: load1 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
      content: '';
    }
    &::before {
      left: -1.5em;
      animation-delay: -0.32s;
    }
    &::after {
      left: 1.5em;
    }
  }

  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }

  :global(.fade-enter-active),
  :global(.fade-leave-active) {
    transition: opacity .15s;
  }

  :global(.fade-enter),
  :global(.fade-leave-to) {
    opacity: 0;
  }
</style>
