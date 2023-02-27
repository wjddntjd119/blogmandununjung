import Axios from 'axios';
import { useParams } from 'react-router-dom';

const Bolg = () => {

  Axios.defaults.withCredentials = true; //axios

  const {id} = useParams();
  console.log(id);

  return (
    <div>
      <h1>Bolg</h1>
        <p>이곳은 Bolg 입니다.</p>
    </div>
  );
};
  
export default Bolg;