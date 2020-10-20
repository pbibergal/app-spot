import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() selectRow: EventEmitter<any> = new EventEmitter();
  @Output() reachedBottom: EventEmitter<void> = new EventEmitter();
  @Input() items: Array<Album>;
  @Input() disableScroll: boolean;
  @ViewChild('wrapElement') wrapElement: ElementRef;
  @ViewChild('listElement') listElement: ElementRef;
  control: FormControl;
  displayList = false;

  private destroy: Subject<void> = new Subject();
  private propagateChange = (_: any) => ({});

  constructor(fb: FormBuilder) {
    this.control = fb.control('');
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(v => {
        this.propagateChange(v);
      });

  }

  ngAfterViewInit(): void {
    fromEvent(this.wrapElement.nativeElement, 'click')
      .pipe(takeUntil(this.destroy))
      .subscribe(e => {
        this.displayList = !this.displayList;
      });

    fromEvent(this.listElement.nativeElement, 'scroll')
      .pipe(
        takeUntil(this.destroy),
        tap((e: Event) => e.preventDefault()),
        filter(e => !this.disableScroll),
      )
      .subscribe((e: Event) => {
        const el: HTMLElement = e.target as HTMLElement;
        if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
          this.reachedBottom.emit();
        }
      });

    fromEvent(document.querySelector('body'), 'click')
      .pipe(takeUntil(this.destroy))
      .subscribe((e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('app-select')) {
          this.displayList = false;
        }
      });
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  rowClick(item): void {
    this.control.setValue(item.name);
    this.selectRow.emit(item);
    this.displayList = false;
  }

}
