import m from "mithril";
import css from "./layout.css";

let Layout = {
    view : (vnode) => {
        return [m("div", { class : css.nav },  [
            m("a", { href : "https://aceattorneyonline.com/" }, "Ace Attorney Online"),
            m("a", { href : "https://github.com/tanishalfelven/ace-attorney-online-js-client" }, "View Source"),
        ]), 
        m("div", { class : css.container }, [vnode.children])];
    }
};
export default Layout;