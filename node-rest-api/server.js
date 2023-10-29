// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');



const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

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

// Google Cloud Storage configuration
const storage = new Storage({
    keyFilename: 'mykey.json',
    projectId: ''
});


//The bucket is where your files will be stored.
const bucketName = 'your-gcs-bucket-name';

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
app.post('/upload', upload.single('image'), (req, res) => {
    //console.log(req.body);
    if (!req.file) {
        console.log("console.log-> /upload: No file uploaded.");
        return res.status(400).send('No file uploaded.');
    }
    else {
        console.log("console.log-> /upload: File uploaded.");
    }
    //reference to a new file (or "blob") in the bucket
    const blob = storage.bucket(bucketName).file(req.file.originalname);
    // Create writable stream
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,

    });

    //error while writing the file 
    blobStream.on('error', err => {
        return res.status(500).send(err);
    });

    //Once the file upload to GCS is complete
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        res.status(200).send(`File uploaded to: <a href="${publicUrl}">${publicUrl}</a>`);
    });

    //This begins the process of writing the file to the GCS bucket.Since the file was 
    //processed in memory(using multer.memoryStorage()), it's available as a buffer
    // (req.file.buffer), which is written to the GCS blob using the created write stream.

    blobStream.end(req.file.buffer)

    res.status(201).json({ message: 'File uploaded successfully.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
