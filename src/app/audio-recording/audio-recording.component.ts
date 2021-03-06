import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {fromEvent, Observable} from 'rxjs';
import {pluck, take, tap} from 'rxjs/operators';

declare var MediaRecorder: any;

export enum RecordingState {
  STOPPED = 'stopped',
  RECORDING = 'recording',
  FORBIDDEN = 'forbidden',
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-recording',
  templateUrl: 'audio-recorder.component.html',
  styles: [`
    .audio-container {
      position: relative;
      margin: 10px;
    }

    .record-container {
      position: relative;
      width: 100%;
      text-align: center;
      display: block;
    }

    [holdable] {
      outline: 0;
      cursor: pointer;
      border: none;
      background: green;
      color: white;
      width: 60px;
      height: 60px;
      position: absolute;
      display: block;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      left: 0;
      right: 0;
      top: 0;
      margin: 0 auto;
    }
  `]
})
export class AudioRecordingComponent implements OnInit {

  seconds: number;
  state: RecordingState = RecordingState.STOPPED;
  audioURLs = [];
  audioURL: boolean;
  private mediaRecorder;
  private recordings$: Observable<any>;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): any {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.recordings$ = fromEvent(this.mediaRecorder, 'dataavailable');
      })
      .catch(error => {
        console.log('CANNOT RECORD: ', error);
        this.state = RecordingState.FORBIDDEN;
      });
  }

  onHold(time): any {
    this.state = RecordingState.RECORDING;
    this.seconds = Math.round(time / 1000);
  }

  onStart(): any {
    this.mediaRecorder.start();
    this.recordings$.pipe(
      take(1),
      pluck('data'),
      tap((data: BlobPart) => {
        const blob = new Blob([data], {type: 'audio/x-mpeg-3'});
        console.log(blob);
        this.audioURLs.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
        console.log(this.audioURLs, this.audioURLs[0].duration);
        this.changeDetector.detectChanges();
      })
    ).subscribe();
  }

  onStop(): any {
    this.state = RecordingState.STOPPED;
    this.mediaRecorder.stop();
  }
}
