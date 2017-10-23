'use strict'

let fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  addPerson(obj) {
    this._people.push(obj);
    return this._people;
  }

  readInput() {

    let arr = fs.readFileSync('./people.csv').toString().split('\n');
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].split(','));
    }

    return this.newArr = newArr;
  }

  convertToObject() {
    let objArr = [];
    for (let i = 1; i < this.newArr.length - 1; i++) {
      // console.log(this.newArr[i][0]);
      let obj = new Person(this.newArr[i][0], this.newArr[i][1], this.newArr[i][2], this.newArr[i][3], this.newArr[i][4], this.newArr[i][5]);
      this._people.push(obj);
    }
  }

  get people() {
    let obj = {
      people: this._people,
      size: this._people.length,
    };

    return obj;
  }

  get file() {
    return this._file;
  }

  save() {
    let str = 'id, first_name, last_name, email, phone, created_at' + '\n';
    for (var i = 0; i < this.people.length; i++) {
      str += this.people[i].id + ',';
      str += this.people[i].first_name + ',';
      str += this.people[i].last_name + ',';
      str += this.people[i].email + ',';
      str += this.people[i].phone + ',';
      str += this.people[i].created_at + '\n';
    }

    console.log(str);
    fs.writeFile('people.csv', str);
  }
}

let parser = new PersonParser('people.csv');
parser.readInput();
parser.convertToObject();
// parser.addPerson(new Person('201', 'Chris', 'Tobing', 'christiantobs@gmail.com', '081299407983', Date()));
// parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
