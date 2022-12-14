# Paefax Language Quiz backend

![lines](https://img.shields.io/tokei/lines/github/Paefax/paefax-language-backend)
![pulls](https://img.shields.io/github/issues-pr-closed/Paefax/paefax-language-backend)

This app is part of our final project in our Agile course and Web application course at IT-Högskolan in Gothenburg.

The purpose is to create a complete fullstack app (this being the backend) for some sort of quiz focused on learning using the Agile software development approach and Scrum. We decided to make a language learning app, taking inspiration from apps like Duolingo and the like.

We use Trello, a Scrum master and development team, with our teacher Kevin as our customer and product owner. Trying our best to follow a professional and structured approach of an agile team with regular sprints (one week sprints), daily-stand-ups, reviews and retrospectives every end of sprint.

## Project Setup

### Clone this repository

```sh
https://github.com/Paefax/paefax-language-backend.git
```

### .env file change

Change `<GENERATE PRIVATE KEY>` to a generated private key from [AuthO](https://auth0.com/)

```sh
ACCESS_TOKEN_SECRET=<GENERATE PRIVATE KEY>
```

### Install dependencies in local repository

```sh
npm install
```

### Start application

```sh
node app.js
```

## Endpoints

Run the backend and browse to `localhost:3000` to access the endpoints

| HTTP-verb | URL    | Authorization | Info                                              |
| --------- | ------ | ------------- | ------------------------------------------------- |
| GET       | /      | None          | Returns a static list of five fruits for testing  |
| GET       | /fruit | None          | Returns five random words from the fruit database |

GET endpoints are used in the frontend webapp linked below

## Useful links

[Agile board](https://trello.com/b/yGDs6Lc3), where we have our user stories, backlog, current sprint log and where we plan and execute our work.

[LoFi wireframe](https://www.figma.com/file/BulVWVa1zG2pkhOGge8UJg/Quiz-App?node-id=13%3A2), our first draft for the look of the frontend with basic functionality.

[HiFi wireframe](https://www.figma.com/file/QOfOGDtR8PTI5WiDOgNKvH/Language-Quiz---HIFI-wireframe?node-id=24%3A71), our LoFi with added color theme and fonts.

[Frontend repository](https://github.com/Paefax/paefax-language-app), our frontend repository.

## Project members

[Philippe Vial](https://github.com/Philippevial) | [Felix Jacobsen](https://github.com/FelixJacobsen) | [Fredrik Eriksson](https://github.com/ErikssonF) | [Helena Eklund](https://github.com/helenahalldiniths) | [Patrik Fallqvist Magnusson](https://github.com/LordRekishi)

## Technologies

![IDE](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white)
![TRELLO](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)
![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![VUE](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![EXP](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQL](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
