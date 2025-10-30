import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = codespace === 'localhost'
    ? '/api/leaderboard/'
    : `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboard.map((entry, idx) => (
          <li key={idx} className="list-group-item">
            {entry.team}: {entry.points} pts (Rank {entry.rank})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
