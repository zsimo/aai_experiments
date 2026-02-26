

module.exports = {
    getDateTime: {
        description: "Returns the current date and time. Use this tool before any time related task",
        inputSchema: {},
        execute: async () => {
            return new Date().toISOString();
        },
    }
}
