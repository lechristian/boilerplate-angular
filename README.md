# Christian's Angular Boilerplate
### This is the boilerplate I use to start all my Angular.js projects

> I'll walk you through each directory and file and how I structure
> my Angular applications.
>
> Modify at will to suit your dev style and environment.
>
> Also leave feedback! I'm always looking to improve.

## Getting Started
#### Using Gulp
I have 2 gulp tasks that I use:
1) gulp
   - Used for development.
   - It does not optimize images (for speed), it compiles source maps for CSS and JS files, it does not uglify js, and it does not compress css.
   - If you have livereload for chrome, it will automatically refresh the browser on file change.
   - It will also rebuild your sass or js on file change, it'll copy all libs, html, and images to dist also.
2) gulp build
   - Used for production.
   - It will optimize images
   - It will compile, minify, uglify, css and js files but will not create source maps
   - This is for building over, it does not start a local server or watch for changes

#### Libraries, frameworks, and tools I use for my projects

On the backend, I use Node.js and Express.js.
On the frontend, I use Angular.js, ngTouch, and ui-router.

For automation, I use gulp.
- Gulp helps me quicken my workflow by autocompiling and minifying my `.scss` into `.css` to pushing into the `./dist/css/`.
- Gulp also minifies, concats, and uglifies all my `.js` files and pushed them into the `./dist/js/` folder.
- Lastly, Gulp takes images and optimizes/compressed them and pushed them into `./dist/assets/img/` folder.

#### Installing new libraries, frameworks, tools
- To install backend dependencies, open up package.json and add to dependencies object.
   - You'll have to run (sudo) npm install to install new dependencies
   - If you want to remove dependencies, remove them from package.json and delete from `./node_modules`.
- To install frontend dependencies, I just go download the the `.min.*` file from source. I used to use bower but I found it easier to just download and copy into 'src/libs/{js,css,...}'
   - To use in your app, you'll have to drag the dependency into your src/libs folder. I currently have `./src/libs/js` but if you have a css dependency, create a `./src/libs/css` folder and move it there. Do the same for other files types
- To install gulp dependencies, open up package.json and add to dev-dependencies object.
    - Remember to run (sudo) npm install
    - You'll definitely need to read up on how to use Gulp if you're not familiar with it.

## Directory Structure

#### ./src

> Where you'll keep all your frontend stuff: images, js, sass, libs. Pretty much only change files here. 

###### ./src/assets/img/
> Organize your images here like you would normally. Folder structure will be copied as is into `./dist/assets/img/` but images will be optimized and compressed.

###### ./src/libs/js/
> Where you should put your javascript dependencies like Angular.js. Will be copied into `./dist/libs/`

###### ./src/views/
> Where you should put your partials/views/templates. Files will be copied into `./dist/views`  You index them in your router by `./views/**/*.html` where \*\* can represent no folder or some folder, and \* is your partial name.

###### ./src/index.html
> Your index. This is where you inject all your depency and the main entry point for your app. File will be copied as `./dist/index.html`

###### ./src/js/
All your angular files should go here. Gulp will concat and uglify all these files into `./dist/js/app.min.js`.

I use two folder structures for Angular apps depending on project size.
1)  For smaller applications with fewer models and less logic:

```
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
```
2)  For larger applications:

```
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
```
###### ./src/sass/
All your sass files should go here. Gulp will concat and minify all these files into `./dist/css/style.min.js`.

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

#### ./node_modules
> This is where your npm dependencies will go after you run `(sudo) npm install`

#### ./dist
> This is where you app will actually reside.

###### ./dist/css/
> Where your sass will concat and compile into. Don't put anything here.

###### ./dist/assets/img/
> Where you images will go after compressing. Put images in `.src/assets/img/` instead to be compressed

###### ./dist/js/
> Where your app script will go after being concat and uglified. Don't put anything here.


