import React, { createContext, useContext, useState, useEffect } from "react";

// Create the community context
const CommunityContext = createContext();

// Custom hook to use the community context
export const useCommunity = () => useContext(CommunityContext);

// Provider component
export const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("forumPosts");

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts if none exist
      const samplePosts = [
        {
          id: "1",
          author: "LearningEnthusiast",
          title: "Tips for consistent daily practice",
          content:
            "I found that setting aside 30 minutes each day for focused practice has greatly improved my progress. What techniques work for you?",
          date: "2025-03-25T14:32:00Z",
          skillId: "web-development",
          likes: 12,
          comments: [
            {
              id: "1-1",
              author: "CodeMaster",
              content:
                "I use the Pomodoro technique - 25 minutes of focused work followed by a 5-minute break.",
              date: "2025-03-25T15:10:00Z",
              likes: 5,
            },
          ],
        },
        {
          id: "2",
          author: "DataScientist",
          title: "Recommended resources for learning Python",
          content:
            "I am currently following the roadmap and looking for additional resources to deepen my Python knowledge. Any recommendations?",
          date: "2025-03-24T10:15:00Z",
          skillId: "data-science",
          likes: 8,
          comments: [],
        },
      ];

      setPosts(samplePosts);
      localStorage.setItem("forumPosts", JSON.stringify(samplePosts));
    }

    setLoading(false);
  }, []);

  // Add a new post
  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));

    return newPost;
  };

  // Add a comment to a post
  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          ...comment,
          id: `${postId}-${post.comments.length + 1}`,
          date: new Date().toISOString(),
          likes: 0,
        };

        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
  };

  // Toggle like on a post
  const toggleLikePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
  };

  // Get posts for a specific skill
  const getPostsBySkill = (skillId) => {
    if (!skillId) return posts;
    return posts.filter((post) => post.skillId === skillId);
  };

  const value = {
    posts,
    loading,
    addPost,
    addComment,
    toggleLikePost,
    getPostsBySkill,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityContext;
