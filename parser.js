"use strict"

let fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._people = null
    this.inputToFile = ''
  }

  bacaFile() {
    let data = fs.readFileSync(this._file, 'utf8').split('\n')
    let dataPeople = []
    for(let i = 1; i < data.length; i++) {
      var pisahKoma = data[i].split(',')
      dataPeople.push(new Person(pisahKoma[0], pisahKoma[1], pisahKoma[2], pisahKoma[3], pisahKoma[4], pisahKoma[5]))
    }
    return dataPeople
  }

  get file() {
    return this._file
  }

  set people(dataPeople) {
    this._people = dataPeople
  }

  get people() {
    let obj = {
      data: this._people,
      size: this._people.length-1 //karena dimulai dari index ke - 0
    }
    return obj
  }

  addPerson(first_name, last_name, email, phone) {
    this._people.push(new Person(this._people.length+1, first_name, last_name, email, phone, new Date()))
    // this.inputToFile = `${this._people.length-1},${first_name},${last_name},${email},${phone},${new Date()}\n`
  }

  save() {
    // fs.appendFileSync(this._file, this.inputToFile, 'utf8')
    let convert = [Object.keys(this._people[0])]
    for(let i = 0; i < this._people.length; i++) {
      convert.push(Object.values(this._people[i]))
    }
    convert = convert.join('\n');
    console.log(convert);
    fs.writeFileSync(this._file, convert, 'utf8')
  }

}

let parser = new PersonParser('people.csv')
// parser.bacaFile()
parser.people = parser.bacaFile()
parser.addPerson('Zuhri', 'Nurhuda', 'zuhri.nurhuda@gmail.com', '085258588122')
parser.save()
parser.addPerson('Davina', 'Bonadilla', 'davina.bonadilla@gmail.com', '085000000000')
parser.save()
// console.log(parser.people[200])
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
