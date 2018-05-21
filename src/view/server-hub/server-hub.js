import css from "./server-hub.css";
import m from "mithril";
import MasterServer from "../../lib/master-server";

let ServerHub = {
    oninit : (vnode) => {
        vnode.state.serverList = [];
        MasterServer.init("ws://master.aceattorneyonline.com:27016", (serverData) => {
            if (!serverData["client"] && !serverData["server"]) {
                vnode.state.serverList.push(serverData);
            }
            m.redraw();
        });

        vnode.state.toggleDescription = (e) => {
            e.target.closest(`.${css.server}`).children[1].classList.toggle(css.visible);
        };
    },
    view : (vnode) => {
        return [m("h2", "Available Connections"),
            m("div", { class : css.serversContainer}, [vnode.state.serverList && vnode.state.serverList.map((e) => {
                return m("div", { class : css.server, onclick : vnode.state.toggleDescription }, [
                    m("div", { class : css.serverData }, [
                        m("div", { class : css.address }, `${e.address}:${e.port}`),
                        m("div", { class : css.name}, e.name)
                    ]),
                    m("div", { class : css.description }, e.description)
                ]);
            })])
        ];
    }
};
export default ServerHub;