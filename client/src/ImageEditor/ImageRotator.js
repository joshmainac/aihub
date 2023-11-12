import React, { useState } from 'react';
import axios from 'axios';

function ImageRotator() {
    const [file, setFile] = useState(null);
    const [angle, setAngle] = useState(0);  // default rotation angle
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

    const rotateImage = async () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('angle', angle.toString());

        try {
            const response = await axios.post('https://aihub-node-rest-api.onrender.com/rotateImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus(response.data);
        } catch (error) {
            setStatus("Error rotating image.");
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <label>Rotation Angle (degrees):
                <input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                />
            </label>
            <button onClick={rotateImage} disabled={!file}>Rotate & Upload</button>
            <div>{status}</div>
        </div>
    );
}

export default ImageRotator;
