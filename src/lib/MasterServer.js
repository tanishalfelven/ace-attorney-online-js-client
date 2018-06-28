export default class {
    constructor(server_address, serverLoaded, statusLoaded) {
        this.s = new WebSocket(server_address);
        this.s.onopen = () => {
            this.s.send("askforservers#%");
            this.s.send("ID#webAO#webAO#%");
            this.s.send("ALL#%");
            this.s.send("VC#%");
        };
        
        let _this = this;
        this.s.onmessage = (e) => {
            const [header, ...messageData] = e.data.split("#");
            if (header === "ALL") {
                messageData.map(e => e.split("&")).forEach(server => {
                    const [name, description, address, port] = server;
                    if (name && port && address) {
                        let serverData = { address, port, name, description, isStatusLoaded:false, isOnline: false };
                        // callback to front-end
                        serverLoaded(serverData);
                        _this.loadOnlineStatus(serverData, statusLoaded);
                    }
                });
            }
        };
    }

    /**
     * TODO This system would really benefit from some online caching system
     * Create connection to server and load data, then disconnect so we can display in server list.
     * @param {object} server An object that represents a server (ip, port, server name, )
     */
    loadOnlineStatus(serverData, statusLoaded) {
        let s = new WebSocket(`ws://${serverData.address}:${serverData.port}`);
        setTimeout(() => {
            // prevent infinite spinning, close after 15s
            if (!serverData.isStatusLoaded) serverData.isStatusLoaded = true;
            s.close();
        }, 30000);
        s.onerror = (e) => {
            serverData.isStatusLoaded = true;
            serverData.isOnline = false;
        };
        s.onopen = () => {
            serverData.isStatusLoaded = true;
            serverData.isOnline = true;
            s.send(`HI#${navigator.userAgent}#%`);
            s.send("ID#webAO#webAO#%");
        };
        s.onmessage = (e) => {
            const [header, ...messageData] = e.data.split("#");
            if (header === "PC") {
                serverData.online   = parseInt(messageData[0]);
                serverData.max      = parseInt(messageData[1]);
            }
            // s.close();
        };
        s.onclose = (e) => {
            statusLoaded(serverData);
        };
    }
}
