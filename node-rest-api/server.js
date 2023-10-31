// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();


const { BlobServiceClient } = require('@azure/storage-blob');



const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
// Use CORS middleware to handle cross-origin requests (from your React app)
app.use(cors());


// Sample data
let tasks = [
    { id: 1, name: "Buy groceries" },
    { id: 2, name: "Clean the house" }
];

// Routes
app.get('/tasks', (req, res) => {
    console.log(req.body);
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

app.post('/tasks', (req, res) => {
    console.log(req.body);
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    task.name = req.body.name;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

//azure shared access signature // reset every 24 hours
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'testcontainer';
const containerClient = blobServiceClient.getContainerClient(containerName);

//multer config (npm install multer)
// Upload route (multer is a middleware to process file)
//upload.single('image') is a file-upload middleware from "npm install multer"
//.single('image')  expects  file(field name 'image') file will be available in req.file.
//storage:how to store the file
//limits:file size limit
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,  // Max file size: 5MB
    },
});
app.post('/upload', upload.single('image'), async (req, res) => {
    console.log("/upload triggered");

    if (!req.file) {
        console.log("/upload triggered 1");
        return res.status(400).send('No file uploaded.');
    }
    console.log("/upload triggered 2");


    const blobName = req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log("/upload triggered 3");

    try {
        console.log("/upload triggered 4");

        await blockBlobClient.upload(req.file.buffer, req.file.buffer.length);
        res.status(200).send(`File uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        console.log("/upload triggered 5");
        res.status(500).send('Error uploading to Azure Blob Storage: ' + error.message);
    }
});

app.get('/blobs', async (req, res) => {
    const blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        blobs.push(blob.name);
    }
    res.json(blobs);
});

app.get('/display2', async (req, res) => {
    const blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        blobs.push(blob.name);
    }

    let html = '<h2>Uploaded Images</h2>';
    for (const blobName of blobs) {
        const blobURL = containerClient.getBlockBlobClient(blobName).url;
        html += `<img src="${blobURL}" style="width:200px;margin:10px;" alt="${blobName}"/>`;
    }
    res.send(html);
});

app.get('/display', async (req, res) => {
    const blobURLs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        const blobURL = containerClient.getBlockBlobClient(blob.name).url;
        blobURLs.push(blobURL);
    }
    res.json(blobURLs);
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
