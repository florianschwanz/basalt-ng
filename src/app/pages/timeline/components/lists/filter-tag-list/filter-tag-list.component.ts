import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Action} from 'app/core/entity/model/action.enum';
import {CloneService} from 'app/core/entity/services/clone.service';
import {Tag} from 'app/core/entity/model/tag.model';

/**
 * Displays filter tag list
 */
@Component({
  selector: 'app-filter-tag-list',
  templateUrl: './filter-tag-list.component.html',
  styleUrls: ['./filter-tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterTagListComponent {

  /** Tag to be displayed */
  @Input() tags = [];
  /** Flag indicating whether entities without tag shall be displayed */
  @Input() tagsNone = false;
  /** Event emitter indicating tag action */
  @Output() tagEventEmitter = new EventEmitter<{ action: Action, tags?: Tag[], tagsNone: boolean }>();

  //
  // Actions
  //

  /**
   * Handles tag event
   * @param event event
   */
  onTagEvent(event: any) {
    this.tagEventEmitter.emit(event);
  }

  /**
   * Handles (de-)selection of none
   * @param tagsNone tags none flag
   */
  onFilterNone(tagsNone: boolean) {
    this.tagEventEmitter.emit({action: Action.FILTER_NONE, tagsNone: tagsNone});
  }

  /**
   * Handles click on button that sets all values to the same
   * @param checked whether to check all filter values or not
   */
  onSetAll(checked: boolean) {
    this.tags.forEach(t => {
      t.checked = checked;
    });
    this.tags = CloneService.cloneTags(this.tags);
    this.tagsNone = checked;

    this.tagEventEmitter.emit({action: Action.FILTER_ALL, tags: this.tags, tagsNone: this.tagsNone});
  }
}
