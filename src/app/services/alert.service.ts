import { Injectable } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";
 

import { Alert, AlertType } from "../models/alert";
@Injectable({
  providedIn: 'root'
})
export class AlertService {

    private defaultId = 'default-alert';
    

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
  
    constructor(private router: Router) {
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
            // only keep for a single location change
            this.keepAfterNavigationChange = false;
          } else {
            // clear alert
            this.subject.next();
          }
        }
      });
    }
  
    success(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: "success", text: message });
      setTimeout(() => {
        this.subject.next();
      }, 7000);
    }
  
    info(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: "info", text: message });
      setTimeout(() => {
        this.subject.next();
      }, 7000);
    }
  
    error(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: "error", text: message });
      setTimeout(() => {
        this.subject.next();
      }, 7000);
    }
  
    
  
    getMessage(): Observable<any> {
      return this.subject.asObservable();
    }
    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}