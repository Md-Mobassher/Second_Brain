# User Snippet

## use "cc" as react snippet follow the instructions below :

1.  - Go to File -> Preferences -> Configure User Snippets
2.  - A dropdown will appear. Select 'New Global Snippets file'
3.  - Enter the name of the file ( react.json.code-snippet )
4.  - Save
5.  - Open the file in VS Code
6.  - Replace everything with the given code

```
{
    "React Functional Component": {
        "prefix": "cc",
        "body": [
        // "import React from 'react'",
            "",
            "const $TM_FILENAME_BASE = () => {",
            "  return (",
            "     <div>",
            "             <h1>This is $TM_FILENAME_BASE component</h1>",
            "     </div>",
            "  )",
            "};",
            "",
            "export default $TM_FILENAME_BASE;"
        ],
        "description": "React Functional Component"
    }
}
```

### Multicursor

```
{
    "React Functional Component": {
        "prefix": "cc",
        "body": [
            // "import React from 'react'",
            "",
            "const ${1:ComponentName} = () => {",
            "  return (",
            "     <div>",
            "             <h1>This is ${1:ComponentName} component</h1>",
            "     </div>",
            "  )",
            "};",
            "",
            "export default ${1:ComponentName};$0"
        ],
        "description": "React Functional Component"
    }
}
```

---

# VS Code Settings

You can copy these settings and adjust them according to your current configurations.

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.tslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "eslint.run": "onSave",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "path-autocomplete.extensionOnImport": true,
  "path-autocomplete.excludedItems": {
    "*/.js": {
      "when": "**"
    },
    "*/.jsx": {
      "when": "**"
    }
  },
  "javascript.validate.enable": false,
  "typescript.validate.enable": false
}
```

---

# VS Code snippets.

```json
{
  "React component": {
    "prefix": "rfc",
    "body": [
      "export default function $1(){",
      "    return (",
      "        $2",
      "    );",
      "}"
    ],
    "description": "React functional component"
  }
}
```

---

# VS Code Extension

- Es lint
- Prettier Code Formatter
- Path Autocomplete
- Auto Rename Code
- Live Server
