import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TaskletsService} from '../../../services/tasklets.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
  selector: 'app-todos-toolbar',
  templateUrl: './todos-toolbar.component.html',
  styles: [require('./todos-toolbar.component.scss')]
})
export class TodosToolbarComponent implements OnInit {
  @Input() title;
  @Output() onSearchItemChanged = new EventEmitter<string>();
  @Output() onMenuItemClicked = new EventEmitter<string>();

  searchOptions = [];
  filteredSearchOptions: Observable<string[]>;

  debouncer = new Subject();

  formControl: FormControl = new FormControl();

  constructor(private taskletsService: TaskletsService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic_menu_white_24px.svg'));
    iconRegistry.addSvgIcon('label_white', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic_label_outline_white_24px.svg'));
    iconRegistry.addSvgIcon('list_white', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic_list_white_24px.svg'));
    iconRegistry.addSvgIcon('more_white', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic_more_vert_white_24px.svg'));
  }

  ngOnInit() {
    this.searchOptions = this.taskletsService.suggestedSearchItems;

    this.filteredSearchOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterSearchItems(value))
      );

    this.debouncer.pipe(
      debounceTime(300)
    ).subscribe((value) => this.onSearchItemChanged.emit(value.toString()));
  }

  onClickMenuItem(menuItem: string): void {
    this.onMenuItemClicked.emit(menuItem);
  }

  onClickInput() {
    this.searchOptions = this.taskletsService.suggestedSearchItems;
  }

  onChangeSearchItem(searchItem: string): void {
    this.debouncer.next(searchItem);
  }

  filterSearchItems(val: string): string[] {
    return this.searchOptions.filter(option =>
      option.toLowerCase().includes(val.toLowerCase())
    );
  }
}
