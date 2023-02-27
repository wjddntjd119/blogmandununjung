import React, {useContext, useRef, useState} from "react";
import { BlogDispatchContext } from "../App";

const BlogItem = ({id, author, content, emotion, created_date 
}) => {
  
  const {onRemove, onEdit}= useContext(BlogDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = ()=> setIsEdit(!isEdit);

  const [localContent,setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = ()=>{
    if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id);
    }
  }
  //수정취소
  const handleQuitEdit = ()=>{
    setIsEdit(false);
    setLocalContent(content);

  }
  //수정완료
  const handleEdit = ()=>{
    //유효성검사
    if(localContent.length <5){
      localContentInput.current.focus();
      return
    }
    if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
      onEdit(id, localContent);
      toggleIsEdit(); //수정완료
    }
  }

  return (
      <div className="BlogItem">
        <div className="info">
          <span className="author_info">
            | 작성자 : {author} | 감정점수 : {emotion} |
          </span>
          <br />
          <span className="date">{new Date(created_date).toLocaleString()}</span>
        </div>
        <div className="content">
          {isEdit ? (//수정한 내용을 LocalContent로 전송
            <> 
              <textarea 
                ref={localContentInput}
                value={localContent} 
                onChange={(e)=>setLocalContent(e.target.value)}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
        {isEdit ? <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>:<>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>}
        
      </div>
    );
  };

  export default React.memo(BlogItem);