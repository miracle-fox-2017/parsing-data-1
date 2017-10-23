"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
  this.id = id,
  this.first_name = first_name,
  this.last_name = last_name,
  this.email = email,
  this.phone = phone,
  this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file,
    this._people = [],
    this.newData = ''

  }

  call(){
  let dataPeople = fs.readFileSync(this._file).toString().split('\n')

    for(let i = 1; i < dataPeople.length; i++){
      let indeks = dataPeople[i].split(',')
      let value = new Person (indeks[0],indeks[1],indeks[2],indeks[3],indeks[4],
                              indeks[5])
      this._people.push(value)
    }

    return this._people
  }

  get people() {
    let obj = {
      data : this._file,
      size : this._file.length
    }
    return obj
  }

  addPerson(obj) {
    this._people.push(obj)
    this.newData =  obj.id + ',' + obj.first_name + ',' + obj.last_name + ',' + obj.email + ',' + obj.phone + ',' + new Date()
    return this.newData
  }

  save(){
    fs.appendFileSync('people.csv', this.newData, 'utf8')
  }

}

var fs = require('fs')
let parser = new PersonParser('people.csv')

console.log(parser.call());
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)

parser.addPerson(new Person(201, 'azharie', 'muhammad','azharie@mail.com', '088812', new Date()))

console.log(parser.people[200]);
console.log(parser.newData);
parser.save()
