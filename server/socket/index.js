//server/socket/index.js

module.exports = (io) =>{
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join_room", (roomID) => {
            socket.join(roomID);
            console.log(`${socket.id} joined room: ${roomID}`);
        });

        // 이부분이 출력안됌
        socket.on("send_message", (data) =>{
            console.log("send_message", data)
            io.to(data.chat_room_id).emit("receive_message", data);
        });

        socket.on("disconnect", ()=> {
            console.log("Socket disconnected:", socket.id);
        });
    });
};