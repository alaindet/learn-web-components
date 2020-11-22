import { Component, h } from '@stencil/core';

import { PokemonData } from './models/pokemon-data.interface';
import { checkHttpStatus } from './middleware/check-http-status.middleware';
import { mapToJson } from './middleware/map-to-json.middleware';

@Component({
  tag: 'poke-search',
  styleUrl: './poke-search.css',
  shadow: true,
})
export class PokeSearch {

  pokemon: PokemonData;

  onFetchPokemonData(event: Event): void {
    event.preventDefault();
    const pokemon = 'ditto'; // TODO
    const baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
    const url = `${baseUrl}/${pokemon}`;
    fetch(url)
      .then(checkHttpStatus)
      .then(mapToJson)
      .then((response: Promise<any>): void => {
        console.log(response);
      })
      .catch((error: Response): void => {
        console.error(error);
      });
  }

  render() {
    return [
      <form onSubmit={this.onFetchPokemonData}>
        <input id="stock-symbol" type="text" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
}
