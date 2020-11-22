import { PokemonUrl } from './pokemon-common.interface';

export interface PokemonSprites {
  back_default: PokemonUrl;
  back_female: PokemonUrl;
  back_shiny: PokemonUrl;
  back_shiny_female: PokemonUrl | null;
  front_default: PokemonUrl;
  front_female: PokemonUrl | null;
  front_shiny: PokemonUrl;
  front_shiny_female: PokemonUrl | null;
  other: {
    dream_world: {
      front_default: PokemonUrl;
      front_female: PokemonUrl | null;
    };
    'official-artwork': {
      front_default: PokemonUrl;
    };
  };
  versions: {
    [generation: string]: {
      icons?: {
        front_default: PokemonUrl;
        front_female: PokemonUrl | null;
      };
      [game: string]: {
        back_default?: PokemonUrl;
        back_female?: PokemonUrl;
        back_shiny?: PokemonUrl;
        back_shiny_female?: PokemonUrl;
        front_default?: PokemonUrl;
        front_female?: PokemonUrl | null;
        front_shiny?: PokemonUrl;
        front_shiny_female?: PokemonUrl | null;
      };
    };
  };
}
