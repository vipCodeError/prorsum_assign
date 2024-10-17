import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import styles from './App.module.css';

const App = () => {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Adjust the posts per page if necessary

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      setPosts(response.data);
      setLoading(false);
    };
    
    fetchData();
  }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>Paginated Posts</h1>
      <ul className="list-group mb-4">
        {currentPosts.map(post => (
          <li key={post.id} className="list-group-item d-flex flex-column">
             <img src={post.images[0]} width="200" />
            <span className={styles.price}>${post.price}</span>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.container}>{post.category["name"]}</span>
          </li>
        ))}
      </ul>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;