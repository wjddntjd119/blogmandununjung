import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect, useRef, useMemo, useCallback, useReducer} from 'react';
import Axios from 'axios';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Blog from './pages/Blog';
import Login from './login_register/Login';
import Register from './login_register/Register';

import RouteTest from './components/RouteTest';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogEditor from './components/BlogEditor';

//return하는 값이 새로운 타입값이 된다
const reducer =(state, action)=>{
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      const created_date = new Date().getTime();
      const newItem ={
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE':{
      return state.filter((it)=>it.id !== action.targetId);
    }
    case'EDIT':{
      return state.map((it) => 
        it.id === action.targetId? 
        {...it,content:action.newContent} : it)
    }
    default :
    return state;
  }
}

export const BlogStateContext = React.createContext();

export const BlogDispatchContext = React.createContext();

function App() {

  Axios.defaults.withCredentials = true; //axios

  //Reducer 쓰는 이유: 복잡한 상태변화 로직을 컴포넌트 밖으로 분리하기 위해
  const[data, dispatch] = useReducer(reducer,[]);

  const dataId = useRef(0);

  //api에서 값 가져오기(백 -> 프론트)
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
      ).then((res)=>res.json());
      const initData = res.slice(0,20).map((it)=>{
        return{
          author : it.email,
          content : it.body,
          emotion : Math.floor(Math.random()*5)+1,//1~5까지 랜덤출력
          created_date : new Date().getTime(),
          id : dataId.current++,
        }
      });
      //발생시킬 액션: INIT, 데이터전달: initData
      dispatch({type:"INIT",data:initData})
  };

  useEffect(() => {
    getData();
  }, []);

  //상태변화 함수에 함수를 전달하는것을 '함수형 업데이트 라고한다'
  const onCreate = useCallback(
    (author,content,emotion)=>{

      dispatch({type:"CREATE",data:{author, content, emotion, id:dataId.current}})

      dataId.current +=1;
  }, []);

  //게시물 삭제
  const onRemove = useCallback((targetId) =>{
    dispatch({type: "REMOVE",targetId})
  },[])

  //게시물 수정
  //수정된 게시물만 수정되고 나머진 그대로
  const onEdit = useCallback((targetId,newContent)=>{
    dispatch({type:"EDIT",targetId,newContent})
    
  }, [])

  const memoizedDispatches = useMemo(()=>{
    return {onCreate, onRemove, onEdit}
  },[])

  //게시물 분석: 감성점수 상위권만 
  //useMemo => 데이터길이가 변하면 데이터분석 실행, []값은 이값이 변화하면 실행됨을 의미
  const getBlogAnalysis = useMemo(()=>{
    
    const goodCount = data.filter((it)=> it.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length)*100;
    return {goodCount,badCount,goodRatio};
    //[data.length]부분에 문제생기면 넣어주는 주석
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data.length])

  //분석받는 데이터정보
  const {goodCount, badCount, goodRatio} = getBlogAnalysis;

  return ( 
    <BrowserRouter>
      <BlogStateContext.Provider value={data}>
        <BlogDispatchContext.Provider value ={memoizedDispatches}>
          <div className="App">
            <Header/>
            <Routes>
              {/*<Route path='/' element={<Home />} />*/}
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit' element={<Edit />} />
              {/*<Route path='/blog' element={<Blog />} /> //예외처리 부분 */}
              <Route path='/blog/:id' element={<Blog />} />
              <Route path='/home'  element={<BlogList/>} />
              <Route path='/editor'  element={<BlogEditor/>} />
            </Routes>  
            <br/>
            <RouteTest/>
          </div>
        </BlogDispatchContext.Provider>
      </BlogStateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
