import { jest } from '@jest/globals';
import { CommandRouter } from '../src/controllers/CommandRouter.js';
import { MESSAGES } from '../src/constants/messages.js';

describe('CommandRouter', () => {
    let mockTrie;
    let mockView;
    let router;

    // לפני כל טסט, ניצור אובייקטים מדומים מחדש כדי שהטסטים לא ישפיעו אחד על השני
    beforeEach(() => {
        // מילון "מרגלים" עבור מתודות העץ
        mockTrie = {
            addWord: jest.fn(),
            findWord: jest.fn(),
            predictWords: jest.fn()
        };

        // מילון "מרגלים" עבור מתודות התצוגה
        mockView = {
            displayMessage: jest.fn()
        };

        // יוצרים את הראוטר עם הזיופים
        router = new CommandRouter(mockTrie, mockView);
    });

    // אחרי כל טסט ננקה את הזיכרון של המעקבים
    afterEach(() => {
        jest.clearAllMocks(); 
    });

/*
AAA structure: Each test is made up of 3 steps:

Arrange: Setting up the variables (e.g. mockResults).

Act: Calling the function we are testing (router.execute('add', 'apple')).

Assert: Using expect(...). 

*/



    test('should handle "help" command', () => {
        router.execute('help', '');
        // בודקים שהראוטר אכן הפעיל את ההודעה המתאימה בתצוגה
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.HELP);
    });

    test('should handle "add" command with valid word', () => {
        router.execute('add', 'apple');
        // מוודאים שהמילה נשלחה לעץ
        expect(mockTrie.addWord).toHaveBeenCalledWith('apple');
        // מוודאים שהודעת ההצלחה נשלחה לתצוגה
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.ADDED('apple'));
    });

    test('should handle "find" command when word exists', () => {
        // מגדירים למרגל של העץ להחזיר 'true' הפעם כדי לדמות שהמילה נמצאה
        mockTrie.findWord.mockReturnValue(true); 
        
        router.execute('find', 'apple');
        expect(mockTrie.findWord).toHaveBeenCalledWith('apple');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.FOUND('apple'));
    });

    test('should handle "find" command when word does not exist', () => {
        // מגדירים למרגל להחזיר 'false' 
        mockTrie.findWord.mockReturnValue(false); 
        
        router.execute('find', 'dog');
        expect(mockTrie.findWord).toHaveBeenCalledWith('dog');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.NOT_FOUND('dog'));
    });

    test('should handle "complete" command with results', () => {
        const mockResults = ['apple', 'app', 'application'];
        // הזרקת תשובה מזויפת לעץ
        mockTrie.predictWords.mockReturnValue(mockResults); 
        
        router.execute('complete', 'app');
        expect(mockTrie.predictWords).toHaveBeenCalledWith('app');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.COMPLETIONS('app', mockResults));
    });

    test('should handle "complete" command with no results', () => {
        mockTrie.predictWords.mockReturnValue([]); 
        
        router.execute('complete', 'xyz');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.NO_COMPLETIONS('xyz'));
    });

    test('should handle unknown commands', () => {
        router.execute('jump', '');
        
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.INVALID_CMD);
        // בדיקה קריטית: מוודאים ששום פעולה לא הופעלה בעץ בטעות
        expect(mockTrie.addWord).not.toHaveBeenCalled(); 
        expect(mockTrie.findWord).not.toHaveBeenCalled();
    });
});