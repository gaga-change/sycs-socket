const User = require('../class/User')
const dataFun = require('./mysql')

const data = {
    userList: []
}


exports.findGod = (godId) => {
    dataFun.test()
    console.log(123)
}

/**
 * 查找用户
 * @param {String} username 用户名
 * @param {String} userId 用户ID
 */
exports.findUserAndSave = (username, userId) => {
    let user = data.userList.filter(item => item.id == userId)[0]
    if (user) {
        user.leave = false
        return user
    } else {
        user = new User(username, userId)
        data.userList.push(user)
        user.leave = false
        return user
    }
}

/**
 *  获取所有用户
 */
exports.getUsers = () => {
    return data.userList.filter(item => !item.leave)
}

/**
 * 删除用户
 * @param {} user 
 */
exports.removeUser = (user) => {
    data.userList = data.userList.filter(item => item.id != user.id)
}

exports.leave = (user) => {
    let u = data.userList.filter(item => item.id != user.id)[0]
    if (u) u.leave = true
}