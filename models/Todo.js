// Schema
const mongoose = require ("mongoose");
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: 
        {
            type: String,
            required: true,
        },
    
    created_at: {
       type: Date,
       default: Date.now,
       timestamps: true
    },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;