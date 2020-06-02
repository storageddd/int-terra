<template>
  <div :class="$style.container">
    <iv-header />
    <main role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import IvHeader from '@/components/layout/Header';
export default {
  name: 'DefaultLayout',
  components: {
    IvHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" module>
  .container {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-secondary);

    > main {
      flex: 1;
      padding: 23px 20px;
      background-color: var(--color-background-primary);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      transition: padding 0.15s ease-in-out;
    }
  }

  @media (min-width: 1024px) {
    .container {
      > main {
        margin: 0 80px;
        padding: 23px 30px;
      }
    }
  }
</style>
