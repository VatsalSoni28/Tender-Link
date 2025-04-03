import React, { useState } from 'react';
import axios from 'axios';

const ContentManagement = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the file to state
    };

    const handleTextChange = (event) => {
        setText(event.target.value); // Update the state with text input
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value); // Update the state with title input
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('text', text);

        try {
            // Assuming you have a backend endpoint to handle POST request
            const response = await axios.post('http://yourapi.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File Uploaded', response.data);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <div>
            <h2>Content Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Text Content:</label>
                    <textarea value={text} onChange={handleTextChange} />
                </div>
                <div>
                    <label>Upload File:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload Content</button>
            </form>
        </div>
    );
};

export default ContentManagement;
