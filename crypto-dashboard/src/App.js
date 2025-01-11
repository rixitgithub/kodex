import React, { useState } from 'react';

const App = () => {
  const [deviationCoin, setDeviationCoin] = useState('');
  const [statsCoin, setStatsCoin] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');

  const routes = [
    {
      name: 'http://localhost:5000/api/deviation?coin=',
      coinState: deviationCoin,
      setCoinState: setDeviationCoin,
      description: 'Fetches the standard deviation of the last 100 records for the selected coin.',
      endpoint: '/deviation',
    },
    {
      name: 'http://localhost:5000/api/stats?coin=',
      coinState: statsCoin,
      setCoinState: setStatsCoin,
      description: 'Fetches the latest stats for the selected coin.',
      endpoint: '/stats',
    },
  ];

  const testRoute = async (route) => {
    const coinToFetch = route.coinState;
    if (!coinToFetch) {
      alert('Please enter a coin name');
      return;
    }

    setSelectedRoute(route);
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(route.name + coinToFetch);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#181818', color: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>
  <span style={{ color: '#007bff' }}>Koin</span>
  <span style={{ color: '#FFD700' }}>X </span>
  Backend Developer Intern
</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Sidebar for Routes */}
        <div style={{ width: '50%', borderRight: '1px solid #444', paddingRight: '20px' }}>
          <h3 style={{ color: '#ffffff' }}>Available Routes</h3>
          {routes.map((route, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold', color: '#f8f9fa' }}>Route:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#f8f9fa', width: '50%' }}>{route.name}</span>
                  <input
                    type="text"
                    value={route.coinState}
                    onChange={(e) => route.setCoinState(e.target.value)}
                    placeholder="Enter coin name"
                    style={{
                      padding: '10px',
                      width: '30%',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      backgroundColor: '#333',
                      color: '#f8f9fa',
                    }}
                  />
                  <button
                    onClick={() => testRoute(route)}
                    style={{
                      padding: '10px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div style={{ width: '50%', paddingLeft: '20px' }}>
          <h3 style={{ color: '#ffffff' }}>Route Details</h3>
          {selectedRoute ? (
            <>
              
              <p style={{ color: '#f8f9fa' }}>
                <strong>URL:</strong> {selectedRoute.name + selectedRoute.coinState}
              </p>
              <p style={{ color: '#f8f9fa' }}>
                <strong>Description:</strong> {selectedRoute.description}
              </p>
            </>
          ) : (
            <p style={{ color: '#f8f9fa' }}>Select a route to view details.</p>
          )}

          <h3 style={{ color: '#ffffff' }}>Response</h3>
          {loading ? (
            <p style={{ color: '#f8f9fa' }}>Loading...</p>
          ) : response ? (
            <pre
              style={{
                backgroundColor: '#333',
                padding: '15px',
                border: '1px solid #444',
                borderRadius: '4px',
                overflowX: 'auto',
                color: '#f8f9fa',
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <p style={{ color: '#f8f9fa' }}>No response yet. Test a route to see the output.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
