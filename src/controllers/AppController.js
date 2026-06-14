import { AutoCompleteTrie } from '../models/AutoCompleteTrie.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { MESSAGES } from '../constants/messages.js';
import { parseCommand } from '../utils/helpers.js'; 
import { ValidationError } from '../errors/CustomErrors.js';
import { CommandRouter } from './CommandRouter.js'; 

/**
 * AppController Class
 * Acts as the orchestrator for the MVC architecture. Responsible for bootstrapping
 * the application, handling the persistent REPL loop, and catching top-level errors.
 */
export class AppController {
    constructor() {
        this.trie = new AutoCompleteTrie();
        this.view = new ConsoleView();
        
        // Inject dependencies into the router to separate command logic from loop management
        this.router = new CommandRouter(this.trie, this.view); 
    }

    /**
     * Initializes the application and starts the main loop.
     */
    init() {
        this.view.displayMessage(MESSAGES.WELCOME);
        this.run();
    }

    /**
     * The primary application loop (Read-Eval-Print Loop).
     */
    run() {
        while (true) {
            const input = this.view.getUserInput(MESSAGES.PROMPT);
            
            // Skip processing for empty user submissions
            if (!input) continue;

            const { command, arg } = parseCommand(input);

            try {
                // Evaluate termination condition
                if (command === 'exit') {
                    this.view.displayMessage(MESSAGES.GOODBYE);
                    break;
                }

                // Delegate business logic to the Command Router
                this.router.execute(command, arg);

            } catch (error) {
                // Provide safe, user-friendly feedback for known validation constraints,
                // while cleanly catching unexpected system faults.
                if (error instanceof ValidationError) {
                    this.view.displayMessage(`✗ Error: ${error.message}`);
                } else {
                    this.view.displayMessage(`✗ Unexpected Error: ${error.message}`);
                }
            }
        }
    }
}