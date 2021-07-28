import { ServerResponse } from "http";

/**
 * Set the name and color cookies then redirect to root URL.
 * @param {ServerResponse} res   Server response.
 * @param {String} nameValue_p   Name  value used to be added in the name  cookie.
 * @param {String} colorValue_p  Color value used to be added to the color cookie.
 */
export function setCookiesAndRedirectToRoot(res, nameValue_p, colorValue_p) {
  const ONE_YEAR = 60 * 60 * 24 * 365; /* one year in seconds */
  /* Response code 302 Found, is used to redirect the user to the URL given in the Location header */
  res.writeHead(302, {
    'Set-Cookie': [
      'name = '  + nameValue_p  + '; Max-Age=' + ONE_YEAR, /* cookie will expire a year after being set */
      'color = ' + colorValue_p + '; Max-Age=' + ONE_YEAR, /* cookie will expire a year after being set */
    ],
    /* Redirect user to root url */
    'Location': '/'
  });
  res.end();
}