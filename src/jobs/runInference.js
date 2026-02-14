"use strict";

const path = require("path");
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http"));
const {readFile} = require("fs/promises");


module.exports = async function ({prompt}) {

    try {
        const systemInstruction = await readFile(path.resolve(process.cwd(), "prompts", "system.md"), {encoding: "utf-8"});
        const url = "/v1/chat/completions";

        const {data} = await httpDriver({
            method: "post",
            url: url,
            data: {
                "model": "openai/gpt-oss-120b",
                "messages": [
                    {"role": "system", "content": systemInstruction},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0
            }
        });

        return data.choices[0].message;
    } catch (error) {
        return error.response;
    }
}
