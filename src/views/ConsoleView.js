import promptSync from 'prompt-sync';

export class ConsoleView {
    constructor() {
        this.prompt = promptSync({ sigint: true }); 
    }

    displayMessage(message) {
        console.log(message);
    }

    getUserInput(promptText) {
        return this.prompt(promptText);
    }
}