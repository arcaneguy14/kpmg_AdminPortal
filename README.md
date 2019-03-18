# Project Title
KPMG Admin Portal - Web

#Setup Node Module
 1 - use cd command to AdminPortal / CoreUI/Vue
 2 - [install all project dependency type] npm install
 3 - [to start project server for AdminPortal / CoreUI/Vue] npm run serve
 
 #To build project
 - npm run build
 

# Web Strucutre
```
    /AdminPortal
├── public/              # pure static assets (directly copied)
│   └── index.html           # index.html template
├── src/                 # project root
│   ├── assets/                 # module assets (processed by webpack)
│   │   └── scss/               # user styles
│   ├── components/             # ui components
│   ├── containers/             # ui containers
│   ├── router/                 # routing 
│   ├── shared/                 # utils
│   ├── views/                  # views for all sub screen
│   ├── _nav.js                 # sidebar menu configuration
│   ├── App.vue                 # main vue component
│   └── main.js                 # app entry file
├── test/
│   └── unit/            # unit tests
│   └── e2e/             # e2e tests
├── .eslintrc.js         # eslint config
├── .postcssrc.js        # postcss config
├── babel.config.js      # babel config
├── jest.config.js       # jest config
├── vue.config.js        # vue-cli config
├── LICENSE
└── package.json         # build scripts and dependencies
```
