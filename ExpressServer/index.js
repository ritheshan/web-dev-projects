import express from "express";
const app=express();
const port=3000;
app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>");
console.log(req.rawHeaders);
});
app.get("/contact",(req,res)=>{
    res.send("<h1>hello , reach me here </h1>");
console.log(req.rawHeaders);
});
app.get("/about",(req,res)=>{
    res.send("<h1>hi , what about me?</h1>");
console.log(req.rawHeaders);
});
app.post("/register", (req, res) => {
    //Do something with the data
    res.sendStatus(201);
  });
  
  app.put("/user/angela", (req, res) => {
    res.sendStatus(200);
  });
  
  app.patch("/user/angela", (req, res) => {
    res.sendStatus(200);
  });
  
  app.delete("/user/angela", (req, res) => {
    //Deleting
    res.sendStatus(200);
  });
app.listen(port,()=>{
    console.log(`server running on port ${port}.`)
})
