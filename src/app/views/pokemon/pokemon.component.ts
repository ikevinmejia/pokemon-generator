
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  imports: [ButtonModule, PokemonCardComponent,],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent {
  private pokemonService = inject(PokemonService);

  onGeneratePokemon():void {
    this.pokemonService.getPokemon();
    this.pokemonService.showName.set(false);
  }
}
