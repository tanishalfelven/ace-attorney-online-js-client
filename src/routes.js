import m from "mithril";
import Layout from "./view/components/layout";
import Client from "./view/client/client";
import ServerHub from "./view/server-hub/server-hub";

m.route(document.body, "/", {
    "/": {
        render : () => m(Layout, m(ServerHub))
    },
    "/client": {
        render : () => m(Layout, m(Client))
    },
});