"use strict"
const fs = require('fs')
const faker = require('faker')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phoneNum, createDate){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNum = phoneNum
    this.createDate = createDate
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    this._people = fs.readFileSync(this._file).toString().split('\n')
    return this._people
  }

  addPerson(personObj) {
    this._people.push(personObj.id+','+personObj.firstName+','+personObj.lastName+','+personObj.email+','+personObj.phoneNum+','+personObj.createDate)
    return this
  }

  save(){

    let people = ''

    this._people.forEach((person, index) =>{
      if(index < this._people.length-1){
        people +=person +'\n'  
      }else{
        people +=person
      }
      
    })

    fs.writeFile(this._file, people, (err)=>{
      if(!err){
        console.log('Data sudah ditambahkan');
      }
    })
  }
}

let parser = new PersonParser('people.csv')
parser.people
//console.log(parser._people);
//parser.addPerson(new Person(parser._people.length-1, 'Ahmad', 'Nizar', 'ahmadnizar.owl@gmail.com', '081279155548', new Date()))
//console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
//console.log(parser._people[201]);
//parser.save()
parser.addPerson(new Person(parser._people.length-1, faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumber(), faker.date.recent()))
parser.save()