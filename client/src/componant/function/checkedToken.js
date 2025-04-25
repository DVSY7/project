import axios from 'axios';

export async function checkedToken(setUsername){

    const token = localStorage.getItem('token');
    if(!token) return;

    try{
        const response = await axios.get('http://localhost:5000/api/token/protected-data',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(`인증된 데이터 :`, response.data);
        setUsername(response.data.username.name);
    }catch(error){
        console.error(`토큰 오류`, error);
    }


}