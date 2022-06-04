'use strict';

const cartCounterEl = document.querySelector('.cart-counter');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

cartCounterEl.addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featured-items-wrp')
  .addEventListener('click', (event) => {
    if (!event.target.closest('.add-to-cart-btn')) {
      return;
    }
    const featuredItem = event.target.closest('.featured-item');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id, name, price, count: 0 };
  }
  basket[id].count++;
  cartCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
};

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
  return Object.values(basket)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-productId="${id}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }

  basketRowEl.querySelector('.productCount').textContent = basket[id].count;
  basketRowEl.querySelector('.productTotalRow').textContent = basket[id]
    .count * basket[id].price;
}

function renderNewProductInBasket(productId) {
   const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId]
          .price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
