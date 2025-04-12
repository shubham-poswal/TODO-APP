const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Todo = require("./models/Todo.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use (methodOverride("_method"));

const MONGO_URL = "mongodb://127.0.0.1:27017/TodoApp";

main()
.then(() => {
    console.log("connection is successful");
})
.catch((err)=> {
console.log("err");
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// index Route
app.get("/todos", async(req, res) => {
    let todos = await Todo.find();
    console.log(todos);
    res.render("index.ejs",{todos});
});

// Add Todo Route
app.get("/todos/new", (req, res) => {
    res.render("newTodo");
  });

//   Create Todo Route
app.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    await Todo.create({ title, description, created_at: new Date() });
    res.redirect("/todos");
  });
  
//   Edit Todo Route
app.get("/todos/:id/edit", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render("editTodo", { todo });
  });
  
//   update Todo Route
app.post("/todos/:id", async (req, res) => {
    const { title, description } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, 
        { title, description ,updatedAt: Date.now()}, 
        {runValidators: true});
    res.redirect("/todos");
  });
  
//   delete Todo Route
app.delete("/todos/:id", async (req, res) => {
    let {id} = req.params;
    let deletedTodo = await Todo.findByIdAndDelete(id);
    console.log(deletedTodo);
    res.redirect("/todos");
  });
  
app.get("/",  (req, res)=> {
    res.send("Todo root is working")
});

// let todo1 =  new Todo({
//     title: "Buy milk",
//     description: "Today buy milk",
//     created_at: new Date(),
// });
// todo1.save().then((res) => {
//     console.log(res);
// });

app.listen(8080, () => {
    console.log("app is listening");
});
