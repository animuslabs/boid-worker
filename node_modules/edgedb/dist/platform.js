"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchConfigDir = exports.isWindows = void 0;
const adapter_node_1 = require("./adapter.node");
exports.isWindows = process.platform === "win32";
let _configDir;
if (process.platform === "darwin") {
    _configDir = () => {
        return adapter_node_1.path.join((0, adapter_node_1.homeDir)(), "Library", "Application Support", "edgedb");
    };
}
else if (process.platform === "win32") {
    _configDir = () => {
        var _a;
        const localAppDataDir = (_a = process.env.LOCALAPPDATA) !== null && _a !== void 0 ? _a : adapter_node_1.path.join((0, adapter_node_1.homeDir)(), "AppData", "Local");
        return adapter_node_1.path.join(localAppDataDir, "EdgeDB", "config");
    };
}
else {
    _configDir = () => {
        let xdgConfigDir = process.env.XDG_CONFIG_HOME;
        if (!xdgConfigDir || !adapter_node_1.path.isAbsolute(xdgConfigDir)) {
            xdgConfigDir = adapter_node_1.path.join((0, adapter_node_1.homeDir)(), ".config");
        }
        return adapter_node_1.path.join(xdgConfigDir, "edgedb");
    };
}
async function searchConfigDir(...configPath) {
    const filePath = adapter_node_1.path.join(_configDir(), ...configPath);
    if (await (0, adapter_node_1.exists)(filePath)) {
        return filePath;
    }
    const fallbackPath = adapter_node_1.path.join((0, adapter_node_1.homeDir)(), ".edgedb", ...configPath);
    if (await (0, adapter_node_1.exists)(fallbackPath)) {
        return fallbackPath;
    }
    return filePath;
}
exports.searchConfigDir = searchConfigDir;
