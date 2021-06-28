import { createServer } from "http";
import { handleRootUrl, handleDeskUrl, handleInvalidUrl } from "./urlHandling.js";

/* create a HTTP server object */
createServer(function (req, res) {
    if (req.url == "/") handleRootUrl(req, res);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^\/desk(?:[1-9]|[1-3][0-9]|40)$")) handleDeskUrl(req, res);
    /* Handle any other (invalid) URL */
    else handleInvalidUrl(req, res);
    /* the server object listens to all interfaces present on this computer */
}).listen(80, "0.0.0.0");