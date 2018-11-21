import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Project} from 'app/core/entity/model/project.model';
import {Action} from 'app/core/entity/model/action.enum';
import {Media} from '../../../../../core/ui/model/media.enum';
import {MatMenuTrigger} from '@angular/material';
import {Animations} from './project-list-item.animation';
import {AnimationState} from '../task-list-item/task-list-item.animation';

/**
 * Displays project list item
 */
@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss'],
  animations: [
    Animations.actionAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListItemComponent implements OnChanges {

  /** Project to be displayed */
  @Input() project: Project;
  /** Current media */
  @Input() media: Media;
  /** Displays item opaque if true */
  @Input() opaque = false;
  /** Event emitter indicating project to be updated */
  @Output() projectEventEmitter = new EventEmitter<{ action: Action, project: Project, projects?: Project[] }>();
  /** View child for context menu */
  @ViewChild(MatMenuTrigger) contextMenuTrigger: MatMenuTrigger;

  /** CSS class that handles opacity */
  opaqueClass = '';

  /** Enum for media types */
  mediaType = Media;
  /** Animation state */
  state = AnimationState.INACTIVE;

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes lifecycle phase
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeOpacity();
  }

  //
  // Initialization
  //

  /**
   * Initializes opacity
   */
  private initializeOpacity() {
    this.opaqueClass = this.opaque ? 'opaque' : '';
  }

  //
  // Actions
  //

  /**
   * Handles hover over container
   * @param {boolean} hovered whether there is currently a hover event
   */
  onHoverContainer(hovered: boolean) {
    this.state = hovered ? AnimationState.ACTIVE : AnimationState.INACTIVE;
  }

  /**
   * Handles click on project
   */
  onProjectClicked() {
    this.projectEventEmitter.emit({action: Action.OPEN_DIALOG_UPDATE, project: this.project});
  }

  /**
   * Handles clicks on filter button
   */
  onFilterClicked() {
    this.projectEventEmitter.emit({action: Action.FILTER_SINGLE, project: null, projects: [this.project]});
  }
}
