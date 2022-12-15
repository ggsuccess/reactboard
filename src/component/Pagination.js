import React from 'react';
import './Pagination.css';
//////////////////////페이지당글수//총게시글수///페이징함수/현재페이지//
const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []; //페이지를 담을 배열 선언
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    // 전체게시글 수를 페이지수로 나눠서 배열에담음
    pageNumbers.push(i);
  }
  // currentPage; //현재 페이지
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num}>
            <a
              className={num === currentPage ? 'current' : 'none'}
              onClick={(e) => paginate(num, e)}
              href="!#"
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
