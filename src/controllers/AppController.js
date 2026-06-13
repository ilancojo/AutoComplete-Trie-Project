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

}