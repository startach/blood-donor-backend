exports.equals = (a,b) => a === b;

exports.includes = (arr, item) => arr && arr.includes(item)

exports.dateHelper = (dateposted) => {

    let splitdate = Date(dateposted).toString().split('GMT')[0].split(' ')
    let mydatearray = [splitdate[2], splitdate[1], splitdate[3]]
    let mydate = mydatearray.join(" ")

    return mydate
  }

exports.strConcat = (...strArr)=>{
    if(!strArr || !strArr.length)
        return;
    strArr.pop()
    return strArr.join("")
}

exports.getDateStr = ()=>{
    let today = new Date()
    let day = today.getDay();
    day=(day < 10 ? '0' : '') + day;

    let month = today.getMonth();
    month=(month < 10 ? '0' : '') + month;

  return `${today.getFullYear()}-${month}-${day}`
}

exports.sum = (num1 , num2)=>{
    return num1+num2;
}

exports.nextIndex = (list , index )=>{
    // return num1+num2;
    return Math.min((list?list.length-1:index) ,index+1)
}
exports.prevIndex = (index )=>{
    // return num1+num2;
    return Math.max(0,index-1)
}