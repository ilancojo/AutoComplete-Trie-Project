import { TrieNode } from "./TrieNode.js";
import { validateInput } from "../utils/helpers.js";

/**
 * AutoCompleteTrie Class
 * Implements a Prefix Tree (Trie) data structure optimized for fast string retrieval
 * and autocomplete functionality. Provides O(L) time complexity for insertions and lookups.
 */
export class AutoCompleteTrie {
    constructor() {
        // The root node is intentionally left empty. It serves as the starting 
        // point for all tree traversals.
        this.root = new TrieNode();  
    }

    /**
     * Inserts a new word into the Trie.
     * @param {string} word - The word to be inserted.
     */
    addWord(word) {
        word = validateInput(word);  
        let currentNode = this.root;
        
        // Traverse the tree, creating new nodes for characters that do not exist
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode(char);
            }
            currentNode = currentNode.children[char];
        }
        
        // Mark the final node as a valid word boundary
        currentNode.endOfWord = true;
    }

    /**
     * Checks if a complete word exists in the Trie.
     * @param {string} word - The word to search for.
     * @returns {boolean} - True if the exact word is found, false otherwise.
     */
    findWord(word) {
        word = validateInput(word);  
        let currentNode = this.root;
        
        for (const char of word) {
            // Short-circuit: if a character path is broken, the word doesn't exist
            if (!currentNode.children[char]) { 
                return false;
            }
            currentNode = currentNode.children[char];
        }        
        
        // Ensure the path represents a complete word, not just a prefix
        return currentNode.endOfWord;       
    }

    /**
     * Internal helper: Navigates to the node representing the last character of a prefix.
     * @param {string} prefix - The prefix to trace.
     * @returns {TrieNode|null} - The node at the end of the prefix, or null if not found.
     */
    _getRemainingTree(prefix) {
        prefix = validateInput(prefix);
        let currentNode = this.root;

        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return null;    
            }
            currentNode = currentNode.children[char];
        }
        return currentNode;
    }

    /**
     * Internal helper: Performs a Depth-First Search (DFS) to collect all valid words.
     * @param {string} prefix - The accumulated word built during traversal.
     * @param {TrieNode} node - The current node being inspected.
     * @param {string[]} allWords - The array collecting valid word matches.
     */
    _allWordsHelper(prefix, node, allWords) {
        if (node.endOfWord === true) {
             allWords.push(prefix); 
        }
        
        // Recursively traverse all child nodes
        for (const char in node.children) {
            this._allWordsHelper(prefix + char, node.children[char], allWords);
        }
    }

    /**
     * Retrieves all possible autocomplete suggestions for a given prefix.
     * @param {string} prefix - The starting string to autocomplete.
     * @returns {string[]} - An array of suggested words.
     */
    predictWords(prefix) {
        prefix = validateInput(prefix); 

        // Step 1: Navigate to the starting subtree based on the prefix
        let startNode = this._getRemainingTree(prefix);

        // Step 2: Early return if the prefix has no matches in the tree
        if (startNode === null) {
            return [];
        }

        // Step 3: Initialize results array and trigger recursive DFS
        let results = [];
        this._allWordsHelper(prefix, startNode, results);
        
        return results;
    }
}