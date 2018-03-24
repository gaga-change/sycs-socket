/**
 * sql 操作验证
 */

const data = require('./db/mysql/index')

// data.getGod(1234).then(row => {
// console.log(row)
//  })
data.connectJoin('1gas0', '123').then(packet => {
    // console.log(row)
    console.log(packet)
})