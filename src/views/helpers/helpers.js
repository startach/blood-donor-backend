exports.equals = (a,b) => a === b;

exports.includes = (arr, item) => arr.includes(item)

exports.dateHelper = (dateposted) => {

    let splitdate = Date(dateposted).toString().split('GMT')[0].split(' ')
    let mydatearray = [splitdate[2], splitdate[1], splitdate[3]]
    let mydate = mydatearray.join(" ")

    return mydate
  }

