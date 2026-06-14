import { AutoCompleteTrie } from '../src/models/AutoCompleteTrie.js';

describe('AutoCompleteTrie', () => {
    let trie;

    // Isolate tests by re-initializing the structure before each block
    beforeEach(() => {
        trie = new AutoCompleteTrie();
    });

    describe('addWord()', () => {
        test('should add a word and set endOfWord to true at the last character', () => {
            // Act
            trie.addWord('cat');
            
            // Assert: Verify full insertion path
            expect(trie.root.children['c']).toBeDefined();
            expect(trie.root.children['c'].children['a']).toBeDefined();
            expect(trie.root.children['c'].children['a'].children['t']).toBeDefined();
            
            // Assert: Verify strict boundary matching
            expect(trie.root.children['c'].endOfWord).toBe(false);
            expect(trie.root.children['c'].children['a'].children['t'].endOfWord).toBe(true);
        });

        test('should throw an error for invalid inputs', () => {
            expect(() => trie.addWord(123)).toThrow("Input must be a valid, non-empty string.");
            expect(() => trie.addWord(null)).toThrow("Input must be a valid, non-empty string.");
            expect(() => trie.addWord()).toThrow("Input must be a valid, non-empty string.");
        });
    });

    describe('findWord()', () => {
        beforeEach(() => {
            trie.addWord('apple');
            trie.addWord('app');
        });

        test('should return true for an exact existing word', () => {
            expect(trie.findWord('apple')).toBe(true);
        });

        test('should return false for a non-existing word', () => {
            expect(trie.findWord('dog')).toBe(false);
        });

        test('should throw an error for invalid inputs during search', () => {
            expect(() => trie.findWord(123)).toThrow("Input must be a valid, non-empty string.");
            expect(() => trie.findWord(null)).toThrow("Input must be a valid, non-empty string.");
        });
    });

    describe('predictWords()', () => {
        beforeEach(() => {
            trie.addWord('cat');
            trie.addWord('car');
            trie.addWord('card');
            trie.addWord('dog');
        });

        test('should return all possible completions for a valid prefix', () => {
            const results = trie.predictWords('ca');
            
            // Assert strict length and element presence
            expect(results).toHaveLength(3);
            expect(results).toContain('cat');
            expect(results).toContain('car');
            expect(results).toContain('card');
            
            // Assert logical exclusion
            expect(results).not.toContain('dog');
        });

        test('should return an empty array if the prefix does not exist', () => {
            const results = trie.predictWords('z');
            expect(Array.isArray(results)).toBe(true);
            expect(results).toHaveLength(0);
        });

        test('should handle case insensitivity correctly', () => {
            const results = trie.predictWords('CA');
            expect(results).toHaveLength(3);
            expect(results).toContain('car');
        });

        test('should throw an error for invalid inputs', () => {
            expect(() => trie.predictWords(123)).toThrow("Input must be a valid, non-empty string.");
            expect(() => trie.predictWords(null)).toThrow("Input must be a valid, non-empty string.");
            expect(() => trie.predictWords("")).toThrow("Input must be a valid, non-empty string.");
        });
    });
});