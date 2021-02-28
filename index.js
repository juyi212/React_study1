const express = require('express')
const app = express()
const port = 3000
const {User} = require("./models/User");
const bodyParser = require('body-parser')
const config = require('./config/key')

// applications/x-www-form-urlencoded/  분석해서 가져오게 ㅎ줌
app.use(bodyParser.urlencoded({extended : true }))
// json 타입으로 된 것을 가져오게 해줌 
app.use(bodyParser.json())


const mongoose = require('mongoose')
// 비밀정보임 
mongoose.connect(config.mongoURI
  , {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected...'))
.catch(()=>  console.log('err'))



app.get('/', (req, res) =>  res.send('hellow word! ㅎㅇㅎㅇggg'))

// 회원가입
app.post('/register', (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다
  

  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  }) // 정보들이 user 모델에 저장이 된다.
})


app.listen(port, () => console.log(`example app listening on port ${port}`))

