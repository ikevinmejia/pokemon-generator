import { CommonModule, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-pokemon-card',
  imports: [CardModule, ButtonModule, TitleCasePipe, CommonModule, ImageModule],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  private pokemonService = inject(PokemonService);
  public showName = this.pokemonService.showName;
  public pokemon = computed(() => this.pokemonService.pokemon());
}
