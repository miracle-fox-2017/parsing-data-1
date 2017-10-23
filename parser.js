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
    this._people = []
  }

  get people(){

    let peopleString = fs.readFileSync(this._file).toString().split('\n')
    
    for(let i=0; i<peopleString.length; i++){
      peopleString[i] = peopleString[i].split(',')
    }

    peopleString.forEach(people =>{
      this._people.push(new Person(people[0], people[1], people[2], people[3], people[4], people[5]))
    })

    let objPeople = {
      size : this._people.length-1
    }

    return objPeople
  }

  addPerson(personObj) {
    this._people.push(personObj)
  }

  save(){

    let people = ''

    this._people.forEach((person, index) =>{
      if(index < this._people.length-1){
        people +=this.objToString(person)+'\n'  
      }else{
        people +=this.objToString(person)
      }
    })

    fs.writeFileSync(this._file, people)
  }

  objToString(obj){
    return obj.id+','+obj.firstName+','+obj.lastName+','+obj.email+','+obj.phoneNum+','+obj.createDate
  }
}

let parser = new PersonParser('people.csv')
// //console.log(parser._people);
// //parser.addPerson(new Person(parser._people.length-1, 'Ahmad', 'Nizar', 'ahmadnizar.owl@gmail.com', '081279155548', new Date()))
// //console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// //console.log(parser._people[201]);
// //parser.save()
parser.people
parser.addPerson(new Person(parser._people.length-1, faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumber(), faker.date.recent()))
parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)