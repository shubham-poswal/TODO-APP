// Todo initial Data

const mongoose = require("mongoose");
const Todo = require("./models/Todo.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/TodoApp";

main()
.then(() => {
    console.log("connection is successful");
})
.catch((err)=> {
console.log("err");
})


async function main() {
    await mongoose.connect(MONGO_URL);
}


let allTodos =[
    {
        title: "Today Task",
        description: "My day-1 coding",
        created_at: new Date(),
    },
    {
        title: "Today Task",
        description: "Watching Movie",
        created_at: new Date(),
    },
    {
        title: "Today Task",
        description: "Running",
        created_at: new Date(),
    },
    {
        title: "Today Task",
        description: "complete all work",
        created_at: new Date(),
    },
    {
        title: "Today Task",
        description: "Free all time ",
        created_at: new Date(),
    },

];

Todo.insertMany(allTodos);