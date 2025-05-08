export default function Conversation(props) {
    const { message } = props;
    const userName = props.message.name;
    console.log(userName);

    return (
        <>
            <div className={`flex ${userName !== "레이첼" ? "justify-end" : ""} mt-2`}>
                {/* 채팅 프로필 */}
                <img src={message.profile} className={`w-[50px] h-[50px] ${userName !== "레이첼" ? "order-3 mr-4" : "ml-4"}`}></img>

                {/* 닉네임과 내용 */}
                <div className={`${userName !== "레이첼" ? "order-2" : ""}`}>
                    {/* 채팅 닉네임 */}
                    <div className={`${userName !== "레이첼" ? "flex justify-end mr-2" : "ml-2"}`}>{message.name}</div>
                    {/* 채팅 내용 */}
                    <div className={`${userName !== "레이첼" ? "bg-white" : "bg-[#E0F3FF]"} border-[1px] border-gray-300 border-solid rounded-md p-2 px-3 mx-2 font-bold`}>{message.message}</div>
                </div>

                {/* 채팅 시간 */}
                <span
                    className={`flex items-end font-sans ${userName !== "레이첼" ? "order-1" : ""}`}
                >{new Date(message.datetime).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })}</span>
            </div>
        </>
    )
}