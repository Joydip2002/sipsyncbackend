const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const port = 200 | process.env.PORT;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
const routes=require('./routes/route.js');
app.use(bodyParser.json())
app.use(routes);

app.get('/',(req,res)=>{
    res.send("Api working successfully");
});

app.listen(port,()=>{
    console.log('====================================');
    console.log(`Server is running on Port ${port}`);
    console.log('====================================');
})
