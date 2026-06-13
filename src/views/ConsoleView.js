import promptSync from 'prompt-sync';

export class ConsoleView {
    constructor() {
        // אתחול ספריית הקלט. ההגדרה sigint מאפשרת למשתמש לצאת בעזרת Ctrl+C
        this.prompt = promptSync({ sigint: true }); 
    }

    displayMessage(message) {
        console.log(message);
    }

    getUserInput(promptText) {
        return this.prompt(promptText);
    }

    displayPredictions(predictions) {
        if (predictions.length === 0) {
            this.displayMessage("No perfections found.");
        } else {
            this.displayMessage(`Possible completions: [ ${predictions.join(', ')} ]`);
        }
    }
}