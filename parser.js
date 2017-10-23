"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(first_name,last_name,email,phone,created_at){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    let dat = fs.readFileSync(this._file).toString().split('\n');
    let obj = {
      data: dat,
      size: dat.length-1,
      file: this._file,
    }
    this._people = obj;
    return this._people;
  }

  get file(){
    let file = this._file;
    return file;
  }

  addPerson(obj) {
    let id = this.people.size+1;
    let sekarang = new Date(Date.now()).toISOString();

    //2012-05-13T21:05:15-07:00
    let add = id+','+obj.first_name+','+obj.last_name+','+obj.email+','+obj.phone+','+sekarang;
    this._people.data.push(add);
    return add+' added';
  }

  save(){
    fs.writeFileSync(this._file, this._people.data.join('\n'));
    console.log('Saved!');
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person('aing', 'maung', 'aing@maung.com', '12345567'));
parser.save();
