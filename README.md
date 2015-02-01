# Christian's Angular Boilerplate
### This is the boilerplate I use to start all my Angular.js projects

> I'll walk you through each directory and file and how I structure
> my Angular applications.
>
> Modify at will to suit your dev style and environment.
>
> Also leave feedback! I'm always looking to improve.

## Getting Started
#### Libraries, frameworks, and tools I use for my projects

On the backend, I use Node.js and Express.js.
On the frontend, I use Angular.js, ngTouch, ngAnimate, and ui-router.

For automation, I use gulp.
* Gulp helps me quicken my workflow by autocompiling and minifying my `.scss` into `.css` to pushing into the `./public/css/`.
* Gulp also minifies, concats, and uglifies all my `.js` files and pushed them into the `./public/js/` folder.
* Lastly, Gulp takes images and optimizes/compressed them and pushed them into `./public/img/`

#### Installing new libraries, frameworks, tools
* To install backend dependencies, open up package.json and add to dependencies object.
    - You'll have to run (sudo) npm install to install new dependencies
    - If you want to remove dependencies, remove them from package.json and delete from `./node_modules`.
* To install frontend dependencies, open up bower.json and add to dependencies
    - You'll have to run bower install to install new dependencies
    - To use in your app, you'll have to drag the dependency into your public/libs folder. I currently have `./public/libs/js` but if you have a css dependency, create a `./public/libs/css` folder and move it there. Do the same for other files types
    - When deleting, make sure you delete from bower.json, `./public/libs`, and `./bower_components`
* To install gulp dependencies, open up package.json and add to dev-dependencies object.
    - Remember to run (sudo) npm install
    - You'll definitely need to read up on how to use Gulp if you're not familiar with it.

## Directory Structure

#### ./assets

> The assets folder is where you'll keep your images, scripts (js), and
> style sheets (scss).

###### ./assets/img/
Organize your images here like you would normally. Folder structure will be copied as is into `./public/img/` but images will be optimized and compressed.

###### ./assets/js/
All your angular files should go here. Gulp will concat and uglify all these files into `./public/js/app.min.js`.

I use two folder structures for Angular apps depending on project size.
1)  For smaller applications with fewer models and less logic:
    `
    /directives
        *Put your directives here*
    /services
        *Put your services here*
    /factories
        *Put your factories here*
    /controllers
        *Put your controllers here*
    /filters
        *Put your filters here*
    app.js
    `
2)  For larger applications:
    `
    /model1
        model1.js
        *model 1 controllers here*
        *model 1 services here*
        *model 1 factories here*
        *model 1 directives here*
    /model2
        model2.js
        *model 2 controllers here*
        *model 2 services here*
        *model 2 factories here*
        *model 2 directives here*
    /model3
        model3.js
        *model 3 controllers here*
        *model 3 services here*
        *model 3 factories here*
        *model 3 directives here*
    /shared
        *Filters here*
        *Shared directives here*
    app.js
    `
###### ./assets/sass/
`
    /modules
        *Styles of elements on a page (usually span multiple pages)*
    /pages
        *Page specific styles*
    /vendors
        *Styles from venders (reset, jeet, etc.)*
    application.scss
        *Where you tell which scss files to include in your app. Make sure if you add a new file, you include it here.*
    base.scss
        *Your base style - usually styles that apply to every element*
    mixins.scss
        *Any sass mixins you want to add go here*
    text.scss
        *Text styling mixins*
    variables.scss
        *colors, sizes, etc.*
`

#### ./bower_components
> This is where your bower dependencies go after you run `bower install`. You'll need to copy the files you need into `/public/**`

#### ./node_modules
> This is where your npm dependencies will go afte ryou run `(sudo) npm install`

#### ./public
> This is where you app will actually reside.

###### ./public/css/
> Where your sass will concat and compile into. Don't put anything here.

###### ./public/img/
> Where you images will go after compressing. Put images in `./assets/img/` instead to be compressed

###### ./public/js/
> Where your app script will go after being concat and uglified. Don't put anything here.

###### ./public/libs/js/
> Where you should put your javascript dependencies like Angular.js

###### ./public/views/
> Where you should put your partials/views/templates. You index them in your router by `./views/**/*.html` where \*\* can represent no folder or some folder, and \* is your partial name.

###### ./public/index.html
> Your index. This is where you inject all your depency and the main entry point for your app.