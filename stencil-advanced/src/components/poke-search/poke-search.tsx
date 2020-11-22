import { Component, State, Element, h } from '@stencil/core';

import { PokemonData } from './models/pokemon-data.interface';
import { checkHttpStatus } from './middleware/check-http-status.middleware';
import { mapToJson } from './middleware/map-to-json.middleware';
import { capitalize } from './functions/capitalize.function';

@Component({
  tag: 'poke-search',
  styleUrl: './poke-search.css',
  shadow: true,
})
export class PokeSearch {

  @Element() el: HTMLElement;
  @State() loading = false;
  @State() error: string;
  @State() pokemon: PokemonData | null = null;

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  onFetchPokemonData(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const pokemon = this.getInputElement().value.toLowerCase();
    const url = `${this.baseUrl}/${pokemon}`;
    fetch(url)
      .then(checkHttpStatus)
      .then(mapToJson)
      .then((response: PokemonData): void => {
        this.pokemon = response;
        this.error = null;
        this.loading = false;
      })
      .catch((error: Response): void => {
        console.error(error);
        this.error = 'Some error occurred';
        this.loading = false;
      });
  }

  onPokemonCancel(event: MouseEvent): void {
    event.preventDefault();
    this.pokemon = null;
    const input = this.getInputElement();
    input.value = '';
    input.focus();
  }

  private getInputElement(): HTMLInputElement {
    const input = this.el.shadowRoot.querySelector('#pokemon-name');
    return input as HTMLInputElement;
  }

  private getPokemonContent() {

    if (this.loading) {
      return <p>Loading...</p>;
    }

    if (this.error) {
      return <p>{this.error}</p>
    }

    if (!this.pokemon) {
      return <p>Search a Pokémon by its name</p>;
    }

    const imageSrc = this.pokemon.sprites
      .other['official-artwork'].front_default;

    return (
      <div class="pokemon">
        <h2>
          {capitalize(this.pokemon.name)}
            &nbsp;
          <a
            class="cancel"
            onClick={this.onPokemonCancel.bind(this)}
          >
            Cancel
            </a>
        </h2>
        <ul>
          <li>
            <strong>Base experience</strong>:
              {this.pokemon.base_experience}
          </li>
          <li>
            <strong>Height</strong>:
              {this.pokemon.height} inches
            </li>
          <li>
            <strong>Weight</strong>:
              {this.pokemon.weight} pounds
            </li>
        </ul>
        <img src={imageSrc} alt={this.pokemon.name} />
      </div>
    );
  }

  render() {
    return [
      <form onSubmit={this.onFetchPokemonData.bind(this)}>
        <input
          id="pokemon-name"
          type="text"
          placeholder="Search..."
        />
        <button type="submit">Fetch</button>
      </form>,
      this.getPokemonContent(),
    ];
  }
}
