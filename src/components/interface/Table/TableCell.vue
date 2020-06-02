<template>
  <td v-on="$listeners">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'IvTableCell'
}
</script>
