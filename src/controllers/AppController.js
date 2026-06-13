import { AutoCompleteTrie } from '../models/AutoCompleteTrie.js';
import { ConsoleView } from '../views/ConsoleView.js';

export class AppController {
    constructor() {
        this.trie = new AutoCompleteTrie();
        this.view = new ConsoleView();
    }

    init() {
        this.view.displayMessage("Welcome to the autocomplete dictionary!");
        this.view.displayMessage("Type 'exit' to exit.");
        
        // טעינת מילים התחלתיות למילון
        const initialWords = ["hello", "help", "helmet", "hero", "cat", "car", "cart", "dog"];
        for (const word of initialWords) {
            this.trie.addWord(word);
        }

        this.run(); // הפעלת לולאת התוכנית

    }

    run() {
        while (true) {
            const prefix = this.view.getUserInput("\nEnter a search prefix: ");
            
            if (prefix.toLowerCase() === 'exit') {
                this.view.displayMessage("Good by!");
                break;
            }

            try {
                // הבקר שואב מידע מהמודל ומעביר אותו לתצוגה
                const predictions = this.trie.predictWords(prefix);
                this.view.displayPredictions(predictions);
            } catch (error) {
                this.view.displayMessage(`erorr: ${error.message}`);
            }
        }
        
    }
}