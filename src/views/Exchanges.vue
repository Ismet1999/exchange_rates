<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select label="Основная валюта"
                  item-text="Name"
                  return-object
                  v-model="current_currency"
                  :items="GET_LIST_CURRENCIES">

        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(cur , index) in GET_LIST_CURRENCIES" :key="index">
        <v-card
            elevation="2"
            class="pa-5"
        >
          <p>
            {{ cur.Name }}
          </p>
          <p>
            <v-icon>mdi-arrow-left-right</v-icon>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import _fx from '@/utils/money'

const fx = (v) => {
  _fx.base = v.base
  _fx.rates = v.rates
  return _fx
}

export default {
  name: "Exchanges",
  data() {
    return {
      current_currency: null,
      currency: [
        {
          id: 1,
          name: 'RU',
          label: 'Рубли'
        },
        {
          id: 2,
          name: 'EV',
          label: 'Евро'
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'GET_LIST_CURRENCIES',
      'GET_LIST_CURRENCIES_TODAY',
      'GET_LIST_CURRENCIES_PREV',])
  },
  mounted() {
    this.FETCH_LIST_CURRENCIES()
  },
  methods: {
    ...mapActions(['FETCH_LIST_CURRENCIES']),
    getListExchangeToday() {
      fx()
    },
    getListExchangePrev() {
      fx()
    },
  }
}
</script>

<style scoped>

</style>
