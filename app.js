const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sergio:Test123@cluster0.zgnw4.mongodb.net/reposteroDB?retryWrites=true&w=majority");

const recetaSchema = new mongoose.Schema ({
  nombre: String,
  descripcion: String,
  urlFoto: String
});

const Receta = mongoose.model("Receta", recetaSchema);

app.get("/", function(req, res) {
  let recetas = [];
  Receta.find(function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      recetas = result.slice();

      res.render("index", {recetas: recetas});
    }
  });
});

app.get("/:receta", function(req, res) {
  Receta.findOne( {nombre: req.params.receta}, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("receta", {receta: result});
    }
  });
});

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
})
