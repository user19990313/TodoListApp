import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public todolist: TodoItem[] = [];
  @ViewChild('newItemTitle')
    input!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.http.get<TodoItem[]>('/api/todolist').subscribe(
      (result) => {
        this.todolist = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editItem(item: TodoItem) {
    if (!item.isDeleted) {
      let newTitle = prompt("Edit description:", item.title);
      if (newTitle === null)
        return;
      if (newTitle.length > 0) {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        this.http.post('/api/todolist/' + item.id + '/edit', JSON.stringify(newTitle), options).subscribe(
          (result) => {
            item.title = newTitle;
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        alert("Description cannot be empty!");
      }
    }
  }

  deleteItem(item:TodoItem) {
    if (!item.isDeleted) {
      if (!confirm("Are you sure you want to delete this todo item?"))
        return;
      this.http.get('/api/todolist/' + item.id + '/delete').subscribe(
        (result) => {
          item.isDeleted = true;
          this.todolist = this.todolist.filter(item => !item.isDeleted);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  toggleItem(item: TodoItem) {
    if (!item.isDeleted) {
      this.http.get('/api/todolist/' + item.id + '/toggle').subscribe(
        (result) => {
          item.isCompleted=!item.isCompleted;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  addItem() {
    if (this.input.nativeElement.value.length > 0) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = { headers: headers };
      this.http.post('/api/todolist/create', JSON.stringify(this.input.nativeElement.value), options).subscribe(
        (result) => {
          this.input.nativeElement.value = "";
          this.getTodoList();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert("Please add a description for the new todo item!");
    }
  }

  title = 'todolistapp.client';
}
