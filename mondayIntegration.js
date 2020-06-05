const fetch = require('node-fetch');
require('dotenv').config();
const API = process.env.MONDAY_API;
let query = `{
        boards (ids: ${process.env.MONDAY_BOARD_ID}) {
            name
            groups(ids: ["Apps"]) {
                items {
                    name
                    column_values{ 
                        title
                        id
                        type
                        text
                    }
                }
            }
        }
    }`;

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `${API}`,
   },
   body: JSON.stringify({
     'query' : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));