import React, { useState } from 'react';
import axios from 'axios';

function ImageToJPGConverter() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (!allowedTypes.includes(selectedFile.type)) {
            setStatus("Invalid file type. Only JPG and PNG allowed.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;  // 5MB in bytes
        if (selectedFile.size > maxSize) {
            setStatus("File size exceeds 5MB limit.");
            return;
        }
        setFile(selectedFile);
    };

    const convertToJPG = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://aihub-node-rest-api.onrender.com/convertToJPG', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus(response.data);
        } catch (error) {
            setStatus("Error converting image to JPG.");
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <button onClick={convertToJPG} disabled={!file}>Convert to JPG & Upload</button>
            <div>{status}</div>
        </div>
    );
}

export default ImageToJPGConverter;
