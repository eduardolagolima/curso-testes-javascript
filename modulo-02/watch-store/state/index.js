import Vue from 'vue'

const cartState = Vue.observable({
  open: false,
  items: [],
})

export { cartState }
