"use strict"

let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  parserData(){
    let data = fs.readFileSync(this._file,'utf-8')
    let arrOfData = []
    let pisah = data.split('\n')
    // console.log(pisah);
    for(let i = 1; i < pisah.length-1; i++){
      arrOfData.push(pisah[i].split(','))
    }
    return this.arr = arrOfData
  }

  convertObj(){
    for(let y = 0; y < this.arr.length; y++){
      let obj = new Person(
        this.arr[y][0],
        this.arr[y][1],
        this.arr[y][2],
        this.arr[y][3],
        this.arr[y][4],
        this.arr[y][5]
      );
      this._people.push(obj)
    }
  }

  addPerson(newObj) {
    this._people.push(newObj);
  }

  save(){
    let str = "id,first_name,last_name,email,phone,created_at" + "\n";
    for(var i = 0; i < this._people.length; i++){
      str += this._people[i].id + ","
      str += this._people[i].first_name + ","
      str += this._people[i].last_name + ","
      str += this._people[i].email + ","
      str += this._people[i].phone + ","
      str += this._people[i].created_at + "\n";
    }
    fs.writeFileSync("people2.csv",str);
  }

}

let parser = new PersonParser('people.csv')

parser.parserData()
parser.convertObj()
parser.addPerson(new Person(201,"albert","agung","abc@abc.com","01823124",Date()))
parser.save()

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
