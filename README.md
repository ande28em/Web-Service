https://project2.emanderson.me:8443/guests

1. POST /guests that accepts a JSON body containing a new guest's first and last name. It returns a JSON structure reporting the ID assigned to the new guest.<ul><li>
   <pre>curl -v \
   --request POST \
   --header 'Content-Type: application/json' \
   --data '{"firstname": "Brantley", "lastname": "C"}' \
   https://project2.emanderson.me:8443/guests</pre>
   </li></ul>
1. GET /guests/:id that returns as JSON an object with the guest’s first and last name.
   - `curl -v http://localhost:5000/guests/1`
   - `curl -v https://project2.emanderson.me:8443/guests/1`
1. GET /guests/ that returns as JSON an object with ALL guest’s first and last name.
   - `curl -v http://localhost:5000/guests/1`
   - `curl -v https://project2.emanderson.me:8443/guests/1`
1. DELETE /guests/:id that hard-deletes the guest from the database.<ul><li>
     <pre>curl -v \
   --request DELETE \
   https://project2.emanderson.me:8443/guests/2</pre></li></ul>
1. PATCH /guests/:id/:firstname/:lastname updates the guests first and last name.<ul><li>
    <pre>curl -v \
   --request PATCH \
   https://project2.emanderson.me:8443/2/Eric/Anderson</pre></li></ul>
1. GET /searchFirst/:firstName/ searches for matching first names. 
   - `curl -v http://localhost:5000/searchFirst/Eric`
   - `curl -v https://project2.emanderson.me:8443/searchFirst/Eric`
1. GET /searchLast/:lastName/ searches for matching last names.
   - `curl -v http://localhost:5000/searchLast/Eric`
   - `curl -v https://project2.emanderson.me:8443/searchLast/Eric`
