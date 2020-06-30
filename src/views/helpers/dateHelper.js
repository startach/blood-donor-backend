module.exports = (dateposted) => {

    let splitdate = Date(dateposted).toString().split('GMT')[0].split(' ')
    let mydatearray = [splitdate[2], splitdate[1], splitdate[3]]
    let mydate = mydatearray.join(" ")

    return mydate
  }
