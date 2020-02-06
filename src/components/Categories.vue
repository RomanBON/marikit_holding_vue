<template>
  <main class="Categories">
    <h2>Категории с товарами</h2>
    <Loader v-if="!products.length" />
    <ProductCard
      v-for="category in categories"
      v-bind:key="category.id"
      :category="category"
    />
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import ProductCard from './ProductCard.vue';
import Loader from './Loader.vue';

@Component({
  components: {
    ProductCard,
    Loader,
  },
  computed: mapGetters([
    'categories',
    'products',
  ]),
})
export default class Categories extends Vue {}
</script>
<style lang="stylus">
.Categories
  flex 1 1
</style>
