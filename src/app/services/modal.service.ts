import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  visible = signal<boolean>(false);

  showDialog() {
      this.visible.update(state => !state);
  }
}
