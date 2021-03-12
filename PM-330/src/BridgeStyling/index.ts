// https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply

// import tailwind from './tailwind.json';
// import sharedRules from './shared.scss';

let tailwind = [];

let style: HTMLStyleElement = undefined;
let styleCounter = 100;
let cache: any = {};
let myContextValue = {};
let myContext = null;
let cachedFuncs: any = {};
let classNameDict: any = {};

interface CachedFunc {
    rules: CachedRule[];
    func: any;
}

interface CachedRule {
    dependencies: any[];
    className: any;
}

let removeComments = (css: string) => {
    css = css || "";
    let re = /\/\*(.|[\r\n])*?\*\//;
    return css.replace(re, "");
}


let makeRule = (rules) => {
    return rules.reduce((acc, current) => {
        acc += current.key + ":" + current.value + ";\r\n"
        return acc;
    }, "")
}

let _tailwindDict = undefined;
let getTailwind = () => {
    if (!_tailwindDict) {
        _tailwindDict = tailwind.reduce( (acc, current) => {
            acc[current.classSelector] = makeRule(current.rules);
            return acc;
        }, {});
    }
    return _tailwindDict;
}

let init = () => {

    console.log("init2");


    console.log("init3");

    myContext = React.createContext(myContextValue)
    style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

let _createRuleset = (className: string, _css: string, props: any = undefined) => {

    // remove comments from css, if any
    _css = removeComments(_css);
    // console.log("fix style", css, props);

    // make sure props is declared
    props = props ?? {};

    // replace the selector with a new name
    let css = "";
    if (_css.startsWith("*")) {
        css = _css.substring(1);
        console.error("not supported");
    } else {
        css = _css.split(".component").join("." + className);
    }

    let extendedCss = evaluateExtend(css);

    let ruleset = evaluateProps(extendedCss, props);
    return ruleset;
}

let sharedRules = "";

const getSharedRuleset = (className:string) => {
    let css = sharedRules;
    let newCss = _createRuleset(className, css);
    // xxxxxx
    return "";
}

const getExtendedStyle = (name:string) => {

    if (name.startsWith(".")) {
        name = name.slice(1);
    }

    console.log("getExtendedStyle", name);

    let tailwindDict = getTailwind();
    if (tailwindDict[name]) {
        return tailwindDict[name];
    }

    let sharedRules = getSharedRuleset(name);
    if (sharedRules) {
        return sharedRules;
    }

    return "";
}

const evaluateExtend = (css: string) => {
    console.log("---------------------");
    let result = css;
    let r = null;
    // let re = /^\s*\@extend\s+(.+?);/;
    let re = /^\s*\@extend\s+(.+?);\s*$/m;
    while ((r = re.exec(result)) !== null) {
        const str = r[0];
        const key = r[1];
        
        const extendParts = key.split(",").map(s => s.trim());

        console.log("found1:" + str);
        console.log("found2", key);
        console.log("parts", extendParts);
        const value = extendParts.map(name => getExtendedStyle(name)).join("\r");

        result = result.replace(str, value);
    }
    console.log("result", result);
    return result;
}


const evaluateProps = (css: string, props: any) => {
    let result = css;
    let r = null;
    let re = /≤(.*?)≥/;
    while ((r = re.exec(result)) !== null) {
        const str = r[0];
        const key = r[1];
        const value = props[key];
        result = result.replace(str, value);
        // console.log("r",r);
        // debugger;
    }
    // console.log("result", result);
    return result;
}

let insertCss = (css: string) => {
    if (!style) {
        init();
    }
    // console.log("insert rule", css);
    // css = "aaaaa\r\n. { sfkj\r\n\r\nkfdsf } skjhfhd\r\nshasd sa sa dsa. adasdasdsa { dsasd sadsad } "
    let r = null;
    let re = /(\..*?})/sg;
    while ((r = re.exec(css)) !== null) {
        const str = r[0];
        // console.log("insert rule result", str);
        style.sheet.insertRule(str, 0);
    }
}

let createStyle = (name: string, css: string, props: any = null) => {
    debugger;
    if (!style) {
        init();
    }
    if (cache[name]) {
        return cache[name];
    }
    styleCounter++;
    let className = "BS_" + styleCounter;
    style.sheet.insertRule(_createRuleset(className, css, props), 0);
    cache[name] = className;
    return className;
}
let useNamedStyle = (name:string, css: string, func: any = null, dependencies: any[] = null) => {
    return useStyleInternal(name, css, func, dependencies);
}

let useStyle = (css: string, func: any = null, dependencies: any[] = null) => {
    return useStyleInternal(undefined, css, func, dependencies);
}

let replaceVariables = (css:string) => {

    var myregexp = /^(\$.+?):(.+?);/m;
    var match = myregexp.exec(css);
    while (match != null) {
        console.log("replaceVariables", match[0]);
        let variableName = match[1];
        let variableValue = match[2];
        css = css.replace(match[0], "");
        css = css.replaceAll(variableName, variableValue);
	    match = myregexp.exec(css);
    }

    console.log("hejsan");
    return css;
}
let useStyleInternal = (name:string,css: string, func: any = null, dependencies: any[] = null) => {
    dependencies = dependencies || [];
    dependencies = [css, ...dependencies];

    func = func || (() => ({}));
    css = css || "";
    css = replaceVariables(css);

    let dict = classNameDict;
    let prevDict = undefined;
    let currentDependency = undefined;
    for (let t = 0; t < dependencies.length; t++) {
        currentDependency = dependencies[t];
        let nextDict = dict[currentDependency];
        if (!nextDict) {
            nextDict = {};
            if (!dict) {
                debugger;
            }
            dict[currentDependency] = nextDict;
        }
        prevDict = dict;
        dict = nextDict;
    }

    if (typeof dict == "string") {
        return dict;
    } else {
        styleCounter++;
        let className = name || "BS_" + styleCounter;
        const props = func ? func() : {};
        let newCss = _createRuleset(className, css, props);
        insertCss(newCss);
        prevDict[currentDependency] = className;
        return className;
    }
}

let useStyle2 = (css: string, func: any, dependencies: any[]) => {
    dependencies = dependencies || [];
    func = func || (() => ({}));
    css = css || "";

    let funcItem: CachedFunc = cachedFuncs[func];

    if (!funcItem) {
        funcItem = {
            rules: [],
            func: func
        };
        cachedFuncs[func] = funcItem;
    } else {
        // console.log("are they the same1", func === funcItem.func );
        // console.log("are they the same2", func == funcItem.func );
        // debugger;
    }

    for (var t = 0; t < funcItem.rules.length; t++) {
        const rule = funcItem.rules[t];
        let fail = false;
        if (!(dependencies.length == 0 && rule.dependencies.length == 0)) {
            for (var tt = 0; tt < rule.dependencies.length; tt++) {
                if (rule.dependencies[tt] != dependencies[tt]) {
                    fail = true;
                    break;
                }
            }
        }
        if (!fail) {
            console.log("found");
            return rule.className;
        }
    }

    console.log("did not find");

    styleCounter++;
    let className = "BS_" + styleCounter;
    const props = func();
    let newCss = _createRuleset(className, css, props);

    insertCss(newCss);
    // style.sheet.insertRule(newCss, 0);

    funcItem.rules.push({
        className: className,
        dependencies: [...dependencies]
    });

    return className;
}

let useStyleOld = (css: string, props: any, dep: any) => {
    if (!style) {
        init();
    }
    let rule = React.useMemo(() => {
        console.log("creating style", dep);
        styleCounter++;
        let className = "BS_" + styleCounter;
        style.sheet.insertRule(_createRuleset(className, css, props), 0);
        console.log("created style", rule);
    }, [...dep]);
    // }, [...dep]);
    return rule;
}

let loadStyle = (styleName:string) : Promise<string> => {
    return new Promise(resolve => {
        fetch(styleName).then((response) => {
            return response.text()
        }).then((txt) => {
            resolve(txt);
        }).catch(() => alert("Load style error"));
    })
}

let useStyleConstants = () => ({
    SELECTED: "62a657c10ce9",
    ACTIVE: "f40fa0d98b03",
    INACTIVE: "5adc56a0e823",
    EMPTY: "",
    NONE: "",
})

var BridgeStyling = {
       loadStyle: loadStyle,
        useStyle: useStyle,
        cssClassName: {},
        useStyleConstants: useStyleConstants,
        useNamedStyle : useNamedStyle,
};

window["BridgeStyling"] = BridgeStyling;

