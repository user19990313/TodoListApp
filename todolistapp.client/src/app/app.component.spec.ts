import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get todo list', () => {
    const mockTodolist = [
      { "id": 0, "title": "abc", "isCompleted": false, "isDeleted": false },
      { "id": 1, "title": "def", "isCompleted": true, "isDeleted": false },
      { "id": 2, "title": "ghi", "isCompleted": false, "isDeleted": false }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('/api/todolist');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodolist);

    expect(component.todolist).toEqual(mockTodolist);
  });
});
