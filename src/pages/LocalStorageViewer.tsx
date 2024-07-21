import React, { useState, useEffect } from 'react';

// Local Storage verilerini saklamak için kullanılan arayüz
interface LocalStorageData {
  [key: string]: string | number | object | null;
}

const LocalStorageViewer: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useState<LocalStorageData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalStorageData = () => {
      try {
        // Local Storage'daki tüm verileri çek
        const keys = Object.keys(localStorage);
        const data: LocalStorageData = {};

        keys.forEach((key) => {
          try {
            // JSON.parse ile veri ayrıştırılırken türü string, number veya object olabilir
            const item = localStorage.getItem(key);
            if (item) {
              try {
                const parsedItem = JSON.parse(item);
                if (typeof parsedItem === 'number') {
                  data[key] = parsedItem;
                } else if (typeof parsedItem === 'object') {
                  data[key] = parsedItem;
                } else {
                  data[key] = item; // Eğer JSON.parse ile ayrıştırılamazsa, ham metin olarak sakla
                }
              } catch (e) {
                // JSON.parse hata verdiğinde ham metin olarak sakla
                data[key] = item;
              }
            } else {
              data[key] = null;
            }
          } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
            data[key] = 'Error parsing data';
          }
        });

        setLocalStorageData(data);
      } catch (error) {
        console.error('Error fetching data from localStorage:', error);
        setError('An error occurred while fetching data from localStorage.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocalStorageData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Local Storage Data</h2>
      {Object.keys(localStorageData).length === 0 ? (
        <p>No data found in localStorage.</p>
      ) : (
        <ul>
          {Object.entries(localStorageData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> 
              {typeof value === 'string' || typeof value === 'number'
                ? value
                : JSON.stringify(value, null, 2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocalStorageViewer;
