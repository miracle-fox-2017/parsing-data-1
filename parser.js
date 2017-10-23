"use strict"
const fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone) {
    this.id = id;
    this.firstname = first_name;
    this.lastname = last_name;
    this.email = email;
    this.phone = phone;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.arr = [];
    this.arrayObj = [];
  }

  bacaFile() {
    this._people = fs.readFileSync('people.csv', 'utf-8').split('\n');
  }

  dataArray() {
    for(let i = 0 ; i < this._people.length ; i++) {
      let pisah = this._people[i].split(',');
      this.arr.push(pisah);
    }
    return this.arr;
  }

  arrayToObject() {
    for(let i = 1 ; i < this.arr.length ; i++) {
        this.arrayObj.push(new Person(this.arr[i][0],this.arr[i][1],this.arr[i][2],this.arr[i][3],this.arr[i][4],this.arr[i][5],this.arr[i][6]))
    }
    return this.arrayObj;
  }

  get people() {
    return this._people;
  }

  addPerson(id,first_name,last_name,email,phone) {
    return this.arrayObj.push(id,first_name,last_name,email,phone);
  }

  save() {

  }

}

let parser = new PersonParser('people.csv')
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// let fabio = new Person(11,'Fabio','Kounang','fabio_kosukeueki@yahoo.com','081242994000')
// console.log(fabio);
// console.log(parser.dataArray());
console.log(parser.bacaFile())
console.log(parser.dataArray());
console.log(parser.arrayToObject());
console.log(parser.addPerson(201,'Fabio','Kounang','fabio_kosukeueki@yahoo.com','081242994000'));
