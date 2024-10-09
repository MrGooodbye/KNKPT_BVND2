import * as signalR from '@microsoft/signalr';

const backendURL = 'https://api-knkpt.somee.com';

let connection = null; // Biến toàn cục lưu trữ kết nối SignalR

// Hàm khởi tạo và kết nối SignalR
const startSignalRConnection = async (token) => {
    if (connection) {
        //console.log('SignalR connection already established.');
        return connection;
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${backendURL}/notificationHub`, {
            accessTokenFactory: () => token,
            transport: signalR.HttpTransportType.WebSockets |
                        signalR.HttpTransportType.ServerSentEvents |
                        signalR.HttpTransportType.LongPolling
        })
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // Khởi tạo kết nối, trả về promise để xử lý sau
    try {
        await connection.start(); // Bắt đầu kết nối
        //console.log("Connected to SignalR hub.");

        // Đăng ký sự kiện nhận tin nhắn, gọi callback khi nhận được tin nhắn
        connection.on("ReceiveMessage", (message) => {
            //console.log("Received message:", message);
            if (onReceiveMessage) {
                onReceiveMessage(message); // Gọi callback được truyền vào
            }
        });

    } catch (error) {
        //console.error("Error connecting to SignalR hub:", error);
        setTimeout(() => startSignalRConnection(token, onReceiveMessage), 5000); // Thử kết nối lại sau 5 giây nếu gặp lỗi
    }
};

// Hàm đăng ký sự kiện ReceiveMessage
const onReceiveMessage = (callback) => {
    if (connection) {
        connection.on("ReceiveMessage", callback);
    } else {
        //console.error("Connection has not been established yet.");
    }
};

// Hàm dừng kết nối SignalR
const stopSignalRConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            //console.log("Disconnected from SignalR hub.");
            connection = null;
        } catch (error) {
            //console.error("Error disconnecting from SignalR hub:", error);
        }
    }
};

const removeFromGroup = async () => {
    if (connection) {
        try {
            await connection.invoke('RemoveFromGroup');
            //console.log("User đã logout SignalR.");
        } catch (error) {
            //console.error(`Failed to remove user from group: ${error}`);
        }
    } else {
        //console.error("Connection has not been established yet.");
    }
};

// Hàm kiểm tra nếu đã kết nối
const isConnected = () => {
    return connection !== null;
};

export {
    startSignalRConnection , stopSignalRConnection, onReceiveMessage, removeFromGroup, isConnected
}