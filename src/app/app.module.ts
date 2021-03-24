import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AudioRecordingService} from './audio.service';
import {NgAudioRecorderModule} from 'ng-audio-recorder';
import {AudioRecordingModule} from './audio-recording/audio-recording.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgAudioRecorderModule,
    AudioRecordingModule

  ],
  providers: [
    AudioRecordingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
