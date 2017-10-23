"use strict"
// var fs = require('fs')
// var data = fs.readFileSync('people.csv','utf-8')
// console.log(data)
// var dataArr = data.split('\n')
// var peopleInput = []
// for(let i = 1; i <= dataArr.length-1;i++){
//   peopleInput.push(dataArr[i].split('\n'))
// }

// for(let i = 0; i < peopleInput.length;i++){
//   peopleInput[i].shift()
// }
//console.log(peopleInput)
let fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.email = email
    this.phone = phone
    this.createdAt = created_at

  }
}


class PersonParser {

  constructor(file) {
    //super()
    this._file = file
    this._people = []

  }

  get people() {
    let obj ={
      size:this._people.length
    }
    let fs = require('fs')
    let data = fs.readFileSync(this._file,'utf-8').split('\n')
    let arrData = []
    let multiArr = []
    for(let i = 1; i < data.length; i++){
      arrData.push(data[i])
    }
    for(let i = 0; i < arrData.length; i++){
      multiArr.push(arrData[i].split(','))
    }
    for(let i = 0; i < multiArr.length;i++){
      this._people.push(new Person(multiArr[i][0],multiArr[i][1],multiArr[i][2],multiArr[i][3],multiArr[i][4],multiArr[i][5]))
    }
    return obj

  }


  get file() {
    return this._file
  }

  get size(){
    return this._peple.length
  }

  addPerson(newPerson) {
    //new person lagi
    //trus di push ke this._people
    this._people.push(newPerson)
    //console.log(newPerson)
    //console.log(this._people)
  }

  save() {
    //tulis ke file
    //writeFileSync
    //jadi string biasa
    //JSON.stringify

    let dataArr =[]
    for(let i = 0; i < this._people.length; i++){
      let temp = []
      for(let key in this._people[i]){
        temp.push(this._people[i][key])

      }
      dataArr.push(temp)

    }
    fs.writeFileSync(this._file,dataArr.join('\n'),'utf-8','w')
    //dataArr.push(temp)
     // console.log(dataArr.join('\n'))
  }

}

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson(new Person('201','Ferdy','Aja','hahaha@jamil.com','0-856-789-1011',new Date()))

//console.log(parser._people[parser._people.length-1])
parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
