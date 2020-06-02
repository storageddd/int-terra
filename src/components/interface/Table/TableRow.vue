<template>
  <tr v-on="$listeners">
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'IvTableRow'
}
</script>
