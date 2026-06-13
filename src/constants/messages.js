export const MESSAGES = {
    WELCOME: "=== AutoComplete Trie Console ===\nType 'help' for commands",
    HELP: `Commands:
  add <word>        - Add word to dictionary
  find <word>       - Check if word exists
  complete <prefix> - Get completions
  help              - Show this message
  exit              - Quit program`,
    GOODBYE: "Goodbye!",
    INVALID_CMD: "Unknown command. Type 'help' for available commands.",
    ADDED: (word) => `✓ Added '${word}' to dictionary`,
    FOUND: (word) => `✓ '${word}' exists in dictionary`,
    NOT_FOUND: (word) => `✗ '${word}' not found in dictionary`,
    COMPLETIONS: (prefix, results) => `Suggestions for '${prefix}': ${results.join(', ')}`,
    NO_COMPLETIONS: (prefix) => `✗ No suggestions found for '${prefix}'`,
    PROMPT: "\n> "
};