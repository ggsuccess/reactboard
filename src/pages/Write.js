import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import axios from 'axios';

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  localStorage.isReturn = true;
  //console.log(state);
  const [writeData, setWriteData] = useState({
    // 작성한 글에 대한 정보를 담을 스테이트
    category: '',
    title: '',
    description: '',
    author: '',
  });
  const handleCategory = (e) => {
    //카테고리 값을 담은 스테이트를 변경시키는 함수
    setWriteData((prevState) => {
      return { ...prevState, category: e.target.value };
    });
  };
  const handleTitle = (e) => {
    //글 제목 값을 담은 스테이트를 변경시키는 함수
    setWriteData((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };
  const handleDescription = (e) => {
    //글 내용 값을 담은 스테이트를 변경시키는 함수
    setWriteData((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  };
  const handleAuthor = (e) => {
    //작성자 값을 담은 스테이트를 변경시키는 함수
    setWriteData((prevState) => {
      return { ...prevState, author: e.target.value };
    });
  };
  const writeBoard = (item) => {
    // 글쓰기 완료시 db로 insert문을 날리게 되는 함수
    if (
      writeData.category === '' ||
      writeData.title.trim() === '' ||
      writeData.author.trim() === '' ||
      writeData.description.trim() === ''
    ) {
      // 카테고리,제목,내용,작성자 중 하나라도 작성을 하지 않았을 때
      alert('카테고리, 제목, 내용, 작성자 중 하나를 입력하세요');
    } else if (
      writeData.description.length > 1000 ||
      writeData.title.length > 50
    ) {
      // 제목이나 글 내용 글자수가
      alert('제목은 50자,글 내용은 1000자 이하여야 합니다');
    } else {
      axios
        .post('/boardwrite', writeData) // 글쓰기 완료버튼 누를시 /boardwrite로 writeData라는 작성글 정보를 가지고 쿼리문을 날린다
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      navigate('/', { state: item }); // 쿼리문 날린뒤 홈화면으로 이동
    }
  };
  const backPage = (item) => {
    navigate('/', { state: item });
  };
  return (
    <>
      <Header />

      <div style={{ textAlign: 'center' }}>
        <h2>글쓰기</h2>

        <div>
          카테고리 선택
          <select
            onChange={handleCategory}
            style={{ display: 'block', margin: 'auto' }}
          >
            <option selected disabled>
              --카테고리를 선택하세요--
            </option>
            <option value="잡담">잡담</option>
            <option value="정보">정보</option>
            <option value="이슈">이슈</option>
          </select>
        </div>
        <div>
          <label>제목</label>
          <input
            type="text"
            size={50}
            maxLength={50}
            placeholder="제목을 입력하세요"
            value={writeData.title}
            onChange={handleTitle}
          />
        </div>
        <div>
          <div>
            <label htmlFor="title">
              글 내용<strong>(글자 수 1000자 제한)</strong>
            </label>
          </div>
          <textarea
            id="title"
            rows={30}
            cols={50}
            placeholder="내용을 적어주세요"
            value={writeData.description}
            onChange={handleDescription}
          />
        </div>
        {/* <div>
          <input type="file" />
        </div> */}
        <input
          placeholder="작성자명"
          value={writeData.author}
          onChange={handleAuthor}
        />
        <button onClick={() => writeBoard(state)}>완료</button>
        <button onClick={() => backPage(state)}>취소</button>
      </div>
    </>
  );
};

export default Write;
