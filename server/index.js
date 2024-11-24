const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const pool = require('./utils/db');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use(express.json()); // Parse incoming JSON payloads in request bodies

// Route to create a new todo
app.post('/input', async (req, res) => {
    try {
        const { description } = req.body; // Extract the 'description' field from the request body
        const newTodo = await pool.query(
            "INSERT INTO example (description) VALUES($1) RETURNING *", 
            [description] // Pass the description as a parameter to the query
        );
        res.json(newTodo.rows[0]); // Respond with the newly created todo item
    } catch (err) {
        console.error(err.message);
    }
});

// Route to get all todos
app.get('/input', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM example"); // Fetch all rows from the 'example' table
        res.json(allTodos.rows); // Respond with the list of all todos
    } catch (err) {
        console.error(err.message);
    }
});

// Route to get a specific todo by ID
app.get('/input/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the 'id' parameter from the request URL
        const todo = await pool.query(
            "SELECT * FROM example WHERE example_id = $1", // Fetch the todo with the matching ID
            [id] // Pass the ID as a parameter to the query
        );
        res.json(todo.rows[0]); // Respond with the matching todo item
    } catch (err) {
        console.error(err.message); 
    }
});

// Route to update a specific todo by ID
app.put('/input/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body; // Extract the 'description' field from the request body
        const updateTodo = await pool.query(
            "UPDATE example SET description = $1 WHERE example_id = $2", // Update the description of the matching todo
            [description, id] // Pass the new description and ID as parameters to the query
        );
        res.json('Input was updated'); // Respond with a confirmation message
    } catch (err) {
        console.error(err.message); 
    }
});

// Route to delete a specific todo by ID
app.delete('/input/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteTodo = await pool.query(
            "DELETE FROM example WHERE example_id = $1", // Delete the row with the matching ID
            [id] // Pass the ID as a parameter to the query
        );
        res.json('Input was deleted'); // Respond with a confirmation message
    } catch (err) {
        console.error(err.message); 
    }
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000'); 
});
