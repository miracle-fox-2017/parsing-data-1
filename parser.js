"use strict"
const fs = require('fs')

class Person {
  constructor(id, firstname, lastname, email, phone, date){
    this.id=id;
    this.firstname=firstname;
    this.lastname=lastname;
    this.email=email;
    this.phone=phone;
    this.created_at=date;
  }
  convertString(){
    return `${this.id},${this.firstname},${this.lastname},${this.email},${this.phone},${this.created_at},'\n'`
  }// Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.data=[]
    // this.saveString=[]

  }
  convertData(){
    let someArr = fs.readFileSync('./people.csv','UTF-8').split('\n');
    let peopleSplit=[]

    //split isi data sesuai banyak properti
    for(let i=0;i<someArr.length;i++){
      peopleSplit =   someArr[i].split(',');
      this.data.push(peopleSplit);
    }
    // console.log(this.data);
    for(let i=1;i<this.data.length;i++){
      let hasil = new Person(this.data[i][0], this.data[i][1], this.data[i][2], this.data[i][3], this.data[i][4], this.data[i][5] )
      // console.log(hasil);
      this.people = hasil;
      // console.log(this.people);
      // debugger
    }

  }

  set people(obj){

    this._people.push(obj);

  }

  get people() {
    let obj={
      dataArr:this._people,
      size:this._people.length
    }
    return obj
  }

  addPerson(obj) {
    this.people = obj;

  }

  save(){
    let start='id,first_name,last_name,email,phone,created_at \n'
    for(let i=1;i<this._people.length;i++){
      start+=this._people[i].convertString()
    }
    fs.writeFileSync(this._file,start)
    // console.log(start);


    }
  }
  // convertDate(){
  //   // for(let i=0;i<this.people.created_atlength)
  //   // let date = new Date ()
  //
  // }




// ;
let parser = new PersonParser('people.csv')
parser.convertData();
parser.addPerson(new Person('201','Mandra','Gade','Mandra@gade.com','121212','2018-07-15T12:06:16-08:00'))
parser.people
// console.log(parser.people);
parser.save();

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
