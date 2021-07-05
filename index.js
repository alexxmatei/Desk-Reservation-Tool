import { createServer } from "http";
import { handleRootUrl, handleDeskUrl, handleInvalidUrl } from "./urlHandling.js";
import cookie from "cookie";

/* create a HTTP server object */
createServer(function (req, res) {
  /* parse the cookies on the request */
  var cookies = cookie.parse(req.headers.cookie);

  /* If both test1 and test2 cookies are not set */
  if ( !( Object.keys(cookies).includes("test 1") && Object.keys(cookies).includes("test 2") ) ) {
    /* Set the cookies test1 and test2 then redirect to root URL */
    /* Response code 302 Found, is used to redirect the user to the URL given in the Location header */
    res.writeHead(302, {
        'Set-Cookie':[
            'test 1=1; Max-Age=' + 60, /* cookie will expire in 60 seconds after being set */
            'test 2=2; expires=' + new Date(new Date().getTime() + 30 * 60000).toUTCString() /* cookie will expire in 30 minutes after being set */
        ],
        /* Redirect user to root url */
        'Location': '/'
    });
        res.end();
        return;
  }

    if (req.url == "/") handleRootUrl(req, res);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^\/desk(?:[1-9]|[1-3][0-9]|40)$")) handleDeskUrl(req, res);
    /* Handle any other (invalid) URL */
    else handleInvalidUrl(req, res);
}).listen(80, "0.0.0.0"); /* the server object listens to all interfaces present on this computer */