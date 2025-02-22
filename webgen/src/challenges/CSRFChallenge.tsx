import React, { FC, useState } from 'react';
import type { Challenge } from '../types/templates.js';

interface Post {
  id: number;
  content: string;
  likes: number;
}

const PostComponent: FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, content: "Just launched my new startup! 🚀", likes: 5 },
    { id: 2, content: "Check out our latest product release: www.example.com/launch", likes: 3 },
  ]);
  const [success, setSuccess] = useState(false);

  const handleLike = async (postId: number) => {
    try {
      // Update UI immediately for better feedback
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );

      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.message?.includes('Flag:')) {
        setSuccess(true);
        console.log('🎉 Flag found:', data.message);
        // Show success message for 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      // Revert on error
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
    }
  };

  return (
    <div className="feed-posts">
      {posts.map(post => (
        <div key={post.id} className="post">
          <p>{post.content}</p>
          <div className="post-actions">
            <button onClick={() => handleLike(post.id)} className="like-button">
              ❤️ {post.likes}
            </button>
            <button className="share-button">Share</button>
          </div>
        </div>
      ))}
      {success && (
        <div className="success-popup">
          🎉 Challenge completed! Check the Network tab for the flag.
        </div>
      )}
    </div>
  );
};

const CSRFChallenge: Challenge = {
  id: 'csrf-like-1',
  type: 'csrf',
  name: 'Like Button CSRF',
  description: 'Create a CSRF attack that automatically likes a post',
  difficulty: 'medium',
  points: 150,
  component: PostComponent,
  solution: `Create an HTML form that automatically submits:
<form action="/api/posts/1/like" method="POST">
  <input type="submit" value="Click me!">
</form>`
};

export default CSRFChallenge; 