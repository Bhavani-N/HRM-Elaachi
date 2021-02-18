import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LeaveService } from '../../../../services/leave.service'
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {
//   @ViewChild('appCalendar', { static: false }) appCalendar: ElementRef;
//   public sat = new Array();   //Declaring array for inserting Saturdays
//   public sun = new Array();
//   leaveType: any
//   leavesReamaining: any
//   leavesData:FormGroup;
//   leaveForm:FormGroup;
//   leaveInfo :any =[];
//   dummyArray: any =[];
//   leaveId: any;
//   constructor(private elRef: ElementRef, private leaveService: LeaveService , private fb: FormBuilder) {
    
//   }

  ngOnInit() {
  //   this.leaveTypeData();
  //   this.leavesUsed();
  //   this.leaveInfoForm()
  //   this.leavesData = new FormGroup({
  //     leaveType: new FormControl()
  //  });
  //   let d = new Date();
  //   var getTot = this.daysInMonth(d.getMonth(), d.getFullYear()); //Get total days in a month
  //   //Declaring array for inserting Sundays

  //   for (var i = 1; i <= getTot; i++) {    //looping through days in month
  //     var newDate = new Date(d.getFullYear(), d.getMonth(), i)
  //     if (newDate.getDay() == 0) {   //if Sunday
  //       this.sun.push(i);
  //     }
  //     if (newDate.getDay() == 6) {   //if Saturday
  //       this.sat.push(i);
  //     }

  //   }
  //   console.log(this.sat);
  //   console.log(this.sun);
  }

//   daysInMonth(month, year) {
//     return new Date(year, month, 0).getDate();
//   }

  ngAfterViewInit() {
    // console.log(this.appCalendar)
    // let d = new Date();
    // console.log(d, d.getMonth())
    // console.log(d.getMonth(), d.getFullYear())
    // var getTot = this.daysInMonth(d.getMonth(), d.getFullYear());
    // console.log(getTot)
    // for(let day= 1; day <= getTot; day++) {
    //   const isWeekend = day => {
    //     let newDate= new Date(d.getFullYear(),d.getMonth(),day)
    //     console.log(newDate)
    //     if(newDate.getDay()==0){   //if Sunday
    //       this.sun.push(day);
    //     }
    //     if(newDate.getDay()==6){   //if Saturday
    //       this.sat.push(day);
    //     }
    //     return newDate.getDay() == 6  || newDate.getDay() == 0;
    //   } 
    //   console.log(this.sat);
    //   console.log(this.sun);

    //   console.log(this.getDayName(day));
    //   const weekend = isWeekend(day)
    //   console.log(weekend);
    //   let name = "";
    //   if (day <= 7) {
    //     const dayName = this.getDayName(day);
    //     name = `<div class="name">${dayName}</div>`
    //   }
    //   const dayName = this.getDayName(day);
    //   const days = this.getDays(day);
    //   console.log(days)
    //   this.appCalendar.nativeElement.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}">
    //   ${name}${day}</div>`);
    //   console.log(day);
    // }
    // this.elRef.nativeElement.querySelectorAll("#app-calendar .day").forEach(day => {
    //   console.log(day);
    //   day.addEventListener("click", event => {
    //     console.log(event.currentTarget)
    //     event.currentTarget.classList.toggle("selected");
    //   });
    // });
  }

//   getDayName(day) {
//     const curr = new Date();
//     const getYear = curr.getFullYear();
//     const getMonth = curr.getMonth();
//     const date = new Date(Date.UTC(getYear, 3, day));
//     console.log(date);
//     return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
//   }

//   getDays(day) {
//     const curr = new Date();
//     console.log(curr.getDay());
//     return
//   }

//   onClick() {
//     console.log('working');
//   }
//   leaveTypeData() {
//     this.leaveService.leaveType().subscribe((res: any) => {
//       console.log(':::::::>>>>>>>>>>>>>>>>>>>>>', res);
//       this.leaveType = res.result;
      

//     })

     
     
//   }
//   leavesUsed() {
//     this.leaveService.userLeave().subscribe((res: any) => {
//       this.leavesReamaining = res.data;
//       console.log(this.leavesReamaining);
//     })
     
   
//   }
//   getData(data){
//   console.log(data);
//   this.leaveId = data.leaveType._id;
//   console.log(this.leaveId);
//   this.leavesReamaining.value=this.leaveId
//   console.log(this.leavesReamaining);
//  }
  
//   // this.leaveType.filter(leave=>{
//   //   this.leaveInfo.push(leave._id)
//   //   console.log(leave._id)
//   //   console.log(this.leaveInfo)
//     // this.dummyArray=[]
//     // this.leavesReamaining.map(obj=>{
//     //   console.log(obj._id)
//     //   if (leave._id == obj._id) {
//     //     this.dummyArray.push(obj)
//     //     console.log(this.dummyArray)
//     //   }
//     // })
//   //  })
  
//   leaveInfoForm(){
//     this.leaveForm = this.fb.group({

//     });
//   }
//   onSubmit(){
//     // this.leaveForm.value['leave']=this.leaveInfo
//     console.log('Your form data : ', this.leaveForm.value );
//   }
}
