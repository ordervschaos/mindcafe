import puppeteer from 'puppeteer';

var eastFacingHouseNumbers=[]

function getEastFacingRooms(floor) {
    if(floor>=12 && floor<=26) {
        return [7,8,9,10,11,12];
    }else if(floor>=27 && floor<=41) {
        return [6,7,8,9,10,11];
    }

    return [];
}


// print the rooms search term by floor



for (var i = 1; i <= 41; i++) {
    var rooms = getEastFacingRooms(i);
    rooms.forEach(function(room) {
      var fullRoomNumber=i + room.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      eastFacingHouseNumbers.push(fullRoomNumber);
    });
}




// console.log(eastFacingHouseNumbers);
var eastFacingHouseLinks=[]

await (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://condos.ca/toronto/mirabella-condos-1926-lake-shore-blvd-w');
  console.log('Page loaded');

  // get link by search term
  //click on all elements which has class ShowMore
  const showAll=await page.$$('div.kMHmvM');
  await showAll[0].click();
  // console.log(showAll); 

  //click on all elements which has class ShowMore
  
  
  //get all liks
  
  setTimeout(async () => {
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
  
    // console.log("hrefs");
    // console.log(hrefs);
    const houseLinks=hrefs.filter(function(href) {
      return href.includes('1926-lake-shore-blvd-w');
    });


    console.log("houseLinks");
    // console.log(houseLinks);

    // get eastFacingHouseLinks
    eastFacingHouseLinks=houseLinks.filter(function(href) {
      var thisHouseNumber=href.split('unit-')[1].split('-')[0];
      // console.log("thisHouseNumber");
      // console.log(thisHouseNumber);
      return eastFacingHouseNumbers.includes(thisHouseNumber)
    });
    
    var stringtoPrint="";
    eastFacingHouseLinks.forEach(function(link) {
      stringtoPrint=stringtoPrint+link+"\n";
    });
    console.log(eastFacingHouseLinks.length+ " houses found")
    console.log(stringtoPrint)


    const aElementsWithHi = await page.$x("//a[contains(., '2817 - 1926 Lake Shore Blvd W')]");
    await browser.close();
  }, 3000);

// 
  // const app = express();



// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   var html='';
//   eastFacingHouseLinks.forEach(function(link) {
//     html=html+link+'<br>';
//   });
//   res.render(html);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
  
  // go to the listing page
  // click on the cards by search term
  // if available, get the link and print




  




})();


