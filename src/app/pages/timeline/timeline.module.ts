import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {InViewportModule} from 'ng-in-viewport';
import {AboutDialogModule} from '../../ui/about-dialog/about-dialog.module';
import {ConfirmationDialogModule} from '../../ui/confirmation-dialog/confirmation-dialog.module';
import {InformationDialogModule} from '../../ui/information-dialog/information-dialog.module';
import {MaterialModule} from '../../ui/material/material.module';
import {PersonDialogComponent} from './components/dialogs/person-dialog/person-dialog.component';
import {PersonFilterDialogComponent} from './components/dialogs/person-filter-dialog/person-filter-dialog.component';
import {ProjectDialogComponent} from './components/dialogs/project-dialog/project-dialog.component';
import {ProjectFilterDialogComponent} from './components/dialogs/project-filter-dialog/project-filter-dialog.component';
import {ProjectListDialogComponent} from './components/dialogs/project-list-dialog/project-list-dialog.component';
import {TagDialogComponent} from './components/dialogs/tag-dialog/tag-dialog.component';
import {TagFilterDialogComponent} from './components/dialogs/tag-filter-dialog/tag-filter-dialog.component';
import {TagListDialogComponent} from './components/dialogs/tag-list-dialog/tag-list-dialog.component';
import {TaskDialogComponent} from './components/dialogs/task-dialog/task-dialog.component';
import {TaskListDialogComponent} from './components/dialogs/task-list-dialog/task-list-dialog.component';
import {TaskletDialogComponent} from './components/dialogs/tasklet-dialog/tasklet-dialog.component';
import {UploadDialogComponent} from './components/dialogs/upload-dialog/upload-dialog.component';
import {DailyScrumFragmentComponent} from './components/fragments/dialog/daily-scrum-fragment/daily-scrum-fragment.component';
import {TaskletTypeFragmentComponent} from './components/fragments/dialog/tasklet-type-fragment/tasklet-type-fragment.component';
import {PersonAutocompleteFragmentComponent} from './components/fragments/dialog/person-autocomplete-fragment/person-autocomplete-fragment.component';
import {ProjectAutocompleteFragmentComponent} from './components/fragments/dialog/project-autocomplete-fragment/project-autocomplete-fragment.component';
import {FilterPersonListItemComponent} from './components/lists/filter-person-list-item/filter-person-list-item.component';
import {FilterPersonListComponent} from './components/lists/filter-person-list/filter-person-list.component';
import {FilterProjectListItemComponent} from './components/lists/filter-project-list-item/filter-project-list-item.component';
import {FilterProjectListComponent} from './components/lists/filter-project-list/filter-project-list.component';
import {FilterTagListItemComponent} from './components/lists/filter-tag-list-item/filter-tag-list-item.component';
import {FilterTagListComponent} from './components/lists/filter-tag-list/filter-tag-list.component';
import {PersonListItemComponent} from './components/lists/person-list-item/person-list-item.component';
import {PersonListComponent} from './components/lists/person-list/person-list.component';
import {ProjectListItemComponent} from './components/lists/project-list-item/project-list-item.component';
import {ProjectListComponent} from './components/lists/project-list/project-list.component';
import {TagListItemComponent} from './components/lists/tag-list-item/tag-list-item.component';
import {TagListComponent} from './components/lists/tag-list/tag-list.component';
import {TaskListItemComponent} from './components/lists/task-list-item/task-list-item.component';
import {TaskListComponent} from './components/lists/task-list/task-list.component';
import {TaskletListItemComponent} from './components/lists/tasklet-list-item/tasklet-list-item.component';
import {TaskletListComponent} from './components/lists/tasklet-list/tasklet-list.component';
import {TimelineToolbarComponent} from './components/toolbars/timeline-toolbar/timeline-toolbar.component';
import {ProjectEffortTreeComponent} from './components/trees/project-effort-tree/project-effort-tree.component';
import {TimelineComponent} from './pages/timeline/timeline.component';
import {DateTimePickerDialogModule} from '../../ui/date-time-picker-dialog/date-time-picker-dialog.module';
import {DateTimePickerFragmentModule} from '../../ui/date-time-picker-fragment/date-time-picker-fragment.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimelineRoutingModule} from './timeline-routing.module';
import {RecurrenceIntervalFragmentComponent} from './components/fragments/dialog/recurrence-interval-fragment/recurrence-interval-fragment.component';
import {FileDropFragmentComponent} from './components/fragments/file-drop-fragment/file-drop-fragment.component';
import {FileUploadModule} from 'ng2-file-upload';
import {TaskletPreviewFragmentComponent} from './components/fragments/tasklet/tasklet-preview-fragment/tasklet-preview-fragment.component';
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial';
import {TaskletDailyScrumFragmentComponent} from './components/fragments/tasklet/tasklet-daily-scrum-fragment/tasklet-daily-scrum-fragment.component';
import {MeetingMinutesFragmentComponent} from './components/fragments/dialog/meeting-minutes-fragment/meeting-minutes-fragment.component';
import {MeetingMinuteItemFragmentComponent} from './components/fragments/dialog/meeting-minute-item-fragment/meeting-minute-item-fragment.component';
import {TaskletMeetingMinutesFragmentComponent} from './components/fragments/tasklet/tasklet-meeting-minutes-fragment/tasklet-meeting-minutes-fragment.component';
import {TaskletMeetingMinuteItemFragmentComponent} from './components/fragments/tasklet/tasklet-meeting-minute-item-fragment/tasklet-meeting-minute-item-fragment.component';
import {PersonIndicatorButtonModule} from '../../ui/person-indicator-button/person-indicator-button.module';
import {ChatBubbleModule} from '../../ui/chat-bubble/chat-bubble.module';
import {DailyScrumItemFragmentComponent} from './components/fragments/dialog/daily-scrum-item-fragment/daily-scrum-item-fragment.component';
import {TaskletDailyScrumItemFragmentComponent} from './components/fragments/tasklet/tasklet-daily-scrum-item-fragment/tasklet-daily-scrum-item-fragment.component';
import {SuggestedActionButtonModule} from '../../ui/suggested-action-button/suggested-action-button.module';
import {TaskletComponent} from './pages/tasklet/tasklet.component';
import {MainComponent} from './pages/main/main.component';
import {TaskletResolver} from './resolvers/tasklet.resolver';
import {TagChipsModule} from '../../ui/tag-chips/tag-chips.module';
import {TagNamesPipe} from './pipes/tag-names.pipe';
import {PersonNamesPipe} from './pipes/person-names.pipe';
import {PomodoroTimerComponent} from './components/fragments/pomodoro-timer/pomodoro-timer.component';
import {StopWatchModule} from '../../ui/stop-watch/stop-watch.module';
import {MarkdownFragmentModule} from '../../ui/markdown-fragment/markdown-fragment.module';
import {TaskletCardFragmentComponent} from './components/fragments/tasklet/tasklet-card-fragment/tasklet-card-fragment.component';
import {TaskComponent} from './pages/task/task.component';
import {TaskAutocompleteModule} from '../../ui/task-autocomplete/task-autocomplete.module';
import {PreviousDescriptionModule} from '../../ui/previous-description/previous-description.module';
import {TaskletContentFragmentComponent} from './components/fragments/tasklet/tasklet-content-fragment/tasklet-content-fragment.component';
import {RelativeTimeFragmentComponent} from './components/fragments/tasklet/relative-time-fragment/relative-time-fragment.component';
import {TaskletTimelineFragmentComponent} from './components/fragments/tasklet/tasklet-timeline-fragment/tasklet-timeline-fragment.component';
import {TaskTitleFormComponent} from './components/fragments/forms/task-title-form/task-title-form.component';
import {TaskPropertiesFormComponent} from './components/fragments/forms/task-properties-form/task-properties-form.component';
import {TaskToolbarComponent} from './components/toolbars/task-toolbar/task-toolbar.component';
import {TaskletToolbarComponent} from './components/toolbars/tasklet-toolbar/tasklet-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InViewportModule,
    ScrollDispatchModule,
    MaterialModule,
    FileUploadModule,

    TimelineRoutingModule,

    AboutDialogModule,
    ConfirmationDialogModule,
    ChatBubbleModule,
    InformationDialogModule,
    PersonIndicatorButtonModule,
    DateTimePickerDialogModule,
    DateTimePickerFragmentModule,
    EcoFabSpeedDialModule,
    SuggestedActionButtonModule,
    TagChipsModule,
    TaskAutocompleteModule,
    StopWatchModule,
    MarkdownFragmentModule,
    PreviousDescriptionModule
  ],
  declarations: [
    // Page
    MainComponent,
    TimelineComponent,
    TimelineToolbarComponent,
    TaskletComponent,
    TaskletToolbarComponent,
    TaskComponent,
    TaskToolbarComponent,

    // Dialogs
    PersonDialogComponent,
    PersonFilterDialogComponent,

    ProjectDialogComponent,
    ProjectListDialogComponent,
    ProjectFilterDialogComponent,

    TagDialogComponent,
    TagListDialogComponent,
    TagFilterDialogComponent,

    TaskDialogComponent,
    TaskListDialogComponent,
    TaskletDialogComponent,

    TaskletDialogComponent,

    UploadDialogComponent,

    // Lists
    PersonListComponent,
    PersonListItemComponent,
    FilterPersonListComponent,
    FilterPersonListItemComponent,

    ProjectListComponent,
    ProjectListItemComponent,
    FilterProjectListComponent,
    FilterProjectListItemComponent,

    TagListComponent,
    TagListItemComponent,
    FilterTagListComponent,
    FilterTagListItemComponent,

    TaskListComponent,
    TaskListItemComponent,

    TaskletListComponent,
    TaskletListItemComponent,

    // Trees
    ProjectEffortTreeComponent,

    // Fragments
    DailyScrumFragmentComponent,
    DailyScrumItemFragmentComponent,
    FileDropFragmentComponent,
    TaskletPreviewFragmentComponent,
    MeetingMinutesFragmentComponent,
    MeetingMinuteItemFragmentComponent,
    PersonAutocompleteFragmentComponent,
    ProjectAutocompleteFragmentComponent,
    RecurrenceIntervalFragmentComponent,
    RelativeTimeFragmentComponent,
    TaskletCardFragmentComponent,
    TaskletContentFragmentComponent,
    TaskletDailyScrumFragmentComponent,
    TaskletDailyScrumItemFragmentComponent,
    TaskletMeetingMinuteItemFragmentComponent,
    TaskletMeetingMinutesFragmentComponent,
    TaskletTimelineFragmentComponent,
    TaskletTypeFragmentComponent,
    PomodoroTimerComponent,
    DailyScrumItemFragmentComponent,
    TaskTitleFormComponent,
    TaskPropertiesFormComponent,

    // Pipes
    TagNamesPipe,
    PersonNamesPipe,
  ], entryComponents: [
    // Pages
    TimelineComponent,
    TaskletComponent,
    TaskComponent,

    // Dialogs
    PersonDialogComponent,
    PersonFilterDialogComponent,

    ProjectDialogComponent,
    ProjectListDialogComponent,
    ProjectFilterDialogComponent,

    TagDialogComponent,
    TagListDialogComponent,
    TagFilterDialogComponent,

    TaskDialogComponent,
    TaskListDialogComponent,
    TaskletDialogComponent,

    TaskletDialogComponent,

    UploadDialogComponent
  ], providers: [
    TaskletResolver
  ], exports: [
    TimelineComponent
  ]
})
/**
 * Contains timeline page
 */
export class TimelineModule {
}
