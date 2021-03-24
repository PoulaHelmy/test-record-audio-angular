import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {AppComponent} from './app.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {iconsPathFactory, TUI_ICONS_PATH, TuiCalendarModule, TuiRootModule} from '@taiga-ui/core';
import {TuiAccordionModule} from '@taiga-ui/kit';
import {AudioRecordingService} from './audio.service';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    Ng2TelInputModule,
    FormsModule,
    TuiRootModule,
    ReactiveFormsModule,
    TuiCalendarModule,
    TuiAccordionModule

  ],
  providers: [
    AudioRecordingService,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
