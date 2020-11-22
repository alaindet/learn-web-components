import { PokemonUrl } from './pokemon-common.interface';
import { PokemonAbility } from './pokemon-ability.interface';
import { PokemonForm } from './pokemon-form.interface';
import { PokemonGameIndex } from './pokemon-game-index.interface';
import { PokemonHeldItem } from './pokemon-held-item.interface';
import { PokemonMove } from './pokemon-move.interface';
import { PokemonSpecies } from './pokemon-species.interface';
import { PokemonSprites } from './pokemon-sprites.interface';
import { PokemonStat } from './pokemon-stat.interface';
import { PokemonType } from './pokemon-type.interface';

export interface PokemonData {
  abilities: PokemonAbility[];
  baseExperience: number;
  forms: PokemonForm[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: PokemonUrl;
  moves: PokemonMove[];
  name: string;
  order: number;
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}
