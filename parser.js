"use strict"
const fs=require("fs");

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(key,id,firstName,lastName,email,phone,createdAt){
        this.obj={};
        this.key=key;
        // Starts from here
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.phone=phone;
        this.createdAt=createdAt;
    }
    createObj(){
        this.obj[this.key[0]]=this.id;
        this.obj[this.key[1]]=this.firstName;
        this.obj[this.key[2]]=this.lastName;
        this.obj[this.key[3]]=this.email;
        this.obj[this.key[4]]=this.phone.toString().match(/.{1,3}/g).join("-");
        this.obj[this.key[5]]=this.createdAt;
        return this;
    }
}

class PersonParser {
    constructor(file){
        this._file=file;
        this._people=[];
        this.key=this.readFile()[0].split(",");
        this.lastID=parseInt(this.createArrOfObj()[this.readFile().length - 2].id);
    }
    // Read File from Using fs Module
    readFile(){
        const read=fs.readFileSync(this._file);
        const people=read.toString().split("\n");
        return people;
    }
    // Getter
    get people(){
        const total=this.readFile().length - 1;
        const lasId=this.createArrOfObj()[total - 1].id;
        const obj={
            size:total,
            lastID:parseInt(lasId)
        }
        return obj;
    }
    // Return Nama File
    get file(){
        return this._file;
    }
    // Create Nested Array
    createArrOfObj(){
        const data=this.readFile();
        for(let i=1;i < data.length;i++){
            const split=data[i].split(",");
            const id=split[0];
            const firstName=split[1];
            const lastName=split[2];
            const email=split[3];
            const phone=split[4];
            const createdAt=split[5];
            const person=new Person(this.key,id,firstName,lastName,email,phone,createdAt);
            this._people.push(person.createObj().obj);
        }
        return this._people;
    }
    // Insert New Data
    addPerson(firstName,lastName,email,phone){
        this.lastID+=1;
        const newDate=new Date();
        const tahun=newDate.getFullYear();
        const bulan=newDate.getMonth();
        const tanggal=newDate.getUTCDate();
        const jam=newDate.getHours();
        const menit=newDate.getMinutes();
        const detik=newDate.getSeconds();
        const gmt=newDate.getTimezoneOffset() / 60;
        const susunTanggal=tahun+"-"+bulan+"-"+tanggal+"T"+jam+":"+menit+":"+detik+""+gmt+":00";
        // ================================<
        const person=new Person(this.key,this.lastID,firstName,lastName,email,phone,susunTanggal);
        const obj=person.createObj().obj
        this._people.push(obj);
        const append=Object.keys(obj).map((val)=>{return obj[val]}).join(",");
        fs.appendFileSync(this._file,"\n"+append);
        return obj;
    }
}

let parser=new PersonParser("people.csv");
// Baca File //
parser.readFile();
// ============ //
console.log(parser.addPerson("Tomy","Budiman","tommybudi1998@gmail.com",628123456789));
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
