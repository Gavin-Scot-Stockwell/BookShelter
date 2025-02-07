import Bookstore from "../interfaces/bookstore";

let lat: number;
let lon: number;
//let mod: number;

const mod: number = 0.1; //this will need to be changed to something that the user can control
function getCurrentPosition(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(14));
        const lon = parseFloat(position.coords.longitude.toFixed(14));
        resolve({ lat, lon });
      },
      (error) => {
        reject(`Error: ${error.message}`);
      }
    );
  });
}

async function apiTest() {
  try {
    const position = await getCurrentPosition();
    lat = position.lat;
    lon = position.lon;

    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    const result = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      // The body contains the query
      // to understand the query language see "The Programmatic Query Language" on
      // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
      body:
        "data=" +
        encodeURIComponent(`
                        [bbox:${lat},${lon},${lat + mod},${lon + mod}]
                        [out:json]
                        [timeout:90]
                        ;
                        (
                            way ["shop"="books"]
                              
                                (
                                    ${lat},${lon},${lat + mod},${lon + mod}
                                );
                        );
                        out geom;
                    `),
    }).then((data) => data.json());

    console.log(JSON.stringify(result, null, 2));

    const storeArray: Bookstore[] = [];

    for (let i = 0; i < result.elements.length; i++) {
      const store: Bookstore = {
        name: result.elements[i].tags.name,
        opening_hours: result.elements[i].tags.opening_hours,
        phone: result.elements[i].tags.phone,
        website: result.elements[i].tags.website,
        city: result.elements[i].tags["addr:city"],
        street: result.elements[i].tags["addr:street"],
        postcode: result.elements[i].tags["addr:postcode"],
        housenumber: result.elements[i].tags["addr:housenumber"],
        state: result.elements[i].tags["addr:state"],
      };

      storeArray.push(store);
    }

    //console.info(storeArray);

    localStorage.setItem("bookstores", JSON.stringify(storeArray));
    console.info(localStorage.getItem("bookstores"));
  } catch (error) {
    console.error(error);
  }
}

export { apiTest };
