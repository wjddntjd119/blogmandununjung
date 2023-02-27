import '../App.css';
import {Link} from "react-router-dom";
import Axios from "axios";

export default function Header(){
  Axios.defaults.withCredentials = true; //axios
  let userId = document.querySelector('#userId');

  return(
    <div className="header">
      <h1>
        <Link to="/home">A조의 블로그</Link>
      </h1>
      <div className ="user">
        <a>{userId}님 안녕하세요</a>
      </div>
    </div>
  )
}