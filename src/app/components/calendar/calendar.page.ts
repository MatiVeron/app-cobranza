import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = [];
  viewTitle : string;

  calendar = {
    mode:'month',
    currentDate:new Date()
  };


  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor() { }

  ngOnInit() {
  }


  next(){
  this.myCal.slideNext();
}


back(){
  this.myCal.slidePrev();
}

onViewTitleChanged(title){
  this.viewTitle = title;
}

}
