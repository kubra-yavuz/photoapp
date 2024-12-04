import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import EXIF from 'exif-js';
import L from 'leaflet';
import './Photo.css';

interface ExifData {
    [key: string]: any;
}

const Photo = forwardRef((_, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [exifData, setExifData] = useState<ExifData | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

    const mapRef = useRef<L.Map | null>(null);

    useImperativeHandle(ref, () => ({
        handleUploadClick: () => {
            fileInputRef.current?.click();
        },
    }));


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    EXIF.getData(img, () => {
                        const allMetaData = EXIF.getAllTags(img) as ExifData;
                        setExifData(allMetaData);
                        const lat = getGpsDecimal(allMetaData.GPSLatitude, allMetaData.GPSLatitudeRef);
                        const lng = getGpsDecimal(allMetaData.GPSLongitude, allMetaData.GPSLongitudeRef);

                        if (lat && lng) {
                            setGpsCoords({ lat, lng });
                        }
                    });
                };

                setImageData(URL.createObjectURL(file));
                hideStaticContent();
            };

            reader.readAsDataURL(file);
        }
    };

    const hideStaticContent = () => {
        const staticContent = document.querySelector('.coming-soon-content') as HTMLElement;
        if (staticContent) {
            staticContent.style.display = 'none';
        }
    };

    const getGpsDecimal = (coordinate: any, hem: string | undefined): number | null => {
        if (!coordinate || !Array.isArray(coordinate)) return null;
        const decimal = coordinate[0] + coordinate[1] / 60 + coordinate[2] / 3600;
        return hem === 'S' || hem === 'W' ? -decimal : decimal;
    };

    useEffect(() => {
        if (gpsCoords) {
            setTimeout(() => {
                if (!mapRef.current) {
                    const map = L.map('map', {
                        center: [gpsCoords.lat, gpsCoords.lng],
                        zoom: 15,
                        scrollWheelZoom: false,
                        doubleClickZoom: true,
                    });

                    mapRef.current = map;

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '© OpenStreetMap contributors',
                    }).addTo(map);

                    L.marker([gpsCoords.lat, gpsCoords.lng]).addTo(map)
                        .bindPopup('The location where the photo was taken')
                        .openPopup();

                    setTimeout(() => {
                        map.invalidateSize();
                    }, 1000);
                } else {
                    mapRef.current.setView([gpsCoords.lat, gpsCoords.lng], 15);
                    mapRef.current.invalidateSize();
                }
            }, 300);
        }
    }, [gpsCoords]);

    const formatValue = (value: any) => {
        if (Array.isArray(value)) return value.join(', ');
        if (typeof value === 'object') return JSON.stringify(value);
        return value?.toString() ?? 'Unknown';
    };

    const handleOkClick = () => {
        window.location.reload();
    };

    const formatDate = (dateTime: string | undefined): string => {
        if (!dateTime) return 'Unknown';
        const datePart = dateTime.split(' ')[0];
        return datePart.replace(/:/g, '-');
    };

    const formatTime = (dateTime: string | undefined): string => {
        if (!dateTime) return 'Unknown';
        const timePart = dateTime.split(' ')[1];
        return timePart;
    };


    return (
        <div className="upload-container">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            {imageData ? (
                <div className="exif-content">
                    {imageData && (
                        <div className="img">
                            <img
                                src={imageData}
                                alt="Seçilen Fotoğraf"
                                width="300"
                                style={{ marginTop: '130px' }}
                            />
                        </div>
                    )}
                    <h2>Photo Information</h2>
                    <div className="info-grid">

                        <div className="info-group">
                            <h3>Device Information</h3>
                            <p><strong>Brand:</strong> {formatValue(exifData?.Make)}</p>
                            <p><strong>Model:</strong> {formatValue(exifData?.Model)}</p>
                        </div>


                        <div className="info-group">
                            <h3>Capture Time</h3>
                            <p><strong>Date:</strong> {formatDate(exifData?.DateTime)}</p>
                            <p><strong>Time:</strong> {formatTime(exifData?.DateTime)}</p>
                        </div>
                    </div>
                    <div className="setting">
                        <h3>Capture Settings</h3>
                        <p><strong>Shutter Speed:</strong> {formatValue(exifData?.ShutterSpeedValue)}</p>
                        <p><strong>Aperture:</strong> {formatValue(exifData?.ApertureValue)}</p>
                        <p><strong>ISO:</strong> {formatValue(exifData?.ISOSpeedRatings)}</p>
                        <p><strong>Focal Length:</strong> {formatValue(exifData?.FocalLength)}</p>
                    </div>
                    <div className="gps">
                        <h3>GPS Information</h3>
                        {gpsCoords ? (
                            <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
                        ) : (
                            <p>GPS information not found.</p>
                        )}
                    </div>
                    <button className="ok" onClick={handleOkClick}>
                        OK!
                    </button>
                </div>
            ) : null}
        </div>
    );
});

export default Photo;