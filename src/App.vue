<template>
  <div id="app">
    <CatalogPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatalogPage from './pages/CatalogPage.vue';

@Component({
  components: {
    CatalogPage,
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
@import './styles/variables.styl'
@import './styles/table.styl'
@import './styles/button.styl'

body
  margin 0
  background-color $main-bg-color
  font-family $font-family-base
  font-size $font-size-base
  font-weight normal

#app
  max-width 1180px
  margin 0 auto
</style>
