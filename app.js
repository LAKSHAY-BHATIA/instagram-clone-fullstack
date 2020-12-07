const express =  require('express');
const {MONGOURI} = require('./config/keys');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/user');
require('./models/post');
const authRoute = require('./routes/auth');
const createPostRoute = require("./routes/post");

const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGOURI,{
     useNewUrlParser: true ,
     useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo ')
})
mongoose.connection.on('error',(err)=>{
    console.log('db error ',err);
})

app.use(authRoute)
app.use(createPostRoute);
app.use(require('./routes/user'));


if(process.env.NODE_ENV == "production")
{
    app.use(express.static('client/build'))
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}





app.listen(PORT,()=>{
    console.log('the server is Up and running ');
})