# GTFO Challenge Solutions

This document contains solutions for all challenges in the GTFO platform. **WARNING: SPOILERS AHEAD!**

## Finding Flags
When you successfully complete a challenge:
1. A green success popup will appear
2. Open your browser's Developer Tools (F12)
3. Go to the Network tab
4. Look for the most recent request
5. The flag will be in the response data

## Search Bar XSS (Easy - 100 pts)
**Location:** Header search bar

**Vulnerability:** The search functionality is vulnerable to Cross-Site Scripting (XSS) because it directly renders user input without sanitization.

**Solution:**
1. Enter the following payload in the search bar:
```html
<script>alert('XSS')</script>
```
2. The script will execute, demonstrating the XSS vulnerability
3. Check the Network tab for the flag in the response

**Technical Details:**
- The server renders the search query directly in the response using `dangerouslySetInnerHTML`
- No input sanitization is performed
- The XSS payload can execute arbitrary JavaScript code

## Basic Auth Bypass (Easy - 100 pts)
**Location:** Header login form

**Vulnerability:** The login form is vulnerable to SQL injection because user input is directly concatenated into the SQL query.

**Solution:**
1. Enter the following in the username field:
```sql
admin' --
```
2. Any password will work
3. The SQL comment `--` makes the password check irrelevant
4. Check the Network tab for the flag in the response

**Technical Details:**
- The server constructs the SQL query using string concatenation
- The query becomes: `SELECT * FROM users WHERE username = 'admin' -- ' AND password = 'anything'`
- Everything after `--` is treated as a comment in SQL

## Profile Viewer IDOR (Medium - 150 pts)
**Location:** Sidebar profile section

**Vulnerability:** The profile viewer is vulnerable to Insecure Direct Object Reference (IDOR) because it doesn't properly validate user access to profiles.

**Solution:**
1. Notice that regular profiles use IDs starting from 1
2. Change the profile ID in the URL to 0 to access the hidden admin profile
3. Check the Network tab for the flag in the response

**Technical Details:**
- The server doesn't validate whether the user has permission to view the requested profile
- The admin profile is hidden but accessible through ID 0
- No authentication check is performed for profile access

## Like Button CSRF (Medium - 150 pts)
**Location:** Feed posts

**Vulnerability:** The like functionality is vulnerable to Cross-Site Request Forgery (CSRF) because it doesn't implement CSRF tokens.

**Solution:**
1. Create an HTML file with the following content:
```html
<form action="http://localhost:4000/api/posts/1/like" method="POST">
  <input type="submit" value="Click me!">
</form>
```
2. Open the HTML file in another browser window
3. Click the button to trigger the CSRF attack
4. Check the Network tab for the flag in the response

**Technical Details:**
- The server accepts POST requests without CSRF tokens
- No origin validation is performed
- The `Referer` header is checked but can be spoofed
- Cookies are automatically included in the request

## General Tips
1. Use the browser's Developer Tools (F12) to:
   - Monitor network requests in the Network tab
   - View request/response data
   - Inspect HTML elements
2. Pay attention to:
   - URL parameters
   - Request headers
   - Response data
3. Flags are always in the format: `flag{something_here_2025}`
4. Success messages appear when a challenge is completed
5. The Network tab is your best friend for finding flags 