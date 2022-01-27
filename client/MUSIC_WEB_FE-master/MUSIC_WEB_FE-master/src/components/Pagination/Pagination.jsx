import React from 'react';
import { useState } from 'react';
import "./style.scss"

const Pagination = ({ indexOfFirstSong, songsPerPage, totalSongs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSongs / songsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className='pagination'>
        <a>&laquo;</a>
          {pageNumbers.map(number => (
              <a key={number} className={ (indexOfFirstSong / songsPerPage + 1) == number ? "active" : "normal"} onClick={() => paginate(number)}>
                {number}
              </a>
          ))}
        <a>&raquo;</a>
        
      </div>
    </>
  );
};

export default Pagination;