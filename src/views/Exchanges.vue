<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select label="Основная валюта"
                  item-text="Name"
                  return-object
                  v-model="current_currency"
                  :items="getListCurrency">
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(cur , index) in getListCurrency" :key="index">
        <v-card
            elevation="2"
            :color="current_currency.ID === cur.ID ? 'grey lighten-1' :''"
            class="pa-5"
            @click="current_currency = cur"
        >
          <p>
            {{ cur.Name }}
          </p>
          <p class="pa-0 d-flex align-center">
          <div class="d-flex flex-nowrap justify-space-between">
            <p>
              <span>1 {{ current_currency.CharCode }}</span>
              <v-icon>mdi-arrow-left-right</v-icon>
              <span>  {{ exchange(cur, 'Value') }}  {{ cur.CharCode }}</span>
            </p>
            <p v-if="cur.ID !== current_currency.ID">
              <v-icon dense :color="difference(cur) ? 'green' : 'red' ">{{
                  difference(cur) ? 'mdi-arrow-up' : 'mdi-arrow-down'
                }}
              </v-icon>
              <span :class="difference(cur) ? 'green--text' : 'red--text'  ">{{
                  (exchange(cur, 'Previous') - exchange(cur, 'Value')).toFixed(4).replace('-', '')
                }}</span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Exchanges",
  data() {
    return {
      current_currency: {
        "ID": "1",
        "NumCode": "1111111",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "Previous": 1
      },
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
      'GET_LIST_CURRENCIES',]),


    getListCurrency() {
      let _arr = [{
        "ID": "1",
        "NumCode": "1111111",
        "Name": "Российский рубль",
        "CharCode": "RUB",
        "Nominal": 1,
        "Value": 1,
        "Previous": 1
      }]
      _arr.push(...this.GET_LIST_CURRENCIES)


      return _arr
    }
  },
  mounted() {
    if (!this.GET_LIST_CURRENCIES.length) {
      this.FETCH_LIST_CURRENCIES()
    }
  },
  methods: {
    ...mapActions(['FETCH_LIST_CURRENCIES']),
    difference(cur) {
      return this.exchange(cur, 'Value') > this.exchange(cur, 'Previous')
    },
    exchange(val, key) {
      return (val[key] / this.current_currency[key]).toFixed(4)
    }
  },

}
</script>

<style scoped>

</style>
