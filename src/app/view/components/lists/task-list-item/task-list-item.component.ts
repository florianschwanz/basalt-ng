import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../../model/entities/task.model';
import {TaskDialogComponent} from '../../../dialogs/entities/task-dialog/task-dialog.component';
import {DIALOG_MODE} from '../../../../model/dialog-mode.enum';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {TaskService} from '../../../../services/entities/task.service';
import {TaskletDialogComponent} from '../../../dialogs/entities/tasklet-dialog/tasklet-dialog.component';
import {Tasklet} from '../../../../model/entities/tasklet.model';
import {TaskletService} from '../../../../services/entities/tasklet.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {TASKLET_TYPE} from '../../../../model/tasklet-type.enum';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService,
              private taskletService: TaskletService,
              private snackbarService: SnackbarService,
              public dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'reply',
      sanitizer.bypassSecurityTrustResourceUrl('assets/material-design-icons/content/svg/design/ic_reply_24px.svg')
    );
  }

  ngOnInit() {
  }

  updateTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      disableClose: false,
      data: {
        mode: DIALOG_MODE.UPDATE,
        dialogTitle: 'Update task',
        task: JSON.stringify(this.task)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.taskService.updateTask(result as Task);
      }
    });
  }

  startWorkOnTask() {
    const newTasklet = new Tasklet();
    newTasklet.taskId = this.task.id;
    newTasklet.type = TASKLET_TYPE.ACTION;
    const dialogRef = this.dialog.open(TaskletDialogComponent, {
      disableClose: false,
      data: {
        mode: DIALOG_MODE.ADD,
        dialogTitle: 'Add tasklet',
        tasklet: newTasklet,
      }
    });
    dialogRef.afterClosed().subscribe(tasklet => {
      if (tasklet != null) {
        this.taskletService.createTasklet(tasklet as Tasklet);
        this.snackbarService.showSnackbar('Added tasklet', '');
      }
    });
  }
}
