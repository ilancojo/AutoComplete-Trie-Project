export class TrieNode {
    constructor(value = null) {
        this.value = value;      
        this.children = {};     
        this.endOfWord = false; 
    }
}



/**
 *       addWord(word) {
        word.forEach(char => {
            let newCharNode = new TrieNode(char);

      })};
 */

