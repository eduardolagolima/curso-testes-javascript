import remove from 'lodash/remove';
import find from 'lodash/find';
import Dinero from 'dinero.js';

import { calculateDiscount } from '../discount/discount';

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
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });
      let discount = Money({ amount: 0 });

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const formattedTotal = total.toFormat('$0,0.00');
    const { items } = this;

    return {
      total: total.getAmount(),
      formattedTotal,
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
