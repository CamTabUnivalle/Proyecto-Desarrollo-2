import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Cambia la URL según tu endpoint
    fetch('http://localhost:5000/api/usuarios')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Usuarios desde PostgreSQL:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.nombre} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;