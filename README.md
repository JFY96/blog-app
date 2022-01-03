# Blog Application

A blog web application built using React JS, using the [Blog Application](https://github.com/JFY96/blog-api) project as a back end.

This project was created to get familiar with various technologies and concepts including:
- Using TypeScript
- Usage of JWTs on the front end
- Usage of Refresh Tokens for JWTs in a React Application
- Using CSS Modules
- More practice using custom React Hooks
## Demo/Usage

To deploy.

## Technologies used

- Webpack, Babel
- TypeScript
- React
- SASS
- Other third party npm packages including React-Router, Axios, React-Markdown

## Quick Start

To get it running locally on your pc:

1. Set up Nodejs dev environment (npm etc)
2. In root of this repo, install dependencies:
    ```
    npm install
    ```
3. Set up environment variables file `.env` and `.env.development` in root directory using `.env-TEMPLATE` as a guideline
	- this should contain the URI of the blog API used
4. Ensure the server for the API is active
5. Start this application (development):
    ```
    npm run start
    ```
6. Visit http://localhost:8080/ to view site

To build production version of app, for step 5, instead do:
```
npm run build
```
   