
module.exports = function (res,{data,message,code=200}){


    res.status(200).json({
        data,
        message,
        code,
        ok: code <400
    })
}