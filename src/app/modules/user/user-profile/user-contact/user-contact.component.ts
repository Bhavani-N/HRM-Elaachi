import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.css']
})
export class UserContactComponent implements OnInit {
  Employee: Employee[];

  constructor(private route: ActivatedRoute, private router: Router, private empService: UserService) { }

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

  onEdit() {
    this.router.navigate(['../edit'], {relativeTo: this.route})
  }
}
