"use strict";

module.exports = function buildPrompt ({question, categorizations, iterationCounter}) {

return`
# User question categorization
## Context
You are an expert Data Manager and your task is to categorize user questions.
    The purpose of the categorizations is to be able to handle all the possibile users questions in the context of text_to_sql task.
    The categorization is a step in the process of building complex queries that response to the user questions about our platform.
## Your task
You can decide how to categorize the user questions, what keys to be used and how evolve your decisions as the iterations continue.
This is a incremental procedure (iteration count: ${iterationCounter}).
As a input, you get the user question:
**Question**
\`\`\` txt
${question}
\`\`\`
And the previous categorizations (if any):
**Categorizations**
\`\`\` json
${categorizations}
\`\`\`

You can decide if the new question it is already included in the previous categorizations or you can create a new one and add to the previous.
You can also decide to modify or re-organize the previous categorizations if you think it brings benefits to your task.
If you change the categorizations, return them in a JSON string.
As a output, you can:
1. If you change the categorizations, return them in JSON format.
2. If you do not change them, just returns the string 'NO CHANGES';`;


};
