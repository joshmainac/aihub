import React, { useState } from 'react';
import axios from 'axios';

function ImageResizer() {
    const [file, setFile] = useState(null);
    const [width, setWidth] = useState(800);  // default width
    const [height, setHeight] = useState(600);  // default height
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

    const resizeImage = async () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('width', width.toString());
        formData.append('height', height.toString());

        try {
            const response = await axios.post('https://aihub-node-rest-api.onrender.com/resizeImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus(response.data);
        } catch (error) {
            setStatus("Error resizing image.");
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <label>Width:
                <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                />
            </label>
            <label>Height:
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                />
            </label>
            <button onClick={resizeImage} disabled={!file}>Resize & Upload</button>
            <div>{status}</div>
        </div>
    );
}

export default ImageResizer;
