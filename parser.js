"use strict"
const fs = require('fs')
const faker = require('faker')

// faker
let randomId = faker.random.number()
let randomFirstName = faker.name.firstName()
let randomLasttName = faker.name.lastName()
let randomEmail = faker.internet.email()
let randomPhone = faker.phone.phoneNumberFormat()


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.Id        = id
    this.FirstName = first_name
    this.LastName  = last_name
    this.Email     = email
    this.Phone     = phone
    this.CreatedAt = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file     = file
    this._people   = []
    this.newPeople = ''
  }

  getFile(){
    let getData = fs.readFileSync('people.csv', 'utf-8').toString().split('\n')

    for(let i=1; i<getData.length-1; i++){
      let indexData = getData[i].split(',')
      // console.log('<<<<<<<<<< ',indexData);
      let value_property_person = new Person(indexData[0],indexData[1],indexData[2],indexData[3],indexData[4],new Date(indexData[5]))
      this._people.push(value_property_person)
    }
    return this._people
  }

  get file(){
    return this._file
  }

  get people() {
    let obj = {
      data : this._people,
      size : this._people.length,
    }

    return obj
  }

  addPerson(addData) {
    // console.log('>>>> addPerson', addData.Id)
    this._people.push(addData)
    this.newPeople = `\n ${addData.Id},${addData.FirstName},${addData.LastName},${addData.Email},${addData.Phone},${addData.CreatedAt}`
    return this._people
    // return this._people
  }

  save(){
    // console.log('>>>>>>JSON', (JSON.stringify(this._people)).toString())
    fs.appendFileSync('data.csv', this.newPeople, 'utf8')
    console.log('saved !');
  }

}

let parser = new PersonParser('people.csv')


parser.getFile()
// console.log(parser.getFile())
parser.addPerson(new Person(`${randomId}`, 'aditya', 'reza', 'lete.note3@gmail.com', '085959777098', new Date()))
parser.addPerson(new Person(`${randomId}`,`${randomFirstName}`,`${randomLasttName}`,`${randomEmail}`,`${randomPhone}`, new Date()))

parser.save()
console.log('>>>>>>', parser.people.data[200])
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

console.log(`>>> test faker <<< ${randomId} - ${randomFirstName} - ${randomLasttName} - ${randomEmail} - ${randomPhone}`)
