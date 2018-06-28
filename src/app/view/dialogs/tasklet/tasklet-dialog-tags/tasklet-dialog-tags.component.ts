import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../../../model/tag.model';
import {Tasklet} from '../../../../model/entities/tasklet.model';

@Component({
  selector: 'app-tasklet-dialog-tags',
  templateUrl: './tasklet-dialog-tags.component.html',
  styleUrls: ['./tasklet-dialog-tags.component.scss']
})
export class TaskletDialogTagsComponent implements OnInit {
  @Input() tasklet: Tasklet;
  @Input() tags: Tag[] = [];
  @Input() newTags: Tag[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * is being called whenever there are changed made to the list of tags in a tasklet
   */
  tagChanged() {
    let hasEmptyTag = false; // holds information about whether there is an empty tag in the list of tags or not

    this.newTags.forEach((t: Tag, loopIndex: number) => {
      if (t.name.trim().length === 0) { // if the tag is empty
        hasEmptyTag = true; // set the tag
        t.checked = false; // remove the tick from the checkbox

        // If the current empty tag is at second last position, pop the last tag
        if ( loopIndex === this.newTags.length - 2 ) {

         this.newTags.pop();

        } else if ( loopIndex < this.newTags.length - 2) {

          // if the current empty tag is before second last position, splice array
          this.newTags.splice(loopIndex, 1);
          // TODO: Switch cursor focus to the empty tag after splicing

         } else {
          // If the current empty tag is at the end of the list, do nothing
        }

      } else {
        t.checked = true; // if the tag has content, i.e. user starts typing, tick the checkbox
      }
    });

    if (!hasEmptyTag) {
      this.newTags.push(new Tag('', false));
    }
  }

}
