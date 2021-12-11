import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BootstrapInputSize } from 'src/app/models/bootstrap-input-size';

@Component({
  selector: 'app-button-group-control',
  templateUrl: './button-group-control.component.html',
  styleUrls: ['./button-group-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonGroupControlComponent),
      multi: true,
    }
  ]
})
export class ButtonGroupControlComponent<T = any> implements ControlValueAccessor {

  @Input() size: BootstrapInputSize = 'default';
  @Input() items: ButtonGroupItem[] = [];
  @Input() value: T | null = null;
  @Output() change = new EventEmitter<T>();

  selectedItem: ButtonGroupItem | null = null;

  private onModelChange!: (v: number) => void;
  private onModelTouched!: () => void;

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  writeValue(newValue: T): void {
    this.updateValue(newValue);
  }

  onItemChange(item: ButtonGroupItem) {
    this.updateValue(item.value);
    this.change.emit(item.value);
    this.onModelChange?.(item.value);
    this.onModelTouched?.();
  }

  private updateValue(value: T) {
    this.selectedItem = this.items.find(i => i.value === value) ?? null;
  }

}

export interface ButtonGroupItem<T = any> {
  label: string;
  value: T;
}
