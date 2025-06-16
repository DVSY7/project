//server/socket/index.js

const db = require(`../config/db`);


module.exports = (io) =>{

    // 현재 연결된 유저를 브로드캐스트 하기위한 변수
    const roomUserMap = {};

    io.on("connection", (socket) => {
        const userID = socket.handshake.query.userID;
        console.log("연결된 유저 ID:", userID);
        console.log("Socket connected:", socket.id);

        socket.on("join_room", (roomID) => {
            socket.join(roomID);
            console.log(`${socket.id} joined room: ${roomID}`);

            if(!roomUserMap[roomID]) roomUserMap[roomID] = new Set();
            roomUserMap[roomID].add(userID);
            
            // 모든 유저에게 현재접속 인원 전송
            io.to(roomID).emit("room_user_count",{
                roomID,
                connectedUserIds: Array.from(roomUserMap[roomID]),
            });
        });

        // 이부분이 출력안됌
        socket.on("send_message", async(data) =>{
            // 데이터베이스 처리부분
            try{
                const {chat_room_id, sender_id, message, datetime} = data;

                // 1.메세지 저장
                const [result] = await db.query(`
                    INSERT INTO messages(chat_room_id, sender_id, content, created_at)
                    VALUES(?,?,?,?)
                    `,[chat_room_id, sender_id, message, datetime]);

                const insertedMessageId = result.insertId; // 방금 저장한 메세지 ID

                io.to(data.chat_room_id).emit("receive_message", {
                    ...data,
                    message_id: insertedMessageId
                });
                
                // 2. 메세지 보낸 사람을 읽음 처리
                await db.query(`
                    INSERT INTO message_reads ( message_id, user_id )
                    VALUES ( ?, ? )
                    `,[insertedMessageId, sender_id]);

                console.log("메세지 저장 성공 :", data.name);

            }catch(error){
                console.error("메세지 저장 실패:", error);
            }
        });

        // 메세지 읽음 처리 이벤트
        socket.on("message_read", async ({ message_id, user_id }) => {
            try{
                await db.query(`
                    INSERT IGNORE INTO message_reads (message_id, user_id)
                    VALUES (?, ?)
                    `,[message_id, user_id]);
            }catch(error){
                console.error("읽음 처리 실패:", error);
            }
        })

        // 채팅방 이동 이벤트
        socket.on("leave_room", (roomID)=>{
            socket.leave(roomID);

            if(roomUserMap[roomID]){
                roomUserMap[roomID].delete(userID);
                io.to(roomID).emit("room_user_count",{
                    roomID,
                    connectedUserIds: Array.from(roomUserMap[roomID]),
                })
            }
        })

        // 채팅방 종료 이벤트
        socket.on("disconnect", ()=> {
            console.log("Socket disconnected:", socket.id);
        });
    });
};