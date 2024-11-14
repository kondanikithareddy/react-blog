// import PropTypes from 'prop-types';
// import BlogPost from '../BlogPost/BlogPost';
// import './BlogList.css';

// function BlogList({ posts }) {
//   return (
//     <div className="blog-list">
//       {posts.map(post => (
//         <BlogPost
//           key={post.id}
//           title={post.title}
//           content={post.content}
//           author={post.author}
//           date={post.date}
//           readTime={post.readTime}
//         />
//       ))}
//     </div>
//   );
// }

// BlogList.propTypes = {
//   posts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       content: PropTypes.string.isRequired,
//       author: PropTypes.string.isRequired,
//       date: PropTypes.string.isRequired,
//       readTime: PropTypes.number.isRequired
//     })
//   ).isRequired
// };

// export default BlogList;

import React from 'react';
import BlogPost from '../BlogPost/BlogPost';

function BlogList({ posts }) {
  return (
    <section>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
        />
      ))}
    </section>
  );
}

export default BlogList;
