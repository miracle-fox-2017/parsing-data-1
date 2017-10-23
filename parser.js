"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, created){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.created = created;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.arr = []
    this.objArr = []
  }

  get people() {
    // let obj = {
    //   people : this._people,
    //   size : this._people.length,
    // },

    return this._people
  }

  readFile(){
    this._people = fs.readFileSync('people.csv', 'UTF-8').split("\n")

  }

  arrData(){

    for(let i = 0; i < this._people.length; i++){
      this.arr.push(this._people[i].split(',')) // pecah datanya dan masukan menjadi array

    }
    return this.arr[0]
  }

  arrToObj(){
    for(let i = 1; i < this.arr.length; i++){
        this.objArr.push(new Person(this.arr[i][0], this.arr[i][1], this.arr[i][2], this.arr[i][3], this.arr[i][4], this.arr[i][5]))// ngepush array sbg value dari property object `Person`
    }
    return this.objArr
  }

  addPerson(first_name,last_name,email,phone,created) {
    let id = String(this._people.length + 1)

   this._people.push(new Person(id,first_name,last_name,email,phone,created))
  }

}

let fs = require('fs')
let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.readFile()
console.log(parser.arrData());
console.log(parser.arrToObj());
parser.addPerson('zabsi','zazaza','zabsi@drum.com','911','2023-12-30T20:00:03-10.00')
