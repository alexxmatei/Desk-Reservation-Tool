import { createServer } from "http";
import { getUserDeviceName } from "./getUserData.js";
import { generateHtmlContent } from "./htmlContent.js";

/* create a HTTP server object */
createServer(function (req, res) {
    if (req.url == "/") {
        /* get user's device name first */
        getUserDeviceName(req, (userDeviceName) => {
            /* generate a header message based on the user's device name */
            const l_headerMessage_s = "Hello " + userDeviceName;
            /* call generateHtmlContent function with the generated header message
             * so that it will generate a dynamic page using that header */
            const htmlContent = generateHtmlContent(l_headerMessage_s);
            /* write a HTTP header with the correct content type to be displayed */
            res.writeHead(200, { "Content-Type": "text/html" });
            /* the HTTP server writes a response to the client */
            /* in this case it writes the dynamically generated HTML content */
            res.write(htmlContent);
            return res.end(); // end the response
            /* the server object listens to all interfaces present on this computer */
        });
    }
}).listen(80, "0.0.0.0");