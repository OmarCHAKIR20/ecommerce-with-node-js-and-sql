const express = require("express");
const bodyParser = require("body-parser");


const path = require("path");
const app = express();

const adminRoute = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/error")



app.use(bodyParser.urlencoded({ extended: false })); //parse the body to a readable format
app.use(express.static(path.join(__dirname , 'public'))); //make css files visible to the public


app.set('view engine','ejs');// we tell node that we want to compile dynamic  templates
app.set('views','views'); //where to find these templates      

//filter by admin
app.use('/admin',adminRoute); // the order doesnt matter ps: we should use in the routes get,post....
app.use(shopRoutes); 


app.use(errorController.get404)



app.listen(3000);
