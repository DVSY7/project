import axios from 'axios';

export async function checkedToken(setUsername,setName){

    const token = localStorage.getItem('token');
    if(!token){
        localStorage.removeItem('token');
        return;
    }

    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/token/protected-data`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(`인증된 데이터 :`, response.data);
        setUsername(response.data.username.name);
        if(setName !== undefined){
            setName(response.data.username.username);
        }
    }catch(error){
        console.error(`토큰 오류`, error);
        alert("토근이 만료되었습니다. 다시 로그인 해주세요.");
        localStorage.removeItem('token');
        window.location.href = "/login";
    }


}