"use strict"

const path = require("path");
const tools = require(path.resolve(process.cwd(), "src", "agent", "tolls", "index.js"));


module.exports = async function executeTools (name, args) {

    const tool = tools[name];
    if (!tool) {
        return "This tool does not exist.";
    }

    const execute = tool.execute;
    if (!execute) {
        return "This tool does not have execute function."
    }

    const result = await execute(args, {
        toolCallIs: "",
        messages: []
    })

    return result;

}
