import { MESSAGES } from '../constants/messages.js';
import { validateInput } from '../utils/helpers.js';

export class CommandRouter {
    // הנתב מקבל את המודל (trie) והתצוגה (view) כדי שיוכל לעבוד איתם
    constructor(trie, view) {
        this.trie = trie;
        this.view = view;
        this.commands = this._registerCommands();
    }

    _registerCommands() {
        return {
            'help': () => {
                this.view.displayMessage(MESSAGES.HELP);
            },
            'add': (arg) => {
                const wordToAdd = validateInput(arg);
                this.trie.addWord(wordToAdd);
                this.view.displayMessage(MESSAGES.ADDED(wordToAdd));
            },
            'find': (arg) => {
                const wordToFind = validateInput(arg);
                const exists = this.trie.findWord(wordToFind);
                if (exists) {
                    this.view.displayMessage(MESSAGES.FOUND(wordToFind));
                } else {
                    this.view.displayMessage(MESSAGES.NOT_FOUND(wordToFind));
                }
            },
            'complete': (arg) => {
                const prefix = validateInput(arg);
                const results = this.trie.predictWords(prefix);
                if (results.length > 0) {
                    this.view.displayMessage(MESSAGES.COMPLETIONS(prefix, results));
                } else {
                    this.view.displayMessage(MESSAGES.NO_COMPLETIONS(prefix));
                }
            }
        };
    }

    // פונקציה ציבורית שהבקר יקרא לה כדי לבצע פקודה
    execute(command, arg) {
        if (this.commands[command]) {
            this.commands[command](arg);
        } else {
            this.view.displayMessage(MESSAGES.INVALID_CMD);
        }
    }
}