import React, { useEffect, useState } from 'react';
import { TopContributorsResponse, User } from '../types';

const TopContributors: React.FC = () => {
  const [topContributors, setTopContributors] = useState<User[]>([]);

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const response = await fetch('https://wallethunter.onrender.com/api/top-contributors');
        const data: TopContributorsResponse = await response.json();
        setTopContributors(data.topContributors);
      } catch (error) {
        console.error('Error fetching top contributors:', error);
      }
    };
    fetchTopContributors();
  }, []);

  return (
    <div className="card">
      <h3>Top Contributors</h3>
      <ul>
        {topContributors.map((user, index) => (
          <div key={index}>
          <li>{user.username}: {user.messages} messages</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
