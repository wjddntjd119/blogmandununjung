import Axios from 'axios';

const New = () => {

  Axios.defaults.withCredentials = true; //axios

    return (
      <div>
        <h1>New</h1>
          <p>이곳은 New 입니다.</p>
      </div>
    );
  };
  
  export default New;