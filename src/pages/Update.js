import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import axios from 'axios';

const Update = () => {
  const location = useLocation(); //useLocation을 이용하여 navigate로 이동할때 보낸 정보를 받아온다
  const navigate = useNavigate();
  // const { category, title, description } = location.state;
  // const [updateData, setUpdateData] = useState(location.state);
  const [category, setCategory] = useState(location.state.category); /////////////////////////////////////////////////////////////////
  const [title, setTitle] = useState(location.state.title); ///해당 게시글의 카테고리,제목,내용을 받아오고 state값에넣어 수정을 가능하게한다
  const [description, setDescription] = useState(location.state.description); /////////////////////////////////////////////////////////
  const handleCategory = (e) => {
    //카테고리 스테이트 변경
    // setUpdateData((prevState) => {
    //   return { ...prevState, category: e.target.value };
    // });
    setCategory(e.target.value);
  };
  const handleTitle = (e) => {
    // 제목 스테이트 변경
    // setUpdateData((prevState) => {
    //   return { ...prevState, title: e.target.value };
    // });
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    // 글 내용 스테이트 변경
    // setUpdateData((prevState) => {
    //   return { ...prevState, description: e.target.value };
    // });
    setDescription(e.target.value);
  };
  const updateBoard = (id, category, title, description) => {
    if (description.length > 1000 || title.length > 50) {
      alert('제목이나 글내용이 너무 깁니다');
    } else {
      const updateData = {
        // 업데이트된 글 정보(스테이트)를 객체로 만들어 db에 해당 게시글 업데이트를 요청
        id: id,
        category: category,
        title: title,
        description: description,
      };
      axios
        .put(`/boardupdate/${id}`, updateData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      navigate('/'); //처리 뒤 홈화면으로 이동
    }
  };
  const UpdateCancel = () => {
    navigate(`/read/${location.state.boardno}`, { state: location.state });
  };
  return (
    <>
      <Header />
      <div style={{ textAlign: 'center' }}>
        <h2>글 수정하기</h2>
        <div>
          카테고리 수정
          {location.state.category === '잡담' ? (
            <select onChange={handleCategory}>
              <option value="잡담" selected>
                잡담
              </option>
              <option value="정보">정보</option>
              <option value="이슈">이슈</option>
            </select>
          ) : location.state.category === '정보' ? (
            <select onChange={handleCategory}>
              <option value="잡담">잡담</option>
              <option value="정보" selected>
                정보
              </option>
              <option value="이슈">이슈</option>
            </select>
          ) : (
            <select onChange={handleCategory}>
              <option value="잡담">잡담</option>
              <option value="정보">정보</option>
              <option value="이슈" selected>
                이슈
              </option>
            </select>
          )}
        </div>
        <div>
          <label htmlFor="titleUpdate">제목 수정</label>
          <input
            type="text"
            id="titleUpdate"
            size={50}
            maxLength={50}
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          <label>내용 수정</label>
          <textarea
            value={description}
            cols={50}
            rows={30}
            onChange={handleDescription}
          />
        </div>
        <button
          onClick={() =>
            updateBoard(location.state.boardno, category, title, description)
          }
        >
          수정완료
        </button>
        <button onClick={UpdateCancel}>취소</button>
      </div>
    </>
  );
};

export default Update;
