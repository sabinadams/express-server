#Express RESTful API Test#
Just a test. Trying out a bunch of different stuff.

##Folder Structure##

###Controllers###
Where routes are defined. Middleware can be placed in each route to specify granular permissions and whitelisting, but currently that's all done on the application level. 

###Middlewares###
Middleware to be used in the application level or within the controllers. See above for the purpose.

###Modals###
Modals deal with direct interactions with a database. These files should be *THE ONLY* files that interact with external data.

###Util###
Random functions and helpers will be stored here.

###Test###
Test cases will be stored here.

###index.js###
This is the root file that initializes the server and starts it on a specified port. This file also sets up request/response datatypes, CORS specifications, and implements application level middleware
