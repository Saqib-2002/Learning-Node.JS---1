// Built-in Node Modules -
// Core modules
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

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