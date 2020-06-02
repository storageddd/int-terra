<template>
  <i :class="$style.icon" v-on="$listeners">
    <component :is="fullName"></component>
  </i>
</template>

<script>
import AddIcon from './Icons/AddIcon';

export default {
  name: 'IvIcon',
  components: {
    AddIcon
  },
  props: {
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    fullName() {
      return `${this.name}Icon`;
    }
  }
}
</script>

<style lang="scss" module>
  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    overflow: hidden;
    vertical-align: middle;
  }
</style>
