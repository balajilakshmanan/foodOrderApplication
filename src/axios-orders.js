import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-bc32e.firebaseio.com/'
});

export default instance;