import { PokemonDiscoverableItem } from './pokemon-common.interface';

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonDiscoverableItem;
}
