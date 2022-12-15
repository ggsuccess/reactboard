import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Read.css';
import Header from '../component/Header';
import axios from 'axios';
// import { Table, TableBody, TableRow } from '@mui/material';

const Read = () => {
  // const { id } = useParams();
  const location = useLocation();
  const state = location.state; //location.state로 Link태그에 state값으로 보낸 정보를 받을 수 있다.
  const navigate = useNavigate(); //페이지 이동가능하게 해줌
  const removeBoard = (boardNum) => {
    //게시글 삭제
    axios
      .delete(`/boardlist/delete/${boardNum}`) //해당 일련번호의 게시글을 삭제요청을 보낸다
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate('/'); //삭제후 홈으로 이동
  };
  const updateBoard = (data) => {
    //게시글 업데이트
    navigate('/update', { state: data }); // 해당 게시글 정보를 가지고 /update페이지로 이동
  };
  // const boardlist = () => {
  //   navigate('/');
  // };
  return (
    <>
      <Header />
      {state && (
        <>
          <h1 className="con" style={{ textAlign: 'center' }}>
            게시글 보기
          </h1>
          <section className="seeBoardSection">
            <table className="cell" border={1} height={50}>
              <colgroup>
                <col width={100} />
              </colgroup>
              <tbody>
                <tr>
                  <th>작성자</th>
                  <td colSpan={3}>{state.author}</td>
                </tr>
                <tr className="article-title">
                  <th>제목</th>
                  <td colSpan={3}>{state.title}</td>
                </tr>
                <tr className="article-info">
                  <th>카테고리</th>
                  <td>{state.category}</td>
                  <th>글 번호</th>
                  <td>{state.boardno}</td>
                </tr>
                <tr className="article-body">
                  <td colSpan={10} style={{ height: '40%' }}>
                    {state.description}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btnArea">
              <button
                className="tfootBtn"
                onClick={() => removeBoard(state.boardno)}
              >
                해당 글 삭제하기
              </button>
              <button className="tfootBtn" onClick={() => updateBoard(state)}>
                글 수정하기
              </button>
              <button className="tfootBtn" onClick={() => navigate('/')}>
                글 목록보기
              </button>
            </div>
          </section>
          {/* <div style={{ textAlign: 'center' }}>
            <table className="readBoard">
              <tr>
                <td>번호:{state.boardno}</td>
                <td>카테고리:{state.category}</td>
                <td>제목:{state.title}</td>
                <td>내용:{state.description}</td>
                <td>작성자:{state.author}</td>
                <button onClick={() => removeBoard(state.boardno)}>
                  해당 글 삭제하기
                </button>
                <button onClick={() => updateBoard(state)}>글 수정하기</button>
              </tr>
            </table>
          </div> */}
        </>
      )}
    </>
  );
};

export default Read;
