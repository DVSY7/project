// 날짜를 한국어 형식으로 포멧
export function formatDateKorean(dateStr){
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });
}

// 시간을 한국시간:분 으로 변환
export function formatDateTime(dateStr){
    const date = new Date(dateStr);
    return date.toLocaleTimeString("ko-KR",{
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        });
}

export function insertDateHeaders(message){
    const result = [];
    let lastDate = null;

    message.forEach((msg) => {
        const date = msg.datetime.split("T")[0];
        if(date !== lastDate){
            result.push({type : "date-stamp",date});
            lastDate = date;
        }
        result.push({...msg, type : "message"});
    });

    return result;
}