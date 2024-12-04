import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            navigate('/photo-info'); // Fotoğraf seçildikten sonra yönlendir
        }
    };

    return (
        <div className="home-page">
            <h1>Get notified when we’re ready to launch!</h1>
            <form action="#">
                <input type="email" />
                <button id="select-photo-button" onClick={handleUploadClick}>
                    Select Photo
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </form>
        </div>
    );
};

export default HomePage;