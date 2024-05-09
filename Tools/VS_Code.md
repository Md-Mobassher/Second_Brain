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
            "  return (",
            "     <div>",
            "             <h1>This is $TM_FILENAME_BASE component</h1>",
            "     </div>",
            "  )",
            "};",
            "",
            "export default $TM_FILENAME_BASE;"
        ],
        "description": "React Functional Component"
    }
}
```

### multicursor

```
{
    "React Functional Component": {
        "prefix": "cc",
        "body": [
            // "import React from 'react'",
            "",
            "const ${1:ComponentName} = () => {",
            "  return (",
            "     <div>",
            "             <h1>This is ${1:ComponentName} component</h1>",
            "     </div>",
            "  )",
            "};",
            "",
            "export default ${1:ComponentName};$0"
        ],
        "description": "React Functional Component"
    }
}
```
