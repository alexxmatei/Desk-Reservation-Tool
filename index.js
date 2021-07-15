import { createServer } from "http";
import { handleRootUrl, handleDeskUrl, handleInvalidUrl, displayLoginPage } from "./urlHandling.js";
import { setCookiesAndRedirectToRoot as setCookiesAndRedirectToRoot } from "./handleUserData.js";
import cookie from "cookie";

/* create a HTTP server object */
createServer(function (req, res) {
  const baseURL = 'http://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  let nameQuery = reqUrl.searchParams.get("name");
  let colorQuery = reqUrl.searchParams.get("color");
  /* parse the cookies on the request, if available */
  let cookies = cookie.parse(req.headers.cookie || '');

  /* If both color and name cookies are not set */
  const cookiesNotSet_b = new Boolean(!(Object.keys(cookies).includes("color") && Object.keys(cookies).includes("name")));
  /* Name must always be send through the query, if it is null, the form was not yet sent */
  const formNotSent_b = new Boolean(nameQuery == null);


  if (cookiesNotSet_b == true) {
    if (formNotSent_b == true) {
      displayLoginPage(res);
    }
    else {
      setCookiesAndRedirectToRoot(res, nameQuery, colorQuery);
    }
  }
  else {
    if (req.url == "/") handleRootUrl(req, res);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^\/desk(?:[1-9]|[1-3][0-9]|40)$")) handleDeskUrl(req, res);
    /* Handle any other (invalid) URL */
    else handleInvalidUrl(req, res);
  }
}).listen(80, "0.0.0.0"); /* the server object listens to all interfaces present on this computer */