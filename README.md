# Mamas & Papas

A landing page I created for studying purposes. App heavily uses Gulp for automating dev and build tasks and simple static front-end architecture with HTML5, SASS and jQuery.

## Demo

You can view the project running on live:

https://mamasandpapas.surge.sh/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you want to set up a development environment for the project , you need these:

--- NodeJs v6.9.4

### Installing

To set up a development environment running first install the dependencies:

```
yarn
```

Build sprite, css and js files with Gulp without minification or uglification on dev environment. This command also gives you a simple dev server with auto-reloading (Browser-Sync) going on:

```
npm run dev
```

This serves static files from:

```
http://localhost:3000
```

You can also use

```
npm run dist
```

so you have production ready minified css, html and uglified js. Client still uses Gulp ``serve`` functionality for practical reasons but serving from

```
http://localhost:3001
```

## Author

* **Doğan Öztürk** - [Github](https://github.com/doganozturk)