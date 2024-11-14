import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BlogPost.module.css';

function BlogPost({ title, content, author, date, readTime }) {
  const [showFullContent, setShowFullContent] = useState(false);

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

      <div className={styles.content}>
        {/* Display only part of the content initially, then the full content on button click */}
        {showFullContent ? content : `${content.slice(0, 20)}...`}
      </div>
      <button
        onClick={handleReadMore}
        className={styles.readMoreButton}
        aria-label={showFullContent ? 'Collapse content' : 'Expand content'}
      >
        {showFullContent ? 'Read Less' : 'Read More'}
      </button>

      <div className={styles.socialShare}>
        <i
          onClick={shareOnTwitter}
          className={`fab fa-twitter ${styles.shareIcon}`}
          aria-label="Share on Twitter"
        ></i>
        <i
          onClick={shareOnFacebook}
          className={`fab fa-facebook ${styles.shareIcon}`}
          aria-label="Share on Facebook"
        ></i>
        <i
          onClick={shareOnLinkedIn}
          className={`fab fa-linkedin ${styles.shareIcon}`}
          aria-label="Share on LinkedIn"
        ></i>
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
};

export default BlogPost;
