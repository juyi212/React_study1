const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name : {
    type : String,
    maxlength: 50
  },
  email: {
    type: String,
    // trim 은 space를 없애주는 역할
    trim : true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    // 관리자나 일반 유저 구분
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // token 유효기간
    type: Number
  },
})
//스키마를 모델로 감싸준다
const User = mongoose.model('User', userSchema)
module.exports = { User } // 다른곳에서도 쓸 수 있도록