import { Component, OnInit } from '@angular/core';
import {FilterService} from '../../../services/filter.service';
import {takeUntil} from 'rxjs/internal/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-filter-project-list',
  templateUrl: './filter-project-list.component.html',
  styleUrls: ['./filter-project-list.component.scss']
})
export class FilterProjectListComponent implements OnInit {

  projects = [];
  projectsNone = false;

  private unsubscribeSubject = new Subject();

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {

    this.initializeProjectSubscription();
  }

  selectAll() {
    this.projects.forEach(t => {
      t.checked = true;
    });
    this.projectsNone = true;
    this.filterService.updateProjects(this.projects, false, this.projectsNone);
  }

  selectNone() {
    this.projects.forEach(t => {
      t.checked = false;
    });
    this.projectsNone = false;
    this.filterService.updateProjects(this.projects, false, this.projectsNone);
  }

  changeSpecialProject(value: boolean) {
    this.filterService.updateProjects(this.projects, false, this.projectsNone);
  }

  /**
   * Subscribes project changes
   */
  private initializeProjectSubscription() {

    this.filterService.filterSubject.pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe(() => {
        this.projects = Array.from(this.filterService.projects.values());
        this.projectsNone = this.filterService.projectsNone;
      }
    );
  }
}
