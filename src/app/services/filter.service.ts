import {Injectable} from '@angular/core';
import {Tag} from '../model/tag.model';
import {Project} from '../model/entities/project.model';
import {CloneService} from './util/clone.service';
import {takeUntil} from 'rxjs/operators';
import {ProjectService} from './entities/project.service';
import {Subject} from 'rxjs';
import {TaskletService} from './entities/tasklet.service';
import {TaskService} from './entities/task.service';
import {Tasklet} from '../model/entities/tasklet.model';
import {Task} from '../model/entities/task.model';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  searchItem = '';
  tags: Map<string, Tag> = new Map<string, Tag>();
  tagsNone = true;

  initializedTagsOfTasklets = false;
  initializedTagsOfTasks = false;
  initializedProjects = false;

  projects: Map<string, Project> = new Map<string, Project>();
  projectsNone = true;

  filterSubject = new Subject();

  private taskletUnsubscribeSubject = new Subject();
  private taskUnsubscribeSubject = new Subject();
  private projectUnsubscribeSubject = new Subject();

  constructor(private projectService: ProjectService,
              private cloneService: CloneService,
              private taskletService: TaskletService,
              private taskService: TaskService) {

    // Subscribe tasklet changes
    this.taskletService.taskletsSubject.pipe(
      takeUntil(this.taskletUnsubscribeSubject)
    ).subscribe((value) => {
      if (value != null) {
        const tasklets = value as Tasklet[];

        if (!this.initializedTagsOfTasklets) {
          this.updateTagsOfTasklets(tasklets, true);
        }
        this.deleteUnusedTags();
        this.initializedTagsOfTasklets = true;
      }
    });

    // Subscribe task changes
    this.taskService.tasksSubject.pipe(
      takeUntil(this.taskUnsubscribeSubject)
    ).subscribe((value) => {
      if (value != null) {
        const tasks = value as Task[];

        if (!this.initializedTagsOfTasks) {
          this.updateTagsOfTasks(tasks, true);
        }
        this.deleteUnusedTags();
        this.initializedTagsOfTasks = true;
      }
    });

    // Subscribe project changes
    this.projectService.projectsSubject.pipe(
      takeUntil(this.projectUnsubscribeSubject)
    ).subscribe((value) => {
      if (value != null) {
        const projects = value as Project[];

        if (!this.initializedProjects) {
          this.updateProjects(projects, true);
          this.initializedProjects = true;
        }
      }
    });
  }

  //
  // Search item
  //

  public updateSearchItem(searchItem: string) {
    this.searchItem = searchItem;
    this.notify();
  }

  //
  // Tags
  //

  private updateTagsOfTasklets(tasklets: Tasklet[], enable: boolean) {
    tasklets.forEach(tasklet => {
      this.updateTagsList(tasklet.tags, enable);
    });
    this.notify();
  }

  private updateTagsOfTasks(tasks: Task[], enable: boolean) {
    tasks.forEach(task => {
      this.updateTagsList(task.tags, enable);
    });
    this.notify();
  }

  public updateTags(tags: Tag[], enable: boolean, tagsNone: boolean) {
    this.updateTagsList(tags, enable);
    this.updateTagsNone(tagsNone);
    this.notify();
  }

  public updateTagsList(tags: Tag[], enable: boolean) {
    this.updateTagsListInternal(tags, enable);
  }

  private updateTagsListInternal(tags: Tag[], enable: boolean) {

    tags.forEach((t: Tag) => {
      // Deep copy
      const tag = this.cloneService.cloneTag(t);

      if (enable) {
        tag.checked = true;
      }

      this.tags.set(tag.name, tag);
    });
  }

  public updateTagsNone(tagsNone: boolean) {
    this.tagsNone = tagsNone;
  }

  /**
   * Deletes tags from filter tag list that are not in use anymore
   */
  private deleteUnusedTags() {
    this.tags.forEach((outerTag, key) => { // Iterate over all existing tags
      const isContainedInTasklet = Array.from(this.taskletService.tasklets.values())
        .some(tasklet => { // Check if tag is contained in tasklets
          return tasklet.tags.some(innerTag => { // check if tag is contained in tasklet
            return innerTag.name === outerTag.name;
          });
        });
      const isContainedInTask = Array.from(this.taskService.tasks.values())
        .some(task => { // Check if tag is contained in tasks
          return task.tags.some(innerTag => { // check if tag is contained in task
            return innerTag.name === outerTag.name;
          });
        });
      if (!(isContainedInTask || isContainedInTasklet)) { // If tag is not contained in tasklets or tasks, delete from tag list
        this.tags.delete(key);
      }
    });
  }

  //
  // Projects
  //

  public updateProjects(projects: Project[], enable: boolean) {

    projects.forEach((p: Project) => {
      // Deep copy
      const project = this.cloneService.cloneProject(p);

      if (enable) {
        project.checked = true;
      }

      this.projects.set(project.id, project);
    });

    this.notify();
  }

  public updateProjectsNone(projectsNone: boolean) {
    this.projectsNone = projectsNone;
    this.notify();
  }

  /**
   * Clears all currently set filters
   */
  public clearAllFilters() {

    this.clearTagFilter();
    this.clearProjectFilter();
    this.notify();
  }

  /**
   * Clears all tag-related filters
   */
  private clearTagFilter() {
    this.tags.forEach((value) => { // Iterate through tags
      const currentTag = value as Tag;
      currentTag.checked = true; // Activate each tag
    });
    this.tagsNone = true; // Select "elements without tags" tag
  }

  /**
   * Clears all project-related filters
   */
  private clearProjectFilter() {
    this.projects.forEach((value) => { // Iterate through projects
      const currentProject = value as Project;
      currentProject.checked = true; // Activate each project
    });
    this.projectsNone = true; // Select "elements without projects" checkbox
  }

  //
  // Notifications
  //

  public notify() {
    this.filterSubject.next();
  }
}
