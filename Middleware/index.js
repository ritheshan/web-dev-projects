import express from "express";
const app = express();
const port = 3000;


app.use((req,res,next)=>{
    console.log("request method:",req.method);
    console.log("request url:",req.url);
    next();
});
app.get("/", (req, res) => {
    res.send("custom middleware:");
  });
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    
})