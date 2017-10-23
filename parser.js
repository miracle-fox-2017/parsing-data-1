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
    this._people = this.getNewObj();
    this.newData = ''
  }

  get people() {
    // this._people = fs.readFileSync(this._file).toString().split('\n');
    let obj = {
        data: this._people,
        size: this._people.length-1,
     }

    return obj;
  }

  getNewObj(){
    let data = fs.readFileSync(this._file).toString().split('\n');
    let newPeople = [];

    for(let i = 1; i < data.length; i++) {
      var newArrPeople = data[i].split(',')
      // console.log(newArrPeople);
      newPeople.push(new Person(newArrPeople[0], newArrPeople[1], newArrPeople[2], newArrPeople[3],newArrPeople[4],newArrPeople[5] ))
    }
    // console.log(newPeople);
    return newPeople;
  }


  addPerson(firstName, lastName, email, phone, createAt) {
    this._people.push(new Person(this._people.length-1, firstName, lastName, email, phone, createAt))
    this.newData =`${this._people.length-1},${firstName},${lastName},${email},${phone},${createAt}\n`
  }

  save(){
    fs.appendFileSync(this._file, this.newData, 'utf8')
  }
}

let parser = new PersonParser('people.csv')


parser.addPerson('riski','n','riski@gmail.com','0990890842',new Date())
parser.save();
parser.addPerson('nugroho','putra','np@gmail.com','126357132',new Date())
parser.save();
console.log(parser.people.data);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
