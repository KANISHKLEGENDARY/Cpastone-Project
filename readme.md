# Open WebUI ↔ VS Code Copilot Integration Bridge

A lightweight middleware solution that connects Open WebUI's chat interface with VS Code's GitHub Copilot, enabling seamless prompt flow from natural language queries to AI-powered code generation.

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

This project bridges two powerful AI tools:
- **Open WebUI**: A chat interface for interacting with large language models
- **GitHub Copilot**: An AI pair programmer integrated into VS Code

Normally, these tools operate independently. This integration creates a seamless workflow where prompts typed in Open WebUI automatically flow to VS Code, ready to be processed by Copilot.

### Key Features
- 🔗 **Real-time webhook middleware** for instant prompt capture
- 🐳 **Docker-to-host networking** resolution for containerized Open WebUI
- 📁 **File-based prompt monitoring** with automatic clipboard integration
- ⚡ **Sub-10 second end-to-end prompt delivery**