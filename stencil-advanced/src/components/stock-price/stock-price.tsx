import { Component, h } from '@stencil/core';
import { environment } from '../../../../environment/environment';

@Component({
  tag: 'stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {

  apiKey = environment.ALPHAVANTAGE_API_KEY;

  onFetchStockPrice(event: Event): void {
    event.preventDefault();
    console.log('submit');
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" type="text" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
}
