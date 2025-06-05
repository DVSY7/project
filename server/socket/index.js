//server/socket/index.js

const db = require(`../config/db`);


module.exports = (io) =>{
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join_room", (roomID) => {
            socket.join(roomID);
            console.log(`${socket.id} joined room: ${roomID}`);
        });

        // 이부분이 출력안됌
        socket.on("send_message", async(data) =>{
            console.log("send_message", data)
            io.to(data.chat_room_id).emit("receive_message", data);
            try{
                const {chat_room_id, sender_id, message, datetime} = data;
                await db.query(`
                    INSERT IN messages(chat_room_id, sender_id, content, create_at)
                    VALUES(?,?,?,?)
                    `,[chat_room_id, sender_id, message, datetime]);
                console.log("메세지 저장 중 :", data.name);
                return data.status(200).json({message: "메세지 저장 성공!"});
            }catch(error){
                console.error("메세지 저장 실패:", error);
                return;
            }
        });

        socket.on("disconnect", ()=> {
            console.log("Socket disconnected:", socket.id);
        });
    });
};