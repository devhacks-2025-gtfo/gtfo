// Serve the file details inside data.json into a Docker container

import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
// Create directories and files from data.json
if (!fs.existsSync('package.json')) {
  data.files.forEach(file => {
    // Create directory path if it doesn't exist
    const dir = path.dirname(file.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file content
    fs.writeFileSync(file.path, file.content);
    console.log(`Created ${file.path}`);
  });
}
