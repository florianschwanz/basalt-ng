import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDialogComponent } from './tag-filter-dialog.component';

xdescribe('TagDialogComponent', () => {
  let component: TagDialogComponent;
  const fixture: ComponentFixture<TagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
