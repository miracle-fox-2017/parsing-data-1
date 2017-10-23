"use strict"


let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createAt){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createAt = createAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    this._people = fs.readFileSync(this._file).toString().split('\n');
    let obj = {
        data: this._people,
        size: this._people.length-1,
     }

    return obj;
  }

  getNewObj(){
    this._people = fs.readFileSync(this._file).toString().split('\n');
    let newPeople = [];

    for(let i = 1; i < this._people.length; i++) {
      var newArrPeople = this._people[i].split(',')
      console.log(newArrPeople);
      newPeople.push(new Person(newArrPeople[0], newArrPeople[1], newArrPeople[2], newArrPeople[3],newArrPeople[4],newArrPeople[5] ))
    }
    return newPeople;
  }


  addPerson(firstName, lastName, email, phone, createAt) {
    this._people.push(this._people.length-1, firstName, lastName, email, phone, createAt)
  }
}

let parser = new PersonParser('people.csv')

console.log(parser.getNewObj());

parser.addPerson('riski','n','riski@gmail.com','0990890842',new Date())

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
