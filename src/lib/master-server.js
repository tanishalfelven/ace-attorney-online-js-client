
let MasterServer = {
    _socket : null,
    init(server_address, onMessage) {
        this.onMessage = onMessage;
        this._socket = new WebSocket(server_address);
        this._socket.onopen = () => {
            this._socket.send("askforservers#%");
            this._socket.send("VC#%");
        };
        this._socket.onmessage = (e) => {
            const [header, ...messageData] = e.data.split("#");
            let serverData = {};
            if (header === "SN") {
                const [,address,, port, name, description] = messageData;
                serverData = {address, port, name, description};
            } else {
                const versionType = header === "servercheok" ? "client" : header === "SV" ? "server" : null;
                if (versionType) {
                    serverData[versionType] = messageData[0];
                }
            }
            if (Object.keys(serverData).length !== 0) {
                this.onMessage(serverData);
            }
        };
    },
};
export default MasterServer;