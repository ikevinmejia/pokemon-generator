import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ModalService } from '../../services/modal.service';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-pokemon-dialog',
  imports: [Dialog, ButtonModule, ImageModule, TitleCasePipe],
  templateUrl: './pokemon-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDialogComponent {
  private modalService = inject(ModalService);
  private pokemonService = inject(PokemonService);

  public evolutionChain = computed(() => this.pokemonService.evolutionChain());

  public visible = this.modalService.visible;
  public showDialog(): void {
    this.modalService.showDialog();
  }
}
