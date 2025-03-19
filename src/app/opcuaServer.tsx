import { OPCUAClient, AttributeIds } from "node-opcua";
import { Server } from "socket.io";
import http from "http";

const opcuaEndpoint = "opc.tcp://localhost:4840";
const monitoredTags = {
    devices: "Machine.Devices",
    axisStatuses: "Machine.AxisStsArray"
};

const opcuaClient = OPCUAClient.create({ endpointMustExist: false });
let opcuaSession;

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

const clientSubscriptions = new Map(); // Maps socket.id -> { activeDeviceId, activeChildrenDeviceIds }

async function connectOPCUA() {
    try {
        await opcuaClient.connect(opcuaEndpoint);
        opcuaSession = await opcuaClient.createSession();
        console.log("Connected to OPC UA server");
    } catch (error) {
        console.error("OPC UA Connection Error:", error);
    }
}

async function monitorTags() {
    if (!opcuaSession) return;
    
    for (const [key, nodeId] of Object.entries(monitoredTags)) {
        const dataValue = await opcuaSession.read({ nodeId, attributeId: AttributeIds.Value });
        if (dataValue) {
            io.emit("opcua_data", { key, data: dataValue.value.value });
        }
    }
}

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    socket.on("subscribe", ({ activeDeviceId, activeChildrenDeviceIds }) => {
        clientSubscriptions.set(socket.id, { activeDeviceId, activeChildrenDeviceIds });
        console.log(`Client ${socket.id} subscribed to`, activeDeviceId, activeChildrenDeviceIds);
    });
    
    socket.on("disconnect", () => {
        clientSubscriptions.delete(socket.id);
        console.log("Client disconnected:", socket.id);
    });
});

async function filterAndSendData() {
    if (!opcuaSession) return;
    
    const devicesData = await opcuaSession.read({ nodeId: monitoredTags.devices, attributeId: AttributeIds.Value });
    const axisData = await opcuaSession.read({ nodeId: monitoredTags.axisStatuses, attributeId: AttributeIds.Value });
    
    if (!devicesData || !axisData) return;
    
    io.sockets.sockets.forEach((socket) => {
        const subscription = clientSubscriptions.get(socket.id);
        if (!subscription) return;
        
        const { activeDeviceId, activeChildrenDeviceIds } = subscription;
        const filteredDevices = devicesData.value.value.filter(device => device.id === activeDeviceId || activeChildrenDeviceIds.includes(device.id));
        
        socket.emit("filtered_opcua_data", { devices: filteredDevices, axisStatuses: axisData.value.value });
    });
}

server.listen(3000, async () => {
    console.log("Socket.IO server listening on port 3000");
    await connectOPCUA();
    setInterval(filterAndSendData, 1000);
});
