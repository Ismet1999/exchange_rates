<template>
  <div>
    <div class="my-4">
      <h3 class="ml-2"> Конвертер</h3>
    </div>
    <div class="d-flex">

      <div>
        <v-card class="pa-3 d-flex  justify-space-between">
          <v-select
              single-line
              solo
              label=""
              item-text="CharCode"
              return-object
              v-model="left_currency"
              :items="getListCurrency"
              @input="convert"
              class="mr-8">
          </v-select>
          <v-text-field label="" @input="convert" v-model="left_value"
                        type="number"></v-text-field>
        </v-card>
      </div>
      <div class="d-flex align-center">
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="grey"
            @click="toggleCurrency"
        >
          <v-icon dark>
            mdi-arrow-left-right
          </v-icon>
        </v-btn>
      </div>


      <div>
        <v-card class="pa-3 d-flex  justify-space-between">
          <v-select
              single-line
              solo
              label=""
              item-text="CharCode"
              return-object
              v-model="right_currency"
              :items="getListCurrency"
              @input="convert"
              class="mr-8">
          </v-select>
          <v-text-field disabled label="" v-model="right_value"></v-text-field>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
const rub = {
  "ID": "1",
  "NumCode": "1111111",
  "Name": "Российский рубль",
  "CharCode": "RUB",
  "Nominal": 1,
  "Value": 1,
  "Previous": 1
}

export default {
  name: "Converter",
  data() {
    return {
      left_currency: rub,
      left_value: 0,
      right_currency: rub,
      right_value: 0,
    }
  },

  computed: {
    ...mapGetters(['GET_LIST_CURRENCIES',]),
    getListCurrency() {
      let _arr = [rub]
      _arr.push(...this.GET_LIST_CURRENCIES)
      return _arr
    },
    getCoefficient() {
      return this.left_currency.Value / this.right_currency.Value
    }
  },

  async mounted() {
    if (!this.GET_LIST_CURRENCIES.length) {
      await this.FETCH_LIST_CURRENCIES()
    }
  },
  methods: {
    ...mapActions(['FETCH_LIST_CURRENCIES']),

    convert() {
      let val = (this.left_value || 0) * this.getCoefficient
      this.right_value = val.toFixed(2)/1
    }
    ,
    toggleCurrency() {
      let _left = this.left_currency
      let _right = this.right_currency
      this.left_currency = _right
      this.right_currency = _left
      this.convert()


    }
  }
}
</script>
<style scoped>
</style>
