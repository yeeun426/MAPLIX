import React from 'react';
import styled from "styled-components";

const PaginationContainer = styled.div `
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const PageUl = styled.ul`
    list-style: none;
    text-align: center;
    color: white;
    padding: 1px;
`;

const PageLi = styled.div`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 50%;
  width: 25px;
  margin-bottom: 5px;
  
  &:hover {
    cursor: pointer;
    color: white;
    background-color: white;
  }
`;

const PageSpan = styled.div`
  color: #293D45;
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginationContainer>
      <div>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </div>
    </PaginationContainer>
  );
};

export default Pagination;