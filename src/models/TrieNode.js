export class TrieNode {
    constructor(value = null) {
        this.value = value;      
        this.children = {};     
        this.endOfWord = false; 
    }
}


