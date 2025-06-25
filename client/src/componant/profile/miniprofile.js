// client/src/componant/profile/miniprofile.js
import {useState, useEffect} from "react";
import { checkedToken } from "../function/checkedToken";
import { useLocation } from "react-router-dom";
import { fetchMiniProfileInfo } from "./api/MiniProfile";



export default function Miniprofile(props) {

    const {name, id, setProfileInfo} = props;

    // 플렉스 요소 센터 정렬
    const flexCenter = "justify-center items-center";

    // 현재 url 정보
    const location = useLocation();

    // 프로필의 유저이름 상태관리 스테이트
    const [username, setUsername] = useState(name);
    const [userID, setUserID] = useState(id[0].id);

    // 프로필 유저정보
    const [miniProfileUserInfo, setMiniProfileUserInfo] = useState([]);

    // 페이지의 url에 있는 정보를 가져오는 코드
    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const usernameFromQuery = searchParams.get("username")?? username;
        const userIDFromQuery = searchParams.get("userID")?? userID;
        if(usernameFromQuery){
            setUsername(usernameFromQuery);
            setUserID(userIDFromQuery);
            setProfileInfo({name:usernameFromQuery,id:userIDFromQuery});
        }else{
            const getUsername = async ()=>{
                await checkedToken(setUsername);
            };
           getUsername();
        }
    },[location.search,name,id]);

    // 디버그 코드
    useEffect(()=>{
        if(username && userID){
            const getMiniProfileInfo = async () =>{
                const res = await fetchMiniProfileInfo(userID);
                if(res){
                    setMiniProfileUserInfo(res);
                }
            }
            getMiniProfileInfo();
        }
    },[username,userID])

    console.log(miniProfileUserInfo);

    return (
        <>
            <div className={`flex flex-col w-[80%] h-full`}>
                <div className={`flex w-full h-[80%]`}>
                    {/* 프로필/달성률 */}
                    <div className={`flex flex-col ${flexCenter} h-full w-[30%]`}>
                        <img src={`${miniProfileUserInfo[0]?.profile_image??"images/미니프로필.png"}`} alt="미니프로필" className={`w-[4.5rem] h-[4.5rem] rounded-[50%]`}></img>
                        <div className={`flex ${flexCenter}h-6 w-16 mt-6 bg-red-200 text-[0.9rem]`}>달성률</div>
                    </div>
                    {/* 닉네임/별점/퍼센트 */}
                    <div className={`flex flex-col justify-evenly h-full w-[70%]`}>
                        <div className={`text-[1.5rem] font-sans font-bold`}>{username}</div>
                        <div className={`text-[1.5rem] font-sans font-bold text-yellow-400`}><span className={`mb-2 inline-block`}>★★★★★</span><span className={`ml-4 text-black font-sans font-normal text-[1rem]`}>4.99</span></div>
                        <div className={`flex justify-start items-center`}>
                        <div className={`flex justify-between items-center w-32 h-4 bg-gray-300 rounded-lg`}>
                            <div className={`w-[50%] h-full rounded-lg bg-green-500`}></div>
                        </div>
                        <div className={`flex  font-sans font-bold ml-2`}>50%</div>
                        </div>
                    </div>
                </div>
                {/* 리스트/게시글/찜 */}
                <div className={`flex justify-start items-center font-sans w-full h-[20%]`}>
                    <div className={`ml-9`}>리스트<span className={`mx-4`}>14</span>|</div>
                    <div className={`ml-4`}>게시글<span className={`mx-4`}>{miniProfileUserInfo[0]?.gallery_count?? 0}</span>|</div>
                    <div className={`ml-4`}>찜<span className={`2xl:m-4 `}>32</span></div>
                </div>
            </div>

        </>
    )
}