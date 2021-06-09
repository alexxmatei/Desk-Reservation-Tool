export function generateHtmlContent(l_name_s) {
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

  <h1> Hello ${l_name_s} </h1>
  <!-- TODO Get Width and Height from device, Make use of full screen width and height, scale SVG figures to screen size, also make them responsive -->
  <!-- Code in some common aspect ratio case scenario 19:6, widescreen, phone aspect ratios, etc. -->
  
  <svg width="1730" height="928" viewBox="0 0 1730 928" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="Office">
    <rect width="1730" height="928" fill="white" />
    <rect id="Office Room" x="15"  y="15"  width="1700" height="898" fill="#9993BF" stroke="#C1C4C0" stroke-width="30" />
    <rect id="Office Door" x="765" y="898" width="200"  height="30"  fill="#818480" />
    <g id="Office Big Desk Group 1">
      <a href="/desk1">  <path id="Big Desk 1" d="M146.5 51.5V105C146.5 122.397 132.397 136.5 115 136.5H51.5V208.5H218.5V51.5H146.5Z"          fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk2">  <path id="Big Desk 2" d="M298.5 51.5V105C298.5 122.397 312.603 136.5 330 136.5H393.5V208.5H226.5V51.5H298.5Z"         fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk3">  <path id="Big Desk 3" d="M146.5 373.5V320C146.5 302.603 132.397 288.5 115 288.5H51.5V216.5H218.5V373.5H146.5Z"        fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk4">  <path id="Big Desk 4" d="M298.5 373.5V320C298.5 302.603 312.603 288.5 330 288.5H393.5V216.5H226.5V373.5H298.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Big Desk Group 2">
      <a href="/desk5">  <path id="Big Desk 5" d="M1431.5 51.5V105C1431.5 122.397 1417.4 136.5 1400 136.5H1336.5V208.5H1503.5V51.5H1431.5Z"    fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk6">  <path id="Big Desk 6" d="M1583.5 51.5V105C1583.5 122.397 1597.6 136.5 1615 136.5H1678.5V208.5H1511.5V51.5H1583.5Z"    fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk7">  <path id="Big Desk 7" d="M1431.5 373.5V320C1431.5 302.603 1417.4 288.5 1400 288.5H1336.5V216.5H1503.5V373.5H1431.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk8">  <path id="Big Desk 8" d="M1583.5 373.5V320C1583.5 302.603 1597.6 288.5 1615 288.5H1678.5V216.5H1511.5V373.5H1583.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Big Desk Group 3">
      <a href="/desk9">  <path id="Big Desk 9" d="M146.5 554.5V608C146.5 625.397 132.397 639.5 115 639.5H51.5V711.5H218.5V554.5H146.5Z"        fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk10"> <path id="Big Desk 10" d="M298.5 554.5V608C298.5 625.397 312.603 639.5 330 639.5H393.5V711.5H226.5V554.5H298.5Z"      fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk11"> <path id="Big Desk 11" d="M146.5 876.5V823C146.5 805.603 132.397 791.5 115 791.5H51.5V719.5H218.5V876.5H146.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk12"> <path id="Big Desk 12" d="M298.5 876.5V823C298.5 805.603 312.603 791.5 330 791.5H393.5V719.5H226.5V876.5H298.5Z"      fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Big Desk Group 4">
      <a href="/desk13"> <path id="Big Desk 13" d="M1431.5 554.5V608C1431.5 625.397 1417.4 639.5 1400 639.5H1336.5V711.5H1503.5V554.5H1431.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk14"> <path id="Big Desk 14" d="M1583.5 554.5V608C1583.5 625.397 1597.6 639.5 1615 639.5H1678.5V711.5H1511.5V554.5H1583.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk15"> <path id="Big Desk 15" d="M1431.5 876.5V823C1431.5 805.603 1417.4 791.5 1400 791.5H1336.5V719.5H1503.5V876.5H1431.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk16"> <path id="Big Desk 16" d="M1583.5 876.5V823C1583.5 805.603 1597.6 791.5 1615 791.5H1678.5V719.5H1511.5V876.5H1583.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 1">
      <a href="/desk17"> <path id="Office Desk 1" d="M543.5 54.5H620.5V211.5H543.5V54.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk18"> <path id="Office Desk 2" d="M628.5 54.5H705.5V211.5H628.5V54.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk19"> <path id="Office Desk 3" d="M543.5 219.5H620.5V376.5H543.5V219.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk20"> <path id="Office Desk 4" d="M628.5 219.5H705.5V376.5H628.5V219.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 2">
      <a href="/desk21"> <path id="Office Desk 5" d="M783.5 54.5H860.5V211.5H783.5V54.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk22"> <path id="Office Desk 6" d="M868.5 54.5H945.5V211.5H868.5V54.5Z"       fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk23"> <path id="Office Desk 7" d="M783.5 219.5H860.5V376.5H783.5V219.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk24"> <path id="Office Desk 8" d="M868.5 219.5H945.5V376.5H868.5V219.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 3">
      <a href="/desk25"> <path id="Office Desk 9" d="M1023.5 54.5H1100.5V211.5H1023.5V54.5Z"    fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk26"> <path id="Office Desk 10" d="M1108.5 54.5H1185.5V211.5H1108.5V54.5Z"   fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk27"> <path id="Office Desk 11" d="M1023.5 219.5H1100.5V376.5H1023.5V219.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk28"> <path id="Office Desk 12" d="M1108.5 219.5H1185.5V376.5H1108.5V219.5Z" fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 4">
      <a href="/desk29"> <path id="Small Desk 13" d="M543.5 465.5H620.5V622.5H543.5V465.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk30"> <path id="Small Desk 14" d="M628.5 465.5H705.5V622.5H628.5V465.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk31"> <path id="Small Desk 15" d="M543.5 630.5H620.5V787.5H543.5V630.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk32"> <path id="Small Desk 16" d="M628.5 630.5H705.5V787.5H628.5V630.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 5">
      <a href="/desk33"> <path id="Small Desk 17" d="M783.5 465.5H860.5V622.5H783.5V465.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk34"> <path id="Small Desk 18" d="M868.5 465.5H945.5V622.5H868.5V465.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk35"> <path id="Small Desk 19" d="M783.5 630.5H860.5V787.5H783.5V630.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk36"> <path id="Small Desk 20" d="M868.5 630.5H945.5V787.5H868.5V630.5Z"     fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
    <g id="Office Small Desk Group 6">
      <a href="/desk37"> <path id="Small Desk 21" d="M1023.5 465.5H1100.5V622.5H1023.5V465.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk38"> <path id="Small Desk 22" d="M1108.5 465.5H1185.5V622.5H1108.5V465.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk39"> <path id="Small Desk 23" d="M1023.5 630.5H1100.5V787.5H1023.5V630.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
      <a href="/desk40"> <path id="Small Desk 24" d="M1108.5 630.5H1185.5V787.5H1108.5V630.5Z"  fill="white" stroke="black" stroke-width="3" /> </a>
    </g>
  </g>
</svg>

</body>

</html>
`

return htmlContent;
}