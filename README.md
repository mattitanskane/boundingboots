# Using game development as a tool to learn JavaScript with HTML5 Canvas

## Post Mortem

Early 2018 I set out to learn JavaScript. I already had a grasp of a lot of the basics but my experiences were mostly in front end web development. I figured that creating a game could be a compelling of learning programming.

I wanted to use game development as a tool to learn more JavaScript.

At first I didn't really focus on creating a game at all. I first started with learning modern JavaScript using ES6 features and I had a completely different project setup. I dabbled in Node and Templating Engines and read a bunch of articles and tutorials. I started from scratch a couple of times before ending up using what's in this repository.

I finally started programming a HTML5 Canvas game and after a couple tries with other patterns or no patterns I ended up using an Entity-Component-System (ECS) pattern for the game. I ended up liking ECS a lot as it seemed very understandable and easily maintable. Eventually I ran into many unnecessarily complicated problems with ES6 modules, ESLint and Webpack that hindered me from progressing and learning basic programming. I spent a lot of time troubleshooting JavaScript tools I wasn't very familiar with and I learned a lot doing it, it just wasn't really compelling. I knew my setup was way over the top for me. I couldn't focus on the things that actually mattered.

I started the project from scratch once more in order to take a good crack at a couple problems. I ditched all the shiny JavaScript things and went with static HTML and JavaScript files to have a little fun and to prototype stuff. You can find that stuff in a separate branch. At this point I felt that this project was winding down and that was fine.

I found myself going deeper and deeper into actual game development and going further away from my original goal of learning JavaScript. I ran into pretty complex challenges with the way I wanted the characters to be animated and moving around. Not wanting to go with a sprite based characters I did some skeletal animation work with a game character I whipped up in Sketch. Turns out animating skeletal characters without the proper tools is difficult. 

I ended up torn. One part of me wanted to figure this animation thing out and keep going with this project and one part of me wants to start again from nothing with a new set of goals. I never had ambitions with this project and I never felt the need of creating something complete but I felt like the project had reached its natural conclusion. I had a lot of fun with this project and learned a bunch of skill I never expected to learn. While I was comfortable with a pretty ambiguous plan for this project I'm most likely going to focus on more concise and smaller projects to help me learn more and to push me forward as a developer. With that I have decided to put this little project to pasture.

The game character Bobby is the reason I'm done with this project. He's way too good looking to be replaced with sprites but I'm not interested in solving the problems I currently face, I need something fresh. But needn't worry: I'll be taking Bobby wiht me. Now enjoy some gifs of him and his friends.

[![Character walking](https://i.gyazo.com/da672b772593b066c918051aae962772.gif)](https://gyazo.com/da672b772593b066c918051aae962772)

[![Manual enemy spawns](https://i.gyazo.com/0a53f7af454af279726465e79b719bc5.gif)](https://gyazo.com/0a53f7af454af279726465e79b719bc5)

[![Winning a fight](https://i.gyazo.com/844aa89a3f16b958734049725b7bc37e.gif)](https://gyazo.com/844aa89a3f16b958734049725b7bc37e)

[![Finding a familiar face](https://i.gyazo.com/290760f9d934e816ce55d40ada68ad77.gif)](https://gyazo.com/290760f9d934e816ce55d40ada68ad77)

[![Losing episode 1](https://i.gyazo.com/74e94e35a3f5b69d3f1966aa0028a3c0.gif)](https://gyazo.com/74e94e35a3f5b69d3f1966aa0028a3c0)

[![Losing episode 2](https://i.gyazo.com/116e21ba85170fddf4515aebab031cfb.gif)](https://gyazo.com/116e21ba85170fddf4515aebab031cfb)

[![Perfect game](https://i.gyazo.com/4e08b0a0fa3c03f989615d99ba6245d1.gif)](https://gyazo.com/4e08b0a0fa3c03f989615d99ba6245d1)

Disclaimer: I did not create the background image. If you did, please contact me. I stared at this picture a lot and I find it to be very nice.

-------------------------

Project built on [a pretty good boilerpate by jluccisano](https://github.com/jluccisano/webpack-es6-boilerplate). Thanks.

## Prerequisites

- [Node.js](http://es6-features.org)

## Features

- [Webpack](https://webpack.js.org/guides) (v3.5.5)
    - [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) (v2.7.1)
    - [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement)
    - [Clean Webpack Plugin](https://github.com/johnagan/clean-webpack-plugin) (v0.1.16)
- [ECMAScript 6](http://es6-features.org)
- [Babel](https://babeljs.io/docs/setup/#installation) (v6.26.0)
- [ESLint](https://eslint.org/docs/user-guide/getting-started) (v4.5.0)
- [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) (v20.0.4)
- [Sass](http://sass-lang.com/guide)

## Start Dev Server

1. Run `npm install`
2. Start the dev server using`npm start`
3. Open [http://localhost:9000](http://localhost:9000)


## Commands

- `npm start` - start the dev server
- `npm run build` - create build in `dist` folder
- `npm run lint` - run an ESLint check
- `npm run coverage` - run code coverage and generate report in the `coverage` folder
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode

## Licence

MIT

[npm]: https://img.shields.io/badge/npm-5.3.0-blue.svg
[npm-url]: https://npmjs.com/

[node]: https://img.shields.io/node/v/webpack-es6-boilerplate.svg
[node-url]: https://nodejs.org

[tests]: http://img.shields.io/travis/jluccisano/webpack-es6-boilerplate.svg
[tests-url]: https://travis-ci.org/jluccisano/webpack-es6-boilerplate

[cover]: https://codecov.io/gh/jluccisano/webpack-es6-boilerplate/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/jluccisano/webpack-es6-boilerplate
