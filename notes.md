# I. SETUP

1.  npm init

    - hit enter to everything.

2.  npm i --save express mongoose morgan body-parser
3.  create index.js

4.  `$ node index.js // to try run server when we got code.`

5.  his version of node isn't fully es16 so he uses require instead of import statements so we do it that way

6.  define port we will use on server:
    const port = process.env.PORT || 3090;

= if there is an environment var of port defined use that else 3090

7. make an instance of express:
   const app = express();

8. then const server = http.createServer(app);
   http is a native node library
   - it says make an server that knows how to receive requests and anything that comes in forward it to our express appln.

Now run server with `node index.js` and it works

9. add the app setup stuff (morgan & bodyparser middleware)
   morgan is a logging framework = good for debugging
   bodyParser parses incoming requests into json regardless of request type.

10. npm i --save nodemon
    nodemon watches our file dir for any change. Any changes and it restarts server.
    to do this add script to package.json
    "dev": "nodemon index.js"

    then run it with npm run dev

11. express route handler
    create file called router.js to hold it.

    - export a function from the file
    - import it into index.js server and pass app into that function
    - so everything in router is accessible to index
    - basic is like this:

    ```
    module.exports = function (app) {
    ```

    - routes are defined like this:

    ```
            app.get('/', function (req, res, next) {

            });
    ```

    req = request we get IN (to server)
    res = response
    next - for error handling

===

# II. AUTHENTICATION
