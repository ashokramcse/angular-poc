import { Component, Input, Output, EventEmitter } from '@angular/core';

export class Employee {
    name: String;
    age: Number;
    gender: String;
    dept: String;
    benefits : Benefits;
    desc: String;
    constructor() {
        this.name = "";
        this.age = 0;
        this.gender = "";
        this.dept = "";
        this.benefits = new Benefits();
        this.desc = "";
    }

}

export class Benefits {
    pf: boolean;
    insurance: boolean;
    constructor() {
        this.pf = false;
        this.insurance = false;
    }
}