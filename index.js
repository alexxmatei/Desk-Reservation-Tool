import { createServer } from "http";
import { handleRootUrl, handleDeskUrl, handleInvalidUrl } from "./urlHandling.js";
import { setCookiesAndRedirectToRoot as setCookiesAndRedirectToRoot } from "./handleUserData.js";
import cookie from "cookie";

/* create a HTTP server object */
createServer(function (req, res) {
  /* parse the cookies on the request, if available */
  var cookies = cookie.parse(req.headers.cookie || '');

  /* If both test1 and test2 cookies are not set */
  if (!(Object.keys(cookies).includes("test 1") && Object.keys(cookies).includes("test 2"))) {
    setCookiesAndRedirectToRoot(res);
  }
  else {
    if (req.url == "/") handleRootUrl(req, res);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^\/desk(?:[1-9]|[1-3][0-9]|40)$")) handleDeskUrl(req, res);
    /* Handle any other (invalid) URL */
    else handleInvalidUrl(req, res);
  }
}).listen(80, "0.0.0.0"); /* the server object listens to all interfaces present on this computer */