import m from "mithril";
import css from "./layout.css";

let Layout = {
    view : (vnode) => {
        return m(".nav", { class : css.nav }, vnode.children);
    }
};
export default Layout;