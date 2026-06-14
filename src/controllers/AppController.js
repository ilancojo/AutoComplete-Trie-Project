import { AutoCompleteTrie } from '../models/AutoCompleteTrie.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { MESSAGES } from '../constants/messages.js';
import { parseCommand } from '../utils/helpers.js'; // הסרנו את validateInput כי הוא עבר לראוטר
import { ValidationError } from '../errors/CustomErrors.js';
import { CommandRouter } from './CommandRouter.js'; // הוספנו את הראוטר החדש שיצרנו

export class AppController {
    constructor() {
        this.trie = new AutoCompleteTrie();
        this.view = new ConsoleView();
        // יוצרים את מופע הראוטר ומעבירים לו את הכלים שהוא צריך
        this.router = new CommandRouter(this.trie, this.view); 
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
                // (ה-switch הארוך הוחלף בקריאה אלגנטית אחת לראוטר!)
                this.router.execute(command, arg);

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