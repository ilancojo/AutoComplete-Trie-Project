import { AutoCompleteTrie } from '../models/AutoCompleteTrie.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { MESSAGES } from '../constants/messages.js';
import { parseCommand, validateInput } from '../utils/helpers.js';
import { ValidationError } from '../errors/CustomErrors.js';

export class AppController {
    constructor() {
        this.trie = new AutoCompleteTrie();
        this.view = new ConsoleView();
    }

    init() {
        this.view.displayMessage(MESSAGES.WELCOME);
        this.run();
    }

    run() {
        while (true) {
            // קבלת הקלט עם סימן הפרומפט >
            const input = this.view.getUserInput(MESSAGES.PROMPT);
            
            // דילוג אם המשתמש רק לחץ אנטר
            if (!input) continue;

            // פירוק הקלט לפקודה ופרמטר
            const { command, arg } = parseCommand(input);

            try {
                if (command === 'exit') {
                    this.view.displayMessage(MESSAGES.GOODBYE);
                    break;
                }

                // ניתוב הפקודות
                switch (command) {
                    case 'help':
                        this.view.displayMessage(MESSAGES.HELP);
                        break;
                        
                    case 'add':
                        const wordToAdd = validateInput(arg);
                        this.trie.addWord(wordToAdd);
                        this.view.displayMessage(MESSAGES.ADDED(wordToAdd));
                        break;
                        
                    case 'find':
                        const wordToFind = validateInput(arg);
                        const exists = this.trie.findWord(wordToFind);
                        if (exists) {
                            this.view.displayMessage(MESSAGES.FOUND(wordToFind));
                        } else {
                            this.view.displayMessage(MESSAGES.NOT_FOUND(wordToFind));
                        }
                        break;
                        
                    case 'complete':
                        const prefix = validateInput(arg);
                        const results = this.trie.predictWords(prefix);
                        if (results.length > 0) {
                            this.view.displayMessage(MESSAGES.COMPLETIONS(prefix, results));
                        } else {
                            this.view.displayMessage(MESSAGES.NO_COMPLETIONS(prefix));
                        }
                        break;
                        
                    default:
                        this.view.displayMessage(MESSAGES.INVALID_CMD);
                }
            } catch (error) {
                // הצגת שגיאות ולידציה בצורה ברורה למשתמש בלי לקרוס
                if (error instanceof ValidationError) {
                    this.view.displayMessage(`✗ Error: ${error.message}`);
                } else {
                    this.view.displayMessage(`✗ Unexpected Error: ${error.message}`);
                }
            }
        }
    }
}