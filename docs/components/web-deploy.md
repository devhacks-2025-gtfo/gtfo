# Web Deploy Component

## Overview
Next.js application serving challenge problems and handling flag verification.

## Challenge System

### Dynamic Problem Loading
Problems are loaded dynamically through the API system:
```javascript:web-deploy/pages/api/login1.js
startLine: 4
endLine: 40
```

### Database Integration
SQLite database for user authentication:
```javascript:web-deploy/database1.js
startLine: 7
endLine: 21
```

## Security Challenges
The application includes intentional vulnerabilities for learning:
1. SQL Injection vulnerability in login
2. Username verification bypass
3. Direct flag exposure through API