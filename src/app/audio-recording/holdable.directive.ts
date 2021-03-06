import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[holdable]'
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  @Output() stop = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() start = new EventEmitter();
  stop$ = new Subject<any>();

  constructor() {
    this.stop$.subscribe(() => {
      // this.holdTime.emit(0);
      this.stop.emit();
    });
  }

  @HostListener('mouseup')
  onExit(): void {
    this.stop$.next();
  }

  @HostListener('mousedown')
  onHold(): void {
    this.start.emit();
    const ms = 100;
    interval(ms).pipe(
      takeUntil(this.stop$),
      tap(v => {
        this.holdTime.emit(v * ms);
      }),
    ).subscribe();
  }
}
