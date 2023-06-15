const express=require('express')
const request=require("request")
const https=require('https')

const app=express()

app.use(express.static(__dirname,{index:'signup.html'}))
app.use(express.urlencoded({extended:false}))

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
})

app.get('/',(req,res)=>{
    // res.set('content-type','text/html')
    console.log(req.body.fname)
    console.log(req.body.lname)
    console.log(req.body.uemail)
    res.send()
})

app.post('/',(req,res)=>{
    const FirstName=req.body.fname
    const LastName=req.body.lname
    const EmailId=req.body.uemail
    // console.log(FirstName)
    // console.log(LastName)
    // console.log(EmailId)
    var data={
        members:[{
            email_address:EmailId,
            status:"subscribed",
            merge_fields:{
                FNAME:FirstName,
                LNAME:LastName
            },
        }
        ]
    };
    var update={
        update_existing:true
    }
    var json_data=JSON.stringify(data)

    const url='https://us17.api.mailchimp.com/3.0/lists/a7a260811d?update_existing=true'

    const options={
        method:'POST',
        auth:"hisanz:4d7e9188c2147e9ec10e81ab804cbc01-us1"

    }

    const request=https.request(url,options,(response)=>{
        console.log(response.statusCode)
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(json_data)
    request.end()
})

app.get('/failure',(req,res)=>{

    res.redirect('/')
})
// 4d7e9188c2147e9ec10e81ab804cbc01-us17
// a7a260811d.