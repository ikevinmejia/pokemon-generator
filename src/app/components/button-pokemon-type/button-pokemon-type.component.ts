import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { PokemonTypeSprite } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-button-pokemon-type',
  imports: [ButtonModule, ImageModule, CommonModule],
  templateUrl: './button-pokemon-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPokemonTypeComponent {
  private pokemonService = inject(PokemonService);
  public pokemonType = input.required<PokemonTypeSprite>();

  public isClicked = signal<boolean>(false);

  onClick(): void {
    if (this.isClicked()) {
      this.pokemonService.selectedTypes.update(current => current.filter(id => id !== this.pokemonType().id));
      this.isClicked.set(!this.isClicked());
      return;
    }
    this.pokemonService.selectedTypes.update(current => [...current, this.pokemonType().id]);
    this.isClicked.set(!this.isClicked());
  }
}
