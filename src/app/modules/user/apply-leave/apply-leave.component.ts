import { AfterViewInit, Component, ElementRef, OnInit, ViewChild ,ViewEncapsulation,} from '@angular/core';
import { isWeekend } from 'date-fns';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLeaveComponent implements OnInit, AfterViewInit {
//  @ViewChild('appCalendar', {static: false}) appCalendar: ElementRef;

  constructor() {}
  
  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    // for(let day= 1; day <= 31; day++) {
    //   console.log(this.getDayName(day));
    //   let name = "";
    //   if (day <= 7) {
    //     const dayName = this.getDayName(day);
    //     name = `<div class="name">${dayName}</div>`
    //   }
    //   const dayName = this.getDayName(day);
    //   this.appCalendar.nativeElement.insertAdjacentHTML("beforeend", `<div class="day">
    //   ${name}${day}</div>`);
    //   console.log(day)
    // }
    // console.log(this.appCalendar)
  }

// <<<<<<< HEAD
//   // getDaysInMonth(month: number, year: number) {
//   //   var date = new Date(year, month, 1);
//   //   // var previousDate = new Date(year, month + 1, 1);
//   //   var days = [];
//   //   while (date.getMonth() === month) {
//   //     days.push(new Date(date));
//   //     date.setDate(date.getDate() + 1);
//   //   }
//     // while (previousDate.getMonth() === month + 1) {
//     //   days.push(new Date(previousDate));
//     //   date.setDate(previousDate.getDate() + 1); 
//     // }
//     // console.log(days) ;

//   }
// =======



  // getDayName(day) {
  //   const curr = new Date();
  //   const getYear = curr.getFullYear();
  //   const date = new Date(Date.UTC(getYear, 0, day));
  //   console.log(date);
  //   return new Intl.DateTimeFormat("en-US",{ weekday: "short" }).format(date); 
  // }
  // getDaysInMonth(month: number, year: number) {

  //   var date = new Date(year, month, 1);

  //   var previousDate = new Date(year, month + 1, 1);

  //   var days = [];

  //   while (date.getMonth() === month) {

  //     days.push(new Date(date));

  //     date.setDate(date.getDate() + 1);

  //   }
    // while (previousDate.getMonth() === month + 1) {

    //   days.push(new Date(previousDate));

    //   date.setDate(previousDate.getDate() + 1); 

    // }

    
// >>>>>>> 753d69f123aed04219303799e76227b4b76c0ee8


 }
