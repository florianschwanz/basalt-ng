import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskDialogComponent} from './task-dialog.component';
import {TimelineImports} from '../../../timeline.imports';
import {TimelineDeclarations} from '../../../timeline.declaration';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PouchDBService} from '../../../../../core/persistence/services/pouchdb.service';
import {PouchDBServiceMock} from '../../../../../core/persistence/services/pouchdb.service.mock';
import {PouchDBSettingsService} from '../../../../../core/persistence/services/pouchdb-settings.service';
import {PouchDBSettingsServiceMock} from '../../../../../core/persistence/services/pouchdb-settings.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimelineImports, BrowserAnimationsModule],
      declarations: [TimelineDeclarations],
      providers: [
        {provide: PouchDBService, useClass: PouchDBServiceMock},
        {provide: PouchDBSettingsService, useClass: PouchDBSettingsServiceMock},
        {provide: MAT_DIALOG_DATA, useValue: {}}, {
          provide: MatDialogRef, useValue: {
            close: jasmine.createSpy('close')
          }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
