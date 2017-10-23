"use strict"
const fs = require('fs')

class Person {
  constructor(id = 0, first_name, last_name, email, phone, created_at = new Date()) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._dataRaw = []
    this._people = []

  }

  readData() {
    this._dataRaw = fs.readFileSync(this._file).toString().split("\n")
    return this._dataRaw
  }

  get file() {
    return this._file
  }

  set people(dataPerson) {
    for (let i = 0; i < dataPerson.length; i++) {
      let dataPersonSplit = dataPerson[i].split(",")
      this._people.push(new Person(dataPersonSplit[0], dataPersonSplit[1], dataPersonSplit[2], dataPersonSplit[3], dataPersonSplit[4], dataPersonSplit[5]))
    }

  }


  get people() {
    let obj = {
      data: this._file,
      size: this._dataRaw.length
    }
    return obj
  }

  addPerson(dataPerson) {
    let id = this._dataRaw.length


    let newData = id + ',' + dataPerson.first_name + ',' + dataPerson.last_name + ',' + dataPerson.email + ',' + dataPerson.phone + ',' + dataPerson.created_at.toISOString()
    this.people = [newData]
  }

  save() {
    let newDataPerson = "\n" + this._people[this._people.length - 1].id + ',' + this._people[this._people.length - 1].first_name + ',' + this._people[this._people.length - 1].last_name + ',' + this._people[this._people.length - 1].email + ',' + this._people[this._people.length - 1].phone + ',' + this._people[this._people.length - 1].created_at
    fs.appendFileSync('people.csv', newDataPerson)
  }

}


let parser = new PersonParser('people.csv')
parser.readData()
parser.people = parser._dataRaw
parser.addPerson(new Person(0, "Amelia", "Rahman", "amel.rahman5@gmail.com", "081318352537"))
parser.save()
// parser.addPerson(new Person(0, "Christian", "Tobing", "christ@gmail.com", "0811111111111"))
// parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
