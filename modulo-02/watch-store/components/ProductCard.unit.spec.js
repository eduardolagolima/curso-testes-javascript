import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard'
import { makeServer } from '@/miragejs/server'
import { CartManager } from '@/managers/CartManager'

const mountProductCard = (server) => {
  const product = server.create('product', {
    title: 'Relógio bonito',
    price: '22.00',
    image:
      'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  })

  const cartManager = new CartManager()

  const wrapper = mount(ProductCard, {
    propsData: {
      product,
    },
    mocks: {
      $cart: cartManager,
    },
  })

  return { wrapper, product, cartManager }
}

describe('ProductCard - unit', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard(server)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mount the component', () => {
    const { wrapper } = mountProductCard(server)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toContain('Relógio bonito')
    expect(wrapper.text()).toContain('22.00')
  })

  it('should open the Cart and add item to CartManager on button click', async () => {
    const { wrapper, cartManager, product } = mountProductCard(server)
    const spy1 = jest.spyOn(cartManager, 'open')
    const spy2 = jest.spyOn(cartManager, 'addProduct')

    await wrapper.find('button').trigger('click')

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledWith(product)
  })
})
