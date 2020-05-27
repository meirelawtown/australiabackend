const { Parser } = require('json2csv')
const fs = require('fs')
const headerName = ['MainBalls', 'Supp']
const json2csv = new Parser({ fields: headerName })

function spliceLongAr(size, array){
let finalArray =[]
  for (let i=0; i<array.length; i+=size) {
    finalArray.push(array.slice(i,i+size));
  }

  return finalArray
}

function intersection(csv, arr) {

    const setA = new Set(csv)
    const setB = new Set(arr)
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function compareTwoArray(csv, myArr){
 
 return myArr.filter((arr)=> intersection(csv,arr).size >=4)
}

function verificaPast(json){
  const csv = json2csv.parse(json).replace(/"/g, '').replace(/,/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ').replace(/'/g, '').split(' ').map((x)=>+x).filter((x)=> { return !Number.isNaN(x)}).filter((x)=> x!==0)
  
  const past = fs.readFileSync('./src/assets/past.csv', 'utf-8').split(' ').map((x)=>+x).filter((x)=> { return !Number.isNaN(x)}).filter((x)=> x!==0)

  const arr = spliceLongAr(6, past)
  let result = compareTwoArray(csv,arr)
  return result

}

function verificaFuture(json){
  const csv = json2csv.parse(json).replace(/"/g, '').replace(/,/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ').replace(/'/g, '').split(' ').map((x)=>+x).filter((x)=> { return !Number.isNaN(x)}).filter((x)=> x!==0)
  
  const past = fs.readFileSync('./src/assets/future.csv', 'utf-8').split(' ').map((x)=>+x).filter((x)=> { return !Number.isNaN(x)}).filter((x)=> x!==0)

  const arr = spliceLongAr(6, past)
  let result = compareTwoArray(csv,arr)
  return result

}

function retornaBolasRepetidas(json) {
  const csv = json2csv.parse(json).replace(/"/g, '').replace(/,/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ')
  let lines = csv.split(' ');

  let counts = {};
  let multiples = {};

  for (let i = 0, ii = lines.length; i < ii; i++) {

    let val = lines[i];

    if (!counts[val]) {
      counts[val] = 1;
    } else {
      counts[val]++;
      multiples[val] = counts[val];
    }
  }

  return multiples;

}

module.exports = {retornaBolasRepetidas, verificaPast, verificaFuture}
