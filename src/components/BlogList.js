import { useContext } from 'react';
import { BlogStateContext } from '../App';
import {Link, useNavigate} from "react-router-dom";
import BlogItem from './BlogItem';


const BlogList =()=>{

  const blogList = useContext(BlogStateContext);
  
  const navigate = useNavigate();

  const blogEditor =()=>{
    navigate("/editor");
  }

  return (
    <div className ="BlogList">
      <h2>게시글 리스트</h2>
      <button onClick={blogEditor}>작성하기</button>
      <h4>{blogList.length}개의 게시글이 있습니다</h4>
      <div>
        {blogList.map((it)=>(
          <BlogItem key={it.id} {...it}/>
        ))}
      </div>
    </div>
  );
};

//디폴트값 설정
BlogList.defaultProps={
  blogList: [],
}

export default BlogList;