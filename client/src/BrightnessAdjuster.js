import React, { useState } from 'react';
import axios from 'axios';

function BrightnessAdjuster() {
    const [file, setFile] = useState(null);
    const [brightness, setBrightness] = useState(1);  // default brightness (no change)
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

    const adjustBrightness = async () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('brightness', brightness.toString());

        try {
            const response = await axios.post('http://localhost:8000/adjustBrightness', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setStatus(response.data);
        } catch (error) {
            setStatus("Error adjusting brightness.");
        }
    };

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={onFileChange} />
            <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
            />
            <button onClick={adjustBrightness} disabled={!file}>Adjust Brightness & Upload</button>
            <div>{status}</div>
        </div>
    );
}

export default BrightnessAdjuster;
