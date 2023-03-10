import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';
import BoardList from '../component/BoardList';
import Pagination from '../component/Pagination';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const state = location.state;

  const [searching, setSearching] = useState(false); // 검색중인지 아닌지 가를 논리값 스테이트
  // const [isReturn, setIsReturn] = useState(false); // 검색 후 돌아온 경우 검색상태를 유지하기 위해 저장하는 스테이트
  const [searchData, setSearchData] = useState([]); // 게시글 중 검색된 단어로 필터링된 게시글들을 담을 스테이트
  const [search, setSearch] = useState({
    filterCategory: '전체',
    category: '작성자',
    searchWord: '',
  }); // 검색키워드 담을 스테이트
  const [boardData, setBoardData] = useState([]); // 전체 게시글을 담을 스테이트
  const [currentPage, setCurrentPage] = useState(1); // 전체 페이지 중 현재 페이지에 대한 정보

  const [postsPerPage] = useState(10); // 한 페이지당 보여줄 게시글 수

  useEffect(() => {
    axios
      .get('/boardlist') // /boardlist로 api요청
      .then((res) => setBoardData(res.data.reverse())) // api요청하여 받아온 정보를 boardData에 역순으로 담는다
      .catch((err) => console.log(err)); //에러처리
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boardData.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  let currentSearchPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    if (state === null || state === undefined) {
    } else if (state.hasOwnProperty('data')) {
      setCurrentPage(state.currentPage); //작동은 하는데 문제는 검색페이지가 아니라 전체글페이지 셋팅을한다
    } else if (typeof state === 'number') {
      setCurrentPage(state); //문제없이 작동
    }

    // if (localStorage.isReturn) {
    //   // 글 보고난뒤 다시 돌아왔을 때
    //   setSearching(true);
    //   //setSearchData(localStorage.searchData);
    //   currentSearchPosts = localStorage.searchData.slice(
    //     indexOfFirstPost,
    //     indexOfLastPost
    //   );
    // }
  }, [state]);

  // useEffect(() => {
  //   if (searching) {
  //     if (!localStorage.isReturn) {
  //       localStorage.isReturn = false;
  //       localStorage.searchData = searchData;
  //     }
  //   }
  // }, [searchData]);

  const setFilterCategory = (e) => {
    setSearch((prev) => {
      return { ...prev, filterCategory: e.target.value };
    });
  };
  const setSearchWord = (e) => {
    // 스테이트에 검색단어값을 담을 함수
    setSearch((prev) => {
      return { ...prev, searchWord: e.target.value };
    });
  };
  const navigate = useNavigate();
  const goToWritePage = () => {
    //글 쓰기 페이지로 넘어가는 함수
    navigate('/write', { state: currentPage }); // /write페이지로 넘어간다
  };
  const setSearchCategory = (e) => {
    // 작성자로 검색할지 제목으로 검색할지 변경하는 함수
    setSearch((prev) => {
      return { ...prev, category: e.target.value };
    });
  };
  const onSearch = () => {
    //검색기능함수
    if (search.filterCategory === '전체') {
      if (search.searchWord.trim() === '') {
        // 카테고리 전체에서 검색어를 입력하지 않을경우 전체글보기와 다를바가 없어 검색을 막음
        alert('전체 카테고리 지정시 검색어를 입력해주세요');
      } else {
        if (search.category === '작성자') {
          //작성자 항목으로 검색했을때
          setSearching(true); //스테이트값을 바꿔 리렌더링
          setSearchData(
            boardData.filter((item) => item.author === search.searchWord) // 항목이 작성자이면 해당 작성자가 쓴 게시글만 필터링
          );
          setCurrentPage(1); //검색시 현재 가리키는 페이지를 1로 변경
        } else {
          //제목 항목으로 검색
          setSearching(true); //스테이트값을 바꿔 리렌더링
          setSearchData(
            boardData.filter((item) => item.title.includes(search.searchWord)) // 항목이 제목이면 제목이 포함된 게시글을 필터링
          );
          setCurrentPage(1);
        }
      }
    } else if (
      search.filterCategory === '잡담' ||
      search.filterCategory === '정보' ||
      search.filterCategory === '이슈'
    ) {
      //카테고리가 전체가 아니라 특정카테고리를 지정했을때
      if (search.searchWord.trim() === '') {
        //카테고리만 설정하고 검색어 입력 안할시 설정한 카테고리 모든 값을 검색
        setSearching(true);
        setSearchData(
          boardData.filter((item) => item.category === search.filterCategory)
        );
        setCurrentPage(1);
      } else if (search.category === '작성자') {
        setSearching(true);
        setSearchData(
          boardData.filter(
            (item) =>
              item.category === search.filterCategory &&
              item.author === search.searchWord
          )
        );
        setCurrentPage(1);
      } else {
        setSearching(true);
        setSearchData(
          boardData.filter(
            (item) =>
              item.category === search.filterCategory &&
              item.title.includes(search.searchWord)
          )
        );
        setCurrentPage(1);
      }
    }
  };
  const entireBoardList = () => {
    // 스테이트값을 바꿔 전체글을 보여줌
    setSearching(false);
    localStorage.searching = false;
  };
  const paginate = (pageNum, e) => {
    //페이징 했을시 페이지 값을 보여줌
    e.preventDefault(); // a링크 페이지이동을 막음
    setCurrentPage(pageNum); //페이지를 클릭하여 보고있는 페이지값을 이동
  };
  const enterKey = () => {
    //엔터키로 검색가능
    if (window.event.keyCode === 13) {
      onSearch();
    }
  };
  return (
    <>
      <Header />
      <div
        className="writeBoardBtn"
        style={{ marginTop: '2%', marginLeft: '35%' }}
      >
        <button className="writeBtn" onClick={goToWritePage}>
          글쓰기
        </button>
      </div>
      {searching ? ( // 검색을 했을때는 searching 스테이트값이 true
        searchData.length === 0 ? ( // 검색결과가 없을때
          <h4 style={{ textAlign: 'center' }}>검색결과가 없습니다</h4> // 검색결과가 없음을 알림
        ) : (
          <BoardList
            data={currentSearchPosts}
            currentPage={currentPage}
            search={search}
          /> //검색결과가 존재할경우 게시글을 BoardList컴포넌트에 전달
        )
      ) : (
        <BoardList
          data={currentPosts}
          currentPage={currentPage}
          search={null}
        />
      )}
      <div style={{ textAlign: 'center' }}>
        <select className="searchCategory" onChange={setFilterCategory}>
          <option value="전체" selected>
            전체
          </option>
          <option value="잡담">잡담</option>
          <option value="정보">정보</option>
          <option value="이슈">이슈</option>
        </select>
        <select className="searchSelect" onChange={setSearchCategory}>
          <option value="작성자" selected>
            작성자
          </option>
          <option value="제목">제목</option>
        </select>
        <input
          className="searchInput"
          width={40}
          placeholder="검색어 입력"
          onChange={setSearchWord}
          value={search.searchWord}
          onKeyUp={enterKey}
        ></input>
        <button className="searchBtn" onClick={onSearch}>
          검색
        </button>
        <button className="entireBoardBtn" onClick={entireBoardList}>
          전체 글 목록보기
        </button>
      </div>
      {searching ? ( // 검색했을때
        <Pagination //Pagination 컴포넌트에
          postPerPage={postsPerPage} //페이지 당 게시글 수 전달
          totalPosts={searchData.length} // 검색 결과 게시글 숫자 전달
          paginate={paginate} //페이지 이동 함수 전달
          currentPage={currentPage}
        />
      ) : (
        //검색하지 않았을때
        <Pagination
          postPerPage={postsPerPage} //페이지 당 게시글 수 전달
          totalPosts={boardData.length} //전체 게시글 수 전달
          paginate={paginate} //페이지 이동 함수 전달
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Home;
