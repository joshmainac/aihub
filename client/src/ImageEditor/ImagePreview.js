// ImagePreview.js
import React from 'react';

function ImagePreview({ location }) {
    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <object data={location?.state?.imageURL} type="image/jpeg" width="80%" height="80%">
                Sorry, your browser doesn't support embedded images.
            </object>
        </div>
    );
}

export default ImagePreview;
