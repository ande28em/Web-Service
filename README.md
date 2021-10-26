1. POST /humans that accepts a JSON body containing a new human’s username and screen name. It returns a JSON structure reporting the ID assigned to the new human.<ul><li>
   <pre>curl -v \
   --request POST \
   --header 'Content-Type: application/json' \
   --data '{"username": "vulf", "screenname": "vulfpeck"}' \
   http://localhost:5000/humans</pre>
   </li></ul>
1. GET /humans/:id that returns as JSON an object with the human’s screen name and username.
   - `curl -v http://localhost:5000/humans/1`
1. POST /follow/:followee/:follower that adds a new following relationship to the database. It returns nothing but gives back status code 204, which means the operation silently succeeded.<ul><li>
      <pre>curl -v \
   --request POST \
   --header 'Content-Type: application/json' \
   http://localhost:5000/follow/3/1</pre>
      </li></ul>
1. GET /follow/:followee that returns as JSON an array of all of the followee’s followers.
   - `curl -v http://localhost:5000/follow/hcientist`
1. DELETE /follow/:followee/:follower that removes a following relationship from the database. It returns nothing but gives back status code 204, which means the operation silently succeeded.<ul><li>
     <pre>curl -v \
   --request DELETE \
   http://localhost:5000/follow/3/1</pre></li></ul>
1. DELETE /humans/:id that hard-deletes the human from the database, including any following relationships the human is involved in.<ul><li>
     <pre>curl -v \
   --request DELETE \
   http://localhost:5000/humans/2</pre></li></ul>
