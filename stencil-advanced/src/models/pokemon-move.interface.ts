import { PokemonDiscoverableItem } from './pokemon-common.interface';

export interface PokemonMove {
  move: PokemonDiscoverableItem;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: PokemonDiscoverableItem;
    version_group: PokemonDiscoverableItem;
  }[];
}
