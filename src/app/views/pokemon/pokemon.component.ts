
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ButtonPokemonTypeComponent } from "../../components/button-pokemon-type/button-pokemon-type.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PokemonDialogComponent } from "../../components/pokemon-dialog/pokemon-dialog.component";
import { pokemonTypeList } from '../../data/pokemonTypes';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-pokemon',
  imports: [ButtonModule, PokemonCardComponent, PokemonDialogComponent, ButtonPokemonTypeComponent, PanelModule],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent {
  private pokemonService = inject(PokemonService);

  public isLoading = computed(() => this.pokemonService.isLoading());

  public pokemonTypes = pokemonTypeList;

  onGeneratePokemon():void {
    this.pokemonService.getPokemon();
    this.pokemonService.showName.set(false);
  }
}
