"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._first_name = firstName;
    this._last_name = lastName;
    this._email = email;
    this._phone = phone;
    this._created_at = createdAt;
  }

  get convertPerson() {
    return `${this._id}, ${this._first_name}, ${this._last_name}, ${this._email}, ${this._phone}, ${this._created_at}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    const fs = require('fs');
    let list = fs.readFileSync(this._file, "utf8");
    list = list.split('\n');

    for (let i = 0; i<list.length; i++) {
      list[i] = list[i].split(',') 
    }


    for(let i = 1; i<list.length; i++) {
      let date = new Date(list[i][5]);
      let persons = new Person(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4]);
      this._people.push(persons);
    }


    let obj = {
      data: this._people,
      size: this._people.length , 
    }
    return obj


    return this._people;    
  }

  
    get file() {
      return this._file
  }

  addPerson(peopleObj) {
        this._people.push(peopleObj.convertPerson);
        return this._people;
      }
    
      save() {
        const fs = require('fs');
        fs.appendFileSync(this._file, this._people + '\n', 'utf8');
      }
    
    }
       

let parser = new PersonParser("people.csv");
let myPerson = new Person('201', 'Anang', 'Reza', 'anangreza18@gmail.com', '081316442205', new Date());
// let Person_01 = new Person('202', 'haji', 'lulung', 'hajilulung@gmail.com', '08123772834', new Date());
parser.addPerson(myPerson);
parser.save();
// parser.addPerson(Person_01)
// parser.save()
console.log(parser.people)


console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

