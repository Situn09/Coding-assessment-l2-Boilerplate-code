
const http = require("http");
const fs = require("fs");

const port = 3000; 

const server = http.createServer((req, res) => {
  // Determine the file path based on the URL
  const filePath = req.url === "/" ? "/index.html" : req.url;
  const fullPath = __dirname + filePath;

  // Read the file
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // Handle file not found or other errors
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      // Set the appropriate Content-Type header
      const ext = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
      const contentType =
        {
          ".html": "text/html",
          ".js": "application/javascript",
          ".css": "text/css",
        }[ext] || "application/octet-stream";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
