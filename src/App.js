import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXCjakXPdYmuAJitPAfZsoTAWFUTXUxHnlBuzbkiMOiFGveOSxtSMwtAYdHM-d7L5uags4OdB1m_hK/pub?output=csv'
        );
        const parsed = await parseCSV(res.data);
        setData(parsed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);
    return rows.map((row) => {
      const values = row.split(',');
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header.trim()] = values[idx]?.trim();
      });
      return obj;
    });
  };

  const filteredData = data.filter(
    (item) =>
      item['Service']?.toLowerCase().includes(search.toLowerCase()) ||
      item['Department / Portal']?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 mb-8">
        Tamil Nadu Services Directory Web
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by service or department..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-indigo-700">
              {item['Service']}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {item['Department / Portal']}
            </p>
            {item['Description'] && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item['Description']}
              </p>
            )}
            {item['URL'] && (
              <a
                href={item['URL']}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:underline text-sm font-medium"
              >
                Visit Service <ExternalLink size={16} className="ml-1" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;