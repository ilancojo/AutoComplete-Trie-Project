import { TrieNode } from "./TrieNode.js";

export class AutoCompleteTrie {
    constructor() {
    
        this.root = new TrieNode();  // השורש הוא תמיד צומת ריק שממנו מתחילים כל החיפושים
    }

    // --- מתודת עזר לולידציה  ---
    _validateAndFormat(word) {
        if (!word || typeof word !== 'string') { // נוודא שהקלט תקין (הגנה בסיסית מפני שstringגיאות)
            throw new Error("Invalid input: word must be a string.");
        }
        return word.toLowerCase();// המרה לאותיות קטנות כדי לשמור על אחידות (Case Insensitive)
    }

    addWord(word) {
        word = this._validateAndFormat(word); 
        let currentNode = this.root;// יצירת מצביע שמתחיל בשורש העץ
        
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode(char);
            }
            currentNode = currentNode.children[char];// נקדם את המצביע שלנו לצומת של האות (הקיימת או החדשה שניצור)
        }
        // כשהלולאה מסתיימת, הגענו לאות האחרונה של המילה
        // נסמן את הצומת הזה כסוף של מילה שלמה
        currentNode.endOfWord = true;
    }

    findWord(word){
        word = this._validateAndFormat(word); 

        let currentNode = this.root;// יצירת מצביע שמתחיל בשורש העץ
        
        for (const char of word) {
           
            if (!currentNode.children[char]) { // אם האות לא קיימת בילדים של הצומת הנוכחי, ניצור עבורה צומת חדש
                return false;
             }
    
             currentNode = currentNode.children[char];// מתקדמים לצומת הבא 
        }        
        // החזרת הסטטוס של האות האחרונה (האם היא מסומנת כסוף מילה?)
        return currentNode.endOfWord       

    }

    _getRemainingTree(prefix) {

        prefix = this._validateAndFormat(prefix);
        let currentNode = this.root;

        for (const char of prefix) {
            // אם הגענו לאות שלא קיימת, התחילית כולה לא קיימת בעץ
            if (!currentNode.children[char]) {
                return null;    
            }
            // מתקדמים בצומת
            currentNode = currentNode.children[char];
        }
        return currentNode;// מחזירים את הצומת האחרון שהגענו אליו
    }


_allWordsHelper(prefix, node, allWords) {
        // אם הגענו לסוף מילה, נוסיף את התחילית הנוכחית למערך התוצאות
        if (node.endOfWord === true) {
             allWords.push(prefix); 
        }
        
        // עוברים על כל הילדים (האותיות הבאות) של הצומת הנוכחי
        for (const char in node.children) {
            // קריאה רקורסיבית עם התחילית המעודכנת והצומת הבא
            this._allWordsHelper(prefix + char, node.children[char], allWords);
        }
    }



}