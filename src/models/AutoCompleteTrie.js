import { TrieNode } from "./TrieNode.js";

export class AutoCompleteTrie {
    constructor() {
        // השורש הוא תמיד צומת ריק שממנו מתחילים כל החיפושים
        this.root = new TrieNode();
    }

    addWord(word) {
       
        if (!word || typeof word !== 'string') { // נוודא שהקלט תקין (הגנה בסיסית מפני שגיאות)
            throw new Error("Invalid input: word must be a string.");
        }
        
        word = word.toLowerCase();// המרה לאותיות קטנות כדי לשמור על אחידות (Case Insensitive)
        
        let currentNode = this.root;// יצירת מצביע שמתחיל בשורש העץ

       
        for (const char of word) {
           
            if (!currentNode.children[char]) { // אם האות לא קיימת בילדים של הצומת הנוכחי, ניצור עבורה צומת חדש
                currentNode.children[char] = new TrieNode(char);
            }

            // נקדם את המצביע שלנו לצומת של האות (הקיימת או החדשה שניצור)
            currentNode = currentNode.children[char];
        }

        // כשהלולאה מסתיימת, הגענו לאות האחרונה של המילה
        // נסמן את הצומת הזה כסוף של מילה שלמה
        currentNode.endOfWord = true;
    }
}