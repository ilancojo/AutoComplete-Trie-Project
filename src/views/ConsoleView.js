import promptSync from 'prompt-sync';

export class ConsoleView {
    constructor() {
        // אתחול ספריית הקלט. ההגדרה sigint מאפשרת למשתמש לצאת בעזרת Ctrl+C
        this.prompt = promptSync({ sigint: true }); 
    }


}