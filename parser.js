"use strict"
const fs = require('fs')
class Person {
  construcor(id,firstname,lastname,email,phone,date){
    this.id=id;
    this.firstname=firstname;
    this.lastname=lastname;
    this.email=email;
    this.phone=phone;
    this.created_at=date;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.data=[]

  }
  bacaFile(){
    this._people = fs.readFileSync('./people.csv','UTF-8').split('\n')
  }
  convertData(){
    this.bacaFile()
    let peopleSplit=[]


    //split isi data sesuai banyak properti
    for(let i=0;i<this._people.length;i++){
        this._people[i].split(',');
      for(let j=0;j<this._people[i].length;j++){
        peopleSplit = this._people[i].split(',');

      }
      this.data.push(peopleSplit);
    }
    return this;
  }

set people(obj){

    this.convertData()
    // console.log(this.data)
    for(let i=1;i<this.data.length;i++){
    let obj={}
      obj[this.data[0][0]]= this.data[i][0]
      obj[this.data[0][1]]= this.data[i][1]
      obj[this.data[0][2]]= this.data[i][2]
      obj[this.data[0][3]]= this.data[i][3]
      obj[this.data[0][4]]= this.data[i][4]
      obj[this.data[0][5]]= this.data[i][5]

    this._people.push(obj);
    }
}

  get people() {
    return this._people
  }

  addPerson(obj) {
    this.people = obj;

  }
}

// ;
let parser = new PersonParser('people.csv')
parser.addPerson(new Person('201','Mandra','Gade','Manda@gade.com','121212','2018-07-15T12:06:16-08:00'))
console.log(parser.people)
// console.log(parser.convertData());
// console.log(parser.people)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
