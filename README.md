1. POST /guests that accepts a JSON body containing a new guest's first and last name. It returns a JSON structure reporting the ID assigned to the new guest.<ul><li>
   <pre>curl -v \
   --request POST \
   --header 'Content-Type: application/json' \
   --data '{"firstname": "Eric", "lastname": "Anderson"}' \
   http://localhost:5000/guests</pre>
   </li></ul>
1. GET /guests/:id that returns as JSON an object with the guest’s first and last name.
   - `curl -v http://localhost:5000/humans/1`
1. DELETE /guests/:id that hard-deletes the guest from the database.
     <pre>curl -v \
   --request DELETE \
   http://localhost:5000/guests/2</pre></li></ul>