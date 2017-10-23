"use strict"
const fs = require('fs');
var faker = require('faker');
let f_id = faker.random.number();
let f_firstname = faker.name.firstName();
let f_lastname = faker.name.lastName();
let f_email = faker.internet.email();
let f_phone = faker.phone.phoneNumber();

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }
  parsingData(cb){
    fs.readFile(this._file, 'utf8', (err, data)=>{
      if(!err){
        let pisah = data.split('\n')
        for (var idx = 1; idx < pisah.length-1; idx++) {
          let dataArray = pisah[idx].split(',');
          let inputData = new Person(dataArray[0],dataArray[1],dataArray[2],dataArray[3],dataArray[4], new Date(dataArray[5]))
          this._people.push(inputData)
        }
        // console.log(this);
        // this._people()
        cb()
      } else {
        console.log('Error get data CSV');
      }
    })
  }
  get people() {
    let object = {
      dataPeople : this._people,
      size       : this._people.length
    }
    return object
  }
  get file() {
    return this._file
  }

  addPerson(input) {
    this._people.push(input)
  }

  save(){
    let saveData = "id,first_name,last_name,email,phone,created_at,\n";
    this._people.forEach(listData=>{
      saveData+=listData.id+','
      saveData+=listData.first_name+','
      saveData+=listData.last_name+','
      saveData+=listData.email+','
      saveData+=listData.phone+','
      saveData+=listData.created_at.toISOString()+','
      saveData+='\n'
    })
    fs.writeFile('people.csv', saveData, (err, tersimpan) => {
      if (err) {
        console.log('Data gagal di simpan');
      } else {
        console.log('Data berhasil di simpan');
      }
    });
  }

}

let parser = new PersonParser('people.csv')
parser.parsingData(()=>{
  parser.addPerson(new Person(201,'Agustinus','Saja','vbagustinus@gmail.com',085700009776,new Date()))
  parser.addPerson(new Person(f_id,f_firstname,f_lastname,f_email,f_phone,new Date()))
  // console.log(parser.people[199]);
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
  parser.save()
})
