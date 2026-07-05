import { useRef, useState } from 'react';

function FileUploadZone({ file, onFileSelect, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`upload-zone ${isDragging ? 'upload-zone-active' : ''} ${file ? 'upload-zone-has-file' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFilePicker}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openFilePicker();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        hidden
        disabled={disabled}
      />

      <div className="upload-zone-icon">PDF</div>

      {file ? (
        <>
          <p className="upload-zone-title">{file.name}</p>
          <p className="upload-zone-hint">{(file.size / 1024 / 1024).toFixed(2)} MB · Click or drop to replace</p>
        </>
      ) : (
        <>
          <p className="upload-zone-title">Drag & drop your resume here</p>
          <p className="upload-zone-hint">or click to browse · PDF only · Max 5MB</p>
        </>
      )}
    </div>
  );
}

export default FileUploadZone;
