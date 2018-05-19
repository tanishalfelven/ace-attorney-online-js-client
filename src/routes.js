import m from "mithril";
import Client from "./view/client/client";
import ServerHub from "./view/server-hub/server-hub";

m.route(document.body, "/", {
    "/": ServerHub,
    "/client": Client
});