import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green('Welcome to chatbot program!'));
    console.log(colors.bold.green('You can start chatting with the bot!'));
    var chatHistory = []
    while (true) {
        const userInput = readlineSync.question(colors.yellow('you: '));

        try {
            chatHistory.push({
                role: 'user',
                content: userInput
            });

            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: chatHistory
            });

            const botReply = completion.choices[0].message.content;

            if (userInput.toLowerCase() == "exit") {
                console.log(colors.green('Bot: ', botReply));
                return;
            }

            console.log(colors.bold.green('Bot: ',botReply));

            chatHistory.push({
                role: 'assistant',
                content: botReply
            });
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();