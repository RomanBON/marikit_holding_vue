<template>
  <div class="CatalogPage">
    <Basket />
    <Categories />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { SET_CATEGORIES } from '../store/types/mutations.type';
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_EXCHANGE_RATES,
} from '../store/types/actions.type';
import Categories from '../components/Categories.vue';
import Basket from '../components/Basket.vue';

const FETCH_DELAY = 15 * 1000;

@Component({
  components: {
    Categories,
    Basket,
  },
})
export default class CatalogPage extends Vue {
  interval: number | undefined = undefined;

  mounted () {
    // Dispatch categories
    this.$store.dispatch(GET_CATEGORIES);
    this.$store.subscribe((mutation) => {
      // Dispatch products only after getting categories,
      // because we do name matching
      if (mutation.type === SET_CATEGORIES) {
        this.$store.dispatch(GET_PRODUCTS);
        this.$store.dispatch(GET_EXCHANGE_RATES);

        // Run dispatching products and exchange rates in the background
        this.interval = setInterval(() => {
          this.$store.dispatch(GET_PRODUCTS);
          this.$store.dispatch(GET_EXCHANGE_RATES);
        }, FETCH_DELAY);
      }
    });
  }

  destroyed () {
    clearInterval(this.interval);
  }
}
</script>
<style lang="stylus">
.CatalogPage
  display flex
  flex 1 1
</style>
