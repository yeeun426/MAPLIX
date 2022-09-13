// version1 => 리액트 부트스트랩
// import React from 'react';
// import styled from "styled-components";

// import Pagination from 'react-js-pagination';

// const Paging = ({ page, count, setPage }) => {
//   return (
//     <Pagination
//       activePage={page}
//       itemsCountPerPage={5} //한 페이지당 보여줄 아이템 개수
//       totalItemsCount={count}
//       pageRangeDisplayed={10}
//       prevPageText={'‹'}
//       nextPageText={'›'}
//       onChange={setPage}
//     />
//   );
// };
// export default Paging;




// v2
import React,{useState} from 'react';
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate, end}) => {
  const pageNumbers = [];
  const [start, setStart] = useState(0);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <div>
        <PageUl className="pagination">
          {start !== 0 &&
          <button onClick={()=>{setStart(start-end)}}>{'<'}</button>
          }
          
          {pageNumbers.slice(start, start+end).map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={(e) => {
                if(document.getElementsByClassName('nowpage').length !== 0) {
                document.getElementsByClassName('nowpage')[0].classList.remove('nowpage');
                }
                paginate(number); 
                e.target.parentElement.classList.add('nowpage')}}>
                {number}
              </PageSpan>
            </PageLi>
          ))}
          {pageNumbers.slice(start,start+end)[pageNumbers.slice(start,start+end).length-1] !== pageNumbers.slice(-1)[0] &&
          <button onClick={()=>{setStart(start+end)}}>{'>'}</button>
          }
          </PageUl>
      </div>
    </PaginationContainer>
  );
};

export default Pagination;

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

    button{
      font-size: 15px;
    }

    .nowpage{
      background-color: white;
    }

`;

const PageLi = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
  border-radius: 50%;
  width: 20px;
  
  &:hover {
    cursor: pointer;
    color: white;
    background-color: white;
  }
`;

const PageSpan = styled.div`
  color: #293D45;
`;
