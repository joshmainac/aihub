import React, { useState } from 'react';
import axios from 'axios';







function RegularUploader() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");




    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(selectedFile.type)) {
            setUploadStatus("Invalid file type. Only JPG and PNG allowed.");
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024;  // 5MB in bytes
        if (selectedFile.size > maxSize) {
            setUploadStatus("File size exceeds 5MB limit.");
            return;
        }
        setFile(selectedFile);

    };

    const onUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://aihub-node-rest-api.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus(response.data);
        } catch (error) {
            setUploadStatus("Error uploading file.");
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <button onClick={onUpload} disabled={!file}>Upload</button>
            <div>{uploadStatus}</div>
        </div>
    );
}

export default RegularUploader;
