const fs = require('fs');
const path = require('path');
const atImport = require('postcss-import');

module.exports = {
  plugins: [
    atImport({
      load: (filename) => {
        let content = fs.readFileSync(filename, 'utf8');
        const relativePath = path.relative(process.cwd(), filename);

        // Trim any leading blank lines
        content = content.replace(/^\s*\n/, '');

        // Prepend a newline inside the comment to guarantee spacing
        return `/*\n  @import ${relativePath} */\n${content}`;
      },
    }),
  ],
};