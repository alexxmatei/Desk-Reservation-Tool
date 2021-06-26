import { getUserDeviceName } from "./getUserData.js";
import { generateHtmlContent } from "./htmlContent.js";
import { IncomingMessage, ServerResponse } from "http";

/**
 * Handles a root url "/" request from a device.
 * @param {IncomingMessage} req
 * @param {ServerResponse}  res
 */
export function handleRootUrl(req, res) {
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
        res.end(); // end the response

        return;
    });
}

/**
 * Handles a desk url from "/desk1" to "/desk40" request from a device.
 * @param {IncomingMessage} req
 * @param {ServerResponse}  res
 */
export function handleDeskUrl(req, res) {
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
    res.end(); // end the response

    return;
}
