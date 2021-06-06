import { createServer } from "http";
import { getUserDeviceName } from "./getUserData.js";
import { generateHtmlContent } from "./htmlContent.js";

/* create a HTTP server object */
createServer(function (req, res) {
    /* get user's device name first */
    getUserDeviceName(req, (userDeviceName) => {
        /* call generateHtmlContent function with the user device name 
         * so that it will generate a dynamic page using the user's name */
        const htmlContent = generateHtmlContent(userDeviceName);
        /* write a HTTP header with the correct content type to be displayed */
        res.writeHead(200, { "Content-Type": "text/html" });
        /* the HTTP server writes a response to the client */
        /* in this case it writes the dynamically generated HTML content */
        res.write(htmlContent);
        return res.end(); // end the response
        /* the server object listens to all interfaces present on this computer */
    });
}).listen(80, "0.0.0.0");