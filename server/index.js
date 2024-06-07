
const express = require("express") //use for node js 
const mongoose = require("mongoose") //used mongoose for mongodb
const cors = require("cors")
//the models of db 
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const url = process.env.DATABASE_URL

const app = express()
app.use(express.json())
app.use(cors({   //give the access from frontEnd
    origin: ['http://localhost:3000', 'https://a19-team-management-w1ax.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.static('public'));  
// mongoose.connect("mongodb://localhost:27017/UsersMissionsManagement")
//connect to mongodb in cloud 
mongoose.connect(url)


const allUserRouter = require('./routes/AllUserRoute')
const adminRouter = require('./routes/AdminRoute') 

app.use('/', allUserRouter )
app.use('/', adminRouter )

app.listen(port,()=>{
    console.log("server is running")
})



