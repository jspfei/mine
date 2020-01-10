### 安装

```
 npm install --save-dev eslint babel-eslint @vue/eslint-config-airbnb
```

### 配置.eslintrc

```
"extends": [
"plugin:vue/recommended",
'@vue/airbnb'
]
```

### vscode安装eslint插件

配置vscode 自动fix  （vscode  setting中设置）

#### 设置保存时格式化 

```
"eslint.autoFixOnSave": true,
```

#### 扩展检查.vue文件

```
"eslint.validate": [
      "javascript",
      "javascriptreact",
      {
          "language": "html",
          "autoFix": true
      },
      {
          "language": "vue",
          "autoFix": true
      }
  ],
 
```

#### 关闭编辑器自动保存格式化，避免冲突

```
"editor.formatOnType": false,
 "editor.formatOnSave": false,
```

#### 完整版vscode  setting.json

```json
{
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "build/": true,
        "temp/": true,
        "library/": true,
        "**/*.anim": true,
    },
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "library/": true,
        "local/": true,
        "temp/": true,
        "**/.classpath": true,
        "**/.project": true,
        "**/.settings": true,
        "**/.factorypath": true
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "javascript": "html"
    },
    "window.zoomLevel": 1.5,
    "markdown-pdf.executablePath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "rust.mode": "legacy",
    "explorer.confirmDragAndDrop": false,
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.wordWrap": "on",
    "editor.lineNumbers": "on",
    "editor.formatOnType": false,
    "editor.formatOnSave": false,
    "liveServer.settings.donotVerifyTags": true,
    "minapp-vscode.disableAutoConfig": true,
    "liveServer.settings.donotShowInfoMsg": true,
    "view-in-browser.customBrowser": "chrome",
    "git.autofetch": true,
    "eslint.autoFixOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ]
  
}
```

#### .editorconfig配置

- 格式统一配置工具
- 跨浏览器广泛支持(常见如IDEA,WebStorm,Sublime,Vscode等统统都支持)
- 权重高于编辑器内部的格式设定
- 配置项一共就8个

### 代码块

#### .editorconfig完整配置

```
# editorconfig.org
root = true

[*]                             # 所有文件都使用配置
charset = utf-8                 # 编码格式
indent_style = space            # Tab键缩进的样式，由space和table两种 一般代码中是space
indent_size = 4                 # 缩进size为2
end_of_line = lf                # 以lf换行 默认win为crlf mac和linux为lf
insert_final_newline = true     # 末尾加一行空行
trim_trailing_whitespace = true # 去掉行尾多余空格

[*.md]
trim_trailing_whitespace = false 
```

#### .eslintrc.js完整配置

```
module.exports = {
    root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
    parserOptions: { // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
        parser: 'babel-eslint' // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    },
    env: { // 此项指定环境的全局变量，下面的配置指定为浏览器环境
        browser: true,
        node: true
    },
    extends: [
        'plugin:vue/recommended',
    ], // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    plugins: [
        'vue'
    ], // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    rules: {
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 3,
            "multiline": {
                "max": 5,
                "allowFirstLine": false
            }
        }],
        'indent': [2, 4], // 缩进4
        'comma-dangle': 0, // 对象字面量项尾不能有逗号
        'new-cap': 0, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'no-console': 0,// 禁止使用console
        'no-extra-semi': 0, // 禁止多余的冒号
        'no-new': 0, // 禁止在使用new构造一个实例后不赋值
        'no-undef': 0, // 不能有未定义的变量
        'quote-props': 0, // 属性名不限制
        'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
        'semi': [2, 'never'], // 语句强制分号结尾
        'no-unused-expressions': 'off', // 禁止无用的表达式
        'generator-star-spacing': 'off', // 生成器函数*的前后空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 禁止使用debugger
    }
} 
```



