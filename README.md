# portaria-294
Repository for the front-end application that validates "Portaria nº 294" from the Brazillian Ministry of Economy for length-based products
---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Prerequisites

To use this app, you need to have the following installed on your system:

- Node.js (version 12 or higher)
- npm (version 6 or higher)

## Installation

To install this app, clone the repository and run the following command:

```
npm install
```

This will install all the dependencies required by the app.

## Usage

To start the app, run the following command:

```
npm run start
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

To deploy the app on GitHub Pages, change the "homepage" value in `package.json`, to your personal link (`https://<username>.github.io/<repository-name>`), and run the following command:

```
npm run deploy
```

This will build the app and deploy it on the `gh-pages` branch of the repository. The app will be available at `https://<username>.github.io/<repository-name>`.

To use environment variables in your app, create a file called `.env` in the root of the project and define your variables. The necessary ones can be seem in `example.env` file. This file is filled with the latest parametres from the law 'till the last commit in this repo.

Note that, for new variables, its names must begin with `REACT_APP_` to be recognized by Create React App.

To use an environment variable in your code, use the `process.env` object as follows:

```typescript
const apiKey = process.env.REACT_APP_API_KEY;
```

## Contributing
If you want to contribute to this app, please fork the repository and create a new branch for your changes. After making your changes, submit a pull request to the `main` branch.






