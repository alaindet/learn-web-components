export interface PokemonPokedex {
  descriptions: any;
  id: number;
  is_main_series: boolean;
  names: any;
  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }[];
}
