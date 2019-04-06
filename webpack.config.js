const webpack = require('webpack');
const ttag = {};

const config = (locale = 'default') => {
    
    ttag.resolve = { translations: locale !== 'default' ? `${locale}.po` : 'default' };

    return {
        name: `build-${locale}`,
        mode: 'development',
        entry: './app.js',
        output: {
            filename: `app.${locale}.js`
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [['ttag', ttag]],
                        presets: ['@babel/preset-env']
                    }
                }]
            }, {
                test: /\.po$/,
                use: [
                    { loader: 'json-loader' },
                    { loader: 'po-gettext-loader' }
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                LOCALE: JSON.stringify(locale) //expose LOCALE to frontend
            })
        ],
    };
};

module.exports = (env = {}) => {
    if (env.extract) {
        ttag.extract = { output: './template.pot' };
        return config();
    }

    if (env.locale) 
        return config(env.locale);
    

   // exports multiple configurations 
   return [
       config('fr'), 
       config('default'),
       config('es'), 
   ]
}
