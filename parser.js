
"use strict"
var fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id,
    this.first_name = first_name,
    this.last_name =last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;

    this._people = [];
  }

  datapeople(){
    //let filedata = this._people;
    let dataPeople = fs.readFileSync('people.csv').toString().split('\n')
    let dataarr = []
    //console.log(dataPeople);
    for (var i = 1; i < dataPeople.length; i++) {
      let ubh = dataPeople[i].split(',')
      //console.log(ubh);
      let dataPerson = new Person(ubh[0],ubh[1],ubh[2],ubh[3],ubh[4],ubh[5])
      dataarr.push(dataPerson)
    }
    return dataarr
  }

  set people(data) {
    this._people = data;
  }

  get people() {
    let obj = {
      data: this._people,
      size: this._people.length-1
    }
    return obj
  }

  addPerson(arr) {
    this.addData = arr
    return this.addData
  }
  save()  {
    fs.appendFileSync('people.csv', this.addData +new Date()+'\n')
  }

  // addPerson(first_name, last_name,email,phone) {
  //   this._people.push(first_name,last_name,email,phone)
  //   return this._people
  // }
  // save()  {
  //
  //   fs.appendFileSync('people.csv', this.addData + new Date() +'\n')
  // }
}

let parser = new PersonParser('people.csv')
//parser.datapeople()
parser.addPerson(['202,ilham,tes,tes1.@gmail.com,0930932323'])
parser.save()
parser.people = parser.datapeople()
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)

console.log(parser.people);
