import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Tasklet} from '../../../model/entities/tasklet.model';
import {Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/operators';
import {TaskletService} from '../../../services/entities/tasklet.service';
import {FilterService} from '../../../services/filter.service';
import {MatchService} from '../../../services/match.service';

@Component({
  selector: 'app-tasklet-list',
  templateUrl: './tasklet-list.component.html',
  styleUrls: ['./tasklet-list.component.scss']
})
export class TaskletListComponent implements OnInit, OnDestroy {

  tasklets: Tasklet[] = [];
  taskletsAll: Tasklet[] = [];

  private unsubscribeSubject = new Subject();

  DISPLAY_LIMIT = 100;

  constructor(private taskletService: TaskletService,
              private matchService: MatchService,
              private filterService: FilterService,
              public zone: NgZone) {
  }

  ngOnInit() {

    this.initializeTaskletSubscription();
    this.initializeFilterSubscription();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  //
  // Initialization
  //

  /**
   * Subscribes tasklet changes
   */
  private initializeTaskletSubscription() {

    this.taskletService.taskletsSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe((value) => {
      if (value != null) {
        this.taskletsAll = (value as Tasklet[]);
        this.update();
      }
    });
  }

  /**
   * Subscribes filter changes
   */
  private initializeFilterSubscription() {

    this.filterService.filterSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe(() => {
      this.update();
    });
  }

  /**
   * Filters original values
   */
  private update() {
    this.tasklets = this.taskletsAll.filter(tasklet => {
      const matchesSearchItem = this.matchService.taskletMatchesEveryItem(tasklet, this.filterService.searchItem);
      const matchesTags = this.matchService.taskletMatchesTags(tasklet,
        Array.from(this.filterService.tags.values()), this.filterService.tagsNone);
      const matchesProjects = this.matchService.taskletMatchesProjects(tasklet,
        Array.from(this.filterService.projects.values()), this.filterService.projectsNone);

      return matchesSearchItem && matchesTags && matchesProjects;
    }).sort((t1: Tasklet, t2: Tasklet) => {

      return new Date(t2.creationDate).getTime() - new Date(t1.creationDate).getTime();
    }).slice(0, this.DISPLAY_LIMIT);

    this.zone.run(() => this.tasklets = JSON.parse(JSON.stringify(this.tasklets)));
  }
}
