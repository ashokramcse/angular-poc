import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdTabsetBasic } from './tabset';
import { Employee } from './employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: FirebaseListObservable<any[]>;
  emp: Employee;
  staticAlertClosed = true;
  public alerts: any = [];
  constructor(db: AngularFireDatabase) {
    this.emp = new Employee()
      this.employees = db.list('https://employee-form-e8cf1.firebaseio.com/employees');
  }

  validate() {
    if(this.emp.name.length == 0) {
      return false;
    }
    if(this.emp.gender.length == 0) {
      return false;
    }
    if(this.emp.dept.length == 0) {
      return false;
    }
    if(this.emp.desc.length == 0 || this.emp.desc.length > 200) {
      return false;
    }
    if(this.emp.name.length == 0) {
      return false;
    }
    return true;
  }

  alertClosed() {
    console.log("closed");
    this.alerts = new Array();
  }

  saveToServer() {
    if(this.alerts.length > 0) {
      console.log("Alert displayed, ignoring save");
      return;
    }

    if(!this.validate()) {
    this.alerts.push({
          type: 'danger',
          msg: `Please enter valid information`,
          timeout: 5000,
          callback: function() {
            console.log("closed");
          }
    });   
      return;
    }
    console.log(this.emp)
    this.employees.push(this.emp);
   
    this.alerts.push({
          type: 'info',
          msg: `The record is saved successfully!!!`,
          timeout: 5000,
    });   
    this.clearForm();
  }
  clearForm() {
    console.log("clearForm")
    this.emp = new Employee();    
  }

  gender(checked) {
    this.emp.gender = checked ? "Male" : "Female";
  }

  getBenefit(benefit) {
      var val = "PF : " + (benefit.pf == true ? "Yes" : "No");
      val += ", Insurance : " + (benefit.insurance == true ? "Yes" : "No");
      return val;
  }

}
