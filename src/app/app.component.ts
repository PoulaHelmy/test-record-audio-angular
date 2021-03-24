// import {ChangeDetectionStrategy, Component} from '@angular/core';
// import {TuiBaseColor, TuiColor} from '@taiga-ui/core';
// import {DomSanitizer} from '@angular/platform-browser';
// import * as RecordRTC from 'recordrtc';
//
// const TWO_DOTS: [TuiColor, TuiColor] = [TuiBaseColor.Primary, TuiBaseColor.Secondary];
// const ONE_DOT: [TuiColor] = [TuiBaseColor.Success];
// declare var $: any;
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//
// })
// export class AppComponent {
//   title = 'micRecorder';
// // Lets declare Record OBJ
//   record;
// // Will use this flag for toggeling recording
//   recording = false;
// // URL of Blob
//   url;
//   error;
//
//   constructor(private domSanitizer: DomSanitizer) {
//   }
//
//   sanitize(url: string): any {
//     return this.domSanitizer.bypassSecurityTrustUrl(url);
//   }
//
//   /**
//    * Start recording.
//    */
//   initiateRecording(): void {
//     this.recording = true;
//     const mediaConstraints = {
//       video: false,
//       audio: true
//     };
//     navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
//   }
//
//   /**
//    * Will be called automatically.
//    */
//   successCallback(stream): void {
//     const options = {
//       mimeType: 'audio/wav',
//       numberOfAudioChannels: 1,
//       sampleRate: 16000,
//     };
// // Start Actuall Recording
//     const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
//     this.record = new StereoAudioRecorder(stream, options);
//     this.record.record();
//   }
//
//   /**
//    * Stop recording.
//    */
//   stopRecording(): void {
//     this.recording = false;
//     this.record.stop(this.processRecording.bind(this));
//   }
//
//   /**
//    * processRecording Do what ever you want with blob
//    *
//    */
//   processRecording(blob): void {
//     this.url = URL.createObjectURL(blob);
//     console.log('blob', blob);
//     console.log('url', this.url);
//   }
//
//   /**
//    * Process Error.
//    */
//   errorCallback(error): void {
//     this.error = 'Can not play audio in your browser';
//   }
//
//   // title = 'test-full-calendar';
//   // calendarVisible = true;
//   // calendarOptions: CalendarOptions = {
//   //   headerToolbar: {
//   //     left: 'prev,next today',
//   //     center: 'title',
//   //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//   //   },
//   //   initialView: 'dayGridMonth',
//   //   initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
//   //   weekends: true,
//   //   editable: true,
//   //   selectable: true,
//   //   selectMirror: true,
//   //   dayMaxEvents: true,
//   //   select: this.handleDateSelect.bind(this),
//   //   eventClick: this.handleEventClick.bind(this),
//   //   eventsSet: this.handleEvents.bind(this)
//   //   /* you can update a remote database when these fire:
//   //   eventAdd:
//   //   eventChange:
//   //   eventRemove:
//   //   */
//   // };
//   // currentEvents: EventApi[] = [];
//   // registerForm: FormGroup;
//   // submitted = false;
//   // value: TuiDayRange | null = null;
//   // firstMonth = TuiMonth.currentLocal();
//   // middleMonth = TuiMonth.currentLocal().append({month: 1});
//   // lastMonth = TuiMonth.currentLocal().append({month: 2});
//   // hoveredItem: TuiDay | null = null;
//
//   // constructor(private formBuilder: FormBuilder) {
//   // }
//   //
//   // get f(): any {
//   //   return this.registerForm.controls;
//   // }
//   //
//   // handleCalendarToggle(): any {
//   //   this.calendarVisible = !this.calendarVisible;
//   // }
//   //
//   // handleWeekendsToggle(): any {
//   //   const {calendarOptions} = this;
//   //   calendarOptions.weekends = !calendarOptions.weekends;
//   // }
//   //
//   // handleDateSelect(selectInfo: DateSelectArg): any {
//   //   const title = prompt('Please enter a new title for your event');
//   //   const calendarApi = selectInfo.view.calendar;
//   //
//   //   calendarApi.unselect(); // clear date selection
//   //
//   //   if (title) {
//   //     calendarApi.addEvent({
//   //       id: createEventId(),
//   //       title,
//   //       start: selectInfo.startStr,
//   //       end: selectInfo.endStr,
//   //       allDay: selectInfo.allDay
//   //     });
//   //   }
//   // }
//   //
//   // handleEventClick(clickInfo: EventClickArg): any {
//   //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//   //     clickInfo.event.remove();
//   //   }
//   // }
//   //
//   // handleEvents(events: EventApi[]): any {
//   //   this.currentEvents = events;
//   // }
//   //
//   // numericOnly(event) {
//   //   let patt = /^([0-9])$/;
//   //   let result = patt.test(event.key);
//   //   return result;
//   // }
//   //
//   // ngOnInit(): void {
//   //
//   //   this.registerForm = this.formBuilder.group({
//   //     phone: ['', [Validators.required, Validators.minLength(10)]]
//   //   });
//   // }
//   //
//   // onSubmit() {
//   //   this.submitted = true;
//   //   // stop here if form is invalid
//   //   if (this.registerForm.invalid) {
//   //     return;
//   //   }
//   //   console.log(this.registerForm.controls.phone.value);
//   // }
//   //
//   // getNumber(e): void {
//   //   console.log(e, 'getNumber');
//   // }
//   //
//   // onCountryChange(e): void {
//   //   console.log(e, 'onCountryChange');
//   // }
//   //
//   // telInputObject(e): void {
//   //   console.log(e, 'telInputObject');
//   // }
//   //
//   // readonly markerHandler: TuiMarkerHandler = (day: TuiDay) =>
//   //   // Attention: do not create new arrays in handler, use constants intead
//   //   day.day % 2 === 0 ? TWO_DOTS : ONE_DOT;
//   //
//   // onDayClick(day: TuiDay): any {
//   //   if (this.value === null || !this.value.isSingleDay) {
//   //     this.value = new TuiDayRange(day, day);
//   //   }
//   //
//   //   this.value = TuiDayRange.sort(this.value.from, day);
//   // }
//   //
//   // onMonthChangeFirst(month: TuiMonth): any {
//   //   this.firstMonth = month;
//   //   this.middleMonth = month.append({month: 1});
//   //   this.lastMonth = month.append({month: 2});
//   // }
//   //
//   // onMonthChangeMiddle(month: TuiMonth): any {
//   //   this.firstMonth = month.append({month: -1});
//   //   this.middleMonth = month;
//   //   this.lastMonth = month.append({month: 1});
//   // }
//   //
//   // onMonthChangeLast(month: TuiMonth): any {
//   //   this.firstMonth = month.append({month: -2});
//   //   this.middleMonth = month.append({month: -1});
//   //   this.lastMonth = month;
//   // }
// }
//
//
import {Component, OnDestroy} from '@angular/core';
import {AudioRecordingService} from './audio.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button class="start-button" *ngIf="!isRecording && !blobUrl" (click)="startRecording()">Start Recording</button>
      <button class="stop-button" *ngIf="isRecording && !blobUrl" (click)="stopRecording()">Stop Recording</button>
      <button class="cancel-button" *ngIf="!isRecording && blobUrl" (click)="clearRecordedData()">Clear Recording</button>
      <div *ngIf="isRecording && !blobUrl"> {{recordedTime}} </div>
      <div>
        <audio *ngIf="!isRecording && blobUrl" controls>
          <source [src]="blobUrl" type="audio/webm">
        </audio>
      </div>
    </div>
  `,
  styles: [`
    .start-button {
      background-color: #7ffe9f; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .stop-button {
      background-color: rgba(118, 146, 254, 0.69); /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .cancel-button {
      background-color: #af7541; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-bottom: 10px;
    }
  `]
})
export class AppComponent implements OnDestroy {

  isRecording = false;
  recordedTime;
  blobUrl;

  constructor(private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  startRecording(): any {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording(): any {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording(): any {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData(): any {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
