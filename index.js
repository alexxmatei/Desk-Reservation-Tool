import { createServer } from "http";
import { handleRootUrl } from "./urlHandling.js";

/* create a HTTP server object */
createServer(function (req, res) {
    if (req.url == "/") {
        handleRootUrl(req, res);
    }
/* the server object listens to all interfaces present on this computer */
}).listen(80, "0.0.0.0");