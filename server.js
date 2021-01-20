const express = require("express");

const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

require("./routes/api-routes")(app);
require("./routes/advices-routes")(app);

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://cvele:cvelePass@posts.jzao1.mongodb.net/posts",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(PORT, function () {
  console.log(`??  ==> API Server now listening on PORT ${PORT}!`);
});
