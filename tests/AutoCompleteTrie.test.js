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


    describe('findWord()', () => {
        
        test('should return true for words that exist in the trie', () => {
            trie.addWord('hello');
            trie.addWord('world');
            
            expect(trie.findWord('hello')).toBe(true);
            expect(trie.findWord('world')).toBe(true);
        });

        test('should return false for words that do not exist', () => {
            trie.addWord('cat');
            
            expect(trie.findWord('dog')).toBe(false); // מילה שלא קשורה
            expect(trie.findWord('ca')).toBe(false);  // תחילית היא לא מילה שלמה
        });

        test('should handle case insensitivity correctly during search', () => {
            trie.addWord('JavaScript');
            
            expect(trie.findWord('javascript')).toBe(true);
            expect(trie.findWord('JAVASCRIPT')).toBe(true);
        });

        test('should throw an error for invalid inputs during search', () => {
            expect(() => trie.findWord(123)).toThrow("Invalid input: word must be a string.");
            expect(() => trie.findWord(null)).toThrow("Invalid input: word must be a string.");
        });
    });
        // --- טסטים עבור פונקציות עזר ---
    describe('Helper Methods', () => {     
        // נוסיף כמה מילים שנוכל לעבוד איתן בכל הטסטים של פונקציות העזר
        beforeEach(() => {
            trie.addWord('car');
            trie.addWord('card');
            trie.addWord('cat');
            trie.addWord('dog');
        });

        describe('_getRemainingTree()', () => {
            test('should return the correct node for a valid prefix', () => {
                // נחפש את התחילית 'ca'
                const node = trie._getRemainingTree('ca');
                
                // נוודא שקיבלנו צומת תקין בחזרה
                expect(node).toBeDefined();
                expect(node).not.toBeNull();
                
                // נוודא שהצומת הזה באמת מכיל את ההמשכים 'r' ו-'t'
                expect(node.children['r']).toBeDefined();
                expect(node.children['t']).toBeDefined();
            });

            test('should return null for a prefix that does not exist', () => {
                const node = trie._getRemainingTree('z');
                expect(node).toBeNull();
            });
        });

        describe('_allWordsHelper()', () => {
            test('should collect all words starting from a specific node', () => {
                // שלב א: נשיג את הצומת של התחילית 'ca'
                const startNode = trie._getRemainingTree('ca');
                const words = [];
                
                // שלב ב: נפעיל את הרקורסיה מנקודה זו
                trie._allWordsHelper('ca', startNode, words);

                // שלב ג: נוודא שכל המילים נאספו למערך
                expect(words.length).toBe(3);
                expect(words).toContain('car');
                expect(words).toContain('card');
                expect(words).toContain('cat');
            });
        });

    });

    // --- טסטים עבור הפונקציה הראשית: predictWords ---
    describe('predictWords()', () => {
        
        // נכין עץ עם מספר מילים לצורך הבדיקות
        beforeEach(() => {
            trie.addWord('cat');
            trie.addWord('car');
            trie.addWord('card');
            trie.addWord('dog');
        });

        test('should return all possible completions for a valid prefix', () => {
            const results = trie.predictWords('ca');
            
            // מוודאים שקיבלנו בדיוק 3 מילים, ושכולן נכונות
            expect(results).toHaveLength(3);
            expect(results).toContain('cat');
            expect(results).toContain('car');
            expect(results).toContain('card');
            
            // מוודאים שמילה שלא קשורה לא נכנסה בטעות
            expect(results).not.toContain('dog');
        });

        test('should return an empty array if the prefix does not exist', () => {
            const results = trie.predictWords('z');
            
            expect(Array.isArray(results)).toBe(true);
            expect(results).toHaveLength(0);
        });

        test('should handle case insensitivity correctly', () => {
            // חיפוש עם אותיות גדולות אמור להחזיר את אותן תוצאות (באותיות קטנות)
            const results = trie.predictWords('CA');
            
            expect(results).toHaveLength(3);
            expect(results).toContain('car');
        });

        test('should throw an error for invalid inputs', () => {
            expect(() => trie.predictWords(123)).toThrow("Invalid input: word must be a string.");
            expect(() => trie.predictWords(null)).toThrow("Invalid input: word must be a string.");
            expect(() => trie.predictWords("")).toThrow("Invalid input: word must be a string.");
        });

    });
    











    
});