// server.js
//shared access signature will expire

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

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});


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

//shared access signature will expire
app.get('/display', async (req, res) => {
    try {
        const blobURLs = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            const blobURL = containerClient.getBlockBlobClient(blob.name).url;
            blobURLs.push(blobURL);
        }
        res.json(blobURLs);
    } catch (error) {
        // Log the error for server-side inspection
        console.error('Error retrieving blobs:', error);
        // Send a generic error response or customize it based on the error
        res.status(500).send('An error occurred while retrieving the data.');
    }
});


const sharp = require('sharp');

// ...

// Route to adjust brightness of an image blob
app.post('/adjustBrightness', upload.single('image'), async (req, res) => {
    console.log("/adjustBrightness");

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const brightnessFactor = parseFloat(req.body.brightness); // Assuming brightness is sent in the request body

    if (isNaN(brightnessFactor)) {
        return res.status(400).send('Invalid brightness factor.');
    }

    try {
        // Adjust brightness with sharp
        const adjustedBuffer = await sharp(req.file.buffer)
            .modulate({ brightness: brightnessFactor })
            .toBuffer();

        // Assuming you still want to upload the adjusted image to Azure Blob Storage
        const blobName = `adjusted_${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(adjustedBuffer, adjustedBuffer.length);
        res.status(200).send(`Brightness adjusted and file uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});

// ...

// Route to rotate an image blob
app.post('/rotateImage', upload.single('image'), async (req, res) => {
    console.log("/rotateImage");

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const rotationAngle = parseInt(req.body.angle, 10); // Assuming the angle is sent in the request body

    if (isNaN(rotationAngle)) {
        return res.status(400).send('Invalid rotation angle.');
    }

    try {
        // Rotate image with sharp
        const rotatedBuffer = await sharp(req.file.buffer)
            .rotate(rotationAngle)
            .toBuffer();

        // Assuming you still want to upload the rotated image to Azure Blob Storage
        const blobName = `rotated_${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(rotatedBuffer, rotatedBuffer.length);
        res.status(200).send(`Image rotated and file uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});

app.post('/toGrayscale', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Convert to grayscale with sharp
        const grayscaleBuffer = await sharp(req.file.buffer).grayscale().toBuffer();

        // Upload to Azure Blob Storage
        const blobName = `grayscale_${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(grayscaleBuffer, grayscaleBuffer.length);
        res.status(200).send(`Grayscale image uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});




app.post('/resizeImage', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }


    const targetWidth = parseInt(req.body.width);
    const targetHeight = parseInt(req.body.height);

    try {
        // Resize the image using sharp
        const resizedBuffer = await sharp(req.file.buffer)
            .resize(targetWidth, targetHeight)
            .toBuffer();

        // Upload to Azure Blob Storage
        const blobName = `resized_${req.file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(resizedBuffer, resizedBuffer.length);
        res.status(200).send(`Resized image uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});

app.post('/convertToPNG', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Convert the image to PNG format using sharp
        const pngBuffer = await sharp(req.file.buffer)
            .png()
            .toBuffer();

        // Upload to Azure Blob Storage
        const blobName = `converted_${req.file.originalname.split('.').slice(0, -1).join('.')}.png`; // change the file extension to .png
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(pngBuffer, pngBuffer.length);
        res.status(200).send(`Image converted to PNG and uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});

app.post('/convertToJPG', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Convert the image to JPG format using sharp
        const jpgBuffer = await sharp(req.file.buffer)
            .jpeg({ quality: 90 }) // You can adjust the quality as needed
            .toBuffer();

        // Upload to Azure Blob Storage
        const blobName = `converted_${req.file.originalname.split('.').slice(0, -1).join('.')}.jpg`; // change the file extension to .jpg
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(jpgBuffer, jpgBuffer.length);
        res.status(200).send(`Image converted to JPG and uploaded to Azure Blob Storage at blob: ${blobName}`);
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
});











// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
