import { reverse } from "dns";
import { IncomingMessage } from "http";

/**
 * Set the cookies test1 and test2 then redirect to root URL
 * @param {ServerResponse}  res
 */
export function setCookiesAndRedirectToRoot(res, nameQuery_p, colorQuery_p) {
    const ONE_YEAR = 60 * 60 * 24 * 365;
    /* Response code 302 Found, is used to redirect the user to the URL given in the Location header */
    res.writeHead(302, {
        'Set-Cookie': [
            'name = ' + nameQuery_p + '; Max-Age=' + ONE_YEAR, /* cookie will expire in 60 seconds after being set */
            'color = ' + colorQuery_p + '; Expires=' + new Date(new Date().getTime() + 30 * 60000).toUTCString() /* cookie will expire in 30 minutes after being set */
        ],
        /* Redirect user to root url */
        'Location': '/'
    });
    res.end();

    return;
}