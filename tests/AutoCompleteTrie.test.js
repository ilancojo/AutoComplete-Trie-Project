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



    });
});