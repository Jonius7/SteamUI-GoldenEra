const fs = require('fs');
const path = require('path');
const atImport = require('postcss-import');

const prependBanner = () => {
    return {
        postcssPlugin: "prepend-banner",
        Once(root) {
            //add raw text before everything else
            root.prepend({
                text: `This file is compiled using postcss + postcss-import`
            });
        }
    };
};
prependBanner.postcss = true;

const rgbHexToRgba = () => {
  return {
    postcssPlugin: "rgb-hex-to-rgba",
    Once(root) {
      root.walkDecls(decl => {
        // Match rgb(#RRGGBB / alpha)
        const hexRegex = /rgb\(\s*#([0-9a-fA-F]{6})\s*\/\s*([0-9.]+)\s*\)/g;
        decl.value = decl.value.replace(hexRegex, (_, hex, alpha) => {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        });

        // Match rgb(var(--xxx) / alpha)
        const varRegex = /rgb\(\s*var\((--[a-zA-Z0-9-_]+)\)\s*\/\s*([0-9.]+)\s*\)/g;
        decl.value = decl.value.replace(varRegex, (_, varName, alpha) => {
          return `rgba(var(${varName}), ${alpha})`;
        });
      });
    }
  };
};
rgbHexToRgba.postcss = true;


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
        prependBanner,
        //rgbHexToRgba
    ],
};