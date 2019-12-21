// global variables

const employeesURL = 'https://randomuser.me/api/?results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const headerTxtContainer = document.querySelector('.header-text-container h1');
const searchBar = document.createElement('form');

/* Search markup:

                        You can use the commented out markup below as a template
                        for your search feature, but you must use JS to create and
                        append it to `search-container` div.

                        IMPORTANT: Altering the arrangement of the markup and the
                        attributes used may break the styles or functionality.

                        <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>
                    ======================= --></input>
 */

searchBar.innerHTML = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
  </form>
`;

searchContainer.appendChild(searchBar);
