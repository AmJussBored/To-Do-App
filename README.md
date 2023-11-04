# To Do App
#### Video Demo:  https://youtu.be/JKARVx8LGoc
#### Description: 

Basically, It is a to do app where in you can create and list all your task to do and when you are done you can cancel them out. 

#### File Structure: 

As you can see it is boiler plate of a laravel project since it is based on laravel, but I used react Js as frontend so I added a frontend directory and used laravel as backend api to the reactjs.

## To Run:
- Use `php artisan serve` into the project directory to run the backend

- Use `npm run dev` into the frontend directory to run the frontend, then click the link to open the website.


## To Understand:

### Backend Side

- I added some files in the app folder to store some models, resources, requests and api controllers.

- I also added some lines in the api.php file in routes folder, to create routes for frontend to use to store some data.


### Frontend Side

Basically, I use ReactJs and created a another folder named `frontend` to store the react js files and other dependecies I use such as tailwind css for easy designging of a simple website. 

- main.jsx its purpose is to become the central point where in all the jsx files goes in there since it supplements the routes and data to the project for easy access to them.

- Of course I added router.jsx file for its purpose is to structure the website and assign other jsx file what are their parents and children for easy navigating.

- the layout folder basically stores the different layouts to the website since there is a guest layout and user layout of the website when they login.

- views folder stores all the views we can see in the website such as login screen, to do screen and other modal pop for some functions

- axios-client.js is created for its purpose is to create a connection to the backend and to the frontend