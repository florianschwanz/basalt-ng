import {inject, TestBed} from '@angular/core/testing';

import {FilterService} from './filter.service';
import {EntityImports} from '../entity.imports';
import {EntityProviders} from '../entity.providers';
import {PouchDBService} from '../../persistence/services/pouchdb.service';
import {PouchDBServiceMock} from '../../persistence/services/pouchdb.service.mock';
import {PouchDBSettingsService} from '../../persistence/services/pouchdb-settings.service';
import {PouchDBSettingsServiceMock} from '../../persistence/services/pouchdb-settings.service.mock';
import {CloneService} from './clone.service';
import {TaskletService} from './tasklet/tasklet.service';
import {TaskService} from './task/task.service';
import {ProjectService} from './project/project.service';
import {TagService} from './tag/tag.service';
import {PersonService} from './person/person.service';

describe('FilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EntityImports],
      providers: [EntityProviders,
        CloneService,
        TaskletService,
        TaskService,
        ProjectService,
        TagService,
        PersonService,
        {provide: PouchDBService, useClass: PouchDBServiceMock},
        {provide: PouchDBSettingsService, useClass: PouchDBSettingsServiceMock}]
    });
  });

  it('should be created', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));
});
