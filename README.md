# Book Shelter [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Book Shelter presents a random book with the option to save it to a favorites shopping list. Easily locate local booksellers and suppor their business in the accompanying list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Change the project's root directory
1. Create the PostgreSQL database
   - Create a server/.env containing your admin credentials and a random JWT password (refer to the .env.EXAMPLE located there).
   - Use psql to import the server/db/schema.sql (e.g. psql -U postgres -f db/schema.sql)
1. Install the dependency modules: npm install
1. Build the server and seed the database:
   - npm run server:build
   - npm run seed

## Usage

1. Change the project's root directory
1. Run: npm run dev
1. Browse to the running app at: http://localhost:3000/

- See the active Book Shelter site deployed on Render [here](https://bookshelter.onrender.com/)  
  Note that it takes a couple of minutes to spin up!  
  ![BookShelter screenshot](client/src/assets/img/screenshot.jpg)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) license

## Contributing

Guidelines:  
Ensure your code follows the project's coding standards.  
Write clear and concise commit messages.  
If your changes include new features, please update the documentation accordingly.  
If you are fixing a bug, please include a test to verify the fix.  
Thank you for your contributions!
Here are some helpful resources:  
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)  
[![OpenStreetMap API](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=OpenStreetMap&logoColor=white)](https://www.openstreetmap.org/help)  
[![Open Library Search API](https://img.shields.io/badge/Open_Library_Search-REST_API)](https://openlibrary.org/developers/api)  
[![Render](https://img.shields.io/badge/Render-CI/CD-blue)](https://dashboard.render.com/web/srv-cu83ke3v2p9s73c772n0)

## Tests

Test instructions:

1. Try using the reject and save buttons on the search page.
1. On the saved page ensure the list is updated from the search page additons.
1. Try the image and email links.
1. Try removing candidates until the list is empty.
1. Test the sort opton.
1. Try filtering on text in one of the bio fields.
1. Try filtering on a nonexisting text string.
1. Clear the filter to be sure the saved candidates are visible again.

## Questions

If you have any questions, feel free to reach out to us:

- Andrew Gnemi

  - GitHub: [agnemi](https://github.com/agnemi)
  - Email: a.j.gnemi@gmail.com

- Clint Jones

  - GitHub: [clintsrc](https://github.com/clintsrc)
  - Email: clinton.alan.jones@gmail.com

- Gavin Stockwell
  - GitHub: [Gavin-Scot-Stockwell](https://github.com/Gavin-Scot-Stockwell)
  - Email: gsstockwell@gmail.com

