This is the beginning of Kage's playground.
This is for the sake of learning and improving dev skills.

//-- Assuming git and npm are installed
sudo npm install -g bower
sudo npm install -g gulp
sudo npm install -g gulp-cli
sudo npm install -g browserify

git clone https://github.com/KageRyu7/Playground.git
cd Playground
npm install
bower install


// To Run - Tasks found in gulpfile.js
`gulp copy` - copies non-js files from app to dist
`gulp build` - converts the jsx files to js and combines all js into one js 'main.js' file in dist.
`gulp serve` - starts a local webserver on port 8000 with dist as the root
`gulp run` - runs 'gulp copy', 'gulp build', and 'gulp serve'

// Files/Folders
// -- app - src files for the webpage, develop here
// -- dist - generated during build to run the dev server
// -- package.json - NodeJs project/dependency specification
// -- gulpfile.js - gulp is a tasker, create tasks to automate development