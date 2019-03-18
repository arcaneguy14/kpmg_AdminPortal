# Project Title
KPMG Admin Portal - Web

# Setup & Run
``` bash
Setup Node Module
# direct to AdminPortal or CoreUi directory
$ cd AdminPortal
# or
$ cd CoreUI-Vue
# install all vuejs depency
$ npm install

# to Start Server
$ npm run serve
#To build project
$ npm run build

```


``` bash

```

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
