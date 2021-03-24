import {Injectable} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {Observable, Subject} from 'rxjs';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable()
export class AudioRecordingService {


  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded = new Subject<RecordedAudioOutput>();
  private recordingTime = new Subject<string>();
  private recordingFaileds = new Subject<string>();


  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this.recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this.recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this.recordingFaileds.asObservable();
  }


  startRecording(): any {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this.recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({audio: true}).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFaileds.next();
    });

  }

  abortRecording(): any {
    this.stopMedia();
  }

  stopRecording(): any {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          this.recorded.next({blob, title: mp3Name});
        }
      }, () => {
        this.stopMedia();
        this.recordingFaileds.next();
      });
    }
  }

  private record(): any {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });

    this.recorder.record();
    this.startTime = new Date().getTime() + 'sss';
    this.interval = setInterval(
      () => {
        const currentTime = new Date().getTime();
        const diffTime = new Date().getTime();
        const time = this.toString(new Date().getTime()) + ':' + this.toString(new Date().getTime());
        this.recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value): any {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  private stopMedia(): any {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }

}
