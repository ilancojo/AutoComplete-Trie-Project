import { jest } from '@jest/globals';
import { CommandRouter } from '../src/controllers/CommandRouter.js';
import { MESSAGES } from '../src/constants/messages.js';

describe('CommandRouter', () => {
    let mockTrie;
    let mockView;
    let router;

    beforeEach(() => {
        // Arrange: Inject mock dependencies to isolate routing logic from data processing
        mockTrie = {
            addWord: jest.fn(),
            findWord: jest.fn(),
            predictWords: jest.fn()
        };

        mockView = {
            displayMessage: jest.fn()
        };

        router = new CommandRouter(mockTrie, mockView);
    });

    afterEach(() => {
        // Teardown: Prevent mock state pollution across tests
        jest.clearAllMocks(); 
    });

    test('should handle "help" command', () => {
        // Act
        router.execute('help', '');
        // Assert
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.HELP);
    });

    test('should handle "add" command with valid word', () => {
        router.execute('add', 'apple');
        expect(mockTrie.addWord).toHaveBeenCalledWith('apple');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.ADDED('apple'));
    });

    test('should handle "find" command when word exists', () => {
        // Arrange: Mock the trie returning a successful match
        mockTrie.findWord.mockReturnValue(true); 
        
        router.execute('find', 'apple');
        expect(mockTrie.findWord).toHaveBeenCalledWith('apple');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.FOUND('apple'));
    });

    test('should handle "find" command when word does not exist', () => {
        mockTrie.findWord.mockReturnValue(false); 
        
        router.execute('find', 'dog');
        expect(mockTrie.findWord).toHaveBeenCalledWith('dog');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.NOT_FOUND('dog'));
    });

    test('should handle "complete" command with results', () => {
        const mockResults = ['apple', 'app', 'application'];
        mockTrie.predictWords.mockReturnValue(mockResults); 
        
        router.execute('complete', 'app');
        expect(mockTrie.predictWords).toHaveBeenCalledWith('app');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.COMPLETIONS('app', mockResults));
    });

    test('should handle "complete" command with no results', () => {
        mockTrie.predictWords.mockReturnValue([]); 
        
        router.execute('complete', 'xyz');
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.NO_COMPLETIONS('xyz'));
    });

    test('should handle unknown commands securely', () => {
        router.execute('jump', '');
        
        expect(mockView.displayMessage).toHaveBeenCalledWith(MESSAGES.INVALID_CMD);
        // Assert: Ensure no unintended side-effects occur on the data structure
        expect(mockTrie.addWord).not.toHaveBeenCalled(); 
        expect(mockTrie.findWord).not.toHaveBeenCalled();
    });
});