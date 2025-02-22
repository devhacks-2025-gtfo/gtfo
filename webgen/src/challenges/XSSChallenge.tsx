import React, { FC, useState, FormEvent } from 'react';
import type { Challenge } from '../types/templates';

const SearchComponent: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.message?.includes('Flag:')) {
        setSuccess(true);
        console.log('🎉 Flag found:', data.message);
        // Show success message for 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      // Silently fail
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {success && (
        <div className="success-popup">
          🎉 Challenge completed! Check the Network tab for the flag.
        </div>
      )}
    </form>
  );
};

const XSSChallenge: Challenge = {
  id: 'xss-search-1',
  type: 'xss',
  name: 'Search Bar XSS',
  description: 'Try to execute JavaScript through the search functionality',
  difficulty: 'easy',
  points: 100,
  component: SearchComponent,
  solution: "Enter a payload like: <script>alert('XSS')</script>"
};

export default XSSChallenge; 