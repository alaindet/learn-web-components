import { Component, State, Element, Method, h, Prop, Watch, Listen } from '@stencil/core';

import { PokemonData } from '../../models/pokemon-data.interface';
import { PokemonStat } from '../../models/pokemon-stat.interface';
import { checkHttpStatus } from '../../middleware/check-http-status.middleware';
import { mapToJson } from '../../middleware/map-to-json.middleware';
import { capitalize } from '../../functions/capitalize.function';

@Component({
  tag: 'poke-search',
  styleUrl: './poke-search.css',
  shadow: true,
})
export class PokeSearch {

  @Prop({ attribute: 'pokemon', reflect: true, mutable: true })
  pokemonName: string;

  @Watch('pokemonName')
  pokemonNameChanged(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      this.fetchPokemon(newValue);
    }
  }

  @Element() el: HTMLElement;
  @State() loading = false;
  @State() error: string;
  @State() pokemon: PokemonData | null = null;
  @State() pokemonNameValid = true;

  private pokemonNameRef: HTMLInputElement;
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Lifecycle hook
  componentWillLoad(): void {
    console.log('componentWillLoad');
  }

  // Lifecycle hook
  componentDidLoad(): void {
    if (this.pokemonName) {
      this.fetchPokemon(this.pokemonName);
    }
  }

  // Lifecycle hook
  componentWillUpdate(): void {
    console.log('componentWillUpdate');
  }

  // Lifecycle hook
  componentDidUpdate(): void {
    console.log('componentDidUpdate');
  }

  // Lifecycle hook
  disconnectedCallback(): void {
    console.log('disconnectedCallback');
  }

  // From external <body> event
  @Listen('selectedPokemonName', { target: 'body' })
  onBodySelectedPokemonName(event: CustomEvent): void {
    const pokemonName = event.detail;
    if (pokemonName !== this.pokemonNameRef.value) {
      this.pokemonNameRef.value = pokemonName;
      this.fetchPokemon(pokemonName);
    }
  }

  @Method()
  async focusInput(): Promise<void> {
    this.pokemonNameRef.focus();
  }

  onFetchPokemon(event: Event): void {
    event.preventDefault();
    this.pokemonName = this.pokemonNameRef.value;
  }

  onPokemonNameChange(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this.pokemonNameValid = true;
    if (value.trim().length === 0) {
      this.pokemonNameValid = false;
    }
    this.pokemonName = value;
  }

  onPokemonCancel(event: MouseEvent): void {
    event.preventDefault();
    this.pokemon = null;
    this.pokemonNameRef.value = '';
    this.pokemonNameRef.focus();
  }

  private fetchPokemon(rawName: string): void {
    this.loading = true;
    const name = rawName.toLowerCase().replace(' ', '-')
    const url = `${this.baseUrl}/${name}`;
    fetch(url)
      .then(this.onFetchPokemonNotFound.bind(this))
      .then(checkHttpStatus)
      .then(mapToJson)
      .then(this.onFetchPokemonSuccess.bind(this))
      .catch(this.onFetchPokemonFailure.bind(this));
  }

  private onFetchPokemonNotFound(response: any): Promise<any> {
    if (response.status === 404) {
      this.error = 'Pokémon not found';
      throw new Error('ERROR: Pokémon not found');
    }
    return response;
  }

  private onFetchPokemonSuccess(response: PokemonData): void {
    this.pokemon = response;
    this.error = null;
    this.loading = false;
  }

  private onFetchPokemonFailure(error: Response): void {
    console.error(error);
    if (!this.error) {
      this.error = 'Some error occurred';
    }
    this.loading = false;
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
          <a class="cancel" onClick={this.onPokemonCancel.bind(this)}>
            Cancel
          </a>
        </h2>
        <ul>
          <li>
            <strong>Height:</strong>
            {this.pokemon.height / 10} m
          </li>
          <li>
            <strong>Weight:</strong>
            {this.pokemon.weight / 10} kg
          </li>
          <li>
            <strong>Stats:</strong>
            <ul>
              {this.pokemon.stats.map(
                (stat: PokemonStat, i: number) => (
                  <li key={i}>
                    <strong>{stat.stat.name}:</strong>
                    {stat.base_stat}
                  </li>
                )
              )}
            </ul>
          </li>
        </ul>
        <img src={imageSrc} alt={this.pokemon.name} />
      </div>
    );
  }

  render() {
    return [
      <form onSubmit={this.onFetchPokemon.bind(this)}>
        <input
          id="pokemon-name"
          type="text"
          placeholder="Search..."
          class={this.pokemonNameValid ? '' : 'error'}
          ref={el => this.pokemonNameRef = el}
          value={this.pokemonName}
          onChange={this.onPokemonNameChange.bind(this)}
        />
        <button
          type="submit"
          disabled={!this.pokemonNameValid}
        >
          Fetch
        </button>
      </form>,
      this.getPokemonContent(),
    ];
  }
}
