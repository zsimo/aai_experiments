"use strict";

const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));
const {readdir, readFile} = require("fs/promises");
const baseDir =  path.resolve(config.AI_REPO_DIR, "fixtures", "text_to_sql", "dataset", "default");

async function _readDirAbsolutePath (directoryPath) {
    const items = await readdir(directoryPath);
    return items.map(function (item) {
        return path.resolve(process.cwd(), directoryPath, item)
    });
}


async function _getQuestionsForDir (dir) {

    let customPrompts = [];
    try {
        // try to get all files in the prompts directory (if any)
        const promptsInnerDirectory = path.resolve(dir, "prompts")
        const files = await readdir(promptsInnerDirectory);
        customPrompts = files.map(function (prompt) {
            return path.resolve(promptsInnerDirectory, prompt)
        });
    } catch (e) {}

    return customPrompts;
};

module.exports = async function () {

        const dirs = await _readDirAbsolutePath(baseDir);
        const questions = [];
        for (const dir of dirs) {
            const questionsDir = await _getQuestionsForDir(dir);
            for (const questionDir of questionsDir) {
                const question = await readFile(path.resolve(questionDir), {encoding: "utf-8"});
                questions.push(question);
            }
        }

        return questions;
}
