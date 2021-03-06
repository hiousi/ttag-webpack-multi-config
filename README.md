# ttag-webpack-multi-config


test [babel-plugin-ttag](https://github.com/ttag-org/babel-plugin-ttag) with [webpack multiple configurations](https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations)


Exporting multiple Webpack configurations, can be done by exporting an array of config objects or functions (since webpack 3.1.0).

Sample code with an array of functions exports :

```
module.exports = [
    return () => {
        name: 'configA',
        entry: './app.js',
        output: {
            filename: './dist-A.js'
        }
    },
    return () => {
        name: 'configB',
        entry: './app.js',
        output: {
            filename: './dist-B.js'
        }
    }
];

```

This repo is used to test if babel-plugin-ttag can work in such a config to compile multiple translations in one run.

## How to test

compile all locales, one export for each (works as intended):
```
    npm run build:all
```

compile all locales, with one export for all (does not work):
```
    npm run build:multi
```

