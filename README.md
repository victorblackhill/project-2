# project-2


## Local Install
- create .env with the following fields :
    - PORT = 4000
    - MONGO_URI = ***
    - CLOUDINARY_NAME = ***
    - CLOUDINARY_KEY = ***
    - CLOUDINARY_SECRET = ***
    - SESSION_SECRET = *********************
- install all packages: > *npm install*
- run : > *npm run dev*

## Folders
- Basic express [express-generator](https://expressjs.com/en/starter/generator.html) with the following additions
    - config/mongoDB.js : mongoDB with mongoose
    - config/cloudinary.js : cloudinary (file storage service) and related packages (cloudinary, multer, multer-storage-cloudinary), also includes some /* commented  code */ to test if cloudinary is working well
    - models: recipes
    - middlewares:(**Need update**)
        - seedStuff:
        - fetch.js : helper middlewares that fetch in the DB
        - renderHelp.js
            - renderHelp
            - sender : renders the request, not used in production
    - javascript/comments DOM/AJAX to CRUD the comments


## Troubleshoot
- Cloudinary connection failed : use test in the /*commented section*/ in config/cloudinary.js
