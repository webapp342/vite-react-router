import React, { useEffect, useState } from 'react';

const LocalStorageViewer: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Local storage'daki verileri oku
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key) || '';
      }
    }
    setLocalStorageData(data);
  }, []);

  return (
    <div className="local-storage-viewer">
      <h2>Local Storage Viewer</h2>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(localStorageData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocalStorageViewer;
