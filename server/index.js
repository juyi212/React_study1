const express = require('express')
const app = express()
const port = 5000
const { auth } = require('./middleware/auth')
const {User} = require("./models/User");
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')


// applications/x-www-form-urlencoded/  분석해서 가져오게 ㅎ줌
app.use(bodyParser.urlencoded({extended : true }))
// json 타입으로 된 것을 가져오게 해줌 
app.use(bodyParser.json())
app.use(cookieParser())


const mongoose = require('mongoose')
// 비밀정보임 
mongoose.connect(config.mongoURI, {
  useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(() =>  console.log('err'))



app.get('/', (req, res) =>  res.send('hellow word! ㅎㅇㅎㅇggg'))


app.get('/api/hello', (req, res)=> {
  res.send("안녕하세요!")
})

// 회원가입
app.post('/register', (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다
  
  const user = new User(req.body)
  // 비밀번호 암호화
  
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  }) // 정보들이 user 모델에 저장이 된다.
})


// 로그인
app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인. 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      
      // 비밀번호까지 같다면 token 생성을 해야함  
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        

        // 쿠키, 로컬스토리지 등등에 저장 가능 
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })         
      })
    })
  })
})

app.get('/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔따는 얘기는 authentication이 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, 
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})


// 로그아웃
app.get('/logout', auth, (res, req) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token : "" },
    (err, user) => {
      if (err) return res.json({ success: false, err})
      return res.status(200).send({
        success: true,
      })
    }
    )
})


app.listen(port, () => console.log(`example app listening on port ${port}`))

