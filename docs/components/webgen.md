# Webgen Component

## Overview
Challenge generation and selection system.

## Core Functionality

### Problem Selection
Randomly selects challenges from available pool:
```javascript:Webgen/display.js
startLine: 24
endLine: 30
```

### File Management
- Maintains a pool of challenge problems
- Dynamically updates web-deploy content
- Handles problem rotation

## Configuration
- Total questions configured through `TOT_QUESTION` constant
- Serves on port 4000
- Integrates with web-deploy through file system operations