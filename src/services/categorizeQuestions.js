"use strict"

const path = require("path");
const {readFile, writeFile} = require("fs/promises");
const getQuestionsJob = require(path.resolve(process.cwd(), "src", "jobs", "getQuestions"));
const runInferenceJob = require(path.resolve(process.cwd(), "src", "jobs", "runInference"));
const buildPromptJob = require(path.resolve(process.cwd(), "src", "jobs", "buildPrompt"));
const categorizationsFile = path.resolve(process.cwd(), "output", "categorizations", "run05", "final.json");

module.exports = async function categorizeQuestions () {

    const questions = await getQuestionsJob();


    for (let i = 0; i < questions.length; i += 1) {
        const question = questions[i];
        let categorizations;
        try {
            categorizations = await readFile(categorizationsFile, {encoding: "utf-8"});
        } catch (e) {
            categorizations = "{}";
            await writeFile(categorizationsFile, categorizations);
        }

        const iterationCounter = i;

        console.log("iterationCounter: ", iterationCounter);
        const prompt = buildPromptJob({question, categorizations, iterationCounter});

        const {content} = await runInferenceJob({prompt});


        if (content !=="NO CHANGES") {
            try {
                const p = JSON.parse(content);
                console.log("keys counter: ", p.categories.length);
            } catch (e) {
                console.log(e);
            }
            await writeFile(categorizationsFile, content);
        }


        // console.log(content);
    }
    console.log(questions)



};
