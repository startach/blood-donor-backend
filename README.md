## Installation 

1. Clone the repo by running the following command
```
git clone git@github.com:startach/blood-donor-backend.git
```
2. Install the required dependencies by running the following command
 ```
 npm install
 ```
3. setup env variables
    - Create new .env file in the root directory
    - add the following variables(you can get them from the firebase project settings page)
        ```
        FIREBASE_API_KEY = 
        FIREBASE_AUTH_DOMAIN = 
        FIREBASE_DATABASE_URL= 
        FIREBASE_PROJECT_ID = 
        FIREBASE_STORAGE_BUCKET = 
        FIREBASE_MESSAGING_SENDER_ID = 
        FIREBASE_APP_ID = 
        GOOGLE_GEOCODER_API=
        ```
            
 4. run the app/server using one of the following commands
```
npm start
or
npm run dev (runs with nodemon)
```
4. Open http://localhost:4000/ 
