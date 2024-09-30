import * as signalR from '@microsoft/signalr';

const backendURL = 'https://api-knkpt.somee.com';

let connection = null; // Biến toàn cục lưu trữ kết nối SignalR

// Hàm khởi tạo và kết nối SignalR
const startSignalRConnection = async (token) => {
    if (connection) {
        console.log('SignalR connection already established.');
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
};

// Hàm dừng kết nối SignalR
const stopSignalRConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            console.log("Disconnected from SignalR hub.");
            connection = null;
        } catch (error) {
            console.error("Error disconnecting from SignalR hub:", error);
        }
    }
};

// Hàm đăng ký sự kiện ReceiveMessage
const onReceiveMessage = (callback) => {
    if (connection) {
        connection.on("ReceiveMessage", callback);
    } else {
        console.error("Connection has not been established yet.");
    }
};

const removeFromGroup = async () => {
    if (connection) {
        try {
            await connection.invoke('RemoveFromGroup');
            console.log("User đã logout SignalR.");
        } catch (error) {
            console.error(`Failed to remove user from group: ${error}`);
        }
    } else {
        console.error("Connection has not been established yet.");
    }
};

// Hàm kiểm tra nếu đã kết nối
const isConnected = () => {
    return connection !== null;
};

export {
    startSignalRConnection , stopSignalRConnection, onReceiveMessage, removeFromGroup, isConnected
}