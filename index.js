import { createServer } from "http";
import { handleRootUrl, handleDeskUrl, handleInvalidUrl, displayLoginPage } from "./urlHandling.js";
import { setCookiesAndRedirectToRoot as setCookiesAndRedirectToRoot } from "./handleUserData.js";
import cookie from "cookie";

/* create a HTTP server object */
createServer(function (req, res) {
  // LEARN investigate following code, make sure to understand it properly
  const BASE_URL = 'http://' + req.headers.host + '/';
  const REQ_URL = new URL(req.url, BASE_URL);
  const userNameQuery = REQ_URL.searchParams.get("name");
  const userColorQuery = REQ_URL.searchParams.get("color");
  /* parse the cookies on the request, if available */
  const cookies = cookie.parse(req.headers.cookie || '');

  /* If both color and name cookies are not set */
  const COOKIES_NOT_SET_B = Boolean(!(Object.keys(cookies).includes("color") && Object.keys(cookies).includes("name")));
  /* Name must always be send through the query, if it is null, the form was not yet sent */
  const FORM_NOT_SENT_B = Boolean(userNameQuery == null);

  if (COOKIES_NOT_SET_B) {
    if (FORM_NOT_SENT_B) {
      displayLoginPage(res);
    } else {
      setCookiesAndRedirectToRoot(res, userNameQuery, userColorQuery);
    }
  } else {
    /* if cookies are set then userName and userColor must be defined */
    const userName = cookies.name;
    const userColor = cookies.color;

    if (req.url == "/") handleRootUrl(res, userName);
    /* Should only work for desks 1 to 40 */
    else if (req.url.match("^\/desk(?:[1-9]|[1-3][0-9]|40)$")) handleDeskUrl(req, res, userName, userColor);
    /* Handle any other (invalid) URL */
    else handleInvalidUrl(req, res);
  }
}).listen(80, "0.0.0.0"); /* the server object listens to all interfaces present on this computer */