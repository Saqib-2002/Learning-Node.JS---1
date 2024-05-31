// Built-in Node Modules -
// Core modules
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const slugify = require("slugify");

// Own modules
const replaceTemplate = require("./modules/replaceTemplate");

/*// May.22.2024
// Lecture - Reading and Writing Files
// Blocking, Synchronous Way
// To read a file.

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// To write to files.

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written");
*/

// May.23.2024
// Lecture - Reading and Writing File Asynchronously
// Asynchronous nature of Node JS
// Reading and writing files Asynchronously.
// Non-blocking, Asynchronous Way.
// Node.JS is all built around callbacks in order to implement an asynchronous behaviour.

/*fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
    console.log(data);
})*/

/*// Callback Hell - read file
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      // Writing File.
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written!");
      });
    });
  });
});

console.log("Will read file!");
*/

// Lecture - Creating a Simple Web Server
// API

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req)
  // console.log(req.url);

  // Routing
  // OVERVIEW PAGE
  const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // Product-cards

    const cardHtml = dataObj
      .map((data) => {
        // console.log(templateCard)
        // return console.log(data);
        return replaceTemplate(templateCard, data);
      })
      .join("");
    // console.log(cardHtml);
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  }
  // PRODUCT PAGE
  else if (pathname === "/product") {
    // console.log(query);
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Error my friend",
    });
    res.end("<h2>Page not found</h2>");
  }
  // res.end("Hello from the server");
});
// server.listen(8000); // default to local host
// server.listen(8000, "127.0.0.1")  // specifying local host explicitly
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
}); // optional argument - callback function which will run as soon as the server starts listening.

// May 25.2024
// Lecture - Routing
// Routing means implementing different actions for different URLs.

// 404 error is called an HTTP status code and since we're sending back a response, we can also add the status code to the response.
// Header - an HTTP header is basically a piece of information about the response that we're sending back.
// There are many different standard headers that we can specify to inform the browser or whatever client is receiving a response about the response itself.

// Lecture - Building a very Simple API.
// API - An API is a service from which we can request some data.
// JSON - It is a very simple text format that looks a lot like javascript object

// 28.May.2024
// Lecture - HTML Templating: Building the templates
// Lecture - Parsing variables from URLs
// Lecture - Creating our own modules
// Lecture - Introduction to NPM and the package.json File

// 29.May.2024
/*
// Lecture - Type of Packages and Insatlls - 1. Simple Dependencies; 2. Development Dependencies.
1. Simple Dependencies - aka regular dependencies which are the packages that contain some code that we will include on our code, the code upon which we built our own application. Our project and our code depend on them to work correctly.
for eg. - Express {node framework}
2. Development Dependencies - These are the tools for development. for eg. - code bundler, debugging tools or a testing library.
  a. They are not needed for production.
  b. Our code doesn't depend on them.

nodemon - it's a tool that helps us to develop node.js applications by automatically restarting the node application whenever we change some files in our working directory.

// Lecture - An overview of how the web works

 */

// 30.May.2024
/*
Lecture - Using Modules 3: 3rd Party Modules
Slugify - slug, which is used to change the name on your own

Lecture - Package Versioning and Updating.
^1.18.11 (major version.minor version.patch version)
patch version is intended to fix bugs
minor version introduces some new features into the package but it does not include breaking changes(means is backward compatible).

Lecture - HTTP in Action
Lots of request in webpages
Lecture - Front-End vs. Back-End Web Development
Lecture - Static vs. Dynamic vs. API

Static/Simple Website - it's a website when a developer uploads the final ready to be served files(HTML, CSS, JS, etc) of a website onto the web server.
These are the exact files that the server will later send to the browser when the website is requested. The browser take these files and render them as they are.
This means there is no work done on the server, there is no back-end code, and there's no application running. It's just a static web server serving static files.

In the browser context, dynamic has nothing to do with effects on a page or things moving around but with the way websites are generated on servers.

Dynamic Website - It is different from static website because they are usually built on the server each time a new request comes in.
Dynamic websites usually contains a database, then there's an also an application running like a node.js app, which fetches data from the database and then together with
a predefined template builts each page that the user requests dynamically based on the data coming from the database. So each time a browser requests a page, that page is than built
as HTML, CSS and JS files which will then be sent back to the browser. This whole process is sometimes called server-side rendering. That's why it's called dynamic because the website
can change all the time acc. to the content that's in the database or user's actions on the site.

Dynamic websites are sometimes also known as web applications. Web application means dynamic website with some functionality in it.

API Powered Websites - Just like the dynamic websites, we have a database here, and we have an app that fetches data from the database each time a client makes a request. The big difference here is that with an API, we only send the data to the browser
usually in the JSON data format and not the entire website. In this, just the data is sent to the client and not the ready to be displayed website.

API powered websites has two steps - 1. Building an API and 2. Consuming the API on the client side.
API - It's a piece of software that can be used by another piece of software to allow applications to talk to each other.

Dynamic websites are called server-side rendered because they are actually built on the server.
API-powered websites are often called client-side rendered

Node is an perfect tool for building API's and it's very commonly used for that. But it's also perfectly suitable to build a dynamic server-side rendered website.

*/

// 31.May.2024
/*
Lecture - Node V8 Libuv and C++
The Node Architecture Behind the Scenes - The node run time has several dependencies and the most important ones are the V8 JS engine and Libuv. Node is JS runtime based on Google's V8 engine, and that's why it appears here as dependency. If it wasn't for V8, Node would have absolutely no way of understanding the JS code that we write and therefore V8 is a fundamental part in the Node Architecture.

The V8 engine converts JS code into machine code that a computer can actually understand.

Libuv - It is an open source library with a strong focus on asynchronous I/O. This layer what gives Node access to the underlying computer OS, FS, networking, and more. Besides that Libuv is also implements two exteremely features of node.js which are the event loop and also the thread pool.

Event Loop - It is responsible for handling easy tasks like executing call backs and network I/O while the thread pool is for more heavy work like file access or compression or something like that.

Libuv is completely written in C++ and not in JS and V8 also uses C++ code besides JS. So therefore, Node itself is a program written in C++ and JS and not just in JS.

node.js ties all these libraries together, no matter if written in C++ or JS and gives us developers access to their functions in pure JS. It really provides us with a very nice layer of abstraction in order to make our lives a lot easier instead of us like having to mess with C++ code.

Lecture - 31 - Processes Threads and the Thread Pool
Node Process and Thread
Node.JS Process - When we use node on a computer, it means that there is a node process running on that computer. The process is just a program in execution.

In Node, we have a access to a process variable. In that process, node.js runs in a so called single thread.

A thread is just a sequence of instructions.

If you run your Node application, it'll run in a single thread no matter if you have 10 users or 10 million users accessing your application at the same time. So you need to be very careful about not blocking that thread.

There are some tasks which are too heavy to be executed in the event loop because they would then block the single thread, and so that's where the thread pool comes in which just like the event loop is provided to node.js by the Libuv library. The thread pool gives us four additional threads that are completely seperate from the main single thread and we can configure it up to 128 threads. These threads together formed a thread pool and the event loop can then automatically offload heavy tasks to the thread pool. All this happens automatically behind the scenes.
*/
