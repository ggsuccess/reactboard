import React from 'react';
import { Link } from 'react-router-dom';
import './BoardList.css';

const BoardList = ({ data, currentPage }) => {
  // 상위 컴포넌트로부터 props.data(게시글목록)을 받음
  // console.log(data)
  // const { boardNo, category, title, description, author, date } = props.data;
  // const saveData = (key, value) => {
  //   localStorage.setItem(key, value);
  // };
  return (
    <div className="boardList">
      <table className="boardTable">
        <thead className="boardTableThead">
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              item // 받은 게시글 목록을 해당 프로퍼티로 모두 보여줌
            ) => (
              <tr key={item.boardno} className="boardListTr">
                <td>{item.boardno}</td>
                <td>{item.category}</td>
                <Link
                  className="boardTitle"
                  style={{ textDecoration: 'none' }}
                  to={`/read/${item.boardno}`} //게시글 제목을 클릭할 경우 해당 게시글 내용을 볼수 있음
                  state={{
                    // 해당 게시글로 번호,카테고리,제목,내용,작성자정보를 보냄
                    boardno: item.boardno,
                    category: item.category,
                    title: item.title,
                    description: item.description,
                    author: item.author,
                    currentPage: currentPage,
                  }}
                >
                  <td>{item.title}</td>
                </Link>
                <td>{item.author}</td>
                <td>
                  {item.date.length > 11 ? item.date.split('T')[0] : item.date}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;
