module.exports = function() {
    var client = 'client',
        clientApp = './client/app'
        dist = 'dist',
        tmp = '.tmp',
        docs = 'documentation',
        landing = 'landing';
    var config = {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + "/index.html",
        alljs: [
            client + "/app/**/*.js",

            './*.js'
        ],
        assets: [
            client + "/app/**/*.html",
            client + "/app/services/*.js",
            client + "/bower_components/font-awesome/css/*", 
            client + "/bower_components/font-awesome/fonts/*", 
            client + "/bower_components/weather-icons/css/*", 
            client + "/bower_components/weather-icons/font/*", 
            client + "/bower_components/weather-icons/fonts/*", 
            client + "/bower_components/material-design-iconic-font/dist/**/*",
            client + "/bower_components/angular-carousel/dist/angular-carousel.css",
            client + "/fonts/**/*",
            client + "/i18n/**/*", 
            client + "/images/**/*", 
            client + "/styles/loader.css", 
            client + "/styles/ui/images/*", 
            client + "/favicon.ico"
        ],
        less: [],
        sass: [
            client + "/styles/**/*.scss"
        ],
        js: [
            client + "/bower_components/angular-mask/dist/*",
            client + "/bower_components/angular-touch/angular-touch.js",
            client + "/bower_components/angular-carousel/dist/angular-carousel.js",
            clientApp + "/**/*.module.js",
            clientApp + "/**/*.js",
            '!' + clientApp + "/**/*.spec.js"
        ],
        docs: docs, 
        docsJade: [
            docs + "/jade/index.jade",
            docs + "/jade/faqs.jade",
            docs + "/jade/layout.jade"
        ],
        allToClean: [
            tmp, 
            ".DS_Store",
            ".sass-cache",
            "node_modules",
            ".git",
            client + "/bower_components",
            docs + "/jade",
            docs + "/layout.html",
            landing + "/jade",
            landing + "/bower_components",
            "readme.md"
        ]
    };

    return config;
};