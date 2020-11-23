import { Component, State, Event, EventEmitter, h } from '@stencil/core';

import { checkHttpStatus } from '../../middleware/check-http-status.middleware';
import { mapToJson } from '../../middleware/map-to-json.middleware';
import { PokemonPokedex } from '../../models/pokemon-pokedex.interface';

@Component({
  tag: 'poke-list',
  styleUrl: './poke-list.css',
  shadow: true,
})
export class PokeList {

  @State() pokedexId = '8';
  @State() loading = false;
  @State() error: string;
  @State() pokedex: PokemonPokedex;
  @State() pokemonName: string;

  @Event() selectedPokemonName: EventEmitter<string>;

  private baseUrl = 'https://pokeapi.co/api/v2/pokedex';

  onFetchPokedex(event: MouseEvent): void {
    event.preventDefault();
    this.error = null;
    this.pokemonName = null;
    this.fetchPokedex(+this.pokedexId);
  }

  onSelectPokemon(name: string): void {
    this.pokemonName = name;
    this.selectedPokemonName.emit(name);
  }

  onCancelPokemon(): void {
    this.pokemonName = null;
    this.selectedPokemonName.emit(null);
  }

  private fetchPokedex(pokedexId: number | string): void {
    this.loading = true;
    const url = `${this.baseUrl}/${pokedexId}`;
    fetch(url)
      .then(this.onFetchPokedexNotFound.bind(this))
      .then(checkHttpStatus)
      .then(mapToJson)
      .then(this.onFetchPokedexSuccess.bind(this))
      .catch(this.onFetchPokedexFailure.bind(this));
  }

  private onFetchPokedexNotFound(response: any): Promise<any> {
    if (response.status === 404) {
      this.error = 'Pokédex not found';
      throw new Error('ERROR: Pokédex not found');
    }
    return response;
  }

  private onFetchPokedexSuccess(response: PokemonPokedex): void {
    this.pokedex = response;
    this.error = null;
    this.loading = false;
  }

  private onFetchPokedexFailure(): void {
    if (!this.error) {
      this.error = 'Some error occurred';
    }
    this.loading = false;
  }

  private renderPokemonName() {

    if (!this.pokemonName) {
      return null;
    }

    return (
      <p class="selected-pokemon">
        <strong>{this.pokemonName}</strong>
        &nbsp;
        <a class="cancel" onClick={() => this.onCancelPokemon()}>Cancel</a>
      </p>
    );
  }

  private renderPokedex() {

    if (this.loading) {
      return <p>Loading...</p>;
    }

    if (this.error) {
      return <p>{this.error}</p>;
    }

    if (!this.pokedex) {
      return <p>Click to fetch data</p>;
    }

    return (
      <ul>
        {this.pokedex.pokemon_entries.map((pokemon: any) => (
          <li
            key={pokemon.pokemon_species.name}
            onClick={() => this.onSelectPokemon(pokemon.pokemon_species.name)}
            class={pokemon.pokemon_species.name === this.pokemonName ? 'active' : ''}
          >
            {pokemon.pokemon_species.name}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return [
      <button onClick={this.onFetchPokedex.bind(this)}>Fetch pokedex</button>,
      this.renderPokemonName(),
      this.renderPokedex(),
    ];
  }
}
