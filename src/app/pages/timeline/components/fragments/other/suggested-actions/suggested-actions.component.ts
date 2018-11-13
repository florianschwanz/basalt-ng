import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorService} from '../../../../../../core/ui/services/color.service';
import {TaskletTypeGroup} from '../../../../../../core/entity/model/tasklet-type-group.enum';
import {TaskletService} from '../../../../../../core/entity/services/tasklet.service';
import {TaskletType} from '../../../../../../core/entity/model/tasklet-type.enum';
import {Task} from '../../../../../../core/entity/model/task.model';
import {Tasklet} from '../../../../../../core/entity/model/tasklet.model';
import {Action} from '../../../../../../core/entity/model/action.enum';

/**
 * Represents a suggested action button
 */
class SuggestedAction {

  /** Tasklet type */
  taskletType: TaskletType;
  /** Label to be displayed */
  label: string;
  /** Icon to be used */
  icon: string;
  /** Background color to be used */
  backgroundColor: string;
  /** Background color to be used */
  iconColor: string;
}

/**
 * Displays suggestedd actions
 */
@Component({
  selector: 'app-suggested-actions',
  templateUrl: './suggested-actions.component.html',
  styleUrls: ['./suggested-actions.component.scss']
})
export class SuggestedActionsComponent implements OnInit {

  /** List of suggested tasks */
  @Input() suggestedTasks: Task[] = [];
  /** Event emitter indicating tasklet action */
  @Output() taskletEventEmitter = new EventEmitter<{ action: Action, tasklet: Tasklet }>();

  /** List of suggested actions */
  suggestedActions: SuggestedAction[] = [];
  /** List of static suggested actions */
  staticSuggestedActions: SuggestedAction[] = [];

  /**
   * Constructor
   * @param taskletService tasklet service
   * @param colorService color service
   */
  constructor(private taskletService: TaskletService,
              private colorService: ColorService) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeSuggestedActions();
    this.initializeStaticSuggestedActions();
  }

  //
  // Initialization
  //

  /**
   * Initializes suggested actions
   */
  private initializeSuggestedActions() {
    this.suggestedTasks.slice(3).forEach(task => {
      const suggestedAction = new SuggestedAction();
      suggestedAction.icon = this.taskletService.getIconByTaskletType(TaskletType.ACTION);
      suggestedAction.label = task.name;
      suggestedAction.backgroundColor = this.colorService.getTaskColor(task);
      suggestedAction.iconColor = this.colorService.getTaskContrast(task);
      this.suggestedActions.push(suggestedAction);
    });
  }

  /**
   * Initializes static suggested actions
   */
  private initializeStaticSuggestedActions() {
    const suggestedActionLunchBreak = new SuggestedAction();
    suggestedActionLunchBreak.taskletType = TaskletType.LUNCH_BREAK;
    suggestedActionLunchBreak.icon = this.taskletService.getIconByTaskletType(TaskletType.LUNCH_BREAK);
    suggestedActionLunchBreak.label = TaskletType.LUNCH_BREAK.toString();
    suggestedActionLunchBreak.backgroundColor = this.colorService.getTaskletTypeGroupColor(TaskletTypeGroup.BREAK).color;
    suggestedActionLunchBreak.iconColor = this.colorService.getTaskletTypeGroupColor(TaskletTypeGroup.BREAK).contrast;
    this.staticSuggestedActions.push(suggestedActionLunchBreak);

    const suggestedActionFinishingTime = new SuggestedAction();
    suggestedActionFinishingTime.taskletType = TaskletType.FINISHING_TIME;
    suggestedActionFinishingTime.icon = this.taskletService.getIconByTaskletType(TaskletType.FINISHING_TIME);
    suggestedActionFinishingTime.label = TaskletType.FINISHING_TIME.toString();
    suggestedActionFinishingTime.backgroundColor = this.colorService.getTaskletTypeGroupColor(TaskletTypeGroup.BREAK).color;
    suggestedActionFinishingTime.iconColor = this.colorService.getTaskletTypeGroupColor(TaskletTypeGroup.BREAK).contrast;
    this.staticSuggestedActions.push(suggestedActionFinishingTime);
  }

  //
  // Actions
  //

  /**
   * Handles click on static suggested action
   * @param taskletType tasklet type
   */
  onStaticSuggestedActionClicked(taskletType: TaskletType) {
    const tasklet = new Tasklet();
    tasklet.type = taskletType;
    this.taskletEventEmitter.emit({action: Action.ADD, tasklet: tasklet});
  }
}
