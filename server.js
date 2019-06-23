const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'proje'
})

app.get('/getAllheros', (req, res) => {
    let sql = 'select * from heros';
    conn.query(sql, (err, result) => {
        if (err) return res.send({ statu: 500, msg: err.message, data: null })
        res.send({ statu: 200, msg: "成功了", data: result });
    })
})

app.post('/addhero', (req, res) => {
        const hero = req.body
            // 得到当前的时间对象
        const dt = new Date()
            // 字符串，有一个新方法，叫做 padStart(长度, 要填充的字符串)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1).toString().padStart(2, '0')
        const d = dt
            .getDate()
            .toString()
            .padStart(2, '0')
        const hh = dt
            .getHours()
            .toString()
            .padStart(2, '0')
        const mm = dt
            .getMinutes()
            .toString()
            .padStart(2, '0')
        const ss = dt
            .getSeconds()
            .toString()
            .padStart(2, '0')
            // 补全英雄的添加时间
        hero.ctime = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        console.log(hero);

        // 调用 conn.query 实现 添加英雄
        const sql = 'insert into heros set ?'
        conn.query(sql, hero, (err, result) => {

            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: 'ok', data: null })
        })
    })
    // app.get('/gethero/:id', (req, res) => {
    //     let id = req.params.id
    //     let sql = 'update heros set ? where id = ?';
    //     conn.query(sql, id, (err, result) => {
    //         if (err) return res.send({ statu: 500, msg: err.message, data: null })
    //         res.send({ statu: 200, msg: "成功了", data: result });
    //     })
    // })

// app.post('/updatehero/:id', (req, res) => {
//     let id = req.params.id
//     let data = req.body
//     let sql = 'update heros set ? where id = ?';
//     conn.query(sql, [data, id], (err, result) => {
//         if (err) return res.send({ statu: 500, msg: err.message, data: null })
//         res.send({ statu: 200, msg: "成功了", data: result });
//     })
// })

// app.get('/delhero/:id', (req, res) => {})




app.get("/", (req, res) => {
    res.send("ok")
})

app.listen(3000, () => {
    console.log("nuning...");
})