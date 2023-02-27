import Axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {

  Axios.defaults.withCredentials = true; //axios

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>Edit</h1>
        <p>이곳은 Edit 입니다.</p>
        <button onClick={()=>setSearchParams({ who: "DaHun"})}>
          QS 바꾸기
        </button>
        <button onClick={()=>{navigate('/home')}}>
          HOME으로 가기
        </button>
        <button onClick={()=>{navigate(-1);}}>
          뒤로가기
        </button>
    </div>
  );
};
  
export default Edit;