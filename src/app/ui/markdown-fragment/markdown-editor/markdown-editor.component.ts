import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Displays markdown editor
 */
@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {

  /** Text to be displayed */
  @Input() text = '';
  /** Placeholder to be used */
  @Input() placeholder = '';
  /** Whether component is readonly or not */
  @Input() readonly = false;
  /** Event emitter indicating changes in description */
  @Output() textChangedEmitter = new EventEmitter<string>();

  //
  // Actions
  //

  /**
   * Handles click on clear button
   */
  onClearButtonClicked() {
    this.text = '';
  }

  /**
   * Handles changes in description markdownText
   */
  onTextChanged() {
    this.textChangedEmitter.emit(this.text);
  }
}
