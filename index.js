import { createServer } from "http";
import { handleRootUrl } from "./urlHandling.js";
import { generateHtmlContent } from "./htmlContent.js";

/* create a HTTP server object */
createServer(function (req, res) {
    if (req.url == "/") handleRootUrl(req, res);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^/desk[1-9]$|^/desk[1-3][0-9]$|^/desk40$")) {
        /* get the desk number from URL */
        const deskNr = req.url.toString().substr(5);
        const headerMessage = "Hello, you clicked on desk number " + deskNr;
        /* call generateHtmlContent function with the selected desk number 
         * so that it will generate a dynamic page using the selected desk */
        const htmlContent = generateHtmlContent(headerMessage);
        /* write a HTTP header with the correct content type to be displayed */
        res.writeHead(200, { "Content-Type": "text/html" });
        /* the HTTP server writes a response to the client */
        /* in this case it writes the dynamically generated HTML content */
        res.write(htmlContent);
        return res.end(); // end the response
    }
    /* the server object listens to all interfaces present on this computer */
}).listen(80, "0.0.0.0");