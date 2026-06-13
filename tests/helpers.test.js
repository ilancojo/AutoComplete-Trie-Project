import { parseCommand, validateInput } from '../src/utils/helpers.js';

describe('Helper Functions', () => {
    
    describe('parseCommand()', () => {
        test('should correctly split command and argument', () => {
            const { command, arg } = parseCommand('add cat');
            expect(command).toBe('add');
            expect(arg).toBe('cat');
        });

        test('should handle commands with no arguments', () => {
            const { command, arg } = parseCommand('help');
            expect(command).toBe('help');
            expect(arg).toBe('');
        });

        test('should clean extra spaces and handle multi-word arguments', () => {
            const { command, arg } = parseCommand('   complete    ca   rt  ');
            expect(command).toBe('complete');
            expect(arg).toBe('ca rt');
        });
    });

    describe('validateInput()', () => {
        test('should return trimmed lowercase string for valid input', () => {
            expect(validateInput('  HeLlO  ')).toBe('hello');
        });

        test('should throw an error for empty strings or whitespaces', () => {
            expect(() => validateInput('')).toThrow("Input must be a valid, non-empty string.");
            expect(() => validateInput('   ')).toThrow("Input must be a valid, non-empty string.");
        });

        test('should throw an error for null or undefined', () => {
            expect(() => validateInput(null)).toThrow("Input must be a valid, non-empty string.");
            expect(() => validateInput()).toThrow("Input must be a valid, non-empty string.");
        });
    });
});