import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true,
    }
  ]
})
export class CounterComponent implements ControlValueAccessor {

  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() value: number = 0;
  @Output() change = new EventEmitter<number>()

  private onModelChange!: (v: number) => void;
  private onModelTouched!: () => void;

  constructor() { }

  writeValue(newValue: number): void {
    this.updateValue(newValue, false);
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  increment() {
    this.updateValue(this.value + 1);
    this.onModelChange?.(this.value);
    this.onModelTouched?.();
  }

  decrement() {
    this.updateValue(this.value - 1);
    this.onModelChange?.(this.value);
    this.onModelTouched?.();
  }

  private updateValue(newValue: number, emit = true) {
    const oldValue = this.value;
    this.value = newValue;
    if (this.max !== null && this.value > this.max) this.value = this.max;
    if (this.min !== null && this.value < this.min) this.value = this.min;

    if (emit && this.value !== oldValue) {
      this.change.emit(this.value);
    }
  }

}
