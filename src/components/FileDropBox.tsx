import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface FileDropBoxProps {
  title: string;
  subtitle: string;
  fileType: 'jd' | 'resume';
  onFileChange: (file: File | null) => void;
  onTextChange: (text: string) => void;
}

const FileDropBox: React.FC<FileDropBoxProps> = ({
  title,
  subtitle,
  fileType,
  onFileChange,
  onTextChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isTextMode, setIsTextMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onFileChange(droppedFile);
      
      // Reset text input when file is uploaded
      setText('');
      onTextChange('');
    }
  }, [onFileChange, onTextChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileChange(selectedFile);
      
      // Reset text input when file is uploaded
      setText('');
      onTextChange('');
    }
  }, [onFileChange, onTextChange]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
    
    // Reset file input when text is entered
    setFile(null);
    onFileChange(null);
  }, [onFileChange, onTextChange]);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileChange]);

  const toggleInputMode = useCallback(() => {
    setIsTextMode(!isTextMode);
    
    // Reset inputs when switching modes
    setText('');
    setFile(null);
    onTextChange('');
    onFileChange(null);
  }, [isTextMode, onFileChange, onTextChange]);

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-xl shadow-lg p-6 mb-8 border border-gray-800 relative overflow-hidden">
      {/* Subtle gradient background element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-600/5 to-indigo-600/5 blur-3xl pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          {fileType === 'jd' ? (
            <span className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 mr-2">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          ) : (
            <span className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 mr-2">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          )}
          {title}
        </h3>
        <button
          onClick={toggleInputMode}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
        >
          {isTextMode ? 'Switch to file upload' : 'Switch to text input'}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

      {isTextMode ? (
        <div className="mt-2">
          <textarea
            className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#111111] text-white min-h-40 placeholder-gray-500"
            placeholder={fileType === 'jd' ? 'Paste job description here...' : 'Paste resume content here...'}
            value={text}
            onChange={handleTextChange}
          />
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center ${
            isDragging 
              ? 'border-purple-500 bg-purple-900/10' 
              : 'border-gray-700'
          } transition-colors duration-200 ease-in-out`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-2">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white truncate max-w-[13rem]">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <svg className="w-14 h-14 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="mb-2 text-sm text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mb-4">
                PDF, DOCX, or TXT (max. 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.txt"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Select file
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileDropBox; 