# Open WebUI ↔ VS Code Copilot Integration Bridge

## Overview

A middleware solution that connects Open WebUI's chat interface with VS Code's GitHub Copilot, enabling seamless prompt flow from natural language queries to AI-powered code generation.

## Key Functionalities

### 1. Webhook Middleware Server
- Listens for incoming HTTP POST requests from Open WebUI
- Parses JSON payloads containing user messages and metadata
- Adds timestamps for tracking and processing
- Writes prompt data to a shared file on the local file system
- Provides health check endpoint for connectivity verification
- Returns success responses to prevent webhook timeouts

### 2. Docker-to-Host Network Resolution
- Bypasses Docker container isolation using `host.docker.internal`
- Enables Open WebUI (containerized) to communicate with host system services
- Configures middleware to listen on all network interfaces (`0.0.0.0`)
- Resolves the "localhost within container" networking limitation

### 3. File-Based Prompt Storage
- Maintains current prompt in `.pending-prompt` file
- Tracks processed prompts in `.processed-prompt` file
- Overwrites old prompts with new ones to maintain single source of truth
- Provides transparent, debuggable storage without database dependencies

### 4. Real-Time Prompt Monitor
- Polls `.pending-prompt` file every second for changes
- Detects modifications using file timestamp comparison
- Displays incoming prompts in formatted terminal output
- Shows metadata including user, timestamp, and chat ID
- Prevents duplicate notifications using processed timestamp tracking

### 5. Automatic Clipboard Integration
- Copies received prompts to system clipboard automatically
- Supports Windows (`clip`), macOS (`pbcopy`), and Linux (`xclip`)
- Eliminates manual copying step for faster workflow

### 6. Seamless Workflow Enablement
- Reduces prompt delivery time to under 10 seconds
- Eliminates manual copy-paste between Open WebUI and VS Code
- Minimizes context switching during development
- Works with any VS Code setup without extension installation

## Architecture Summary

| Component | Responsibility |
|-----------|---------------|
| Open WebUI (Docker) | Chat interface where user types prompts |
| Webhook Middleware | Receives webhook POST requests and saves prompts |
| .pending-prompt File | Shared storage for current prompt |
| Prompt Monitor | Watches file and displays new prompts |
| VS Code Copilot | Generates code from pasted prompts |

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment for middleware and monitor |
| Express.js | Web framework for HTTP server |
| Docker | Containerization platform for Open WebUI |
| File System API | Cross-component communication via files |
| Child Process API | Clipboard integration |

## Use Cases

- **Rapid Prototyping:** Quickly generate code snippets from natural language descriptions
- **Learning & Education:** Ask programming questions in chat and get instant code examples
- **Documentation Generation:** Request code comments and documentation strings
- **Code Refactoring:** Describe desired changes and receive refactored code
- **Multi-LLM Workflow:** Use Open WebUI's model for conversation and Copilot for code

## Limitations (Current Version)

- One-way communication only (Open WebUI → VS Code)
- No response feedback loop to Open WebUI
- Single-user design (no multi-user isolation)
- No authentication on webhook endpoints
- Windows-optimized clipboard (Mac/Linux require adjustments)

## Future Enhancement Possibilities

- Bidirectional communication (Copilot responses back to Open WebUI)
- Native VS Code extension for automatic prompt injection
- WebSocket support for real-time updates without polling
- Multi-user session management
- Prompt history logging and retrieval
- Desktop notifications for new prompts
- Configuration UI for webhook settings management

## Project Structure
openwebui-copilot-bridge/
├── webhook-middleware.js # Express server for webhook reception
├── copilot-monitor.js # File watcher and prompt display
├── .pending-prompt # Current prompt storage (auto-generated)
├── .processed-prompt # Tracking file (auto-generated)
└── package.json # Project configuration


## Quick Start Summary

1. Install dependencies (`npm install express`)
2. Start middleware server (`npm start`)
3. Start prompt monitor (`npm run monitor`)
4. Configure Open WebUI webhook URL to `http://host.docker.internal:3001/webhook/open-webui`
5. Type prompts in Open WebUI and watch them appear in terminal
6. Paste into VS Code Copilot and generate code