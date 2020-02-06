<template>
  <div
    class="ProductCard"
    :class="{ '_collapsed': isCollapsed }"
  >
    <div
      class="ProductCard__title"
      @click="toggleCollapsibleContent()"
    >
      {{ category.name }}
    </div>

    <div class="ProductCard__content">
      <table class="Table__table">
        <thead class="Table__thead">
          <tr class="Table__tr">
            <th
              class="Table__th"
              v-for="column in columns"
              :key="column.key"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>

        <tbody class="Table__tbody">
          <tr
            class="Table__tr"
            v-for="product in products"
            :key="product.id"
          >
            <td class="Table__td">
              {{ product.name }}
            </td>
            <td class="Table__td">
              {{ product.available - getQuantityFromBasketById(product.id) }}
            </td>
            <td class="Table__td">
              {{ getFormattedPrice(product.price) }}
            </td>
            <td class="Table__td">
              <button
                :disabled="isDisabledAddButton(product.id, product.available)"
                @click="addToBasket(product)"
                class="Button _primary"
              >
                Добавить
              </button>
              <button
                v-if="isShowDeleteButton(product.id)"
                @click="removeFromBasket(product.id)"
                class="Button _danger"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="Table__table-placeholder"
        v-if="!products.length"
      >
        <div class="Table__table-empty">
          Нет товаров в категории
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../store/types/mutations.type';

interface ICatalog {
  category?: ICategory;
}

@Component({
  props: ['category'],
  computed: mapGetters([
    'isDisabledAddButton',
    'isShowDeleteButton',
    'getFormattedPrice',
    'getQuantityFromBasketById',
  ]),
})
export default class ProductCard extends Vue<ICatalog> {
  isCollapsed: boolean = false;
  columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Доступно',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

  get products () {
    if (!this.category) {
      return [];
    }

    return this.$store.getters.getProductsByCategoryId(this.category.id);
  }

  toggleCollapsibleContent () {
    this.isCollapsed = !this.isCollapsed;
  }

  addToBasket (product: IProduct) {
    this.$store.commit(ADD_TO_BASKET, product);
  }

  removeFromBasket (id: number) {
    this.$store.commit(REMOVE_FROM_BASKET, id);
  }
}
</script>
<style lang="stylus">
@import '../styles/variables.styl'

.ProductCard
  border-bottom 1px solid $true-black-color
  overflow hidden

  &__title,
  &__content
    padding 10px

  &__title
    padding 10px
    font-size 22px
    font-weight 700
    cursor pointer

    &:before
      content '>'
      margin-right 10px
      display inline-block
      transform rotate(90deg)

  &._collapsed
    & ^[0]__content
      height 0
      padding 0

    & ^[0]__title
      &:before
        transform rotate(0)
</style>
