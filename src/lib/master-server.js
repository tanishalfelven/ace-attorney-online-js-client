let MasterServer = {
    _socket : null,
    init(server_address, serverLoaded, statusLoaded) {
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
                serverData = {address, port, name, description, isStatusLoaded:false, isOnline: null};
                serverLoaded(serverData);
                MasterServer.loadOnlineStatus(serverData, statusLoaded);
            }
        };
    },
    /**
     * TODO This system would really benefit from some online caching system
     * Create connection to server and load data, then disconnect so we can display in server list.
     * @param {object} server An object that represents a server (ip, port, server name, )
     */
    loadOnlineStatus(serverData, statusLoaded) {
        let s = new WebSocket(`ws://${serverData.address}:${serverData.port}`);
        setTimeout(() => {
            // prevent infinite spinning, close after 15s
            serverData = Object.assign(serverData, {isStatusLoaded: true, isOnline: false});
            s.close();
        }, 15000);
        s.onerror = () => {
            serverData = Object.assign(serverData, {isStatusLoaded: true, isOnline: false});
            s.close();
        };
        s.onopen = () => {
            s.send("HI#" + navigator.userAgent + "#%");
            s.send("ID#webAO#2.4.5#%");
        };
        s.onmessage = (e) => {
            const [header, ...messageData] = e.data.split("#");
            if (header === "PC") {
                serverData = Object.assign(serverData, {isOnline:true, online:parseInt(messageData[0]), max:parseInt(messageData[1])});
            }
            s.close();
        };
        s.onclose = () => {
            statusLoaded(serverData);
        }
    }
};
export default MasterServer;