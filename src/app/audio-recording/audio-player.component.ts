import {Component, Input, ViewChild} from '@angular/core';
import {BehaviorSubject, interval, never, Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-player',
  templateUrl: 'audio-player.component.html',
  styles: [`
    .audio-wrapper {
      background: lightgreen;
      width: 100%;
      height: 50px;
      position: relative;
      border-radius: 8px;
    }

    .play, .pause {
      cursor: pointer;
      background: rgba(0, 0, 0, .2);
      color: white;
      width: 40px;
      height: 40px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      left: 5px;
      top: 5px;
    }

    .time {
      position: absolute;
      right: 20px;
    }
  `]
})
export class AudioPlayerComponent {
  @Input() audioUrl: string;
  @Input() duration: number;
  @ViewChild('audioElement') audioElement;
  public isPlaying$ = new BehaviorSubject<boolean>(false);
  public currentTime$ = new Observable<number>();

  constructor() {
    console.log(this.audioUrl);
    console.log(this.duration);
  }

  onClick(): any {
    if (this.audioUrl) {
      if (this.isPlaying$.value) {
        this.audioElement.nativeElement.pause();
      } else {
        this.audioElement.nativeElement.play();
      }
    }
  }

  onPlay(): any {
    this.isPlaying$.next(true);
  }

  onPause(): any {
    this.isPlaying$.next(false);
  }

  onEnd(): any {
    this.isPlaying$.next(false);
    this._restartCurrentTime();
  }

  onLoaded(): any {
    this._restartCurrentTime();
  }

  private _restartCurrentTime(): any {
    let x = 1;
    this.currentTime$ = this.isPlaying$.pipe(
      switchMap(is => !is ? never() : interval(1000).pipe(
        map(() => x++),
        startWith(0)
      ))
    );
  }
}
