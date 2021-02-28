const express = require('express')
const app = express()
const port = 3000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dea8307:dwd88645@boilerplate.sk3vw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  , {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected...'))
.catch(()=>  console.log('err'))


app.get('/', (req, res) =>  res.send('hellow word! ㅎㅇㅎㅇ'))
app.listen(port, () => console.log(`example app listening on port ${port}`))

