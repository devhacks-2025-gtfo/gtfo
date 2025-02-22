import React from 'react';
import type { BaseTemplate } from '../../types/templates';

const SocialTemplate: BaseTemplate = {
  type: 'social',
  name: 'Social Media Platform',
  description: 'A modern social media platform template with user interactions',
  layout: (
    <div className="social-layout">
      <header className="header">
        <nav className="nav">
          <div className="logo">SocialApp</div>
          <div className="search">
            {/* Challenge slot for XSS in search */}
            <div id="challenge-search" data-challenge-type="xss" />
          </div>
          <div className="auth">
            {/* Challenge slot for authentication */}
            <div id="challenge-auth" data-challenge-type="authentication" />
          </div>
        </nav>
      </header>
      
      <main className="main-content">
        <aside className="sidebar">
          <div className="profile">
            {/* Challenge slot for IDOR in profile */}
            <div id="challenge-profile" data-challenge-type="idor" />
          </div>
          <div className="navigation">
            <ul>
              <li>Home</li>
              <li>Messages</li>
              <li>Notifications</li>
              <li>Settings</li>
            </ul>
          </div>
        </aside>
        
        <section className="feed">
          {/* Challenge slot for CSRF in posts */}
          <div id="challenge-posts" data-challenge-type="csrf" />
        </section>
      </main>
    </div>
  ),
  challengeSlots: [
    {
      id: 'challenge-search',
      position: 'header-search',
      allowedTypes: ['xss']
    },
    {
      id: 'challenge-auth',
      position: 'header-auth',
      allowedTypes: ['authentication']
    },
    {
      id: 'challenge-profile',
      position: 'sidebar-profile',
      allowedTypes: ['idor']
    },
    {
      id: 'challenge-posts',
      position: 'main-feed',
      allowedTypes: ['csrf']
    }
  ]
};

export default SocialTemplate; 