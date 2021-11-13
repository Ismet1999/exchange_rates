<template>
  <div>
    <v-row>
      <v-col cols="1">
        <v-card class="pa-6">
          <v-select
              dense
              solo
              label=""
                    item-text="Name"
                    return-object
                    v-model="left_currency"
                    :items="getListCurrency">
          </v-select>
        </v-card>

</v-col>

<v-col cols="1">
        <v-card class="pa-6">
          <v-select
              dense
              solo
              label=""
                    item-text="Name"
                    return-object
                    v-model="right_currency"
                    :items="getListCurrency">
          </v-select>
        </v-card>
      </v-col>
    </v-row>


  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Converter",
  data() {
    return {
      left_currency: {},
      right_currency :{}
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

}
</script>

<style scoped>

</style>
