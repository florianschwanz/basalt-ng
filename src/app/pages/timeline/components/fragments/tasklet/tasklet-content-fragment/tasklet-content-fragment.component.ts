import {Component, Input} from '@angular/core';
import {Tasklet} from '../../../../../../core/entity/model/tasklet.model';
import {TaskletDisplayAspect} from '../../../../../../core/entity/services/tasklet/tasklet-display.service';
import {TaskletService} from '../../../../../../core/entity/services/tasklet/tasklet.service';

/**
 * Displays the content of a tasklet containing
 * <li> description
 * <li> meeting minutes
 * <li> daily scrum activities
 */
@Component({
  selector: 'app-tasklet-content-fragment',
  templateUrl: './tasklet-content-fragment.component.html',
  styleUrls: ['./tasklet-content-fragment.component.scss']
})
export class TaskletContentFragmentComponent {

  /** Tasklet to be displayed */
  @Input() tasklet: Tasklet;
  /** Placeholder text for description */
  @Input() placeholderDescription = '';
  /** Placeholder text for meeting minutes */
  @Input() placeholderMeetingMinutes = '';
  /** Placeholder text for daily scrum */
  @Input() placeholderDailyScrum = '';

  /** Enum of display aspects */
  displayAspectType = TaskletDisplayAspect;

  /**
   * Constructor
   * @param taskletService tasklet service
   */
  constructor(private taskletService: TaskletService) {
  }

  //
  // Helpers
  //

  /**
   * Determines whether the displayed tasklet contains a specific display aspect
   * @param displayAspect display aspect
   * @param tasklet tasklet
   */
  public containsDisplayAspect(displayAspect: TaskletDisplayAspect, tasklet: Tasklet): boolean {
    return this.taskletService.containsDisplayAspect(displayAspect, tasklet);
  }
}
