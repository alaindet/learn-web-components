import { PokemonDiscoverableItem } from './pokemon-common.interface';

export interface PokemonHeldItem {
  item: PokemonDiscoverableItem;
  version_details: {
    rarity: number;
    version: PokemonDiscoverableItem;
  }[];
}
