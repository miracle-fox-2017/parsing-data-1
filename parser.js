"use strict"
var fs = require('fs');

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at).toString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null;
  }

  // set people(people) {
  //   return people;
  // }

 /* getPeople() {
    let peopleData = fs.readFileSync(this._file);
    let peopleDataArr = peopleData.toString().split('\n');
    let arrPeople = [];
    let keys = [];
   
    for (var i = 0; i < peopleDataArr.length; i++) {
      let obj = {};
      let key = peopleDataArr[0].split(',');

      for (var j = 0; j < peopleDataArr[0].split(',').length; j++) {
        obj[key[j]] = '';
        keys.push(key[j])
      }

      arrPeople.push(obj);
    }

    let uKeys = Array.from(new Set(keys));
  
    for (var x = 0; x < arrPeople.length; x++) {
     
      for (var k = 0; k < peopleDataArr[0].split(',').length; k++) {
        arrPeople[x][uKeys[k]] = peopleDataArr[x].split(',')[k]
      }
    }
    
    arrPeople.splice(0, 1);
    
    return arrPeople;
  }*/

  getPeopleFromCsv() {
   let peopleData = fs.readFileSync(this._file);
   let peopleDataArr = peopleData.toString().split('\n');
   let arrPeople = [];
   let keys = [];

   for (var i = 1; i < peopleDataArr.length; i++) {
      let obj = {};
      let item = peopleDataArr[i].split(',');
      arrPeople.push(new Person(item[0], item[1], item[2], item[3], item[4], item[5]))
    }

    this.people = arrPeople;
    // return arrPeople;
  }

  get people() {
    let objPeople = {
      data: this._people,
      size: this._people.length,
    }

    return objPeople
  }

  get file() {
    return this._file;
  }

  set people(person) {
    this._people = person;
  }

  addPerson(person) {
    let allPeople = this.people.data;
    allPeople.push(person);
    this.people = allPeople;
  }

  // getAllPeopleData() {
  //   return this._people;
  // }

  save() {
    let people = JSON.parse(JSON.stringify(this.people.data));
    let strInput = ''; 
    strInput+= 'id,first_name,last_name,email,phone,created_at';

    for (var i = 0; i < people.length; i++) {
      let dateStr = new Date(people[i].created_at);

      strInput += '\n'+people[i].id+',';
      strInput += people[i].first_name+',';
      strInput += people[i].last_name+',';
      strInput += people[i].email+',';
      strInput += people[i].phone+',';
      strInput += people[i].phone+',';
      strInput += dateStr.toISOString();
    }

   
    fs.writeFileSync(this.file, strInput, 'utf-8');

    // let objNewPerson = JSON.parse(JSON.stringify(newPerson));
    // let strNewPerson = `${objNewPerson.id},${objNewPerson.first_name},${objNewPerson.last_name},${objNewPerson.email},${objNewPerson.phone},${new Date(objNewPerson.created_at).toISOString()}`;

    // fs.appendFile(this.file, "\n"+strNewPerson, 'utf8', function (err) {
    // if (err) {
    //   console.log('Some error occured - file either not saved or corrupted file saved.');
    // } else{
    //   console.log('It\'s saved!');
    // }
    // });
  }
}

let parser = new PersonParser('people.csv')
parser.getPeopleFromCsv();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person(201,'Mark','Elric','edward@must.com','2-633-389-7173','2012-05-10T03:53:40-07:00'));
parser.save();
parser.addPerson(new Person(202,'Van','Elric','alphon@must.com','2-633-389-7173','2012-05-10T03:53:40-07:00'));
parser.save();