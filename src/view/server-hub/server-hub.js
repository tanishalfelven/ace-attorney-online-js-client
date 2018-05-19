import css from "./server-hub.css";
import m from "mithril";

let ServerHub = {
    view : () => {
        return m("h2", { class : css.server }, "The ServerHub");
    }
};
export default ServerHub;