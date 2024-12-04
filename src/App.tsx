import React, { useRef, useEffect } from 'react';
import Photo from './pages/Photo/Photo';

function App() {
  const photoRef = useRef<any>(null);

  useEffect(() => {

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'select-photo-button') {
        e.preventDefault();
        photoRef.current?.handleUploadClick();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <Photo ref={photoRef} />

    </div>
  );
}

export default App;