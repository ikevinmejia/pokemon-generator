import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { EvolutionChain, EvolutionChainUrl, Pokemon, PokemonGenerated, PokemonSpecies } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private urlPokemonSpecies = signal<string>('');
  private baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'; // 66.png

  private http: HttpClient = inject(HttpClient);

  public pokemon = signal<PokemonGenerated | null>(null);
  public evolutionChain = signal<PokemonGenerated[] | null>(null);
  public showName = signal<boolean>(false);
  public isLoading = signal<boolean>(false);


  private getRamdomPokemonId(): number {
    return Math.floor(Math.random() * 1025) + 1;
  }

  getPokemon(): void {
    this.isLoading.set(true);
    this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${this.getRamdomPokemonId()}`)
      .pipe(
        map((pokemon: Pokemon) => ({
          name: pokemon.name,
          imgUrl: pokemon.sprites.other.home.front_default
        }))
      )
      .subscribe((pokemonGenerated: PokemonGenerated) => {
        this.pokemon.set(pokemonGenerated);
        this.getEvolutionChainUrl(pokemonGenerated.name);
        this.isLoading.set(false);
      });
  }

  getEvolutionChainUrl(pokemonId:number | string):void {
    this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${pokemonId}`)
      .pipe(
        map((species: PokemonSpecies) => species.evolution_chain.url)
      )
      .subscribe((url: EvolutionChainUrl['url']) => {
        this.urlPokemonSpecies.set(url);
      });
  }

  getEvolutionChain():void {
    this.http.get<EvolutionChain>(this.urlPokemonSpecies())
      .pipe(
      map((evolutionChain: EvolutionChain) => {

        const firstLevel: PokemonGenerated = {
          name: evolutionChain.chain.species.name,
          imgUrl: `${this.baseImgUrl}${evolutionChain.chain.species.url.split('/')[6]}.png`
        }

        // Segundo nivel de evoluciones
        const secondLevel:PokemonGenerated[] = evolutionChain.chain.evolves_to.map(evolution => ({
        name: evolution.species.name,
        imgUrl: `${this.baseImgUrl}${evolution.species.url.split('/')[6]}.png`
        }));

        // Tercer nivel de evoluciones
        const thirdLevel:PokemonGenerated[] = evolutionChain.chain.evolves_to.flatMap(evolution =>
          evolution.evolves_to.map(evolutionDetail => ({
            name: evolutionDetail.species.name,
            imgUrl: `${this.baseImgUrl}${evolutionDetail.species.url.split('/')[6]}.png`
          }))
        );

        // Unir ambos arrays en uno solo
        return [firstLevel, ...secondLevel, ...thirdLevel];
      })
      )
      .subscribe((evolutionChain: PokemonGenerated[]) => {
        this.evolutionChain.set(evolutionChain);
      });
  }


}
