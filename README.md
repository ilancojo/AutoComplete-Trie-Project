# AutoComplete Trie Console Application

An interactive, command-line interface (CLI) application that implements an efficient **Trie (Prefix Tree)** data structure to provide real-time word prediction and autocomplete suggestions.

## 🚀 Key Features

* **Custom Trie Implementation:** Built from scratch to ensure optimal `O(L)` time complexity for insertions and lookups (where `L` is the length of the word).
* **Depth-First Search (DFS) Autocomplete:** Utilizes a recursive DFS algorithm to dynamically traverse the tree and retrieve all valid word completions for any given prefix.
* **Interactive REPL Console:** A clean, persistent command-line interface using `prompt-sync`.
* **Robust Input Validation:** Centralized validation logic handling edge cases, empty inputs, and case-insensitivity.

## 🏗️ Architecture & Design Patterns

The project follows a strict **MVC (Model-View-Controller)** architecture to ensure separation of concerns and maintainability:

* **Model:** Contains the pure algorithmic logic (`TrieNode`, `AutoCompleteTrie`).
* **View:** A decoupled presentation layer (`ConsoleView`) responsible strictly for I/O operations.
* **Controller:** Manages the application loop (`AppController`) and catches top-level errors.
* **Command Router Pattern:** To adhere to the **Open/Closed Principle (SOLID)**, the command parsing logic was extracted into a dedicated `CommandRouter`. This eliminates bloated `switch` statements and allows for highly scalable command registration.

## 🧪 Testing Strategy

The application is thoroughly tested using **Jest**, achieving comprehensive coverage through 27 passing unit tests. The testing methodology is divided into two approaches:
1.  **State Testing:** Verifying the mathematical and logical outputs of the Trie algorithms.
2.  **Behavior Testing (Mocking):** Using Jest's spy functions (`jest.fn()`) to inject mock dependencies into the `CommandRouter`, ensuring correct logical routing without executing the actual tree operations.

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/AutoComplete-Trie-Project.git](https://github.com/your-username/AutoComplete-Trie-Project.git)
   cd AutoComplete-Trie-Project