"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
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
    this._people = []
  }

  set people(data){
  	this._people = data;
  } 

  get file() {
  	return this._file;
  }

  get people() {
  	let obj = {
  		data : this._people,
  		size : this._people.length
  	}
  	return obj

  }

  bacaFile() {
  	let importData = fs.readFileSync(this._file).toString().split("\n");
  	let newData = [];
  		for (let i = 1 ; i<importData.length ; i++){
  			let people = importData[i].split(",");
  			// let test = new Person(1,"Lani","Rollins","blandit@quam.com","1-633-389-7173","2012-05-10T03:53:40-07:00")
  			let dataPerson = new Person(people[0],people[1],people[2],people[3],people[4],people[5])
  			this._people.push(dataPerson);
  		}
  	return this._people
  }

  addPerson(newPerson) {
  	this._people.push(newPerson)
  	console.log(parser.people.size)
  	// return this._people
  }
  save(){
  	let tempData = JSON.parse(JSON.stringify(this.people.data))
  	let newData = 'id,first_name,last_name,email,phone,created_at'+"\n"
  	for (let i = 0 ; i < tempData.length ; i++){
  		if (tempData[i].id == ""){
  			i++;
  		}
  		newData = newData + (tempData[i].id+","+tempData[i].first_name+","+tempData[i].last_name+","+tempData[i].email+","+tempData[i].phone+","+tempData[i].created_at) +"\n"
  	}
 	fs.writeFileSync('people.csv',newData)
  }	
}


let fs = require('fs')

let parser = new PersonParser('people.csv')
parser.bacaFile()
parser.people
parser.addPerson(new Person(201,"Ahmad","Shahab","matt.syahab@GMAIL.com","08983060304","2012-02-22T18:09:03.000Z"))
parser.save()
// console.log(parser.people.data)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
