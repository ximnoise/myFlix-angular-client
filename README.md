# myFlix-angular-client

![](/myFlix-showcase.gif)

This project is an Angular application that allows users to get information about movies, genres, and directors. Users can also save movies in their list of favorites and edit details of their profile. This application uses my existing server-side REST API and MongoDB database. [See here](https://github.com/ximnoise/myFlix-backend)

[The project is deployed here.](https://ximnoise.github.io/myFlix-angular-client/welcome)

## Features

- App display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where
additional movie details will be displayed. The single movie view will contain the following additional features:
  - A button that when clicked takes the user to the ​director view,​ where details about the director of that particular movie will be displayed.
  - A button that when clicked takes the user to the ​genre view,​ where details about that particular genre of the movie will be displayed.

## Development Server

To run this project on a development server, run the following command, then navigate tom the localhost port stated in your terminal.
```
ng serve
```

## Technologies

- Requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- Written with [Angular](https://angular.io)
- Designed with [Angular Material](https://v7.material.angular.io)
- Documented with [Typedoc](https://typedoc.org)