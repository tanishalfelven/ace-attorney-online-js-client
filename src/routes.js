import m from "mithril";
import Client from "./view/client/client";

m.route(document.body, "/", {
    "/": Client
});