
// Welcome to homepage
app.get("/",localAuthMiddleware,(req,res)=>{
    res.send("Welcome to the Hotel");
});
