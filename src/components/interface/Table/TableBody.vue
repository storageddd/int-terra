<template>
  <tbody v-on="$listeners">
    <slot />
  </tbody>
</template>

<script>
export default {
  name: 'IvTableBody'
}
</script>
