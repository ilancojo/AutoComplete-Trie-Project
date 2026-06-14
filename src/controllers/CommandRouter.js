import { MESSAGES } from '../constants/messages.js';
import { validateInput } from '../utils/helpers.js';

/**
 * CommandRouter Class
 * Implements the Command routing pattern to map string commands to specific model/view actions.
 * This decoupled approach ensures the AppController remains agnostic to specific command logic.
 */
export class CommandRouter {
    /**
     * @param {AutoCompleteTrie} trie - The application's data model.
     * @param {ConsoleView} view - The application's presentation layer.
     */
    constructor(trie, view) {
        this.trie = trie;
        this.view = view;
        // Pre-compute the command map for O(1) execution lookups
        this.commands = this._registerCommands();
    }

    /**
     * Defines the execution logic for all supported system commands.
     * @returns {Object} A dictionary mapping command strings to handler functions.
     * @private
     */
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

    /**
     * Evaluates and executes a given command string.
     * @param {string} command - The mapped command action.
     * @param {string} arg - The parameters required for the action.
     */
    execute(command, arg) {
        if (this.commands[command]) {
            this.commands[command](arg);
        } else {
            this.view.displayMessage(MESSAGES.INVALID_CMD);
        }
    }
}