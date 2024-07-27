const express=require("express")
const app=express();
app.use((req,res,next)=>{
   console.log("hi i am middleware")
    next();
})
app.use((req,res,next)=>{
    console.log("hi i am second middleware")
    next();
    console.log("these is after next");
})
app.use((req,res,next)=>{
    req.time = new Date (Date.now()).toString;
    console.log(req.method,req.hostname,req.path,req.time)
    next();

})
app.use("/random",(req,res)=>{
    console.log("i am for random");
    next();
})
app.get("/",(req,res)=>{
    res.send("hi i am root")
})
app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="give access"){
       return  next();
    }
    else res.send("no access")
})
const check =(req,res,next)=>{
    let {token}=req.query;
    if(token==="give access"){
       return  next();
    }
    else res.send("no access")
}
app.get('/api',check,(req,res)=>{
    res.send("data");
})
app.get("/random",check,(req,res)=>{
    res.send("in a random get request")
})
app.get("/root",(req,res)=>{
    res.send("in a root route")
})
app.listen(3000,()=>{
    console.log("server is working")
})