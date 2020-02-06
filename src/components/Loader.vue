<template>
  <div class="Loader">
    <img
      class="Loader__img"
      src="../assets/spinner.svg"
      alt="spinner"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Loader extends Vue {}
</script>
<style lang="stylus">
.Loader
  display flex
  align-items center
  justify-content center

.Loader__img
  width 100px
  height 100px
</style>
