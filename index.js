import { createServer } from "http";

const htmlContent = `
<!DOCTYPE html>
<html>

<head>
  <style type="text/css">
    .desk {
      fill: rgb(255, 255, 255);
      stroke: rgb(0, 0, 0);
      stroke-width: 3;
    }

    .desk:hover {
      fill: rgb(235, 235, 235);
      transform: scale(1.01);
    }

    .desk {
      transition: 400ms;
      transform-origin: -15% -15%;
    }
  </style>
</head>

<body>

  <!-- TODO Get Width and Height from device, Make use of full screen width and height, scale SVG figures to screen size, also make them responsive -->
  <!-- Code in some common aspect ratio case scenario 19:6, widescreen, phone aspect ratios, etc. -->
  <svg width="1408" height="792">
    <rect id="desk8"  class="desk" x="125" y="325" width="100" height="300"></rect>
    <rect id="desk9"  class="desk" x="125" y="10"  width="100" height="300"></rect>
    <rect id="desk10" class="desk" x="10"  y="10"  width="100" height="300"></rect>
    <rect id="desk11" class="desk" x="10"  y="325" width="100" height="300"></rect>
    <!-- Display text if the browser does not support SVG -->
    Sorry, your browser does not support inline SVG.
  </svg>

</body>

</html>
`

/* create a HTTP server object */
createServer(function (_req, res) {
  /* write a HTTP header with the correct content type to be displayed */
  res.writeHead(200, { "Content-Type": "text/html" });
  /* the HTTP server writes a response to the client */
  /* in this case it writes the dynamically generated HTML content */
  res.write(htmlContent);
  return res.end(); // end the response
  /* the server object listens to all interfaces present on this computer */
}).listen(80, "0.0.0.0");