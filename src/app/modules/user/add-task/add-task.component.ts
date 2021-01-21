import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskListArray: any[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTaskList().snapshotChanges()
      .subscribe(item => {
        this.taskListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.taskListArray.push(x);
        })
        this.taskListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
  }

  onAddClick(task){
    this.taskService.addTask(task.value);
    task.value = null;
  }

  onCheckClick(task:string, isChecked) {
    this.taskService.checkOrUnCheckTask(task, !isChecked);
  }

  onDeleteClick(task: string) {
    if (confirm('Are you sure to delete this record?')== true) {
      this.taskService.removeTask(task);
    }
  }

}
