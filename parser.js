"use strict"
class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.phone = phone;
      this.created_at = created_at;
  }
}

const fs = require('fs');

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.setArray();
    this.setArr = [];
  }

  addData() {
    this.setArr = fs.readFileSync(this._file,'utf8').split('\n');
  }

  setArray(){
    this.addData();
    let arrBaru = [];
    for (let i = 1; i < this.setArr.length;i++){
      let data = this.setArr[i].split(',')
      arrBaru.push(new Person(data[0], data[1], data[2],data[3],data[4],data[5]));
    }
    return arrBaru;
  }

  set people(newPerson) {
    this._people.push(newPerson);
  }

  get people() {    
    let objData = {
      data: this._people,
      size: this._people.length,
    }    
    return objData;
  }

  get file(){
    return this._file;
  }

  // addPerson(newPerson) {
  //   this._people.push(newPerson);
  // }

  save(){

    let json = JSON.parse(JSON.stringify(this._people));
    let dataStr = 'id,first_name,last_name,email,phone,created_at\n';
    for (let i = 0; i < this._people.length;i++){
      dataStr += json[i].id + ',' + json[i].first_name + ',' + json[i].last_name + ',' + json[i].email + ',' + json[i].phone + ',' + json[i].created_at + '\n';
    }
    fs.writeFileSync(this._file, dataStr, 'utf8', 'w');
  }

}


let parser = new PersonParser('people.csv');



parser.people = new Person('201', 'Tri Amri', 'Wijaya', 'triamri@gmail.com', '0999', 'dsgsg');

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);

// console.log(parser.save());

parser.save()