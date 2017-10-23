"use strict"
const fs = require('fs');

class Person {
  constructor(id,first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at)
  }
}
class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    var size = {
      data : this._people,
      size : this._people.length
    }
    return size
  }
  bacaFile() {
    let dataRaw = fs.readFileSync(this._file, 'utf-8').split("\n")
    // console.log(file);
    let data = [];
    for(let i = 1; i <= dataRaw.length-1; i++){
      // data.push(file[i].split(',')) //data sudah ditampung di dalam array

      let temp = dataRaw[i].split(',');
      data.push(new Person(temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]))

    }
    // console.log(data[data.length-1]);
    ;
    this._people = data;
    console.log(this._people);
    // return JSON.stringify(this._people,null,4)
  }

  addPerson(add) {
    this._people.push(add)
    // console.log(this._people[this._people.length-1]);
    return this._people
  }

  save() {
    let str = ''
    let data = JSON.parse(JSON.stringify(this._people))
    // console.log(this._people);
    // console.log("======",data[this._people.length]);
    for(let i = 0; i < data.length; i++){
      str +=  data[i].id + ','
      str +=  data[i].first_name + ','
      str +=  data[i].last_name + ','
      str +=  data[i].email + ','
      str +=  data[i].phone + ','
      str +=  new Date(data[i].created_at).toISOString() + '\n'
    }
    // console.log(str);
    // console.log(this._file);
    fs.writeFileSync(this._file, str, 'utf-8')//this.file,str,utf-8/
    return str

  }
}



let parser = new PersonParser('people.csv');
parser.bacaFile()

// console.log(parser._people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser.addPerson(new Person('201', 'febriliando', 'putra', 'fbril@gm.co', '077251', '1-314-890-5249,2012-04-21T01:57:17-07:00')));
console.log(parser.save());
// console.log(parser.people);
