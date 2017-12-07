#Setting up SAGE
This guide is aimed at those looking to develop or deploy I AM SAGE

##Requirements
* JDK version 8 or higher
* Mongo version 3.60 or higher
* NPM version 3.10 or higher
* Node version 6.11 or higher

##Optional Dependencies
* Intellij IDEA
* Git

##To Build SAGE For Deployment

1. Install or update all requirements
2. ```git clone``` the repository
3. ```git checkout prod``` branch, and merge ```master``` into it. 
(this is needed to update the login link in the html of 
```client/src/app/teacher-zone/teacher-zone.component.html``` 
to be a link to what your final domain will be + 
the route ```/api/autorize```)
4. Also update with your final domain the values in ```app/src/environments/environments.prod.ts```
so that they point to your final domain with ```/api/``` at the end
5. Run ```build.sh``` and look in your home folder for it's output files. ```sage.sh``` and a folder named server

##To Deploy SAGE
1. make sure you have a Google API key set up, for the basic Google+ identity API.
2. Build SAGE
3. In the Server Folder, create the directory ```/src```
4. Modify the following template and save it as ```config.json``` in ```/src```

```{
       "clientId" : "your google client id" )",
       "clientSecret" : "(your google client secret)",
       "callbackURL" : "your final domain + /callback",
       "publicURL" : "your final domain",
       "useAuth" : (true if you wish to enforce login for teachers, 
                    false if you wish to let anyone make any change.),
       "serverPort" : (the port your server opens to the web)
   }
```
5. Run either ```server.sh``` or ```server.bat``` depending on your platform
6. Go to your domain and see if SAGE is up and working.
