"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstname, lastname, email, phone, createdAt){
      this.id = id
      this.first_name = firstname
      this.last_name = lastname
      this.email = email
      this.phone = phone
      this.created_at = createdAt
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.new_person = []
  }

  parse(){
    let csv = fs.readFileSync('people.csv', 'utf8')
    let data_people = csv.split('\n')
    let value = []

    for(let i = 1; i < data_people.length; i++){
      value.push(data_people[i].split(','))
    }

     value.forEach(item=>{
       this._people.push(new Person(
         item[0],
         item[1],
         item[2],
         item[3],
         item[4],
         item[5]
       ))
     })

  }

  get people() {
   let  obj = {
      people:this._people,
      size:this._people.length
    }
    return obj
  }

  get file(){
    return this._file
  }

  addPerson(obj) {
    let value = `\n${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.created_at}`
    this.new_person = value

  }

  save(){
    // console.log(this.people[0]);
    fs.appendFileSync('people.csv', this.new_person, 'utf8')
    return console.log('data telah di save');
  }

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.parse();
// parser.addPerson(new Person('201','tes','tes','tes@gmail.com','12345', Date()))
// // console.log(parser.people);
// parser.save()

// console.log(parser.people);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
