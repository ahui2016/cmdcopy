
// 获取地址栏的参数。
function getUrlParam(param) {
  const queryString = new URLSearchParams(document.location.search);
  return queryString.get(param);
}

/**
 * @param obj is a mjComponent or the mjComponent's id
 */
function disable(obj) {
    const id = typeof obj == "string" ? obj : obj.id;
    const nodeName = $(id).prop("nodeName");
    if (nodeName == "BUTTON" || nodeName == "INPUT") {
        $(id).prop("disabled", true);
    }
    else {
        $(id).css("pointer-events", "none");
    }
}

/**
 * @param obj is a mjComponent or the mjComponent's id
 */
function enable(obj) {
    const id = typeof obj == "string" ? obj : obj.id;
    const nodeName = $(id).prop("nodeName");
    if (nodeName == "BUTTON" || nodeName == "INPUT") {
        $(id).prop("disabled", false);
    }
    else {
        $(id).css("pointer-events", "auto");
    }
}

/**
 * @param {string} text 
 * @returns {mjElement}
 */
function span(text) {
    return m('span').text(text);
}

/**
 * @param {mjComponent} list 
 * @param {mjComponent[]} items 
 */
function prependToList(list, items) {
    items.forEach(item => {
        list.elem().prepend(m(item));
        if (item.init) item.init();
    });
}

/**
 * @param {mjComponent} list 
 * @param {mjComponent[]} items 
 */
function appendToList(list, items) {
    items.forEach(item => {
        list.elem().append(m(item));
        if (item.init) item.init();
    });
}

/**
 * @param align 目前只接受 "center", 不接受其他值。
 */
function createLoading(align) {
    let classes = "Loading";
    if (align == "center") {
        classes += " text-center";
    }
    const loading = cc("div", {
        text: "Loading...",
        classes: classes,
    });
    loading.hide = () => {
        loading.elem().hide();
    };
    loading.show = () => {
        loading.elem().show();
    };
    return loading;
}

/**
 * 当 max == undefined 时，给 max 一个默认值 (比如 3)。
 * 当 max <= 0 时，不限制数量。
 */
export function CreateAlerts(max) {
    const alerts = cc("div");
    alerts.max = max == undefined ? 3 : max;
    alerts.count = 0;

    alerts.insertElem = (elem) => {
        $(alerts.id).prepend(elem);
        alerts.count++;
        if (alerts.max > 0 && alerts.count > alerts.max) {
            $(`${alerts.id} div:last-of-type`).remove();
        }
    };

    /**
     * @param {"success" | "danger" | "info" | "primary"} msgType
     */
    alerts.insert = (msgType, msg) => {
        const time = dayjs().format("HH:mm:ss");
        const time_and_msg = `${time} ${msg}`;

        if (msgType == "danger") {
            console.log(time_and_msg);
        }

        const elem = m("div")
            .addClass(`alert alert-${msgType} my-1`)
            .append(span(time_and_msg));

        alerts.insertElem(elem);
    };

    alerts.clear = () => {
        $(alerts.id).html("");
        alerts.count = 0;
        return alerts;
    };

    return alerts;
}

/**
 * @param {mjElement | mjComponent} obj
 * @param {"trim"?} trim
 * @returns {string}
 */
function valOf(obj, trim) {
    let s = "elem" in obj ? obj.elem().val() : obj.val();
    return trim == "trim" ? s.trim() : s;
}

/**
 * @param {mjElement | mjComponent} obj
 */
function focus(obj) {
    if ("elem" in obj) obj = obj.elem();
    setTimeout(() => { obj.trigger("focus") }, 300);
}

/*
interface LinkOptions {
    text?: string;
    title?: string;
    blank?: boolean;
}
*/

/**
 * @param {string} href 
 * @param {LinkOptions?} options LinkOptions{text?: string, title?: string, blank?: "blank"}
 * @returns {mjElement}
 */
function LinkElem(href, options) {
    if (!options) {
        return m("a").text(href).attr("href", href);
    }
    if (!options.text)
        options.text = href;
    const link = m("a").text(options.text).attr("href", href);
    if (options.title)
        link.attr("title", options.title);
    if (options.blank)
        link.attr("target", "_blank");
    return link;
}
