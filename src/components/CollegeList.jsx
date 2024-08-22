import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../index.css';
import CollegeItem from './CollegeItem';

import { colleges } from '../data';

const CollegeList = () => {
  const [items, setItems] = useState(colleges.slice(0, 10)); // Initial load
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order

  useEffect(() => {
    // Handle sorting
    const sortArray = (type, order) => {
      const types = {
        rank: 'rank',
        fees: 'fees',
        userReviews: 'userReviews',
      };
      const sortProperty = types[type];

      const sorted = [...colleges].sort((a, b) => {
        if (order === 'asc') {
          return a[sortProperty] - b[sortProperty];
        } else {
          return b[sortProperty] - a[sortProperty];
        }
      });
      setItems(sorted.slice(0, items.length));
    };

    sortArray(sortType, sortOrder);
  }, [sortType, sortOrder]);

  const fetchMoreData = () => {
    if (items.length >= colleges.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(colleges.slice(items.length, items.length + 10)));
    }, 1500);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredColleges = items.filter(college =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="controls">
        
        <input
          type="text"
          placeholder="Search by college name...."
          value={search}
          onChange={handleSearch}
          
        />
        <select onChange={(e) => setSortType(e.target.value)} defaultValue="">
          <option value="">Sort By</option>
          <option value="rank">Rank</option>
          <option value="fees">Fees</option>
          <option value="userReviews">User Reviews</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} defaultValue="asc">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={filteredColleges.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>End!</b>
          </p>
        }
      >

        <table border="1" cellPadding="10" cellSpacing="2">
          <thead>
            <tr>
              <th>CD Rank</th>
              <th>Colleges</th>
              <th>Courses Fees</th>
              <th>Placement</th>
              <th>User Reviews</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college, index) => (

              <tr key={index} className={college.featured ? "college backgroundOrange" : "college"}>
                <CollegeItem key={index} college={college} />
              </tr>


            ))}
          </tbody>
        </table>

      </InfiniteScroll>
    </div>
  );
};

export default CollegeList;
