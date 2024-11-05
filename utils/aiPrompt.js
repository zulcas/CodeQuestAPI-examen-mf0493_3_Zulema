const createPrompt = (topic) => {
    return `
    You are an expert programming instructor specialized in fullstack development. Generate a random multiple choice question in english suitable for junior fullstack developers. Focus on practical, real-world scenarios covering: ${topic}. 
    Add a code examples ONLY if the question would be clearer or more engaging(for example, to illustrate code behavior or provide more context), include a short, relevant code example.

    Return ONLY valid JSON like this example:
    {
        "question": "Question text here",
        "codeExamples": "Add a code snippet if needed, if not leave it empty",
        "answerOptions": [
            {"answer": "Option 1", "isCorrect": boolean},
            {"answer": "Option 2", "isCorrect": boolean},
            {"answer": "Option 3", "isCorrect": boolean},
            {"answer": "Option 4", "isCorrect": boolean}
        ],
        "explanation": "Explanation here"
    }
    Ensure that there are no additional characters outside the JSON structure. Only return the JSON output.`;
};

module.exports = {
    createPrompt
}