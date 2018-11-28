import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffortPickerFragmentComponent} from './effort-picker-fragment/effort-picker-fragment.component';
import {MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [EffortPickerFragmentComponent],
  exports: [EffortPickerFragmentComponent]
})
export class EffortPickerFragmentModule {
}