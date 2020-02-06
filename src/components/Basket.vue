<template>
  <aside class="Basket">
    <h2>Корзина</h2>

    <div class="Table">
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
            v-for="product in basket"
            :key="product.id"
          >
            <td class="Table__td">
              {{ getCategoryAppropriateProductById(product.categoryId).name + '. ' }}
              {{ product.name }}
            </td>
            <td class="Table__td">
              <div class="Basket__control">
                <input
                  class="Basket__input-quantity"
                  :class="{
                    '_increased': isCurrencyIncreased,
                    '_decreased': !isCurrencyIncreased,
                  }"
                  type="number"
                  min="1"
                  :max="product.available"
                  :value="product.quantity"
                  v-on:input="setQuantity(product, $event)"
                />
                <span class="Basket__input-addon-text"> шт.</span>
              </div>
              <div
                v-if="product.quantity === product.available"
                class="Basket__addon-warning"
              >
                Количество ограничено
              </div>
            </td>
            <td class="Table__td">
              {{ getFormattedPrice(product.price) }}
              <span class="Basket__input-addon-text"> / шт.</span>
            </td>
            <td class="Table__td">
              <button
                class="Button _danger"
                @click="removeFromBasket(product.id)"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot
          class="Table__tfoot"
          v-if="getTotalAmount"
        >
          <tr class="Table__tr">
            <td class="Table__td" colspan="3" />
            <td class="Table__td">
              Общая стоимость: {{ getFormattedTotalAmount }}
            </td>
          </tr>
        </tfoot>
      </table>

      <div
        class="Table__table-placeholder"
        v-if="!basket.length"
      >
        <div class="Table__table-empty">
          Нет товаров в корзине
        </div>
      </div>

    </div>
  </aside>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { REMOVE_FROM_BASKET, SET_QUANTITY } from '../store/types/mutations.type';

@Component({
  computed: mapGetters([
    'basket',
    'isCurrencyIncreased',
    'getTotalAmount',
    'getFormattedTotalAmount',
    'getFormattedPrice',
    'getCategoryAppropriateProductById',
  ]),
})
export default class Basket extends Vue {
  columns = [
    {
      title: 'Наименование товара и описание',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
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

  removeFromBasket (id: number) {
    this.$store.commit(REMOVE_FROM_BASKET, id);
  }

  setQuantity (product: IProduct, event: KeyboardEvent) {
    const newQuantity = parseInt((event.target as HTMLInputElement).value);
    this.$store.commit(SET_QUANTITY, { product, newQuantity });
  }
}
</script>
<style lang="stylus">
@import '../styles/variables.styl'

.Basket
  flex 1 1
  margin-right 20px

  &__input-quantity
    height 30px
    font-size 14px
    text-align center

    &._increased
      border-color $danger-color

    &._decreased
      border-color $green-color

  &__addon-warning
    margin-top 10px
    padding 5px
    border 1px dashed $danger-color
    color $danger-color
</style>
