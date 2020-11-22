import { PokemonDiscoverableItem } from './pokemon-common.interface';

export interface PokemonAbility {
  ability: PokemonDiscoverableItem;
  is_hidden: boolean;
  slot: number;
}
