import model from "../config/gemini-ai.js";


const StartChat = async (userInput, chatHistory = []) => {

    //object for valid chat history
    const messages = chatHistory.map(([role, parts]) => ({ role, parts })); //creating the actual format of chat history according to gemini-ai 
    messages.push({ role: 'user', parts: [{ text: userInput }] });

    try {
        //using model to create a chat

        const chat = model.startChat({
            history: messages,
            generationConfig: {
                maxOutputTokens: 1000
            }
        });

        const result = await chat.sendMessage(userInput);
        // console.log(result);
        const response = await result.response;
        // console.log(response);
        const text = response.text();

        //updating history
        chatHistory.push(['user', [{ text: userInput }]]);
        chatHistory.push(['model', [{ text: text }]]);

        console.log("bot: " + text);
        return text;

    } catch (error) {
        console.error(error);
        // return new Error("An error occured while getting response.....", error);
        return error.message;

    }
}

export default StartChat;
