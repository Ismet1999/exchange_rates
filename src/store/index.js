import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listCurrencies: []
        ,
        listCurrenciesToday:{},
        listCurrenciesPrev:{}
    },
    mutations: {
        SET_LIST_CURRENCIES(state, payload) {
            let _arr = []
            for (const key in payload.Valute) {
                _arr.push(payload?.Valute[key])
            }
            state.listCurrencies = _arr
        },

        SET_LIST_CURRENCIES_TODAY(state, payload) {
            let obj = {}
            for (const key in payload.Valute) {
                obj[key] = payload?.Valute[key].Value
            }
            state.listCurrenciesToday = {
                base:"RUB",
                rates:obj
            }
        },
        SET_LIST_CURRENCIES_PREV(state, payload) {
            let obj = {}
            for (const key in payload.Valute) {
                obj[key] = payload?.Valute[key].Previous
            }
            state.listCurrenciesPrev = {
                base:"RUB",
                rates:obj
            }
        },
    },
    actions: {
        FETCH_LIST_CURRENCIES({commit}) {
            return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
                .then(response => response.json())
                .then(json => {
                    commit('SET_LIST_CURRENCIES', json)
                    commit('SET_LIST_CURRENCIES_TODAY' , json)
                    commit('SET_LIST_CURRENCIES_PREV' , json)
                })
        }
    },
    getters: {
        GET_LIST_CURRENCIES: state => {
            return state.listCurrencies
        },
        GET_LIST_CURRENCIES_TODAY: state => {
            return state.listCurrenciesToday
        },
        GET_LIST_CURRENCIES_PREV: state => {
            return state.listCurrenciesPrev
        }
    },
    modules: {}
})
