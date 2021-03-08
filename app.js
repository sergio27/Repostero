const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/reposteriaDB", );

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

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
