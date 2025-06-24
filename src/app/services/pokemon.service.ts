import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import {
  EvolutionChain,
  EvolutionChainUrl,
  Pokemon,
  PokemonGenerated,
  PokemonSpecies,
  PokemonType,
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private urlPokemonSpecies = signal<string>('');
  private baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'; // 66.png

  private http: HttpClient = inject(HttpClient);

  private pokemonList = signal<PokemonGenerated[]>([]);


  private randomPokemon = computed(() => {
    const list = this.pokemonList();
    if (!list.length) return null;

    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  });
  // public pokemon = signal<PokemonGenerated | null>(null);
  public pokemon = computed(() => this.randomPokemon());
  public evolutionChain = signal<PokemonGenerated[] | null>(null);
  public showName = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public selectedTypes = signal<number[]>([]);

  constructor() {
    effect(() => {
      const currentPokemon = this.pokemon();
      if (currentPokemon) {
        this.getEvolutionChainUrl(currentPokemon.name);
      }
    });
  }

  private getRamdomPokemonId(): number {
    return Math.floor(Math.random() * 1025) + 1;
  }

  getRandomPokemon(): void {
    this.isLoading.set(true);
    this.http
      .get<Pokemon>(`${this.baseUrl}/pokemon/${this.getRamdomPokemonId()}`)
      .pipe(
        map((pokemon: Pokemon) => ({
          name: pokemon.name,
          imgUrl: pokemon.sprites.other.home.front_default,
        }))
      )
      .pipe(
        finalize(() => {
          this.isLoading.set(false); //  se ejecuta al finalizar o fallar
        })
      )
      .subscribe((pokemonGenerated: PokemonGenerated) => {

        this.pokemonList.set([pokemonGenerated]);
      });
  }

  getPokemon():void {

    if (this.selectedTypes().length >= 1) {
      this.getPokemonByType()
    } else {
      this.getRandomPokemon()
    }
  }

  getEvolutionChainUrl(pokemonId: number | string): void {
    this.http
      .get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${pokemonId}`)
      .pipe(map((species: PokemonSpecies) => species.evolution_chain.url))
      .pipe(catchError((error) => {
        return of('');
      })
      )
      .subscribe((url: EvolutionChainUrl['url']) => {
        this.urlPokemonSpecies.set(url);
      });
  }

  getEvolutionChain(): void {
    this.http
      .get<EvolutionChain>(this.urlPokemonSpecies())
      .pipe(
        map((evolutionChain: EvolutionChain) => {
          const firstLevel: PokemonGenerated = {
            name: evolutionChain.chain.species.name,
            imgUrl: `${this.baseImgUrl}${
              evolutionChain.chain.species.url.split('/')[6]
            }.png`,
          };

          // Segundo nivel de evoluciones
          const secondLevel: PokemonGenerated[] =
            evolutionChain.chain.evolves_to.map((evolution) => ({
              name: evolution.species.name,
              imgUrl: `${this.baseImgUrl}${
                evolution.species.url.split('/')[6]
              }.png`,
            }));

          // Tercer nivel de evoluciones
          const thirdLevel: PokemonGenerated[] =
            evolutionChain.chain.evolves_to.flatMap((evolution) =>
              evolution.evolves_to.map((evolutionDetail) => ({
                name: evolutionDetail.species.name,
                imgUrl: `${this.baseImgUrl}${
                  evolutionDetail.species.url.split('/')[6]
                }.png`,
              }))
            );

          // Unir ambos arrays en uno solo
          return [firstLevel, ...secondLevel, ...thirdLevel];
        })
      )
      .pipe(
        catchError((error) => {
          // Opción: mostrar mensaje en UI, emitir estado vacío o nulo

          // Retornar un observable para que no se rompa el flujo
          return of([{
            name: 'Pokémon sin línea evolutiva',
            imgUrl: 'assets/pokeball.svg'
          }]);
        })
      )
      .subscribe((evolutionChain: PokemonGenerated[]) => {
        this.evolutionChain.set(evolutionChain);
      });
  }

  getPokemonByType() {
    this.isLoading.set(true);
    const requests = this.selectedTypes().map((typeId) =>
      this.http.get<PokemonType>(`${this.baseUrl}/type/${typeId}`)
    );

    forkJoin(requests)
    .pipe(
      map((pokemon) => {
        // console.log(pokemon[0].pokemon);
        return pokemon.map(poke => {

          return poke.pokemon.map((p: any) => {

          return {
            name: p.pokemon.name,
            imgUrl:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.pokemon.url.split('/')[6]}.png`
          }
          })
        })
      })
    )
    .pipe(
      map(responses => responses.flat())
    )
    .pipe(
      finalize(() => {
        this.isLoading.set(false); //  se ejecuta al finalizar o fallar
      })
    )
    .subscribe((response: PokemonGenerated[]) => {
      this.pokemonList.set(response);
    });
  }
}
