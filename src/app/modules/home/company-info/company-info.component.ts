import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit, AfterViewInit {
  tbl: any;
  currMonth: any;
  currYear: any;
  selectYear: any;
  selectMonth: any;
  monthAndYear: any;
  currDate: any;
  cell: any;
  cellText;
  months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private elRef: ElementRef) {
    console.log(elRef)
  }

  ngOnInit() {
    this.currDate = this.getCalendar().today;
    this.currMonth = this.getCalendar().currentMonth;
    this.currYear = this.getCalendar().currentYear;
    this.selectYear = this.elRef.nativeElement.querySelector("#year");
    this.selectMonth = this.elRef.nativeElement.querySelector("#month");
    this.monthAndYear = this.elRef.nativeElement.querySelector("#monthAndYear");
    this.showCalendar(this.currMonth, this.currYear);
  }

  ngAfterViewInit() {

  }

  getCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return { today, currentMonth, currentYear }
  }

  next() {
    this.currYear = (this.currMonth === 11) ? this.currYear + 1: this.currYear;
    this.currMonth = (this.currMonth + 1) % 12;
    // console.log(this.currYear, this.currMonth);
    this.showCalendar(this.currMonth, this.currYear);
  }

  previous() {
    this.currYear = (this.currMonth === 0) ? this.currYear - 1: this.currYear;
    this.currMonth = (this.currMonth === 0)? 11: this.currMonth - 1;
    // console.log(this.currYear, this.currMonth);
    this.showCalendar(this.currMonth, this.currYear);
  }

  jump() {
    this.currYear = parseInt(this.selectYear.value);
    this.currMonth = parseInt(this.selectMonth.value);
    this.showCalendar(this.currMonth, this.currYear);
  }

  showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    this.tbl = this.elRef.nativeElement.querySelector('#calendar-body');
    this.tbl.innerHTML = "";
    this.monthAndYear.innerHTML = this.months[month] + " " + year;
    this.selectYear.value = year;
    this.selectMonth.value = month;
    let date = 1;
    for (let i=0; i <6; i++){
      let row = document.createElement("tr");
       //creating individual cells, filing them up with data.
       for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
            this.cell = document.createElement("td");
            this.cellText = document.createTextNode("");
            this.cell.appendChild(this.cellText);
            row.appendChild(this.cell);
        }
        else if (date > this.daysInMonth(month, year)) {
            break;
        }

        else {
            this.cell = document.createElement("td");
            this.cellText = document.createTextNode(date);
            if (date === this.currDate.getDate() && year === this.currDate.getFullYear() && month === this.currDate.getMonth()) {
                this.cell.classList.add("bg-info");
            } // color today's date
            this.cell.appendChild(this.cellText);
            row.appendChild(this.cell);
            date++;
        }
    }

    this.tbl.appendChild(row); // appending each row into calendar body.
    }
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

}

