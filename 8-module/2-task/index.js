import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector('.products-grid__inner');

    this.renderProducts(this.products);
  }

  renderProducts(products) {
    this.inner.innerHTML = '';

    products.forEach(product => {
      const card = new ProductCard(product);
      this.inner.append(card.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filteredProducts = this.products.filter(product => {

      if (this.filters.noNuts) {
        if (product.nuts) return false;
      }

      if (this.filters.vegeterianOnly) {
        if (!product.vegeterian) return false;
      }

      if (this.filters.maxSpiciness !== undefined) {
        if (product.spiciness > this.filters.maxSpiciness) return false;
      }

      if (this.filters.category) {
        if (product.category !== this.filters.category) return false;
      }

      return true;
    });

    this.renderProducts(filteredProducts);
  }
}
