import {Injectable, isDevMode} from '@angular/core';
import {Tasklet} from '../../model/entities/tasklet.model';
import {Subject} from 'rxjs';
import {Person} from '../../model/person.model';
import {TASKLET_TYPE} from '../../model/tasklet-type.enum';
import {TaskletDailyScrum} from '../../model/tasklet-daily-scrum.model';
import {DateService} from '../date.service';
import {EntityType} from '../../model/entities/entity-type.enum';
import {takeUntil} from 'rxjs/internal/operators';
import {SuggestionService} from '../suggestion.service';
import {PouchDBService} from '../pouchdb.service';
import {Project} from '../../model/entities/project.model';
import {Task} from '../../model/entities/task.model';
import {TaskService} from './task.service';
import {ProjectService} from './project.service';
import {environment} from '../../../environments/environment';
import {SnackbarService} from '../snackbar.service';
import {ScopeService} from '../scope.service';
import {Scope} from '../../model/scope.enum';

@Injectable()
export class TaskletService {
  tasklets = new Map<string, Tasklet>();
  taskletsSubject = new Subject<Tasklet[]>();
  dateQueueSubject = new Subject<Date>();

  dateQueue = [];

  private unsubscribeSubject = new Subject();

  constructor(private pouchDBService: PouchDBService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private dateService: DateService,
              private suggestionService: SuggestionService,
              private snackbarService: SnackbarService,
              private scopeService: ScopeService) {

    this.initializeSubscription();
    this.findTaskletsByScope(this.scopeService.scope);
  }

  //
  // Initialization
  //

  private initializeSubscription() {
    this.taskletsSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe((value) => {
      (value as Tasklet[]).forEach(tasklet => {
          this.tasklets.set(tasklet.id, tasklet);
        }
      );

      this.suggestionService.updateByTasklets(Array.from(this.tasklets.values()));
    });
  }

  //
  // Lookup
  //

  public findTasklets() {
    const index = {fields: ['creationDate', 'entityType']};
    const options = {
      selector: {
        '$and': [
          {'entityType': {'$eq': EntityType.TASKLET}},
          {'creationDate': {'$gt': null}}
        ]
      }, sort: [{'creationDate': 'desc'}], limit: environment.LIMIT_TASKLETS
    };

    this.clearTasklets();
    this.findTaskletsInternal(index, options);
  }

  public findTaskletsByScope(scope: Scope) {
    const index = {fields: ['creationDate', 'scope', 'entityType']};
    const options = {
      selector: {
        '$and': [
          {'entityType': {'$eq': EntityType.TASKLET}},
          {'scope': {'$eq': scope}},
          {'creationDate': {'$gt': null}}
        ]
      }, sort: [{'creationDate': 'desc'}], limit: environment.LIMIT_TASKLETS
    };

    this.clearTasklets();
    this.findTaskletsInternal(index, options);
  }

  private clearTasklets() {
    this.tasklets = new Map<string, Tasklet>();
  }

  private findTaskletsInternal(index: any, options: any) {
    this.pouchDBService.find(index, options).then(result => {

        result['docs'].forEach(element => {
          const tasklet = element as Tasklet;
          this.tasklets.set(tasklet.id, tasklet);
        });
        this.notify();
      }, error => {
        if (isDevMode()) {
          console.error(error);
        }
      }
    );
  }

  //
  // Persistence
  //

  public createTasklet(tasklet: Tasklet) {
    if (tasklet != null) {
      tasklet.scope = this.scopeService.scope;

      this.projectService.updateProject(this.getProjectByTasklet(tasklet), false);
      this.taskService.updateTask(this.getTaskByTasklet(tasklet), false);

      return this.pouchDBService.upsert(tasklet.id, tasklet).then(() => {
        this.snackbarService.showSnackbar('Added tasklet');
        this.tasklets.set(tasklet.id, tasklet);
        this.notify();
      });
    }
  }

  public updateTasklet(tasklet: Tasklet) {
    if (tasklet != null) {
      this.projectService.updateProject(this.getProjectByTasklet(tasklet), false);
      this.taskService.updateTask(this.getTaskByTasklet(tasklet), false);

      tasklet.modificationDate = new Date();

      return this.pouchDBService.upsert(tasklet.id, tasklet).then(() => {
        this.snackbarService.showSnackbar('Updated tasklet');
        this.tasklets.set(tasklet.id, tasklet);
        this.notify();
      });
    }
  }

  public deleteTasklet(tasklet: Tasklet) {
    if (tasklet != null) {
      return this.pouchDBService.remove(tasklet.id, tasklet).then(() => {
        this.snackbarService.showSnackbar('Deleted tasklet');
        this.tasklets.set(tasklet.id, tasklet);
        this.notify();
      });
    }
  }

  /**
   * Informs subscribers that something has changed
   */
  public notify() {
    this.taskletsSubject.next(Array.from(this.tasklets.values()));
  }

  //
  // Lookup
  //

  /**
   * Retrieves a tasklet by a tasks
   *
   * @param tasklet
   * @returns {any}
   */
  public getTaskByTasklet(tasklet: Tasklet): Task {
    if (tasklet != null && tasklet.taskId != null) {
      return this.taskService.tasks.get(tasklet.taskId);
    }

    return null;
  }

  /**
   * Retrieves a project by a tasklet
   *
   * @param tasklet
   * @returns {any}
   */
  public getProjectByTasklet(tasklet: Tasklet): Project {
    const task = this.getTaskByTasklet(tasklet);

    if (tasklet != null && task != null && task.projectId != null) {
      return this.projectService.projects.get(task.projectId);
    }

    return null;
  }

  /**
   * Returns a map of recent daily scrum activities of a given person
   * @param person given person
   * @returns {IterableIterator<string>}
   */
  public getDailyScrumActivities(person: Person): Map<string, string> {
    const dailyScrumActivities = new Map<string, string>();

    if (person != null) {
      (Array.from(this.tasklets.values()).filter(t => {
        return t.type === TASKLET_TYPE.DAILY_SCRUM;
      }).sort((t1, t2) => {
        return (new Date(t1.creationDate) > new Date(t2.creationDate)) ? 1 : -1;
      }) as TaskletDailyScrum[]).forEach(t => {
        t.participants.filter(p => {
          return p.person.name === person.name;
        }).forEach(p => {
          p.activities.filter(a => {
            return a.topic.length !== 0;
          }).forEach(a => {
            dailyScrumActivities.set(a.topic, a.topic);
          });
        });
      });
    }

    return dailyScrumActivities;
  }

  //
  // Filters
  //

  // TODO Move to match service
  public matchesDate(tasklet: Tasklet, date: Date) {
    return new Date(tasklet.creationDate) > new Date(this.dateService.getDayStart(date))
      && new Date(tasklet.creationDate) < new Date(this.dateService.getDayEnd(date));
  }

  //
  // Util
  //

  /**
   * Adds a creation date of a tasklet to the queue and publishes the latest entry
   * @param {Date} date
   */
  addElementToDateQueue(date: Date) {
    const BUFFER = 7;

    this.dateQueue.push(date);

    // Evict queue
    if (this.dateQueue.length > BUFFER) {
      this.dateQueue = this.dateQueue.slice(this.dateQueue.length - BUFFER);
    }

    // Sort queue values
    const sortedDateQueue = this.dateQueue.slice().sort((d1: Date, d2: Date) => {
      return new Date(d2).getTime() - new Date(d1).getTime();
    });

    this.dateQueueSubject.next(sortedDateQueue[0]);
  }
}
