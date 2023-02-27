import { Link } from "react-router-dom"

const RouteTest = () => {
  return (
    <>
    <br/>
    <Link to={"/blog"}>BLOG</Link>
    <br/>
    <Link to={"/new"}>NEW</Link>
    <br/>
    <Link to={"/edit"}>EDIT</Link>
    <br/>
    <Link to={"/login"}>로그인</Link>
    <br/>
    <Link to={"/register"}>회원가입</Link>
    <br/>
    </>      
  );
};

export default RouteTest;