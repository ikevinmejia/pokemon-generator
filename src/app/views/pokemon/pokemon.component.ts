
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PokemonDialogComponent } from "../../components/pokemon-dialog/pokemon-dialog.component";
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  imports: [ButtonModule, PokemonCardComponent, PokemonDialogComponent],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent {
  private pokemonService = inject(PokemonService);

  public isLoading =computed(() => this.pokemonService.isLoading());

  onGeneratePokemon():void {
    this.pokemonService.getPokemon();
    this.pokemonService.showName.set(false);
  }
}
