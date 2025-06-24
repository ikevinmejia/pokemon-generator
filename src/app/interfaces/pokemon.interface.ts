export enum PokemonTypeEnum {
  normal = 1,
  lucha = 2,
  volador = 3,
  veneno = 4,
  tierra = 5,
  roca = 6,
  bicho = 7,
  fantasma	 = 8,
  acero = 9,
  fuego = 10,
  agua = 11,
  planta = 12,
  electrico = 13,
  psiquico = 14,
  hielo = 15,
  dragon = 16,
  siniestro = 17,
  hada = 18,
}
export enum PokemonTypeSpriteEnum {
  normal = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/99/latest/20221208180705/Tipo_normal_EP.png/80px-Tipo_normal_EP.png',
  lucha = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/4f/latest/20221208180706/Tipo_lucha_EP.png/80px-Tipo_lucha_EP.png',
  volador = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/0f/latest/20221208180706/Tipo_volador_EP.png/80px-Tipo_volador_EP.png',
  veneno = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/2/2f/latest/20221208180706/Tipo_veneno_EP.png/80px-Tipo_veneno_EP.png',
  tierra = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/3f/latest/20221208180706/Tipo_tierra_EP.png/80px-Tipo_tierra_EP.png',
  roca = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/1f/latest/20221208180706/Tipo_roca_EP.png/80px-Tipo_roca_EP.png',
  bicho = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6f/latest/20221208180706/Tipo_bicho_EP.png/80px-Tipo_bicho_EP.png',
  fantasma	 = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/7f/latest/20221208180706/Tipo_fantasma_EP.png/80px-Tipo_fantasma_EP.png',
  acero = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/52/latest/20221208180543/Tipo_acero_EP.png/80px-Tipo_acero_EP.png',
  fuego = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/59/latest/20221208180426/Tipo_fuego_EP.png/80px-Tipo_fuego_EP.png',
  agua = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/59/latest/20221208180426/Tipo_agua_EP.png/80px-Tipo_agua_EP.png',
  planta = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/4f/latest/20221208180426/Tipo_planta_EP.png/80px-Tipo_planta_EP.png',
  electrico = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/38/latest/20221208180452/Tipo_el%C3%A9ctrico_EP.png/80px-Tipo_el%C3%A9ctrico_EP.png',
  psiquico = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9b/latest/20221208180717/Tipo_ps%C3%ADquico_EP.png/80px-Tipo_ps%C3%ADquico_EP.png',
  hielo = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/1f/latest/20221208180426/Tipo_hielo_EP.png/80px-Tipo_hielo_EP.png',
  dragon = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/b/b8/latest/20221208180443/Tipo_drag%C3%B3n_EP.png/80px-Tipo_drag%C3%B3n_EP.png',
  siniestro = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/7f/latest/20221208180426/Tipo_siniestro_EP.png/80px-Tipo_siniestro_EP.png',
  hada = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6f/latest/20221208180426/Tipo_hada_EP.png/80px-Tipo_hada_EP.png',
}

export interface Pokemon {
  abilities:                Ability[];
  base_experience:          number;
  cries:                    Cries;
  forms:                    Species[];
  game_indices:             GameIndex[];
  height:                   number;
  held_items:               any[];
  id:                       number;
  is_default:               boolean;
  location_area_encounters: string;
  moves:                    Move[];
  name:                     string;
  order:                    number;
  past_abilities:           PastAbility[];
  past_types:               any[];
  species:                  Species;
  sprites:                  Sprites;
  stats:                    Stat[];
  types:                    Type[];
  weight:                   number;
}

export interface Ability {
  ability:   Species | null;
  is_hidden: boolean;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version:    Species;
}

export interface Move {
  move:                  Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at:  number;
  move_learn_method: Species;
  order:             number | null;
  version_group:     Species;
}

export interface PastAbility {
  abilities:  Ability[];
  generation: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl":        Sprites;
  "heartgold-soulsilver": Sprites;
  platinum:               Sprites;
}

export interface Versions {
  "generation-i":    GenerationI;
  "generation-ii":   GenerationIi;
  "generation-iii":  GenerationIii;
  "generation-iv":   GenerationIv;
  "generation-v":    GenerationV;
  "generation-vi":   { [key: string]: Home };
  "generation-vii":  GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Other {
  dream_world:        DreamWorld;
  home:               Home;
  "official-artwork": OfficialArtwork;
  showdown:           Sprites;
}

export interface Sprites {
  back_default:       string;
  back_female:        null;
  back_shiny:         string;
  back_shiny_female:  null;
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
  other:             Other;
  versions?:          Versions;
  animated?:          Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow:     RedBlue;
}

export interface RedBlue {
  back_default:      string;
  back_gray:         string;
  back_transparent:  string;
  front_default:     string;
  front_gray:        string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold:    Gold;
  silver:  Gold;
}

export interface Crystal {
  back_default:            string;
  back_shiny:              string;
  back_shiny_transparent:  string;
  back_transparent:        string;
  front_default:           string;
  front_shiny:             string;
  front_shiny_transparent: string;
  front_transparent:       string;
}

export interface Gold {
  back_default:       string;
  back_shiny:         string;
  front_default:      string;
  front_shiny:        string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald:             OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny:   string;
}

export interface Home {
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons:                  DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female:  null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort:    number;
  stat:      Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface PokemonGenerated {
  name: string;
  imgUrl: string;
}

export interface PokemonSpecies {
  base_happiness:         number;
  capture_rate:           number;
  color:                  Color;
  egg_groups:             Color[];
  evolution_chain:        EvolutionChainUrl;
  evolves_from_species:   null;
  flavor_text_entries:    FlavorTextEntry[];
  form_descriptions:      any[];
  forms_switchable:       boolean;
  gender_rate:            number;
  genera:                 Genus[];
  generation:             Color;
  growth_rate:            Color;
  habitat:                Color;
  has_gender_differences: boolean;
  hatch_counter:          number;
  id:                     number;
  is_baby:                boolean;
  is_legendary:           boolean;
  is_mythical:            boolean;
  name:                   string;
  names:                  Name[];
  order:                  number;
  pal_park_encounters:    PalParkEncounter[];
  pokedex_numbers:        PokedexNumber[];
  shape:                  Color;
  varieties:              Variety[];
}

export interface Color {
  name: string;
  url:  string;
}

export interface EvolutionChainUrl {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language:    Color;
  version:     Color;
}

export interface Genus {
  genus:    string;
  language: Color;
}

export interface Name {
  language: Color;
  name:     string;
}

export interface PalParkEncounter {
  area:       Color;
  base_score: number;
  rate:       number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex:      Color;
}

export interface Variety {
  is_default: boolean;
  pokemon:    Color;
}

export interface EvolutionChain {
  baby_trigger_item: null;
  chain:             Chain;
  id:                number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to:        Chain[];
  is_baby:           boolean;
  species:           Species;
}

export interface EvolutionDetail {
  gender:                  null;
  held_item:               null;
  item:                    null;
  known_move:              null;
  known_move_type:         null;
  location:                null;
  min_affection:           null;
  min_beauty:              null;
  min_happiness:           null;
  min_level:               number;
  needs_overworld_rain:    boolean;
  party_species:           null;
  party_type:              null;
  relative_physical_stats: null;
  time_of_day:             string;
  trade_species:           null;
  trigger:                 Species;
  turn_upside_down:        boolean;
}

export interface Species {
  name: string;
  url:  string;
}

export interface PokemonTypeSprite {
  id: number;
  key: string;
  name: string;
  color: string;
  sprite: string;
}

export interface PokemonType {
  pokemon: {
    name: string;
    url:  string;
  }[]
}

