import React, { useState } from 'react';
import "./Buttons.css"
import { all } from 'axios';

function ImportButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = all; // You can set the file types that can be selected here
    fileInput.addEventListener('change', handleFileSelect);
    fileInput.click();
  };

  return (
    <div>
      <button className="buttons" onClick={handleClick} >Import</button>
      {selectedFile && <p>You selected file: {selectedFile.name}</p>}
    </div>
  );
}

export default ImportButton;