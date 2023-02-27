import React, {useContext, useRef, useState} from "react";
import Axios from 'axios';
import { BlogDispatchContext } from "../App";

const BlogEditor = () =>{

  //함수 가져옴
  const {onCreate} = useContext(BlogDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();

  //author: input에 들어가는 내용관리, setAuthor: Author의 상태변화함수
  const [state,setState] =useState({
    author: "",
    content: "",
    emotion: 1,
  })

  //바뀌는상태를 감지해주는 함수
  const handleeChangeState=(e)=>{
    //상태변화를 감지해준다
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit =()=>{
    if(state.author.length <1){
      authorInput.current.focus();
      return;//더이상 진행 안되게 리턴!
    }
    if(state.content.length <1){
      contentInput.current.focus();
      return;//더이상 진행 안되게 리턴!
    }
    onCreate(state.author,state.content, state.emotion);
    alert("저장성공");
    //저장성공후 값을 아래내용처럼 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    })
  }
  
  //Axios.get('./api/boards').then(data=>console.log(data));

  return(
    <div className="BlogEditor">
      <h2>오늘의 블로그</h2>
      <div>
        <input 
          ref={authorInput}
          name="author"
          value={state.author}
          //onchange콜백함수 값이 바뀌면 인지
          onChange={handleeChangeState}
        />
      </div>
      <div>
        <textarea
          ref ={contentInput}
          name='content'
          value={state.content}
          //onchange콜백함수 값이 바뀌면 인지
          onChange={handleeChangeState}
        />
      </div>
      <div>
      오늘의 감정점수: 
        <select name="emotion" 
          value={state.emotion}
          onChange={handleeChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>게시글 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(BlogEditor);