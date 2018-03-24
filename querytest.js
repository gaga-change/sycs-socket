/**
 * sql 操作验证
 */

 const data = require('./db/mysql/index')

// data.getGod(1234).then(row => {
    // console.log(row)
//  })
data.createMsg('123', 1, '123').then(row => {
    // console.log(row)
})