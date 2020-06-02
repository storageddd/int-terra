<template>
  <div id="app" v-cloak>
    <component :is="layout">
      <router-view />
    </component>
    <iv-loading :active="isLoading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DefaultLayout from '@/layouts/default';
import { IvLoading } from '@/components/interface';

export default {
  name: 'App',
  components: {
    DefaultLayout,
    IvLoading
  },
  data() {
    return {
      layout: ''
    }
  },
  computed: {
    ...mapState('global', ['isLoading'])
  },
  created() {
    this.setLayout();
  },
  methods: {
    setLayout() {
      const availableLayouts = ['default'];
      let currentLayout = this.$route.meta.layout || availableLayouts[0];

      if (!availableLayouts.includes(currentLayout)) {
        currentLayout = availableLayouts[0];
      }
      this.layout = `${currentLayout}-layout`;
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/styles/index";
</style>
