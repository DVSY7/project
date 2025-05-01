// server/controllers/searchController.js

exports.searchData = async(req,res) => {

    // 검색 로직 처리
    // 클라이언트에서 보내준 데이터
    const {searchQuery} = req.body;  
    console.log(searchQuery);

    return res.status(200).json({ message: "요청 수신 완료", data: searchQuery });
}