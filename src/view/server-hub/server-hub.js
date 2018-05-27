import css from "./server-hub.css";
import m from "mithril";
import MasterServer from "../../lib/master-server";

let ServerHub = {
    oninit : (vnode) => {
        vnode.state.serverList = [];
        MasterServer.init("ws://master.aceattorneyonline.com:27016",
            // When data for server is received
            (serverData) => {
                vnode.state.serverList.push(serverData);
                m.redraw();
            },  
            // When online status is received
            (serverData) => {
                for (let i = 0; i < vnode.state.serverList.length; i++) {
                    if (vnode.state.serverList[i].address === serverData.address && vnode.state.serverList[i].port === serverData.port) {
                        vnode.state.serverList[i] = serverData;
                        break;
                    }
                }
                m.redraw();
            }
        );

        vnode.state.toggleDescription = (e) => {
            e.target.closest(`.${css.server}`).children[1].classList.toggle(css.visible);
        };
    },
    view : (vnode) => {
        return [m("h2", "Available Connections"),
            vnode.state.serverList.length <= 0 ?
                m("img", { class : css.loadingServersList, src : "./resources/img/spinner.gif" })
                :
                m("div", { class : css.serversContainer}, [vnode.state.serverList && Array.from(vnode.state.serverList).sort((a, b) => {
                    // TODO fix this
                    // TODO figure out a way for this not to be so ugly
                    if (a.isOnline !== null && b.isOnline !== null) {
                        if      (a.isOnline && !b.isOnline) return -1;
                        else if (!a.isOnline && b.isOnline) return 1;
                        if (a.isOnline && b.isOnline) {
                            if (a.online / a.max > b.online / b.max) return -1;
                            else return 1;
                        }
                    } else {
                        if      (a.isStatusLoaded && !b.isStatusLoaded) return -1;
                        else if (!a.isStatusLoaded && b.isStatusLoaded) return 1;
                        else return 0;
                    }
                }).map((e) => {
                    return m("div", { class : css.row }, [
                        m("div", { class : css.serverStatus }, 
                            e.isStatusLoaded ?
                                m("div", { class : e.isOnline ? css.serverOnline : css.serverOffline })
                                :
                                m("img", { src : "./resources/img/spinner.gif" })
                        ),
                        m("div", { class : css.server, onclick : vnode.state.toggleDescription }, [
                            m("div", { class : css.serverData }, [
                                m("div", { class : css.address }, `${e.address}:${e.port}`),
                                m("div", { class : css.playerCount },e.isStatusLoaded && e.isOnline ? `${e.online} / ${e.max}` : null),
                                m("div", { class : css.name}, e.name)
                            ]),
                            m("div", { class : css.description }, e.description)
                        ])
                    ]);
                })])
        ];
    }
};
export default ServerHub;