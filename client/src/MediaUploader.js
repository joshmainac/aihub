import React, { useState } from 'react';
//import axios from 'axios';
import DisplayImages from './DisplayImages';
import BrightnessAdjuster from './BrightnessAdjuster';
import ImageRotator from './ImageEditor/ImageRotator';
import GrayscaleConverter from './ImageEditor/GrayscaleConverter';
import ImageResizer from './ImageEditor/ImageResizer';
import ImageToJPGConverter from './ImageEditor/ImageToJPGConverter';
import ImageToPNGConverter from './ImageEditor/ImageToPNGConverter';
import RegularUploader from './ImageEditor/RegularUploader';
import './MediaUploader.css';





function Upload() {
    // const [file, setFile] = useState(null);
    // const [uploadStatus, setUploadStatus] = useState("");
    const [selectedEditor, setSelectedEditor] = useState("");

    const handleEditorSelection = (e) => {
        setSelectedEditor(e.target.value);
    }


    // const onFileChange = (e) => {
    //     const selectedFile = e.target.files[0];

    //     // Validate file type
    //     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    //     if (!allowedTypes.includes(selectedFile.type)) {
    //         setUploadStatus("Invalid file type. Only JPG and PNG allowed.");
    //         return;
    //     }

    //     // Validate file size (5MB limit)
    //     const maxSize = 5 * 1024 * 1024;  // 5MB in bytes
    //     if (selectedFile.size > maxSize) {
    //         setUploadStatus("File size exceeds 5MB limit.");
    //         return;
    //     }
    //     setFile(selectedFile);

    // };

    // const onUpload = async () => {
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     try {
    //         const response = await axios.post('https://aihub-node-rest-api.onrender.com/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         setUploadStatus(response.data);
    //     } catch (error) {
    //         setUploadStatus("Error uploading file.");
    //     }
    // };

    return (
        <div>
            {/* <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <button onClick={onUpload} disabled={!file}>Upload</button>
            <div>{uploadStatus}</div> */}
            {/* <select onChange={(e) => handleEditorSelection(e)}>
                <option value="">Select Image Editor</option>
                <option value="regularuploader">Regular Upload</option>
                <option value="brightness">Brightness Adjuster</option>
                <option value="rotate">Image Rotator</option>
                <option value="grayscale">Grayscale Converter</option>
                <option value="resize">Image Resizer</option>
                <option value="toJPG">Convert to JPG</option>
                <option value="toPNG">Convert to PNG</option>
            </select> */}
            {/* Conditional rendering based on dropdown selection. */}
            {/* {selectedEditor === 'regularuploader' && <RegularUploader />}
            {selectedEditor === 'brightness' && <BrightnessAdjuster />}
            {selectedEditor === 'rotate' && <ImageRotator />}
            {selectedEditor === 'grayscale' && <GrayscaleConverter />}
            {selectedEditor === 'resize' && <ImageResizer />}
            {selectedEditor === 'toJPG' && <ImageToJPGConverter />}
            {selectedEditor === 'toPNG' && <ImageToPNGConverter />} */}




            <DisplayImages />

        </div>
    );
}

export default Upload;
