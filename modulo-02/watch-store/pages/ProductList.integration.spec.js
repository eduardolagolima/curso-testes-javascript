import Vue from 'vue'
import { mount } from '@vue/test-utils'
import axios from 'axios'

import ProductList from '@/pages/index'
import ProductCard from '@/components/ProductCard'
import Search from '@/components/Search'
import { makeServer } from '@/miragejs/server'

const INITIAL_QUANTITY = 10

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('ProductList - integration', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
    jest.clearAllMocks()
  })

  const getProducts = (quantity, overrides) => {
    let overrideList = []

    if (overrides.length > 0) {
      overrideList = overrides.map((override) =>
        server.create('product', override)
      )
    }

    return [...server.createList('product', quantity), ...overrideList]
  }

  const mountProductList = async (
    quantity = INITIAL_QUANTITY,
    overrides = [],
    shouldReject = false
  ) => {
    const products = getProducts(quantity, overrides)

    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('error')))
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: { products } }))
    }

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    await Vue.nextTick()

    return { wrapper }
  }

  it('should mount the component', async () => {
    // Arrange
    const { wrapper } = await mountProductList()

    // Assert
    expect(wrapper.vm).toBeDefined()
  })

  it('should mount the Search component', async () => {
    // Arrange
    const { wrapper } = await mountProductList()

    // Assert
    expect(wrapper.findComponent(Search)).toBeDefined()
  })

  it('should call axios.get on component mount', async () => {
    const EXPECTED_CALLED_TIMES = 1
    const EXPECTED_CALLED_ENDPOINT = '/api/products'

    // Arrange
    await mountProductList()

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(EXPECTED_CALLED_TIMES)
    expect(axios.get).toHaveBeenCalledWith(EXPECTED_CALLED_ENDPOINT)
  })

  it(`should mount the ProductCart ${INITIAL_QUANTITY} times`, async () => {
    // Arrange
    const { wrapper } = await mountProductList()

    // Act
    const cards = wrapper.findAllComponents(ProductCard)

    // Assert
    expect(cards).toHaveLength(INITIAL_QUANTITY)
  })

  it('should display the error message when Promise rejects', async () => {
    const EXPECTED_ERROR_MESSAGE = 'Problemas ao carregar a lista!'

    // Arrange
    const { wrapper } = await mountProductList(INITIAL_QUANTITY, [], true)

    // Assert
    expect(wrapper.text()).toContain(EXPECTED_ERROR_MESSAGE)
  })

  it('should filter the product list when a search is performed', async () => {
    const EXPECTED_QUANTITY_AFTER_FILTER = 2
    const FILLED_SEARCH_TERM = 'relógio'

    // Arrange
    const { wrapper } = await mountProductList(INITIAL_QUANTITY, [
      { title: 'Meu relógio amado' },
      { title: 'Meu outro relógio estimado' },
    ])

    // Act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(FILLED_SEARCH_TERM)
    await search.find('form').trigger('submit')

    // Assert
    const cards = wrapper.findAllComponents(ProductCard)
    expect(wrapper.vm.searchTerm).toEqual(FILLED_SEARCH_TERM)
    expect(cards).toHaveLength(EXPECTED_QUANTITY_AFTER_FILTER)
  })

  it('should return all products when when a empty search is performed', async () => {
    const EXPECTED_QUANTITY_AFTER_FILTER = 11
    const FILLED_SEARCH_TERM = 'relógio'
    const EMPTY_SEARCH_TERM = ''

    // Arrange
    const { wrapper } = await mountProductList(INITIAL_QUANTITY, [
      { title: 'Meu relógio amado' },
    ])

    // Act
    const search = wrapper.findComponent(Search)
    search.find('input[type="search"]').setValue(FILLED_SEARCH_TERM)
    await search.find('form').trigger('submit')
    search.find('input[type="search"]').setValue(EMPTY_SEARCH_TERM)
    await search.find('form').trigger('submit')

    // Assert
    const cards = wrapper.findAllComponents(ProductCard)
    expect(wrapper.vm.searchTerm).toEqual(EMPTY_SEARCH_TERM)
    expect(cards).toHaveLength(EXPECTED_QUANTITY_AFTER_FILTER)
  })
})
