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