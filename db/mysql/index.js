const query = require('./pool')

exports.test = () => {
    let sql = 'SELECT user.id,user.username,user.qq,user.god FROM user'
    // query(sql).then()
    query(sql).then(data => {
        console.log(data)
    })
}