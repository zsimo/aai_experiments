"use strict";


const path = require("path");
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http"));
const categorizeQuestionsService = require(path.resolve(process.cwd(), "src", "services", "categorizeQuestions"));

async function main () {


    // const {data} = await httpDriver({
    //     method: "post",
    //     url: "/v1/chat/completions",
    //     data: {
    //         "model": "openai/gpt-oss-120b",
    //         "messages": [
    //             {
    //                 "role": "user",
    //                 "content": "hello, write me nodejs hello"
    //             }
    //         ],
    //         "temperature": 0,
    //         "max_tokens": 200
    //     }
    // });
    //
    // console.log(data.choices[0].message);


    await categorizeQuestionsService();

}


main();

