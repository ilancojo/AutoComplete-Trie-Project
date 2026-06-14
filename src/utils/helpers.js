import { ValidationError } from '../errors/CustomErrors.js';

/**
 * Parses raw user input into an executable command and its arguments.
 * @param {string} input - The raw console input.
 * @returns {Object} An object containing the 'command' and 'arg' strings.
 */
export const parseCommand = (input) => {
    if (!input || typeof input !== 'string') {
        return { command: '', arg: '' };
    }
    
    // Normalize input: remove edge whitespace and split by any contiguous spaces
    const parts = input.trim().split(/\s+/); 
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' '); 
    
    return { command, arg };
};

/**
 * Validates and sanitizes string inputs prior to Trie operations.
 * @param {string} word - The target string to validate.
 * @throws {ValidationError} If the input is empty, null, or not a string.
 * @returns {string} The sanitized, lowercase string.
 */
export const validateInput = (word) => {
    if (!word || typeof word !== 'string' || word.trim() === '') {
        throw new ValidationError("Input must be a valid, non-empty string.");
    }
    return word.trim().toLowerCase();
};