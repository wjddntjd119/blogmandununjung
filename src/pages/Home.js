import Axios from 'axios';

const Home = () => {

  Axios.defaults.withCredentials = true; //axios
  
  return (
    <div>
      <h1>Home</h1>
        <p>이곳은 홈 입니다.</p>
    </div>
  );
};

export default Home;