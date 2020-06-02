<template>
  <header :class="$style.header">
    <a href="https://vuejs.org/" target="_blank" title="Сделано на VueJS" :class="$style.logo">
      <img src="../../assets/logo.png" alt="VueJS">
    </a>
    <nav>
      <router-link to="/" class="text-l">Главная</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'iv-header'
}
</script>

<style lang="scss" module>
  .header {
    display: flex;
    height: 60px;
    padding: 0 20px;
    background-color: var(--color-background-dark-01);
    align-items: center;
    transition: height, padding 0.15s ease-in-out;
    z-index: 9000;

    a {
      color: var(--color-text-secondary);
    }
  }

  .logo {
    height: 40px;
    margin-right: 15px;
    transition: margin 0.15s ease-in-out;

    img {
      max-height: 100%;
    }
  }

  @media (min-width: 1024px) {
    .header {
      height: 80px;
      padding: 0 80px;
    }

    .logo {
      height: 60px;
      margin-right: 20px;
    }
  }
</style>
