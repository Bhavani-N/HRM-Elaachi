import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] 
})
export class UserProfileComponent implements OnInit {
  Employee: Employee[];

  constructor(private empService: UserService) { }

  ngOnInit() {
    let s = this.empService.getEmployeesList();
    s.snapshotChanges().subscribe(data => {
        this.Employee = [];
        data.forEach(item => {
          let a = item.payload.toJSON();
          a['$id']= item.key;
          this.Employee.push(a as Employee);
        })
    })
  }

}
