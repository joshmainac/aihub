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
//import UploadStyle from './MediaUploader.css';
//import UploadStyle from 'MediaUploader.module.css'





function Upload() {


    const [selectedEditor, setSelectedEditor] = useState("");

    const handleEditorSelection = (e) => {
        setSelectedEditor(e.target.value);
    }




    return (
        <div className="MediaContainer ">


            <select className="Mediadropdown" onChange={(e) => handleEditorSelection(e)}>
                <option value="">Select Image Editor</option>
                <option value="regularuploader">Regular Upload</option>
                <option value="brightness">Brightness Adjuster</option>
                <option value="rotate">Image Rotator</option>
                <option value="grayscale">Grayscale Converter</option>
                <option value="resize">Image Resizer</option>
                <option value="toJPG">Convert to JPG</option>
                <option value="toPNG">Convert to PNG</option>
            </select>
            {selectedEditor === 'regularuploader' && <RegularUploader />}
            {selectedEditor === 'brightness' && <BrightnessAdjuster />}
            {selectedEditor === 'rotate' && <ImageRotator />}
            {selectedEditor === 'grayscale' && <GrayscaleConverter />}
            {selectedEditor === 'resize' && <ImageResizer />}
            {selectedEditor === 'toJPG' && <ImageToJPGConverter />}
            {selectedEditor === 'toPNG' && <ImageToPNGConverter />}




            <DisplayImages />



        </div>
    );
}

export default Upload;
