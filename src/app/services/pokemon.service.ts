import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { Pokemon, PokemonGenerated } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  private http: HttpClient = inject(HttpClient);

  public pokemon = signal<PokemonGenerated | null>(null);
  public showName = signal<boolean>(false);


  private getRamdomPokemonId(): number {
    return Math.floor(Math.random() * 1025) + 1;
  }

  getPokemon(): void {
    this.http.get<Pokemon>(this.baseUrl + this.getRamdomPokemonId())
      .pipe(
        map((pokemon: Pokemon) => ({
          name: pokemon.name,
          imgUrl: pokemon.sprites.other.home.front_default
        }))
      )
      .subscribe((pokemonGenerated: PokemonGenerated) => {
        this.pokemon.set(pokemonGenerated);
      });
  }


}
