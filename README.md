
# Open-vote

![GitHub License](https://img.shields.io/github/license/andrescampill/vote-app)


Open-vote is a free and open source app made with the needs of most non-profits organisations in mind. With its basic UI, and non-complex use, most people are able to manage most operations with the app. 

> [!NOTE]
> This project has been started and its manteined by an engineering student, so expect slow development and updates. For more information refer to the Contributing section.

> [!IMPORTANT]
> Existe una versión en español de este README, acceda a través del siguiente [enlace](README_ES.md).
>
> There's a spanish version of this README, access to it through the following [link](README_ES.md)

> [!WARNING]
> Some parts of the GUI are in Spanish, translations is beeing added in the future, refer to the [roadmap](#roadmap) for more information.

## Table of contents


- [Open-vote](#open-vote)
  - [Table of contents](#table-of-contents)
  - [About](#about)
    - [Technology used](#technology-used)
  - [Downloading and installing](#downloading-and-installing)
    - [Installation](#installation)
    - [Run Locally](#run-locally)
    - [Deployment](#deployment)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [More documentation](#more-documentation)

## About

The open-vote project is an open source web app made to help non-profit organisations (NGO) to manage online voting saftly and easily, beeing able to create, activate, deactivate, edit, remove and see voting processes. 

During the COVID-19 pandemic, thousands of people were require to transform all of their main workflows into the digital spectrum. Non profits wern't less, actually having a really big impact on their work because lots of them have no to little budged, for that reason, open-vote was created, helping NGOs transform their whole meetings into the digital world.

To get started with the project, continue to [Downloading and installing](#downloading-and-installing).



### Technology used

This web app has been made with the [Nuxt](https://nuxtjs.org) framework, giving the ability to handel front and back end from the same repository and code base.

Most code has been written in JavaScript, HTML and CSS (inside the `.vue` files).

## Downloading and installing

At the moment, you need to build first before moving to the actual hosting/deploy part.

1. Firstly, download the code from the GitHub repository using the web GUI or the following command:
    ```bash
      git clone https://github.com/andrescampill/vote-app.git
    ```

2. Then open the folder with all the files:
   ```bash
   cd vote-app
   ```

### Installation

3. When you have all the files ready, proceed with the installation of all the dependencies that the project needs:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```
    
### Run Locally

You can start a development server on `http://localhost:3000` using: 
```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

You can also run a local production build of the project with, but remember to build the app first, checkout [deployment](#deployment) for more infomation.

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```


### Deployment

To make a production build for actual hosting, you can run:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

If you need more information regarding the deployment, please refer to the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) of Nuxt


## Roadmap

- WebSocket integration
- English Translation of the GUI
- Bulk vote edit.

## Contributing

Contributions are always welcome in the project! 

You are free to make any issues or pull request to the GitHub repository, all of them will be checked out.

Please follow normal community guidelines for contributing.

This project is mainly mantained by students so expect low frequent updates.

## More documentation
Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Check out the [Vue documentation](https://vuejs.org/guide/introduction.html) for more information about the front-end framework. 