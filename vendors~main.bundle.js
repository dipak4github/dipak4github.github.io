(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~main"],{

/***/ "./node_modules/cash-dom/dist/cash.esm.js":
/*!************************************************!*\
  !*** ./node_modules/cash-dom/dist/cash.esm.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* MIT https://github.com/kenwheeler/cash */
const doc = document, win = window, div = doc.createElement('div'), { filter, indexOf, map, push, reverse, slice, some, splice } = Array.prototype;
const idRe = /^#[\w-]*$/, classRe = /^\.[\w-]*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context = doc) {
    return !isDocument(context) && !isElement(context)
        ? []
        : classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1))
            : tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
class Cash {
    constructor(selector, context = doc) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        let eles = selector;
        if (isString(selector)) {
            const ctx = isCash(context) ? context[0] : context;
            eles = idRe.test(selector)
                ? ctx.getElementById(selector.slice(1))
                : htmlRe.test(selector)
                    ? parseHTML(selector)
                    : find(selector, ctx);
            if (!eles)
                return;
        }
        else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win)
            eles = [eles];
        this.length = eles.length;
        for (let i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    init(selector, context) {
        return new Cash(selector, context);
    }
}
const cash = Cash.prototype.init;
cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`
Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === 'function') {
    Cash.prototype[Symbol['iterator']] = Array.prototype[Symbol['iterator']];
}
Cash.prototype.get = function (index) {
    if (index === undefined)
        return slice.call(this);
    return this[index < 0 ? index + this.length : index];
};
Cash.prototype.eq = function (index) {
    return cash(this.get(index));
};
Cash.prototype.first = function () {
    return this.eq(0);
};
Cash.prototype.last = function () {
    return this.eq(-1);
};
Cash.prototype.map = function (callback) {
    return cash(map.call(this, (ele, i) => callback.call(ele, i, ele)));
};
Cash.prototype.slice = function () {
    return cash(slice.apply(this, arguments));
};
// @require ./cash.ts
const dashAlphaRe = /-([a-z])/g;
function camelCaseReplace(match, letter) {
    return letter.toUpperCase();
}
function camelCase(str) {
    return str.replace(dashAlphaRe, camelCaseReplace);
}
cash.camelCase = camelCase;
function each(arr, callback) {
    for (let i = 0, l = arr.length; i < l; i++) {
        if (callback.call(arr[i], i, arr[i]) === false)
            break;
    }
}
cash.each = each;
Cash.prototype.each = function (callback) {
    each(this, callback);
    return this;
};
Cash.prototype.removeProp = function (prop) {
    return this.each((i, ele) => { delete ele[prop]; });
};
// @require ./cash.ts
function extend(target, ...objs) {
    const args = arguments, length = args.length;
    for (let i = (length < 2 ? 0 : 1); i < length; i++) {
        for (const key in args[i]) {
            target[key] = args[i][key];
        }
    }
    return target;
}
Cash.prototype.extend = function (plugins) {
    return extend(cash.fn, plugins);
};
cash.extend = extend;
cash.guid = 1;
// @require ./cash.ts
function matches(ele, selector) {
    const matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector']);
    return !!matches && matches.call(ele, selector);
}
cash.matches = matches;
// @require ./variables.ts
function pluck(arr, prop, deep) {
    const plucked = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        let val = arr[i][prop];
        while (val != null) {
            plucked.push(val);
            if (!deep)
                break;
            val = val[prop];
        }
    }
    return plucked;
}
// @require ./cash.ts
function isCash(x) {
    return x instanceof Cash;
}
function isWindow(x) {
    return !!x && x === x.window;
}
function isDocument(x) {
    return !!x && x.nodeType === 9;
}
function isElement(x) {
    return !!x && x.nodeType === 1;
}
function isFunction(x) {
    return typeof x === 'function';
}
function isString(x) {
    return typeof x === 'string';
}
function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
const { isArray } = Array;
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;
Cash.prototype.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each((i, ele) => { ele[prop] = value; });
    }
    for (const key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
// @require ./matches.ts
// @require ./type_checking.ts
function getCompareFunction(comparator) {
    return isString(comparator)
        ? (i, ele) => matches(ele, comparator)
        : isFunction(comparator)
            ? comparator
            : isCash(comparator)
                ? (i, ele) => comparator.is(ele)
                : (i, ele) => ele === comparator;
}
Cash.prototype.filter = function (comparator) {
    if (!comparator)
        return cash();
    const compare = getCompareFunction(comparator);
    return cash(filter.call(this, (ele, i) => compare.call(ele, i, ele)));
};
// @require collection/filter.ts
function filtered(collection, comparator) {
    return !comparator || !collection.length ? collection : collection.filter(comparator);
}
// @require ./type_checking.ts
const splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
Cash.prototype.hasClass = function (cls) {
    return cls && some.call(this, (ele) => ele.classList.contains(cls));
};
Cash.prototype.removeAttr = function (attr) {
    const attrs = getSplitValues(attr);
    if (!attrs.length)
        return this;
    return this.each((i, ele) => {
        each(attrs, (i, a) => {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr)
        return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0])
                return;
            const value = this[0].getAttribute(attr);
            return value === null ? undefined : value;
        }
        if (value === undefined)
            return this;
        if (value === null)
            return this.removeAttr(attr);
        return this.each((i, ele) => { ele.setAttribute(attr, value); });
    }
    for (const key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
Cash.prototype.attr = attr;
Cash.prototype.toggleClass = function (cls, force) {
    const classes = getSplitValues(cls), isForce = (force !== undefined);
    if (!classes.length)
        return this;
    return this.each((i, ele) => {
        each(classes, (i, c) => {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            }
            else {
                ele.classList.toggle(c);
            }
        });
    });
};
Cash.prototype.addClass = function (cls) {
    return this.toggleClass(cls, true);
};
Cash.prototype.removeClass = function (cls) {
    return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
};
// @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts
// @require ./cash.ts
// @require ./variables
function unique(arr) {
    return arr.length > 1 ? filter.call(arr, (item, index, self) => indexOf.call(self, item) === index) : arr;
}
cash.unique = unique;
Cash.prototype.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
// @require core/type_checking.ts
// @require core/variables.ts
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele) || !prop)
        return;
    const style = win.getComputedStyle(ele, null);
    return prop ? (isVariable ? style.getPropertyValue(prop) || undefined : style[prop]) : style;
}
// @require ./compute_style.ts
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
const cssVariableRe = /^--/;
// @require ./variables.ts
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts
const prefixedProps = {}, { style } = div, vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];
function getPrefixedProp(prop, isVariable = isCSSVariable(prop)) {
    if (isVariable)
        return prop;
    if (!prefixedProps[prop]) {
        const propCC = camelCase(prop), propUC = `${propCC.charAt(0).toUpperCase()}${propCC.slice(1)}`, props = (`${propCC} ${vendorsPrefixes.join(`${propUC} `)}${propUC}`).split(' ');
        each(props, (i, p) => {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
;
cash.prefixedProp = getPrefixedProp;
// @require core/type_checking.ts
// @require ./is_css_variable.ts
const numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
};
function getSuffixedValue(prop, value, isVariable = isCSSVariable(prop)) {
    return !isVariable && !numericProps[prop] && isNumeric(value) ? `${value}px` : value;
}
function css(prop, value) {
    if (isString(prop)) {
        const isVariable = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable);
        if (!prop)
            return this;
        value = getSuffixedValue(prop, value, isVariable);
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            if (isVariable) {
                ele.style.setProperty(prop, value); //TSC
            }
            else {
                ele.style[prop] = value; //TSC
            }
        });
    }
    for (const key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
;
Cash.prototype.css = css;
// @optional ./css.ts
// @require core/camel_case.ts
function getData(ele, key) {
    const value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : ele.getAttribute(`data-${key}`);
    try {
        return JSON.parse(value);
    }
    catch (_a) { }
    return value;
}
// @require core/camel_case.ts
function setData(ele, key, value) {
    try {
        value = JSON.stringify(value);
    }
    catch (_a) { }
    if (ele.dataset) {
        ele.dataset[camelCase(key)] = value;
    }
    else {
        ele.setAttribute(`data-${key}`, value);
    }
}
const dataAttributeRe = /^data-(.+)/;
function data(name, value) {
    if (!name) {
        if (!this[0])
            return;
        const datas = {};
        each(this[0].attributes, (i, attr) => {
            const match = attr.name.match(dataAttributeRe);
            if (!match)
                return;
            datas[match[1]] = this.data(match[1]);
        });
        return datas;
    }
    if (isString(name)) {
        if (value === undefined)
            return this[0] && getData(this[0], name);
        return this.each((i, ele) => setData(ele, name, value));
    }
    for (const key in name) {
        this.data(key, name[key]);
    }
    return this;
}
Cash.prototype.data = data;
// @optional ./data.ts
// @require css/helpers/compute_style_int.ts
function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, `border${xAxis ? 'Left' : 'Top'}Width`) + computeStyleInt(ele, `padding${xAxis ? 'Left' : 'Top'}`) + computeStyleInt(ele, `padding${xAxis ? 'Right' : 'Bottom'}`) + computeStyleInt(ele, `border${xAxis ? 'Right' : 'Bottom'}Width`);
}
each(['Width', 'Height'], (i, prop) => {
    Cash.prototype[`inner${prop}`] = function () {
        if (!this[0])
            return;
        if (isWindow(this[0]))
            return win[`inner${prop}`];
        return this[0][`client${prop}`];
    };
});
each(['width', 'height'], (index, prop) => {
    Cash.prototype[prop] = function (value) {
        if (!this[0])
            return value === undefined ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0][camelCase(`outer-${prop}`)];
            return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
        }
        const valueNumber = parseInt(value, 10); //TSC
        return this.each((i, ele) => {
            if (!isElement(ele))
                return;
            const boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
        });
    };
});
each(['Width', 'Height'], (index, prop) => {
    Cash.prototype[`outer${prop}`] = function (includeMargins) {
        if (!this[0])
            return;
        if (isWindow(this[0]))
            return win[`outer${prop}`];
        return this[0][`offset${prop}`] + (includeMargins ? computeStyleInt(this[0], `margin${!index ? 'Left' : 'Top'}`) + computeStyleInt(this[0], `margin${!index ? 'Right' : 'Bottom'}`) : 0);
    };
});
// @optional ./inner.ts
// @optional ./normal.ts
// @optional ./outer.ts
// @require css/helpers/compute_style.ts
const defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName])
        return defaultDisplay[tagName];
    const ele = doc.createElement(tagName);
    doc.body.appendChild(ele);
    const display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}
// @require css/helpers/compute_style.ts
function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
}
Cash.prototype.toggle = function (force) {
    return this.each((i, ele) => {
        force = force !== undefined ? force : isHidden(ele);
        if (force) {
            ele.style.display = '';
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        }
        else {
            ele.style.display = 'none';
        }
    });
};
Cash.prototype.hide = function () {
    return this.toggle(false);
};
Cash.prototype.show = function () {
    return this.toggle(true);
};
// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, (ns) => ns1.indexOf(ns) < 0);
}
const eventsNamespace = '__cashEvents', eventsNamespacesSeparator = '.', eventsFocus = { focus: 'focusin', blur: 'focusout' }, eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }, eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
// @require ./variables.ts
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
// @require ./variables.ts
function getEventsCache(ele) {
    return ele[eventsNamespace] = (ele[eventsNamespace] || {});
}
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts
function addEvent(ele, name, namespaces, selector, callback) {
    callback.guid = callback.guid || cash.guid++;
    const eventCache = getEventsCache(ele);
    eventCache[name] = (eventCache[name] || []);
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
// @require ./variables.ts
function parseEventName(eventName) {
    const parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
function removeEvent(ele, name, namespaces, selector, callback) {
    const cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
        delete ele[eventsNamespace];
    }
    else if (cache[name]) {
        cache[name] = cache[name].filter(([ns, sel, cb]) => {
            if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
Cash.prototype.off = function (eventFullName, selector, callback) {
    if (eventFullName === undefined) {
        this.each((i, ele) => removeEvent(ele));
    }
    else {
        if (isFunction(selector)) {
            callback = selector;
            selector = '';
        }
        each(getSplitValues(eventFullName), (i, eventFullName) => {
            const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
            this.each((i, ele) => removeEvent(ele, name, namespaces, selector, callback)); //TSC
        });
    }
    return this;
};
function on(eventFullName, selector, callback, _one) {
    if (!isString(eventFullName)) {
        for (const key in eventFullName) {
            this.on(key, selector, eventFullName[key]);
        }
        return this;
    }
    if (isFunction(selector)) {
        callback = selector;
        selector = '';
    }
    each(getSplitValues(eventFullName), (i, eventFullName) => {
        const [name, namespaces] = parseEventName(getEventNameBubbling(eventFullName));
        this.each((i, ele) => {
            const finalCallback = function (event) {
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                    return;
                let thisArg = ele;
                if (selector) {
                    let target = event.target;
                    while (!matches(target, selector)) { //TSC
                        if (target === ele)
                            return;
                        target = target.parentNode;
                        if (!target)
                            return;
                    }
                    thisArg = target;
                    event.__delegate = true;
                }
                if (event.__delegate) {
                    Object.defineProperty(event, 'currentTarget', {
                        configurable: true,
                        get() {
                            return thisArg;
                        }
                    });
                }
                const returnValue = callback.call(thisArg, event, event.data); //TSC
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback); //TSC
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback['guid'] = (callback['guid'] || cash.guid++); //TSC
            addEvent(ele, name, namespaces, selector, finalCallback); //TSC
        });
    });
    return this;
}
Cash.prototype.on = on;
function one(eventFullName, selector, callback) {
    return this.on(eventFullName, selector, callback, true); //TSC
}
;
Cash.prototype.one = one;
Cash.prototype.ready = function (callback) {
    const finalCallback = () => callback(cash);
    if (doc.readyState !== 'loading') {
        setTimeout(finalCallback);
    }
    else {
        doc.addEventListener('DOMContentLoaded', finalCallback);
    }
    return this;
};
Cash.prototype.trigger = function (eventFullName, data) {
    let evt;
    if (isString(eventFullName)) {
        const [name, namespaces] = parseEventName(eventFullName), type = eventsMouseRe.test(name) ? 'MouseEvents' : 'HTMLEvents';
        evt = doc.createEvent(type);
        evt.initEvent(name, true, true);
        evt.namespace = namespaces.join(eventsNamespacesSeparator);
    }
    else {
        evt = eventFullName;
    }
    evt.data = data;
    const isEventFocus = (evt.type in eventsFocus);
    return this.each((i, ele) => {
        if (isEventFocus && isFunction(ele[evt.type])) {
            ele[evt.type]();
        }
        else {
            ele.dispatchEvent(evt);
        }
    });
};
// @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts
function getValue(ele) {
    if (ele.multiple)
        return pluck(filter.call(ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled), 'value');
    return ele.value || '';
}
const queryEncodeSpaceRe = /%20/g;
function queryEncode(prop, value) {
    return `&${encodeURIComponent(prop)}=${encodeURIComponent(value).replace(queryEncodeSpaceRe, '+')}`;
}
// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts
const skippableRe = /file|reset|submit|button|image/i, checkableRe = /radio|checkbox/i;
Cash.prototype.serialize = function () {
    let query = '';
    this.each((i, ele) => {
        each(ele.elements || [ele], (i, ele) => {
            if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                return;
            const value = getValue(ele);
            if (value === undefined)
                return;
            const values = isArray(value) ? value : [value];
            each(values, (i, value) => {
                query += queryEncode(ele.name, value);
            });
        });
    });
    return query.substr(1);
};
function val(value) {
    if (value === undefined)
        return this[0] && getValue(this[0]);
    return this.each((i, ele) => {
        if (ele.tagName === 'SELECT') {
            const eleValue = isArray(value) ? value : (value === null ? [] : [value]);
            each(ele.options, (i, option) => {
                option.selected = eleValue.indexOf(option.value) >= 0;
            });
        }
        else {
            ele.value = value === null ? '' : value;
        }
    });
}
Cash.prototype.val = val;
Cash.prototype.clone = function () {
    return this.map((i, ele) => ele.cloneNode(true));
};
Cash.prototype.detach = function () {
    return this.each((i, ele) => {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
};
// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts
const fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
let containers;
function initContainers() {
    if (containers)
        return;
    const table = doc.createElement('table'), tr = doc.createElement('tr');
    containers = {
        '*': div,
        tr: doc.createElement('tbody'),
        td: tr,
        th: tr,
        thead: table,
        tbody: table,
        tfoot: table,
    };
}
function parseHTML(html) {
    initContainers();
    if (!isString(html))
        return [];
    if (singleTagRe.test(html))
        return [doc.createElement(RegExp.$1)];
    const fragment = fragmentRe.test(html) && RegExp.$1, container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
}
cash.parseHTML = parseHTML;
Cash.prototype.empty = function () {
    return this.each((i, ele) => {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function html(html) {
    if (html === undefined)
        return this[0] && this[0].innerHTML;
    return this.each((i, ele) => { ele.innerHTML = html; });
}
Cash.prototype.html = html;
Cash.prototype.remove = function () {
    return this.detach().off();
};
function text(text) {
    if (text === undefined)
        return this[0] ? this[0].textContent : '';
    return this.each((i, ele) => { ele.textContent = text; });
}
;
Cash.prototype.text = text;
Cash.prototype.unwrap = function () {
    this.parent().each((i, ele) => {
        const $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
// @require core/cash.ts
// @require core/variables.ts
const docEle = doc.documentElement;
Cash.prototype.offset = function () {
    const ele = this[0];
    if (!ele)
        return;
    const rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset - docEle.clientTop,
        left: rect.left + win.pageXOffset - docEle.clientLeft
    };
};
Cash.prototype.offsetParent = function () {
    return cash(this[0] && this[0].offsetParent);
};
Cash.prototype.position = function () {
    const ele = this[0];
    if (!ele)
        return;
    return {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
};
Cash.prototype.children = function (comparator) {
    const result = [];
    this.each((i, ele) => {
        push.apply(result, ele.children);
    });
    return filtered(cash(unique(result)), comparator);
};
Cash.prototype.contents = function () {
    const result = [];
    this.each((i, ele) => {
        push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
    });
    return cash(unique(result));
};
Cash.prototype.find = function (selector) {
    const result = [];
    for (let i = 0, l = this.length; i < l; i++) {
        const found = find(selector, this[i]);
        if (found.length) {
            push.apply(result, found);
        }
    }
    return cash(unique(result));
};
// @require collection/filter.ts
// @require traversal/find.ts
const scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i, HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
function evalScripts(node) {
    const collection = cash(node);
    collection.filter('script').add(collection.find('script')).each((i, ele) => {
        if (!ele.src && scriptTypeRe.test(ele.type)) { // The script type is supported
            if (ele.ownerDocument.documentElement.contains(ele)) { // The element is attached to the DOM // Using `documentElement` for broader browser support
                eval(ele.textContent.replace(HTMLCDATARe, ''));
            }
        }
    });
}
// @require ./eval_scripts.ts
function insertElement(anchor, child, prepend, prependTarget) {
    if (prepend) {
        anchor.insertBefore(child, prependTarget);
    }
    else {
        anchor.appendChild(child);
    }
    evalScripts(child);
}
// @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts
function insertContent(parent, child, prepend) {
    each(parent, (index, parentEle) => {
        each(child, (i, childEle) => {
            insertElement(parentEle, !index ? childEle : childEle.cloneNode(true), prepend, prepend && parentEle.firstChild);
        });
    });
}
Cash.prototype.append = function () {
    each(arguments, (i, selector) => {
        insertContent(this, cash(selector));
    });
    return this;
};
Cash.prototype.appendTo = function (selector) {
    insertContent(cash(selector), this);
    return this;
};
Cash.prototype.insertAfter = function (selector) {
    cash(selector).each((index, ele) => {
        const parent = ele.parentNode;
        if (parent) {
            this.each((i, e) => {
                insertElement(parent, !index ? e : e.cloneNode(true), true, ele.nextSibling);
            });
        }
    });
    return this;
};
Cash.prototype.after = function () {
    each(reverse.apply(arguments), (i, selector) => {
        reverse.apply(cash(selector).slice()).insertAfter(this);
    });
    return this;
};
Cash.prototype.insertBefore = function (selector) {
    cash(selector).each((index, ele) => {
        const parent = ele.parentNode;
        if (parent) {
            this.each((i, e) => {
                insertElement(parent, !index ? e : e.cloneNode(true), true, ele);
            });
        }
    });
    return this;
};
Cash.prototype.before = function () {
    each(arguments, (i, selector) => {
        cash(selector).insertBefore(this);
    });
    return this;
};
Cash.prototype.prepend = function () {
    each(arguments, (i, selector) => {
        insertContent(this, cash(selector), true);
    });
    return this;
};
Cash.prototype.prependTo = function (selector) {
    insertContent(cash(selector), reverse.apply(this.slice()), true);
    return this;
};
Cash.prototype.replaceWith = function (selector) {
    return this.before(selector).remove();
};
Cash.prototype.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
};
Cash.prototype.wrapAll = function (selector) {
    if (this[0]) {
        const structure = cash(selector);
        this.first().before(structure);
        let wrapper = structure[0];
        while (wrapper.children.length)
            wrapper = wrapper.firstElementChild;
        this.appendTo(wrapper);
    }
    return this;
};
Cash.prototype.wrap = function (selector) {
    return this.each((index, ele) => {
        const wrapper = cash(selector)[0];
        cash(ele).wrapAll(!index ? wrapper : wrapper.cloneNode(true));
    });
};
Cash.prototype.wrapInner = function (selector) {
    return this.each((i, ele) => {
        const $ele = cash(ele), contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
Cash.prototype.has = function (selector) {
    const comparator = isString(selector)
        ? (i, ele) => !!find(selector, ele).length
        : (i, ele) => ele.contains(selector);
    return this.filter(comparator);
};
Cash.prototype.is = function (comparator) {
    if (!comparator || !this[0])
        return false;
    const compare = getCompareFunction(comparator);
    let check = false;
    this.each((i, ele) => {
        check = compare.call(ele, i, ele);
        return !check;
    });
    return check;
};
Cash.prototype.next = function (comparator, _all) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all))), comparator);
};
Cash.prototype.nextAll = function (comparator) {
    return this.next(comparator, true);
};
Cash.prototype.not = function (comparator) {
    if (!comparator || !this[0])
        return this;
    const compare = getCompareFunction(comparator);
    return this.filter((i, ele) => !compare.call(ele, i, ele));
};
Cash.prototype.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};
Cash.prototype.index = function (selector) {
    const child = selector ? cash(selector)[0] : this[0], collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
};
Cash.prototype.closest = function (comparator) {
    if (!comparator || !this[0])
        return cash();
    const filtered = this.filter(comparator);
    if (filtered.length)
        return filtered;
    return this.parent().closest(comparator);
};
Cash.prototype.parents = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentElement', true))), comparator);
};
Cash.prototype.prev = function (comparator, _all) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all))), comparator);
};
Cash.prototype.prevAll = function (comparator) {
    return this.prev(comparator, true);
};
Cash.prototype.siblings = function (comparator) {
    const result = [];
    this.each((i, ele) => {
        push.apply(result, cash(ele).parent().children((ci, child) => child !== ele));
    });
    return filtered(cash(unique(result)), comparator);
};
// @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./prev.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
/* harmony default export */ __webpack_exports__["default"] = (cash);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2FzaC1kb20vZGlzdC9jYXNoLmVzbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBLHFFQUFxRSwyREFBMkQ7QUFDaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQixFQUFFO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFVBQVU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxtQkFBbUIsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywrQkFBK0IsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsR0FBRyxRQUFRO0FBQ25DO0FBQ0E7QUFD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QUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxtRUFBSSxFQUFDIiwiZmlsZSI6InZlbmRvcnN+bWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvY2FzaCAqL1xuY29uc3QgZG9jID0gZG9jdW1lbnQsIHdpbiA9IHdpbmRvdywgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB7IGZpbHRlciwgaW5kZXhPZiwgbWFwLCBwdXNoLCByZXZlcnNlLCBzbGljZSwgc29tZSwgc3BsaWNlIH0gPSBBcnJheS5wcm90b3R5cGU7XG5jb25zdCBpZFJlID0gL14jW1xcdy1dKiQvLCBjbGFzc1JlID0gL15cXC5bXFx3LV0qJC8sIGh0bWxSZSA9IC88Lis+LywgdGFnUmUgPSAvXlxcdyskLztcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5mdW5jdGlvbiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jKSB7XG4gICAgcmV0dXJuICFpc0RvY3VtZW50KGNvbnRleHQpICYmICFpc0VsZW1lbnQoY29udGV4dClcbiAgICAgICAgPyBbXVxuICAgICAgICA6IGNsYXNzUmUudGVzdChzZWxlY3RvcilcbiAgICAgICAgICAgID8gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yLnNsaWNlKDEpKVxuICAgICAgICAgICAgOiB0YWdSZS50ZXN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcilcbiAgICAgICAgICAgICAgICA6IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59XG4vLyBAcmVxdWlyZSAuL2ZpbmQudHNcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5jbGFzcyBDYXNoIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY29udGV4dCA9IGRvYykge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaXNDYXNoKHNlbGVjdG9yKSlcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgbGV0IGVsZXMgPSBzZWxlY3RvcjtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gaXNDYXNoKGNvbnRleHQpID8gY29udGV4dFswXSA6IGNvbnRleHQ7XG4gICAgICAgICAgICBlbGVzID0gaWRSZS50ZXN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgID8gY3R4LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIDogaHRtbFJlLnRlc3Qoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyc2VIVE1MKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICA6IGZpbmQoc2VsZWN0b3IsIGN0eCk7XG4gICAgICAgICAgICBpZiAoIWVsZXMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkeShzZWxlY3Rvcik7IC8vRklYTUU6IGBmbi5yZWFkeWAgaXMgbm90IGluY2x1ZGVkIGluIGBjb3JlYCwgYnV0IGl0J3MgYWN0dWFsbHkgYSBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlcy5ub2RlVHlwZSB8fCBlbGVzID09PSB3aW4pXG4gICAgICAgICAgICBlbGVzID0gW2VsZXNdO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGVsZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzW2ldID0gZWxlc1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FzaChzZWxlY3RvciwgY29udGV4dCk7XG4gICAgfVxufVxuY29uc3QgY2FzaCA9IENhc2gucHJvdG90eXBlLmluaXQ7XG5jYXNoLmZuID0gY2FzaC5wcm90b3R5cGUgPSBDYXNoLnByb3RvdHlwZTsgLy8gRW5zdXJpbmcgdGhhdCBgY2FzaCAoKSBpbnN0YW5jZW9mIGNhc2hgXG5DYXNoLnByb3RvdHlwZS5sZW5ndGggPSAwO1xuQ2FzaC5wcm90b3R5cGUuc3BsaWNlID0gc3BsaWNlOyAvLyBFbnN1cmluZyBhIGNhc2ggY29sbGVjdGlvbiBnZXRzIHByaW50ZWQgYXMgYXJyYXktbGlrZSBpbiBDaHJvbWUncyBkZXZ0b29sc1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICBDYXNoLnByb3RvdHlwZVtTeW1ib2xbJ2l0ZXJhdG9yJ11dID0gQXJyYXkucHJvdG90eXBlW1N5bWJvbFsnaXRlcmF0b3InXV07XG59XG5DYXNoLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXNbaW5kZXggPCAwID8gaW5kZXggKyB0aGlzLmxlbmd0aCA6IGluZGV4XTtcbn07XG5DYXNoLnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG59O1xuQ2FzaC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXEoMCk7XG59O1xuQ2FzaC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lcSgtMSk7XG59O1xuQ2FzaC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNhc2gobWFwLmNhbGwodGhpcywgKGVsZSwgaSkgPT4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSkpKTtcbn07XG5DYXNoLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FzaChzbGljZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbn07XG4vLyBAcmVxdWlyZSAuL2Nhc2gudHNcbmNvbnN0IGRhc2hBbHBoYVJlID0gLy0oW2Etel0pL2c7XG5mdW5jdGlvbiBjYW1lbENhc2VSZXBsYWNlKG1hdGNoLCBsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGRhc2hBbHBoYVJlLCBjYW1lbENhc2VSZXBsYWNlKTtcbn1cbmNhc2guY2FtZWxDYXNlID0gY2FtZWxDYXNlO1xuZnVuY3Rpb24gZWFjaChhcnIsIGNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgaSwgYXJyW2ldKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5jYXNoLmVhY2ggPSBlYWNoO1xuQ2FzaC5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGVhY2godGhpcywgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNhc2gucHJvdG90eXBlLnJlbW92ZVByb3AgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goKGksIGVsZSkgPT4geyBkZWxldGUgZWxlW3Byb3BdOyB9KTtcbn07XG4vLyBAcmVxdWlyZSAuL2Nhc2gudHNcbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIC4uLm9ianMpIHtcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzLCBsZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gKGxlbmd0aCA8IDIgPyAwIDogMSk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmdzW2ldKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuQ2FzaC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKHBsdWdpbnMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKGNhc2guZm4sIHBsdWdpbnMpO1xufTtcbmNhc2guZXh0ZW5kID0gZXh0ZW5kO1xuY2FzaC5ndWlkID0gMTtcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuZnVuY3Rpb24gbWF0Y2hlcyhlbGUsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGVsZSAmJiAoZWxlWydtYXRjaGVzJ10gfHwgZWxlWyd3ZWJraXRNYXRjaGVzU2VsZWN0b3InXSB8fCBlbGVbJ21vek1hdGNoZXNTZWxlY3RvciddIHx8IGVsZVsnbXNNYXRjaGVzU2VsZWN0b3InXSB8fCBlbGVbJ29NYXRjaGVzU2VsZWN0b3InXSk7XG4gICAgcmV0dXJuICEhbWF0Y2hlcyAmJiBtYXRjaGVzLmNhbGwoZWxlLCBzZWxlY3Rvcik7XG59XG5jYXNoLm1hdGNoZXMgPSBtYXRjaGVzO1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcbmZ1bmN0aW9uIHBsdWNrKGFyciwgcHJvcCwgZGVlcCkge1xuICAgIGNvbnN0IHBsdWNrZWQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IHZhbCA9IGFycltpXVtwcm9wXTtcbiAgICAgICAgd2hpbGUgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBwbHVja2VkLnB1c2godmFsKTtcbiAgICAgICAgICAgIGlmICghZGVlcClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhbCA9IHZhbFtwcm9wXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGx1Y2tlZDtcbn1cbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuZnVuY3Rpb24gaXNDYXNoKHgpIHtcbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIENhc2g7XG59XG5mdW5jdGlvbiBpc1dpbmRvdyh4KSB7XG4gICAgcmV0dXJuICEheCAmJiB4ID09PSB4LndpbmRvdztcbn1cbmZ1bmN0aW9uIGlzRG9jdW1lbnQoeCkge1xuICAgIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gOTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gICAgcmV0dXJuICEheCAmJiB4Lm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gaXNTdHJpbmcoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBpc051bWVyaWMoeCkge1xuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh4KSkgJiYgaXNGaW5pdGUoeCk7XG59XG5jb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuY2FzaC5pc1dpbmRvdyA9IGlzV2luZG93O1xuY2FzaC5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbmNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcbmNhc2guaXNOdW1lcmljID0gaXNOdW1lcmljO1xuY2FzaC5pc0FycmF5ID0gaXNBcnJheTtcbkNhc2gucHJvdG90eXBlLnByb3AgPSBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgICBpZiAoIXByb3ApXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0gJiYgdGhpc1swXVtwcm9wXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7IGVsZVtwcm9wXSA9IHZhbHVlOyB9KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcCkge1xuICAgICAgICB0aGlzLnByb3Aoa2V5LCBwcm9wW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4vLyBAcmVxdWlyZSAuL21hdGNoZXMudHNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoY29tcGFyYXRvcilcbiAgICAgICAgPyAoaSwgZWxlKSA9PiBtYXRjaGVzKGVsZSwgY29tcGFyYXRvcilcbiAgICAgICAgOiBpc0Z1bmN0aW9uKGNvbXBhcmF0b3IpXG4gICAgICAgICAgICA/IGNvbXBhcmF0b3JcbiAgICAgICAgICAgIDogaXNDYXNoKGNvbXBhcmF0b3IpXG4gICAgICAgICAgICAgICAgPyAoaSwgZWxlKSA9PiBjb21wYXJhdG9yLmlzKGVsZSlcbiAgICAgICAgICAgICAgICA6IChpLCBlbGUpID0+IGVsZSA9PT0gY29tcGFyYXRvcjtcbn1cbkNhc2gucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgaWYgKCFjb21wYXJhdG9yKVxuICAgICAgICByZXR1cm4gY2FzaCgpO1xuICAgIGNvbnN0IGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gICAgcmV0dXJuIGNhc2goZmlsdGVyLmNhbGwodGhpcywgKGVsZSwgaSkgPT4gY29tcGFyZS5jYWxsKGVsZSwgaSwgZWxlKSkpO1xufTtcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG5mdW5jdGlvbiBmaWx0ZXJlZChjb2xsZWN0aW9uLCBjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuICFjb21wYXJhdG9yIHx8ICFjb2xsZWN0aW9uLmxlbmd0aCA/IGNvbGxlY3Rpb24gOiBjb2xsZWN0aW9uLmZpbHRlcihjb21wYXJhdG9yKTtcbn1cbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuY29uc3Qgc3BsaXRWYWx1ZXNSZSA9IC9cXFMrL2c7XG5mdW5jdGlvbiBnZXRTcGxpdFZhbHVlcyhzdHIpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoc3RyKSA/IHN0ci5tYXRjaChzcGxpdFZhbHVlc1JlKSB8fCBbXSA6IFtdO1xufVxuQ2FzaC5wcm90b3R5cGUuaGFzQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gICAgcmV0dXJuIGNscyAmJiBzb21lLmNhbGwodGhpcywgKGVsZSkgPT4gZWxlLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcbn07XG5DYXNoLnByb3RvdHlwZS5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICBjb25zdCBhdHRycyA9IGdldFNwbGl0VmFsdWVzKGF0dHIpO1xuICAgIGlmICghYXR0cnMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgZWFjaChhdHRycywgKGksIGEpID0+IHtcbiAgICAgICAgICAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoYSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIGF0dHIoYXR0ciwgdmFsdWUpIHtcbiAgICBpZiAoIWF0dHIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoaXNTdHJpbmcoYXR0cikpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXNbMF0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUF0dHIoYXR0cik7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goKGksIGVsZSkgPT4geyBlbGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTsgfSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHIpIHtcbiAgICAgICAgdGhpcy5hdHRyKGtleSwgYXR0cltrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5DYXNoLnByb3RvdHlwZS5hdHRyID0gYXR0cjtcbkNhc2gucHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gKGNscywgZm9yY2UpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gZ2V0U3BsaXRWYWx1ZXMoY2xzKSwgaXNGb3JjZSA9IChmb3JjZSAhPT0gdW5kZWZpbmVkKTtcbiAgICBpZiAoIWNsYXNzZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgZWFjaChjbGFzc2VzLCAoaSwgYykgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRm9yY2UpIHtcbiAgICAgICAgICAgICAgICBmb3JjZSA/IGVsZS5jbGFzc0xpc3QuYWRkKGMpIDogZWxlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnRvZ2dsZShjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuQ2FzaC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlQ2xhc3MoY2xzLCB0cnVlKTtcbn07XG5DYXNoLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgICByZXR1cm4gIWFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLmF0dHIoJ2NsYXNzJywgJycpIDogdGhpcy50b2dnbGVDbGFzcyhjbHMsIGZhbHNlKTtcbn07XG4vLyBAb3B0aW9uYWwgLi9hZGRfY2xhc3MudHNcbi8vIEBvcHRpb25hbCAuL2F0dHIudHNcbi8vIEBvcHRpb25hbCAuL2hhc19jbGFzcy50c1xuLy8gQG9wdGlvbmFsIC4vcHJvcC50c1xuLy8gQG9wdGlvbmFsIC4vcmVtb3ZlX2F0dHIudHNcbi8vIEBvcHRpb25hbCAuL3JlbW92ZV9jbGFzcy50c1xuLy8gQG9wdGlvbmFsIC4vcmVtb3ZlX3Byb3AudHNcbi8vIEBvcHRpb25hbCAuL3RvZ2dsZV9jbGFzcy50c1xuLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlc1xuZnVuY3Rpb24gdW5pcXVlKGFycikge1xuICAgIHJldHVybiBhcnIubGVuZ3RoID4gMSA/IGZpbHRlci5jYWxsKGFyciwgKGl0ZW0sIGluZGV4LCBzZWxmKSA9PiBpbmRleE9mLmNhbGwoc2VsZiwgaXRlbSkgPT09IGluZGV4KSA6IGFycjtcbn1cbmNhc2gudW5pcXVlID0gdW5pcXVlO1xuQ2FzaC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNhc2godW5pcXVlKHRoaXMuZ2V0KCkuY29uY2F0KGNhc2goc2VsZWN0b3IsIGNvbnRleHQpLmdldCgpKSkpO1xufTtcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShlbGUsIHByb3AsIGlzVmFyaWFibGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpIHx8ICFwcm9wKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGUsIG51bGwpO1xuICAgIHJldHVybiBwcm9wID8gKGlzVmFyaWFibGUgPyBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApIHx8IHVuZGVmaW5lZCA6IHN0eWxlW3Byb3BdKSA6IHN0eWxlO1xufVxuLy8gQHJlcXVpcmUgLi9jb21wdXRlX3N0eWxlLnRzXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVJbnQoZWxlLCBwcm9wKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGNvbXB1dGVTdHlsZShlbGUsIHByb3ApLCAxMCkgfHwgMDtcbn1cbmNvbnN0IGNzc1ZhcmlhYmxlUmUgPSAvXi0tLztcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5mdW5jdGlvbiBpc0NTU1ZhcmlhYmxlKHByb3ApIHtcbiAgICByZXR1cm4gY3NzVmFyaWFibGVSZS50ZXN0KHByb3ApO1xufVxuLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2Nhc2gudHNcbi8vIEByZXF1aXJlIGNvcmUvZWFjaC50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIC4vaXNfY3NzX3ZhcmlhYmxlLnRzXG5jb25zdCBwcmVmaXhlZFByb3BzID0ge30sIHsgc3R5bGUgfSA9IGRpdiwgdmVuZG9yc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJywgJ28nXTtcbmZ1bmN0aW9uIGdldFByZWZpeGVkUHJvcChwcm9wLCBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKSkge1xuICAgIGlmIChpc1ZhcmlhYmxlKVxuICAgICAgICByZXR1cm4gcHJvcDtcbiAgICBpZiAoIXByZWZpeGVkUHJvcHNbcHJvcF0pIHtcbiAgICAgICAgY29uc3QgcHJvcENDID0gY2FtZWxDYXNlKHByb3ApLCBwcm9wVUMgPSBgJHtwcm9wQ0MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtwcm9wQ0Muc2xpY2UoMSl9YCwgcHJvcHMgPSAoYCR7cHJvcENDfSAke3ZlbmRvcnNQcmVmaXhlcy5qb2luKGAke3Byb3BVQ30gYCl9JHtwcm9wVUN9YCkuc3BsaXQoJyAnKTtcbiAgICAgICAgZWFjaChwcm9wcywgKGksIHApID0+IHtcbiAgICAgICAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcHJlZml4ZWRQcm9wc1twcm9wXSA9IHA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeGVkUHJvcHNbcHJvcF07XG59XG47XG5jYXNoLnByZWZpeGVkUHJvcCA9IGdldFByZWZpeGVkUHJvcDtcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcbmNvbnN0IG51bWVyaWNQcm9wcyA9IHtcbiAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmbGV4R3JvdzogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgd2lkb3dzOiB0cnVlLFxuICAgIHpJbmRleDogdHJ1ZVxufTtcbmZ1bmN0aW9uIGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApKSB7XG4gICAgcmV0dXJuICFpc1ZhcmlhYmxlICYmICFudW1lcmljUHJvcHNbcHJvcF0gJiYgaXNOdW1lcmljKHZhbHVlKSA/IGAke3ZhbHVlfXB4YCA6IHZhbHVlO1xufVxuZnVuY3Rpb24gY3NzKHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgICAgIGNvbnN0IGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICAgICAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGUpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1swXSAmJiBjb21wdXRlU3R5bGUodGhpc1swXSwgcHJvcCwgaXNWYXJpYWJsZSk7XG4gICAgICAgIGlmICghcHJvcClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB2YWx1ZSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzVmFyaWFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGUuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpOyAvL1RTQ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsdWU7IC8vVFNDXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wKSB7XG4gICAgICAgIHRoaXMuY3NzKGtleSwgcHJvcFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG47XG5DYXNoLnByb3RvdHlwZS5jc3MgPSBjc3M7XG4vLyBAb3B0aW9uYWwgLi9jc3MudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuZnVuY3Rpb24gZ2V0RGF0YShlbGUsIGtleSkge1xuICAgIGNvbnN0IHZhbHVlID0gZWxlLmRhdGFzZXQgPyBlbGUuZGF0YXNldFtrZXldIHx8IGVsZS5kYXRhc2V0W2NhbWVsQ2FzZShrZXkpXSA6IGVsZS5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHsgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuZnVuY3Rpb24gc2V0RGF0YShlbGUsIGtleSwgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7IH1cbiAgICBpZiAoZWxlLmRhdGFzZXQpIHtcbiAgICAgICAgZWxlLmRhdGFzZXRbY2FtZWxDYXNlKGtleSldID0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbGUuc2V0QXR0cmlidXRlKGBkYXRhLSR7a2V5fWAsIHZhbHVlKTtcbiAgICB9XG59XG5jb25zdCBkYXRhQXR0cmlidXRlUmUgPSAvXmRhdGEtKC4rKS87XG5mdW5jdGlvbiBkYXRhKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIGlmICghdGhpc1swXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgZGF0YXMgPSB7fTtcbiAgICAgICAgZWFjaCh0aGlzWzBdLmF0dHJpYnV0ZXMsIChpLCBhdHRyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGF0dHIubmFtZS5tYXRjaChkYXRhQXR0cmlidXRlUmUpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkYXRhc1ttYXRjaFsxXV0gPSB0aGlzLmRhdGEobWF0Y2hbMV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGFzO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1swXSAmJiBnZXREYXRhKHRoaXNbMF0sIG5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHNldERhdGEoZWxlLCBuYW1lLCB2YWx1ZSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lKSB7XG4gICAgICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuQ2FzaC5wcm90b3R5cGUuZGF0YSA9IGRhdGE7XG4vLyBAb3B0aW9uYWwgLi9kYXRhLnRzXG4vLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlX2ludC50c1xuZnVuY3Rpb24gZ2V0RXh0cmFTcGFjZShlbGUsIHhBeGlzKSB7XG4gICAgcmV0dXJuIGNvbXB1dGVTdHlsZUludChlbGUsIGBib3JkZXIke3hBeGlzID8gJ0xlZnQnIDogJ1RvcCd9V2lkdGhgKSArIGNvbXB1dGVTdHlsZUludChlbGUsIGBwYWRkaW5nJHt4QXhpcyA/ICdMZWZ0JyA6ICdUb3AnfWApICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgYHBhZGRpbmcke3hBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nfWApICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgYGJvcmRlciR7eEF4aXMgPyAnUmlnaHQnIDogJ0JvdHRvbSd9V2lkdGhgKTtcbn1cbmVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgKGksIHByb3ApID0+IHtcbiAgICBDYXNoLnByb3RvdHlwZVtgaW5uZXIke3Byb3B9YF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpc1swXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKVxuICAgICAgICAgICAgcmV0dXJuIHdpbltgaW5uZXIke3Byb3B9YF07XG4gICAgICAgIHJldHVybiB0aGlzWzBdW2BjbGllbnQke3Byb3B9YF07XG4gICAgfTtcbn0pO1xuZWFjaChbJ3dpZHRoJywgJ2hlaWdodCddLCAoaW5kZXgsIHByb3ApID0+IHtcbiAgICBDYXNoLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXNbMF0pXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHRoaXM7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdW2NhbWVsQ2FzZShgb3V0ZXItJHtwcm9wfWApXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3Byb3BdIC0gZ2V0RXh0cmFTcGFjZSh0aGlzWzBdLCAhaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTsgLy9UU0NcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzRWxlbWVudChlbGUpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGJveFNpemluZyA9IGNvbXB1dGVTdHlsZShlbGUsICdib3hTaXppbmcnKTtcbiAgICAgICAgICAgIGVsZS5zdHlsZVtwcm9wXSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWVOdW1iZXIgKyAoYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcgPyBnZXRFeHRyYVNwYWNlKGVsZSwgIWluZGV4KSA6IDApKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCAoaW5kZXgsIHByb3ApID0+IHtcbiAgICBDYXNoLnByb3RvdHlwZVtgb3V0ZXIke3Byb3B9YF0gPSBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzWzBdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaXNXaW5kb3codGhpc1swXSkpXG4gICAgICAgICAgICByZXR1cm4gd2luW2BvdXRlciR7cHJvcH1gXTtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF1bYG9mZnNldCR7cHJvcH1gXSArIChpbmNsdWRlTWFyZ2lucyA/IGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBgbWFyZ2luJHshaW5kZXggPyAnTGVmdCcgOiAnVG9wJ31gKSArIGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBgbWFyZ2luJHshaW5kZXggPyAnUmlnaHQnIDogJ0JvdHRvbSd9YCkgOiAwKTtcbiAgICB9O1xufSk7XG4vLyBAb3B0aW9uYWwgLi9pbm5lci50c1xuLy8gQG9wdGlvbmFsIC4vbm9ybWFsLnRzXG4vLyBAb3B0aW9uYWwgLi9vdXRlci50c1xuLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuY29uc3QgZGVmYXVsdERpc3BsYXkgPSB7fTtcbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KHRhZ05hbWUpIHtcbiAgICBpZiAoZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0pXG4gICAgICAgIHJldHVybiBkZWZhdWx0RGlzcGxheVt0YWdOYW1lXTtcbiAgICBjb25zdCBlbGUgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChlbGUpO1xuICAgIGNvbnN0IGRpc3BsYXkgPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG4gICAgcmV0dXJuIGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdID0gZGlzcGxheSAhPT0gJ25vbmUnID8gZGlzcGxheSA6ICdibG9jayc7XG59XG4vLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlLnRzXG5mdW5jdGlvbiBpc0hpZGRlbihlbGUpIHtcbiAgICByZXR1cm4gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnO1xufVxuQ2FzaC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgIGZvcmNlID0gZm9yY2UgIT09IHVuZGVmaW5lZCA/IGZvcmNlIDogaXNIaWRkZW4oZWxlKTtcbiAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICBlbGUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgaWYgKGlzSGlkZGVuKGVsZSkpIHtcbiAgICAgICAgICAgICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGdldERlZmF1bHREaXNwbGF5KGVsZS50YWdOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuQ2FzaC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xufTtcbkNhc2gucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUpO1xufTtcbi8vIEBvcHRpb25hbCAuL2hpZGUudHNcbi8vIEBvcHRpb25hbCAuL3Nob3cudHNcbi8vIEBvcHRpb25hbCAuL3RvZ2dsZS50c1xuZnVuY3Rpb24gaGFzTmFtZXNwYWNlcyhuczEsIG5zMikge1xuICAgIHJldHVybiAhbnMyIHx8ICFzb21lLmNhbGwobnMyLCAobnMpID0+IG5zMS5pbmRleE9mKG5zKSA8IDApO1xufVxuY29uc3QgZXZlbnRzTmFtZXNwYWNlID0gJ19fY2FzaEV2ZW50cycsIGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IgPSAnLicsIGV2ZW50c0ZvY3VzID0geyBmb2N1czogJ2ZvY3VzaW4nLCBibHVyOiAnZm9jdXNvdXQnIH0sIGV2ZW50c0hvdmVyID0geyBtb3VzZWVudGVyOiAnbW91c2VvdmVyJywgbW91c2VsZWF2ZTogJ21vdXNlb3V0JyB9LCBldmVudHNNb3VzZVJlID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcHxjbGlja3xkYmxjbGljaykvaTtcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5mdW5jdGlvbiBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lKSB7XG4gICAgcmV0dXJuIGV2ZW50c0hvdmVyW25hbWVdIHx8IGV2ZW50c0ZvY3VzW25hbWVdIHx8IG5hbWU7XG59XG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuZnVuY3Rpb24gZ2V0RXZlbnRzQ2FjaGUoZWxlKSB7XG4gICAgcmV0dXJuIGVsZVtldmVudHNOYW1lc3BhY2VdID0gKGVsZVtldmVudHNOYW1lc3BhY2VdIHx8IHt9KTtcbn1cbi8vIEByZXF1aXJlIGNvcmUvZ3VpZC50c1xuLy8gQHJlcXVpcmUgZXZlbnRzL2hlbHBlcnMvZ2V0X2V2ZW50c19jYWNoZS50c1xuZnVuY3Rpb24gYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjay5ndWlkID0gY2FsbGJhY2suZ3VpZCB8fCBjYXNoLmd1aWQrKztcbiAgICBjb25zdCBldmVudENhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcbiAgICBldmVudENhY2hlW25hbWVdID0gKGV2ZW50Q2FjaGVbbmFtZV0gfHwgW10pO1xuICAgIGV2ZW50Q2FjaGVbbmFtZV0ucHVzaChbbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrXSk7XG4gICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xufVxuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcbmZ1bmN0aW9uIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkge1xuICAgIGNvbnN0IHBhcnRzID0gZXZlbnROYW1lLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpO1xuICAgIHJldHVybiBbcGFydHNbMF0sIHBhcnRzLnNsaWNlKDEpLnNvcnQoKV07IC8vIFtuYW1lLCBuYW1lc3BhY2VbXV1cbn1cbi8vIEByZXF1aXJlIC4vZ2V0X2V2ZW50c19jYWNoZS50c1xuLy8gQHJlcXVpcmUgLi9oYXNfbmFtZXNwYWNlcy50c1xuLy8gQHJlcXVpcmUgLi9wYXJzZV9ldmVudF9uYW1lLnRzXG5mdW5jdGlvbiByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGNhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgZm9yIChuYW1lIGluIGNhY2hlKSB7XG4gICAgICAgICAgICByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGVsZVtldmVudHNOYW1lc3BhY2VdO1xuICAgIH1cbiAgICBlbHNlIGlmIChjYWNoZVtuYW1lXSkge1xuICAgICAgICBjYWNoZVtuYW1lXSA9IGNhY2hlW25hbWVdLmZpbHRlcigoW25zLCBzZWwsIGNiXSkgPT4ge1xuICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYi5ndWlkICE9PSBjYWxsYmFjay5ndWlkKSB8fCAhaGFzTmFtZXNwYWNlcyhucywgbmFtZXNwYWNlcykgfHwgKHNlbGVjdG9yICYmIHNlbGVjdG9yICE9PSBzZWwpKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgZWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgY2IpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5DYXNoLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGV2ZW50RnVsbE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVhY2goKGksIGVsZSkgPT4gcmVtb3ZlRXZlbnQoZWxlKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgICAgICAgICBzZWxlY3RvciA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIChpLCBldmVudEZ1bGxOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbbmFtZSwgbmFtZXNwYWNlc10gPSBwYXJzZUV2ZW50TmFtZShnZXRFdmVudE5hbWVCdWJibGluZyhldmVudEZ1bGxOYW1lKSk7XG4gICAgICAgICAgICB0aGlzLmVhY2goKGksIGVsZSkgPT4gcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spKTsgLy9UU0NcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbmZ1bmN0aW9uIG9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgX29uZSkge1xuICAgIGlmICghaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXZlbnRGdWxsTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5vbihrZXksIHNlbGVjdG9yLCBldmVudEZ1bGxOYW1lW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG4gICAgZWFjaChnZXRTcGxpdFZhbHVlcyhldmVudEZ1bGxOYW1lKSwgKGksIGV2ZW50RnVsbE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgW25hbWUsIG5hbWVzcGFjZXNdID0gcGFyc2VFdmVudE5hbWUoZ2V0RXZlbnROYW1lQnViYmxpbmcoZXZlbnRGdWxsTmFtZSkpO1xuICAgICAgICB0aGlzLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5uYW1lc3BhY2UgJiYgIWhhc05hbWVzcGFjZXMobmFtZXNwYWNlcywgZXZlbnQubmFtZXNwYWNlLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGxldCB0aGlzQXJnID0gZWxlO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModGFyZ2V0LCBzZWxlY3RvcikpIHsgLy9UU0NcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzQXJnID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBldmVudC5fX2RlbGVnYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Ll9fZGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnY3VycmVudFRhcmdldCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc0FyZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBldmVudCwgZXZlbnQuZGF0YSk7IC8vVFNDXG4gICAgICAgICAgICAgICAgaWYgKF9vbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7IC8vVFNDXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpbmFsQ2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrWydndWlkJ10gPSAoY2FsbGJhY2tbJ2d1aWQnXSB8fCBjYXNoLmd1aWQrKyk7IC8vVFNDXG4gICAgICAgICAgICBhZGRFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBmaW5hbENhbGxiYWNrKTsgLy9UU0NcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5DYXNoLnByb3RvdHlwZS5vbiA9IG9uO1xuZnVuY3Rpb24gb25lKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgdHJ1ZSk7IC8vVFNDXG59XG47XG5DYXNoLnByb3RvdHlwZS5vbmUgPSBvbmU7XG5DYXNoLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGNvbnN0IGZpbmFsQ2FsbGJhY2sgPSAoKSA9PiBjYWxsYmFjayhjYXNoKTtcbiAgICBpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgICAgICBzZXRUaW1lb3V0KGZpbmFsQ2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmaW5hbENhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudEZ1bGxOYW1lLCBkYXRhKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAoaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICAgICAgY29uc3QgW25hbWUsIG5hbWVzcGFjZXNdID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksIHR5cGUgPSBldmVudHNNb3VzZVJlLnRlc3QobmFtZSkgPyAnTW91c2VFdmVudHMnIDogJ0hUTUxFdmVudHMnO1xuICAgICAgICBldnQgPSBkb2MuY3JlYXRlRXZlbnQodHlwZSk7XG4gICAgICAgIGV2dC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGV2dC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBldnQgPSBldmVudEZ1bGxOYW1lO1xuICAgIH1cbiAgICBldnQuZGF0YSA9IGRhdGE7XG4gICAgY29uc3QgaXNFdmVudEZvY3VzID0gKGV2dC50eXBlIGluIGV2ZW50c0ZvY3VzKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgaWYgKGlzRXZlbnRGb2N1cyAmJiBpc0Z1bmN0aW9uKGVsZVtldnQudHlwZV0pKSB7XG4gICAgICAgICAgICBlbGVbZXZ0LnR5cGVdKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGUuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuLy8gQG9wdGlvbmFsIC4vb2ZmLnRzXG4vLyBAb3B0aW9uYWwgLi9vbi50c1xuLy8gQG9wdGlvbmFsIC4vb25lLnRzXG4vLyBAb3B0aW9uYWwgLi9yZWFkeS50c1xuLy8gQG9wdGlvbmFsIC4vdHJpZ2dlci50c1xuLy8gQHJlcXVpcmUgY29yZS9wbHVjay50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbmZ1bmN0aW9uIGdldFZhbHVlKGVsZSkge1xuICAgIGlmIChlbGUubXVsdGlwbGUpXG4gICAgICAgIHJldHVybiBwbHVjayhmaWx0ZXIuY2FsbChlbGUub3B0aW9ucywgb3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCksICd2YWx1ZScpO1xuICAgIHJldHVybiBlbGUudmFsdWUgfHwgJyc7XG59XG5jb25zdCBxdWVyeUVuY29kZVNwYWNlUmUgPSAvJTIwL2c7XG5mdW5jdGlvbiBxdWVyeUVuY29kZShwcm9wLCB2YWx1ZSkge1xuICAgIHJldHVybiBgJiR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkucmVwbGFjZShxdWVyeUVuY29kZVNwYWNlUmUsICcrJyl9YDtcbn1cbi8vIEByZXF1aXJlIGNvcmUvY2FzaC50c1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcudHNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9nZXRfdmFsdWUudHNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9xdWVyeV9lbmNvZGUudHNcbmNvbnN0IHNraXBwYWJsZVJlID0gL2ZpbGV8cmVzZXR8c3VibWl0fGJ1dHRvbnxpbWFnZS9pLCBjaGVja2FibGVSZSA9IC9yYWRpb3xjaGVja2JveC9pO1xuQ2FzaC5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBxdWVyeSA9ICcnO1xuICAgIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgIGVhY2goZWxlLmVsZW1lbnRzIHx8IFtlbGVdLCAoaSwgZWxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlLmRpc2FibGVkIHx8ICFlbGUubmFtZSB8fCBlbGUudGFnTmFtZSA9PT0gJ0ZJRUxEU0VUJyB8fCBza2lwcGFibGVSZS50ZXN0KGVsZS50eXBlKSB8fCAoY2hlY2thYmxlUmUudGVzdChlbGUudHlwZSkgJiYgIWVsZS5jaGVja2VkKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKGVsZSk7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgICAgIGVhY2godmFsdWVzLCAoaSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBxdWVyeUVuY29kZShlbGUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBxdWVyeS5zdWJzdHIoMSk7XG59O1xuZnVuY3Rpb24gdmFsKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzWzBdICYmIGdldFZhbHVlKHRoaXNbMF0pO1xuICAgIHJldHVybiB0aGlzLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBpZiAoZWxlLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVWYWx1ZSA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiAodmFsdWUgPT09IG51bGwgPyBbXSA6IFt2YWx1ZV0pO1xuICAgICAgICAgICAgZWFjaChlbGUub3B0aW9ucywgKGksIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGVsZVZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGUudmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCA/ICcnIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbkNhc2gucHJvdG90eXBlLnZhbCA9IHZhbDtcbkNhc2gucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcCgoaSwgZWxlKSA9PiBlbGUuY2xvbmVOb2RlKHRydWUpKTtcbn07XG5DYXNoLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgIGlmIChlbGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9nZXQudHNcbi8vIEByZXF1aXJlIG1hbmlwdWxhdGlvbi9kZXRhY2gudHNcbmNvbnN0IGZyYWdtZW50UmUgPSAvXlxccyo8KFxcdyspW14+XSo+Lywgc2luZ2xlVGFnUmUgPSAvXlxccyo8KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT4pP1xccyokLztcbmxldCBjb250YWluZXJzO1xuZnVuY3Rpb24gaW5pdENvbnRhaW5lcnMoKSB7XG4gICAgaWYgKGNvbnRhaW5lcnMpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCB0YWJsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0YWJsZScpLCB0ciA9IGRvYy5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgIGNvbnRhaW5lcnMgPSB7XG4gICAgICAgICcqJzogZGl2LFxuICAgICAgICB0cjogZG9jLmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JyksXG4gICAgICAgIHRkOiB0cixcbiAgICAgICAgdGg6IHRyLFxuICAgICAgICB0aGVhZDogdGFibGUsXG4gICAgICAgIHRib2R5OiB0YWJsZSxcbiAgICAgICAgdGZvb3Q6IHRhYmxlLFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIGluaXRDb250YWluZXJzKCk7XG4gICAgaWYgKCFpc1N0cmluZyhodG1sKSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGlmIChzaW5nbGVUYWdSZS50ZXN0KGh0bWwpKVxuICAgICAgICByZXR1cm4gW2RvYy5jcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSldO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZnJhZ21lbnRSZS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMSwgY29udGFpbmVyID0gY29udGFpbmVyc1tmcmFnbWVudF0gfHwgY29udGFpbmVyc1snKiddO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiBjYXNoKGNvbnRhaW5lci5jaGlsZE5vZGVzKS5kZXRhY2goKS5nZXQoKTtcbn1cbmNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuQ2FzaC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgIHdoaWxlIChlbGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxlLnJlbW92ZUNoaWxkKGVsZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmZ1bmN0aW9uIGh0bWwoaHRtbCkge1xuICAgIGlmIChodG1sID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzWzBdICYmIHRoaXNbMF0uaW5uZXJIVE1MO1xuICAgIHJldHVybiB0aGlzLmVhY2goKGksIGVsZSkgPT4geyBlbGUuaW5uZXJIVE1MID0gaHRtbDsgfSk7XG59XG5DYXNoLnByb3RvdHlwZS5odG1sID0gaHRtbDtcbkNhc2gucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXRhY2goKS5vZmYoKTtcbn07XG5mdW5jdGlvbiB0ZXh0KHRleHQpIHtcbiAgICBpZiAodGV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpc1swXSA/IHRoaXNbMF0udGV4dENvbnRlbnQgOiAnJztcbiAgICByZXR1cm4gdGhpcy5lYWNoKChpLCBlbGUpID0+IHsgZWxlLnRleHRDb250ZW50ID0gdGV4dDsgfSk7XG59XG47XG5DYXNoLnByb3RvdHlwZS50ZXh0ID0gdGV4dDtcbkNhc2gucHJvdG90eXBlLnVud3JhcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBhcmVudCgpLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBjb25zdCAkZWxlID0gY2FzaChlbGUpO1xuICAgICAgICAkZWxlLnJlcGxhY2VXaXRoKCRlbGUuY2hpbGRyZW4oKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuY29uc3QgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbkNhc2gucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBlbGUgPSB0aGlzWzBdO1xuICAgIGlmICghZWxlKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcmVjdCA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlLmNsaWVudFRvcCxcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlLmNsaWVudExlZnRcbiAgICB9O1xufTtcbkNhc2gucHJvdG90eXBlLm9mZnNldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FzaCh0aGlzWzBdICYmIHRoaXNbMF0ub2Zmc2V0UGFyZW50KTtcbn07XG5DYXNoLnByb3RvdHlwZS5wb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBlbGUgPSB0aGlzWzBdO1xuICAgIGlmICghZWxlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogZWxlLm9mZnNldExlZnQsXG4gICAgICAgIHRvcDogZWxlLm9mZnNldFRvcFxuICAgIH07XG59O1xuQ2FzaC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHRoaXMuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgIHB1c2guYXBwbHkocmVzdWx0LCBlbGUuY2hpbGRyZW4pO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShyZXN1bHQpKSwgY29tcGFyYXRvcik7XG59O1xuQ2FzaC5wcm90b3R5cGUuY29udGVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgdGhpcy5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgcHVzaC5hcHBseShyZXN1bHQsIGVsZS50YWdOYW1lID09PSAnSUZSQU1FJyA/IFtlbGUuY29udGVudERvY3VtZW50XSA6IGVsZS5jaGlsZE5vZGVzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2FzaCh1bmlxdWUocmVzdWx0KSk7XG59O1xuQ2FzaC5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBmaW5kKHNlbGVjdG9yLCB0aGlzW2ldKTtcbiAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCkge1xuICAgICAgICAgICAgcHVzaC5hcHBseShyZXN1bHQsIGZvdW5kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FzaCh1bmlxdWUocmVzdWx0KSk7XG59O1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9maWx0ZXIudHNcbi8vIEByZXF1aXJlIHRyYXZlcnNhbC9maW5kLnRzXG5jb25zdCBzY3JpcHRUeXBlUmUgPSAvXiR8Xm1vZHVsZSR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pLCBIVE1MQ0RBVEFSZSA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcbmZ1bmN0aW9uIGV2YWxTY3JpcHRzKG5vZGUpIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY2FzaChub2RlKTtcbiAgICBjb2xsZWN0aW9uLmZpbHRlcignc2NyaXB0JykuYWRkKGNvbGxlY3Rpb24uZmluZCgnc2NyaXB0JykpLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBpZiAoIWVsZS5zcmMgJiYgc2NyaXB0VHlwZVJlLnRlc3QoZWxlLnR5cGUpKSB7IC8vIFRoZSBzY3JpcHQgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgIGlmIChlbGUub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWxlKSkgeyAvLyBUaGUgZWxlbWVudCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NIC8vIFVzaW5nIGBkb2N1bWVudEVsZW1lbnRgIGZvciBicm9hZGVyIGJyb3dzZXIgc3VwcG9ydFxuICAgICAgICAgICAgICAgIGV2YWwoZWxlLnRleHRDb250ZW50LnJlcGxhY2UoSFRNTENEQVRBUmUsICcnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIEByZXF1aXJlIC4vZXZhbF9zY3JpcHRzLnRzXG5mdW5jdGlvbiBpbnNlcnRFbGVtZW50KGFuY2hvciwgY2hpbGQsIHByZXBlbmQsIHByZXBlbmRUYXJnZXQpIHtcbiAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBhbmNob3IuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwcmVwZW5kVGFyZ2V0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFuY2hvci5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIGV2YWxTY3JpcHRzKGNoaWxkKTtcbn1cbi8vIEByZXF1aXJlIGNvcmUvZWFjaC50c1xuLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSAuL2luc2VydF9lbGVtZW50LnRzXG5mdW5jdGlvbiBpbnNlcnRDb250ZW50KHBhcmVudCwgY2hpbGQsIHByZXBlbmQpIHtcbiAgICBlYWNoKHBhcmVudCwgKGluZGV4LCBwYXJlbnRFbGUpID0+IHtcbiAgICAgICAgZWFjaChjaGlsZCwgKGksIGNoaWxkRWxlKSA9PiB7XG4gICAgICAgICAgICBpbnNlcnRFbGVtZW50KHBhcmVudEVsZSwgIWluZGV4ID8gY2hpbGRFbGUgOiBjaGlsZEVsZS5jbG9uZU5vZGUodHJ1ZSksIHByZXBlbmQsIHByZXBlbmQgJiYgcGFyZW50RWxlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbkNhc2gucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBlYWNoKGFyZ3VtZW50cywgKGksIHNlbGVjdG9yKSA9PiB7XG4gICAgICAgIGluc2VydENvbnRlbnQodGhpcywgY2FzaChzZWxlY3RvcikpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNhc2gucHJvdG90eXBlLmFwcGVuZFRvID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgaW5zZXJ0Q29udGVudChjYXNoKHNlbGVjdG9yKSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUuaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICBjYXNoKHNlbGVjdG9yKS5lYWNoKChpbmRleCwgZWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGVsZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVhY2goKGksIGUpID0+IHtcbiAgICAgICAgICAgICAgICBpbnNlcnRFbGVtZW50KHBhcmVudCwgIWluZGV4ID8gZSA6IGUuY2xvbmVOb2RlKHRydWUpLCB0cnVlLCBlbGUubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5DYXNoLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBlYWNoKHJldmVyc2UuYXBwbHkoYXJndW1lbnRzKSwgKGksIHNlbGVjdG9yKSA9PiB7XG4gICAgICAgIHJldmVyc2UuYXBwbHkoY2FzaChzZWxlY3Rvcikuc2xpY2UoKSkuaW5zZXJ0QWZ0ZXIodGhpcyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgY2FzaChzZWxlY3RvcikuZWFjaCgoaW5kZXgsIGVsZSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBlbGUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5lYWNoKChpLCBlKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0RWxlbWVudChwYXJlbnQsICFpbmRleCA/IGUgOiBlLmNsb25lTm9kZSh0cnVlKSwgdHJ1ZSwgZWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24gKCkge1xuICAgIGVhY2goYXJndW1lbnRzLCAoaSwgc2VsZWN0b3IpID0+IHtcbiAgICAgICAgY2FzaChzZWxlY3RvcikuaW5zZXJ0QmVmb3JlKHRoaXMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNhc2gucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZWFjaChhcmd1bWVudHMsIChpLCBzZWxlY3RvcikgPT4ge1xuICAgICAgICBpbnNlcnRDb250ZW50KHRoaXMsIGNhc2goc2VsZWN0b3IpLCB0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5DYXNoLnByb3RvdHlwZS5wcmVwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICBpbnNlcnRDb250ZW50KGNhc2goc2VsZWN0b3IpLCByZXZlcnNlLmFwcGx5KHRoaXMuc2xpY2UoKSksIHRydWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkNhc2gucHJvdG90eXBlLnJlcGxhY2VXaXRoID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVmb3JlKHNlbGVjdG9yKS5yZW1vdmUoKTtcbn07XG5DYXNoLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgY2FzaChzZWxlY3RvcikucmVwbGFjZVdpdGgodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUud3JhcEFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IGNhc2goc2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmZpcnN0KCkuYmVmb3JlKHN0cnVjdHVyZSk7XG4gICAgICAgIGxldCB3cmFwcGVyID0gc3RydWN0dXJlWzBdO1xuICAgICAgICB3aGlsZSAod3JhcHBlci5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgICAgICB3cmFwcGVyID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgdGhpcy5hcHBlbmRUbyh3cmFwcGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuQ2FzaC5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmVhY2goKGluZGV4LCBlbGUpID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGNhc2goc2VsZWN0b3IpWzBdO1xuICAgICAgICBjYXNoKGVsZSkud3JhcEFsbCghaW5kZXggPyB3cmFwcGVyIDogd3JhcHBlci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH0pO1xufTtcbkNhc2gucHJvdG90eXBlLndyYXBJbm5lciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBjb25zdCAkZWxlID0gY2FzaChlbGUpLCBjb250ZW50cyA9ICRlbGUuY29udGVudHMoKTtcbiAgICAgICAgY29udGVudHMubGVuZ3RoID8gY29udGVudHMud3JhcEFsbChzZWxlY3RvcikgOiAkZWxlLmFwcGVuZChzZWxlY3Rvcik7XG4gICAgfSk7XG59O1xuQ2FzaC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgY29tcGFyYXRvciA9IGlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IChpLCBlbGUpID0+ICEhZmluZChzZWxlY3RvciwgZWxlKS5sZW5ndGhcbiAgICAgICAgOiAoaSwgZWxlKSA9PiBlbGUuY29udGFpbnMoc2VsZWN0b3IpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbn07XG5DYXNoLnByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgaWYgKCFjb21wYXJhdG9yIHx8ICF0aGlzWzBdKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICB0aGlzLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBjaGVjayA9IGNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gICAgICAgIHJldHVybiAhY2hlY2s7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoZWNrO1xufTtcbkNhc2gucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX2FsbCkge1xuICAgIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAnbmV4dEVsZW1lbnRTaWJsaW5nJywgX2FsbCkpKSwgY29tcGFyYXRvcik7XG59O1xuQ2FzaC5wcm90b3R5cGUubmV4dEFsbCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMubmV4dChjb21wYXJhdG9yLCB0cnVlKTtcbn07XG5DYXNoLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICAgIGlmICghY29tcGFyYXRvciB8fCAhdGhpc1swXSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGksIGVsZSkgPT4gIWNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSkpO1xufTtcbkNhc2gucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwYXJlbnROb2RlJykpKSwgY29tcGFyYXRvcik7XG59O1xuQ2FzaC5wcm90b3R5cGUuaW5kZXggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBjaGlsZCA9IHNlbGVjdG9yID8gY2FzaChzZWxlY3RvcilbMF0gOiB0aGlzWzBdLCBjb2xsZWN0aW9uID0gc2VsZWN0b3IgPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgICByZXR1cm4gaW5kZXhPZi5jYWxsKGNvbGxlY3Rpb24sIGNoaWxkKTtcbn07XG5DYXNoLnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICBpZiAoIWNvbXBhcmF0b3IgfHwgIXRoaXNbMF0pXG4gICAgICAgIHJldHVybiBjYXNoKCk7XG4gICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2xvc2VzdChjb21wYXJhdG9yKTtcbn07XG5DYXNoLnByb3RvdHlwZS5wYXJlbnRzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3BhcmVudEVsZW1lbnQnLCB0cnVlKSkpLCBjb21wYXJhdG9yKTtcbn07XG5DYXNoLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF9hbGwpIHtcbiAgICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLCBfYWxsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5DYXNoLnByb3RvdHlwZS5wcmV2QWxsID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcbkNhc2gucHJvdG90eXBlLnNpYmxpbmdzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICB0aGlzLmVhY2goKGksIGVsZSkgPT4ge1xuICAgICAgICBwdXNoLmFwcGx5KHJlc3VsdCwgY2FzaChlbGUpLnBhcmVudCgpLmNoaWxkcmVuKChjaSwgY2hpbGQpID0+IGNoaWxkICE9PSBlbGUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocmVzdWx0KSksIGNvbXBhcmF0b3IpO1xufTtcbi8vIEBvcHRpb25hbCAuL2NoaWxkcmVuLnRzXG4vLyBAb3B0aW9uYWwgLi9jbG9zZXN0LnRzXG4vLyBAb3B0aW9uYWwgLi9jb250ZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vZmluZC50c1xuLy8gQG9wdGlvbmFsIC4vaGFzLnRzXG4vLyBAb3B0aW9uYWwgLi9pcy50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dC50c1xuLy8gQG9wdGlvbmFsIC4vbm90LnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnQudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudHMudHNcbi8vIEBvcHRpb25hbCAuL3ByZXYudHNcbi8vIEBvcHRpb25hbCAuL3NpYmxpbmdzLnRzXG4vLyBAb3B0aW9uYWwgYXR0cmlidXRlcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNvbGxlY3Rpb24vaW5kZXgudHNcbi8vIEBvcHRpb25hbCBjc3MvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkYXRhL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZGltZW5zaW9ucy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGVmZmVjdHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBldmVudHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBmb3Jtcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG1hbmlwdWxhdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG9mZnNldC9pbmRleC50c1xuLy8gQG9wdGlvbmFsIHRyYXZlcnNhbC9pbmRleC50c1xuLy8gQHJlcXVpcmUgY29yZS9pbmRleC50c1xuLy8gQHByaW9yaXR5IC0xMDBcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuZXhwb3J0IGRlZmF1bHQgY2FzaDtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==