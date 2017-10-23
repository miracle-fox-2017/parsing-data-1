"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  //id,first_name,last_name,email,phone,created_at
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
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
    this._people = [];
  }

  get people() {
    let obj = {
      data: this._people,
      size: this._people.length,
    }
    
    return obj
  }
  
  convertPeople() {
    let dat = fs.readFileSync(this._file).toString().split('\n');
    //looping
    for(let i = 1; i < dat.length; i++){
      let temp = dat[i].split(',');
      this._people.push(new Person (temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
    }
    //trus jadiin this._people.push(new Person (dat[0][0]))
    
    return this._people;
  }

  get file(){
    let file = this._file;
    return file;
  }

  addPerson(obj) {
    let sekarang = new Date(Date.now()).toISOString();
    // console.log(sekarang);
    let last = this._people.length+1;
    let firstN = obj.first_name;
    let lastN = obj.last_name;
    let email = obj.email;
    let phone = obj.phone;
    
    //2012-05-13T21:05:15-07:00
    //  constructor(id,first_name,last_name,email,phone,created_at)
    this._people.push(new Person(last, firstN, lastN, email, phone, sekarang));
    return 'String Added';
  }

  save(){
    let result = "";
    
    //tambah header
    
    for(let i = 0; i<Object.keys(this._people[0]).length; i++ ){
      result += Object.keys(this._people[0])[i];
      if(i<Object.keys(this._people[0]).length-1){
        result += ',';
      } else {
        result += '\n';
      }
    }
    
    //isinya
    for(let i = 0; i< this._people.length; i++){
      result += this._people[i].id + ',' +
      this._people[i].first_name + ',' +
      this._people[i].last_name + ',' +
      this._people[i].email + ',' +
      this._people[i].phone + ',' +
      this._people[i].created_at;
      if(i< this._people.length-1){
        result += '\n';
      } 
    }
    
    // console.log(result);
    // print ke file
    fs.writeFileSync(this._file, result);
    console.log('Saved!');
  }

}

let parser = new PersonParser('people.csv')
parser.convertPeople();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person(0,'aing', 'maung', 'aing@maung.com', '12345567'));
// console.log(parser._people[parser._people.length-1]);
parser.save();
