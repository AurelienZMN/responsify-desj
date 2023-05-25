/* build/plugin.js 1.0.0 */
(function(exports){

'use strict';

var VERSION = "1.0.0", DEBUG = false;
var global=void 0!==global?global:"undefined"!=typeof window?window:this;function _stackTrace(cons){const x={stack:""};if(Error.captureStackTrace){Error.captureStackTrace(x,cons);const p=x.stack.indexOf("\n");if(-1!=p)return x.stack.substr(p+1)}return x.stack}function _parseStackFrame(sf){let m=/^\s*at\s+([^\s]+)\s+\((?:.+\/(src\/[^\:]+)|([^\:]+))\:(\d+)\:(\d+)\)$/.exec(sf);return m?{func:m[1],file:m[2]||m[3],line:parseInt(m[4]),col:parseInt(m[5])}:null}function panic(msg){if(console.error.apply(console,["panic:",msg].concat(Array.prototype.slice.call(arguments,1))),"undefined"==typeof process){let e=new Error(msg);throw e.name="Panic",e}console.error(_stackTrace(panic)),process.exit(2)}function print(){console.log.apply(console,Array.prototype.slice.call(arguments))}const dlog=()=>{};function assert(){}function repr(obj){try{return JSON.stringify(obj,null,2)}catch(_){return String(obj)}}


const iPhoneSE = [
    { name: "iPhone SE", width: 320, height: 568 },
    { name: 'iPhone SE" Landsape', width: 568, height: 320 },
];
const iPhone8 = [
    { name: "iPhone 8", width: 375, height: 667 },
    { name: "iPhone 8 plus", width: 414, height: 736 },
    { name: 'iPhone 8 plus" Landsape', width: 736, height: 414 },
];
const iPhone13 = [{ name: "iPhone 13", width: 390, height: 844 }];
const iPhone14 = [{ name: "iPhone 14 pro Max", width: 430, height: 932 }];
const androidPixel = [{ name: "Google Pixel", width: 411, height: 731 }];
const androidGenerique = [{ name: "Generic Android", width: 360, height: 640 }];
const androidSamsungS20 = [{ name: "Samsung S20", width: 412, height: 915 }];
const iPad = [
    { name: 'iPad Mini/iPad 9.7" Portrait', width: 768, height: 1024 },
    { name: 'iPad Mini/iPad 9.7" Landsape', width: 1024, height: 768 },
];
var deviceSizes = {
    iPhoneSE,
    iPhone8,
    iPhone13,
    iPhone14,
    androidPixel,
    androidGenerique,
    androidSamsungS20,
    iPad,
};

function place(frame, props) {
    const { selectedNode, device, devices, index } = props;
    const startPos = selectedNode.x + selectedNode.width + 100;
    frame.resize(device.width, device.height);
    frame.name = device.name;
    const widthOfAllPreviousFramesPlusGaps = devices
        .slice(0, index)
        .reduce((acc, curr) => acc += curr.width + 100, startPos);
    let x = widthOfAllPreviousFramesPlusGaps;
    frame.x = x;
    frame.y = selectedNode.y;
    return frame;
}
function createAndPlace(props) {
    const { selectedNode } = props;
    if (selectedNode.type === 'FRAME') {
        const frame = figma.createFrame();
        place(frame, props);
        return frame;
    }
    if (selectedNode.type === 'COMPONENT') {
        const instance = selectedNode.createInstance();
        place(instance, props);
        return instance;
    }
    if (selectedNode.type === 'INSTANCE') {
        const instance = selectedNode.clone();
        place(instance, props);
        return instance;
    }
}

const { command, currentPage, closePlugin } = figma;
const { selection } = currentPage;
const all = [...Object.keys(deviceSizes).map((key) => deviceSizes[key])];
const devices = command === "all"
    ?
        [].concat.apply([], all)
    : deviceSizes[command];
function hasValidSelection(nodes) {
    const oneSelected = nodes.length === 1;
    if (!oneSelected)
        return false;
    const frameTypes = ["FRAME", "COMPONENT", "INSTANCE"];
    const isFrame = frameTypes.indexOf(nodes[0].type) >= 0;
    return isFrame;
}
function main(nodes) {
    if (!hasValidSelection(selection)) {
        return Promise.resolve("Select a single frame to test responsive sizes");
    }
    const selectedNode = nodes[0];
    function generateContainerFrames() {
        let frames = [];
        for (let [index, device] of devices.entries()) {
            frames.push(createAndPlace({ device, devices, index, selectedNode }));
        }
        return frames;
    }
    function insertSelectionAndResizeIntoContainerFrames(containerFrames) {
        for (let container of containerFrames) {
            let width = container.width;
            let xPosition = 0;
            if (container.name === 'iPad Mini/iPad 9.7" Portrait' ||
                container.name === 'iPad Mini/iPad 9.7" Landsape') {
                width = 600;
                xPosition = (container.width - 600) / 2;
            }
            const clone = selectedNode.clone();
            clone.x = xPosition;
            clone.y = 0;
            clone.resize(width, container.height);
            container.appendChild(clone);
        }
    }
    const containerFrames = generateContainerFrames();
    if (selectedNode.type === "FRAME") {
        insertSelectionAndResizeIntoContainerFrames(containerFrames);
    }
    figma.currentPage.selection = containerFrames;
    figma.viewport.scrollAndZoomIntoView(containerFrames);
    return Promise.resolve("Responsified ⚡️");
}
main(selection).then((msg) => closePlugin(msg));
})(typeof exports != "undefined" ? exports : (typeof global != "undefined" ? global : typeof self != "undefined" ? self : this)["src/plugin"] = {});

//#sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQucGx1Z2luLmpzLm1hcCIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NpemVzLnRzIiwiLi4vLi4vc3JjL2NyZWF0ZUFuZFBsYWNlLnRzIiwiLi4vLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRztJQUNmLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0NBQ3pELENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRztJQUNkLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDN0MsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNsRCxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDN0QsQ0FBQztBQU1GLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDbEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDekUsTUFBTSxnQkFBZ0Is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
