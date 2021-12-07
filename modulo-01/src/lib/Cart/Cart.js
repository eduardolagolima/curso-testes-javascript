import remove from 'lodash/remove';
import find from 'lodash/find';
import Dinero from 'dinero.js';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => (
      acc.add(Money({ amount: item.quantity * item.product.price }))
    ), Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal().getAmount();
    const { items } = this;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}

export { Cart };
