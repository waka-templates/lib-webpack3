'use strict';

module.exports = {
    "prompts": {
        "name"       : {
            "type"    : "string",
            "required": true,
            "message" : "Project name"
        },
        "version"     : {
            "type"    : "string",
            "message" : "Project version",
            "default" : "1.0.0"
        },
        "description": {
            "type"    : "string",
            "required": false,
            "message" : "Project description",
            "default" : "A new React project"
        },
        "author"     : {
            "type"   : "string",
            "message": "Author"
        },
        "port"     : {
            "type"   : "input",
            "message": "port",
            "default" : 10000,
            "validate":function (data) {
                if(/^(0|([0-9]\d*))$/.test(data)){
                    return true;
                }
                return '输入整数';
            }
        },
        "test": {
            "type": "confirm",
            "message": "Setup unit tests with jest?"
        },
        "babelEnv": {
            "type": "confirm",
            "message": "Use babel-preset-env?"
        },
        "webpackDll": {
            "type": "confirm",
            "message": "Use webpack dll?"
        }
    },
    "filters":{
        "__tests__/**/*": "test",
        "test/**/*": "test",
        "webpack.dll.config.js":"webpackDll"
    },
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/waka-templates/react-webpack2"
}
