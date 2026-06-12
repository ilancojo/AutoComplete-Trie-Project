import { AutoCompleteTrie } from '../src/models/AutoCompleteTrie.js';

describe('AutoCompleteTrie', () => {
    let trie;

    // הפונקציה הזו רצה אוטומטית לפני כל טסט
    // היא מבטיחה שכל טסט מתחיל עם עץ חדש וריק, כדי שלא ישפיעו אחד על השני
    beforeEach(() => {
        trie = new AutoCompleteTrie();
    });

    describe('addWord()', () => {
        
        test('should add a word and set endOfWord to true at the last character', () => {
            trie.addWord('cat');
            
            // מוודאים שהשרשרת c -> a -> t קיימת
            expect(trie.root.children['c']).toBeDefined();
            expect(trie.root.children['c'].children['a']).toBeDefined();
            expect(trie.root.children['c'].children['a'].children['t']).toBeDefined();
            
            // מוודאים שרק האות האחרונה מוגדרת כסוף מילה
            expect(trie.root.children['c'].endOfWord).toBe(false);
            expect(trie.root.children['c'].children['a'].children['t'].endOfWord).toBe(true);
        });

        test('should handle case insensitivity by converting to lowercase', () => {
            trie.addWord('DOG');
            
            // מוודאים שהאות הקטנה נוצרה, והגדולה לא קיימת
            expect(trie.root.children['d']).toBeDefined();
            expect(trie.root.children['D']).toBeUndefined();
        });

        test('should reuse existing paths when adding words with the same prefix', () => {
            trie.addWord('car');
            trie.addWord('cart'); // מילה שמשתמשת באותה תחילית
            
            const cNode = trie.root.children['c'];
            const aNode = cNode.children['a'];
            const rNode = aNode.children['r'];
            
            // מוודאים ש-r היא סוף המילה 'car'
            expect(rNode.endOfWord).toBe(true);
            // מוודאים ש-r ממשיכה ל-t, ושהיא סוף המילה 'cart'
            expect(rNode.children['t']).toBeDefined();
            expect(rNode.children['t'].endOfWord).toBe(true);
        });

        test('should throw an error for invalid inputs', () => {
            // כשאנחנו בודקים שגיאות ב-Jest, חובה לעטוף את הקריאה בפונקציה אנונימית
            expect(() => trie.addWord(123)).toThrow("Invalid input: word must be a string.");
            expect(() => trie.addWord(null)).toThrow("Invalid input: word must be a string.");
            expect(() => trie.addWord()).toThrow("Invalid input: word must be a string.");
        });

    });
});