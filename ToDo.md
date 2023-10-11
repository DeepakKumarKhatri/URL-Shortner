# URL Shortener
Design a URL shortener service that takes in a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.
Also, keep track of total visits/clicks on the URL.

#### Routes
- [X] POST /URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id.
- [X] GET /:id - Redirects the user to the original URL
- [X] GET /URL/analytics/:id - Returns the clicks for the provided short id.

#### Server Side Rendering
- [X] Create Server Side Rendering using EJS templating engine