// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styles from './BlogPost.module.css';

// function BlogPost({ title, content, author, date, readTime }) {
//   const [showFullContent, setShowFullContent] = useState(false);

//   const handleReadMore = () => setShowFullContent(!showFullContent);

//   // Social media sharing functions
//   const shareOnTwitter = () => {
//     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
//     window.open(url, '_blank');
//   };

//   const shareOnFacebook = () => {
//     const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
//     window.open(url, '_blank');
//   };

//   const shareOnLinkedIn = () => {
//     const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <article className={styles.blogPost}>
//       <div className={styles.header}>
//         <h2 className={styles.title}>{title}</h2>
//         <div className={styles.meta}>
//           <span className={styles.author}>By {author}</span>
//           <time className={styles.date}>{date}</time>
//           <span className={styles.readTime}>{readTime} min read</span>
//         </div>
//       </div>

//       <div className={styles.content}>
//         {/* Display only part of the content initially, then the full content on button click */}
//         {showFullContent ? content : `${content.slice(0, 20)}...`}
//       </div>
//       <button
//         onClick={handleReadMore}
//         className={styles.readMoreButton}
//         aria-label={showFullContent ? 'Collapse content' : 'Expand content'}
//       >
//         {showFullContent ? 'Read Less' : 'Read More'}
//       </button>

//       <div className={styles.socialShare}>
//         <i
//           onClick={shareOnTwitter}
//           className={`fab fa-twitter ${styles.shareIcon}`}
//           aria-label="Share on Twitter"
//         ></i>
//         <i
//           onClick={shareOnFacebook}
//           className={`fab fa-facebook ${styles.shareIcon}`}
//           aria-label="Share on Facebook"
//         ></i>
//         <i
//           onClick={shareOnLinkedIn}
//           className={`fab fa-linkedin ${styles.shareIcon}`}
//           aria-label="Share on LinkedIn"
//         ></i>
//       </div>
//     </article>
//   );
// }

// BlogPost.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   readTime: PropTypes.number.isRequired,
// };

// export default BlogPost;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import { calculateReadTime } from '../../utils/readTime';
import styles from './BlogPost.module.css';

function BlogPost({ title, content, author, date }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`${title}-likes`)) || 0);  // Load from localStorage
  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem(`${title}-comments`)) || []);
  const [userPreferences, setUserPreferences] = useState(() => JSON.parse(localStorage.getItem('user-preferences')) || {});

  const handleReadMore = () => setShowFullContent(!showFullContent);

  // Social media sharing functions
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`;
    window.open(url, '_blank');
  };

  // Persist likes in localStorage
  const handleLikeChange = (newLikes) => {
    setLikes(newLikes);
    localStorage.setItem(`${title}-likes`, newLikes); // Save likes to localStorage
  };

  // Persist comments to localStorage
  const handleAddComment = (comment) => {
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem(`${title}-comments`, JSON.stringify(newComments)); // Save comments
  };

  const handleEditComment = (index, updatedComment) => {
    const updatedComments = [...comments];
    updatedComments[index] = updatedComment;
    setComments(updatedComments);
    localStorage.setItem(`${title}-comments`, JSON.stringify(updatedComments)); // Save updated comments
  };

  const handleReplyToComment = (index, reply) => {
    const updatedComments = [...comments];
    updatedComments[index].replies = [...updatedComments[index].replies, reply];
    setComments(updatedComments);
    localStorage.setItem(`${title}-comments`, JSON.stringify(updatedComments)); // Save updated comments
  };

  // Sort comments by date or likes
  const sortComments = (method) => {
    let sortedComments = [...comments];
    if (method === 'date') {
      sortedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (method === 'likes') {
      sortedComments.sort((a, b) => b.likes - a.likes);
    }
    setComments(sortedComments);
  };

  // Calculate read time dynamically
  const readTime = calculateReadTime(content);

  // Smooth transition animation for expanding content and like button animation
  const contentClass = showFullContent ? `${styles.content} ${styles.expanded}` : styles.content;

  useEffect(() => {
    localStorage.setItem('user-preferences', JSON.stringify(userPreferences)); // Save preferences
  }, [userPreferences]);

  return (
    <article className={styles.blogPost}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.author}>By {author}</span>
          <time className={styles.date}>{date}</time>
          <span className={styles.readTime}>{readTime} min read</span>
        </div>
      </div>

      <div className={contentClass}>
        {showFullContent ? content : `${content.slice(0, 30)}...`}
      </div>
      <button
        onClick={handleReadMore}
        className={`${styles.readMoreButton} ${showFullContent ? styles.collapsed : styles.expanded}`}
        aria-label={showFullContent ? 'Collapse content' : 'Expand content'}
      >
        {showFullContent ? 'Read Less' : 'Read More'}
      </button>

      <div className={styles.socialShare}>
        <i onClick={shareOnTwitter} className={`fab fa-twitter ${styles.shareIcon}`} aria-label="Share on Twitter"></i>
        <i onClick={shareOnFacebook} className={`fab fa-facebook ${styles.shareIcon}`} aria-label="Share on Facebook"></i>
        <i onClick={shareOnLinkedIn} className={`fab fa-linkedin ${styles.shareIcon}`} aria-label="Share on LinkedIn"></i>
      </div>

      <LikeButton initialLikes={likes} onLikeChange={handleLikeChange} />

      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onReplyToComment={handleReplyToComment}
        onSortComments={sortComments}
      />
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default BlogPost;
