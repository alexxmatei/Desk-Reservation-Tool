import { createServer } from "http";
import { readFile } from "fs"; // file system module

/* create a HTTP server object */
createServer(function (_req, res) {
    let htmlFilePath = "D:\\Cloud\\OneDrive\\.Folders\\Repositories\\Desk-Reservation-Tool\\index.html";
    /* asynchronously reads the content of "index.html" file */
    readFile(htmlFilePath, function (_err, content) {
        /* write a HTTP header with the correct content type to be displayed */
        res.writeHead(200, { "Content-Type": "text/html" });
        /* the HTTP server writes a response to the client */
        /* in this case it writes the index.html file obtained from readFile */
        res.write(content);
        return res.end(); // end the response
    });
/* the server object listens to all interfaces present on this computer */
}).listen(80, "0.0.0.0");