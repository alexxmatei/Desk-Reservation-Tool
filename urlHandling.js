import { generateHtmlContent } from "./htmlContent.js";
import { IncomingMessage, ServerResponse } from "http";
import { mongoDbAddReservation } from "./databaseFunctions.js";
import { COLLECTION_NAME, DATABASE_NAME } from "./constants.js";

/**
 * Handles a root url "/" request from a device.
 * @param {ServerResponse}  res
 */
export function handleRootUrl(res, l_userName_s) {
  /* generate a header message based on the username */
  const l_headerMessage_s = "Hello " + l_userName_s;
  /* call generateHtmlContent function with the generated header message
   * so that it will generate a dynamic page using that header */
  const htmlContent = generateHtmlContent(l_headerMessage_s);
  /* write a HTTP header with the correct content type to be displayed */
  res.writeHead(200, { "Content-Type": "text/html" });
  /* the HTTP server writes a response to the client */
  /* in this case it writes the dynamically generated HTML content */
  res.write(htmlContent);
  res.end(); /* end the response */

  return;
}

/**
 * Handles a desk url from "/desk1" to "/desk40" request from a device.
 * @param {IncomingMessage} req
 * @param {ServerResponse}  res
 */
export function handleDeskUrl(req, res, userName, userColor) {
  /* get the desk number from URL */
  const deskNr = req.url.toString().substr(5);
  /* add a reservation if one does not exist for this user */
  mongoDbAddReservation(DATABASE_NAME, COLLECTION_NAME, deskNr, userName, userColor);
  const headerMessage = "Hello, you clicked on desk number " + deskNr;
  /* call generateHtmlContent function with the selected desk number 
  * so that it will generate a dynamic page using the selected desk */
  const htmlContent = generateHtmlContent(headerMessage);
  /* write a HTTP header with the correct content type to be displayed */
  res.writeHead(200, { "Content-Type": "text/html" });
  /* the HTTP server writes a response to the client */
  /* in this case it writes the dynamically generated HTML content */
  res.write(htmlContent);
  res.end();

  return;
}

/**
 * Handles any other (invalid) url request from a device.
 * @param {IncomingMessage} req
 * @param {ServerResponse}  res
 */
export function handleInvalidUrl(req, res) {
  const l_htmlContent_s = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Desk Reservation Tool - Link invalid</title>
    </head>
    <body>
        <p>Ce cauți aici, cum ai ajuns aici? 😕<br></p>
        <p>Las' că te rezolvă băiatu', șterge treaba asta din URL și ai fixuit năcazu: ${req.url}</p>
    </body>
    </html>
    `

  res.writeHead(200, { 'content-type': 'text/html' });
  res.write(l_htmlContent_s);
  res.end();

  return;
}

/**
 * Display the user login page
 * @param {ServerResponse}  res
 */
export function displayLoginPage(res) {
  const l_htmlContent_s = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Desk Reservation Tool - Login</title>
    </head>
    <body>
        <p>Salve!</p>
        <p>Introdu mai jos id-ul tău</p>
        <form method="GET">
        <input name="name" required="required" size="6" maxlength="8">
        <br></br>
        <label for="favcolor">Alege-ți culoarea preferată:</label>
        <input type="color" id="favcolor" name="color" value="#7d7d7d"><br><br>
        <input type="submit" value="Logare">
    </body>
    </html>
    `

  res.writeHead(200, { 'content-type': 'text/html' });
  res.write(l_htmlContent_s);
  res.end();
}