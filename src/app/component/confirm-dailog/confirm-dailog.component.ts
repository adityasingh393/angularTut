import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { KENDO_DIALOGS } from '@progress/kendo-angular-dialog';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'app-confirm-dailog',
  standalone: true,
  imports: [KENDO_BUTTON, KENDO_DIALOGS],
  templateUrl: './confirm-dailog.component.html',
  styleUrl: './confirm-dailog.component.css',
})
export class ConfirmDailogComponent {
  @Input() content!: String;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClickNo() {
    this.cancel.emit();
    console.log("cancel button from dailog cliked")
  }
  onClickYes() {
    this.confirm.emit();
  }
}
