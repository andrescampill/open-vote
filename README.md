
# Open-vote

![GitHub License](https://img.shields.io/github/license/andrescampill/vote-app)


Open-vote es una aplicación gratuíta y de código abierto hecha con las necesidades de las asociaciones y entidades sin animo de lucro en mente. Con una interfáz básica y un uso no complejo, la mayoría de las personas son capaces de operar la aplicación.

> [!NOTE]
> Este proyecto ha sido comenzado y es mantenido por un estudiante de ingeniería, por lo que puede esperar un desarrollo lento y poca frecuencia de actualizaciónes. Para más información, lea la sección de Contribución

> [!IMPORTANT]
> Existe una versión en inglés de este README, acceda a través del siguiente [enlace](README_EN.md).
>
> There's an english version of this README, access to it through the following [link](README_EN.md)

> [!WARNING]
> Algunas partes de la interfáz estan en español. Diversas traducciones serán añadidas en el futuro, lea [roadmap](#roadmap) para más información.

## Índice


- [Open-vote](#open-vote)
  - [Índice](#índice)
  - [Sobre el proyecto](#sobre-el-proyecto)
    - [Tecnología usada](#tecnología-usada)
  - [Descarga e instalación](#descarga-e-instalación)
    - [Installation](#installation)
    - [Ejecución local](#ejecución-local)
    - [Despliegue](#despliegue)
  - [Roadmap](#roadmap)
  - [Contribuciones](#contribuciones)
  - [Más información](#más-información)

## Sobre el proyecto

El proyecto open-vote es una aplicación web de código abierto, hecha para ayudar a organizaciones sin ánimo de lucro a manejar votaciones online de forma segura y facil y permitiendo la creación, activación desactivación, edición, eliminación and observación de las votaciones.

Durante la pandemia de la COVID-19, miles de personas tuvieron que transformar todas sus costumbres dentro del espectro digital. Las organizaciones sin ánimo de lucro no fueron menos, teniendo un mayor impacto ya que muchas de ellas trabajan con un presupuesto bajo o nulo, por esta razón, open-vote fue creado, ayudando a ONGs a transformar todas sus reuniones dentro del mundo digital.

Para comenzar a usar el proyecto, continua a [descarga e instalación](#downloading-and-installing).



### Tecnología usada

Esta aplicación web ha sido usada con el framework [Nuxt](https://nuxtjs.org), dando la habilidad de manejar el front y back-end desde el mismo repositorio y base de código.

La mayor parte del código ha sido escrita en JavaScript, HTML y CSS (dentro de archivos `.vue`)


## Descarga e instalación

Por el momento, necesitas hacer el build del proyecto antes de poder proceder a desplegarlo en servidores.

1. Primero, descargue el código desde el repositorio de Github usando la interfáz web o el siguiente comando:

    ```bash
      git clone https://github.com/andrescampill/vote-app.git
    ```

2. Proceda a abrir la carpeta con el código
   ```bash
   cd vote-app
   ```

### Installation

3. Cuando tenga todos los archivos preparados, proceda a la instalación de todas la dependencias que el proyecto necesita:

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
    
### Ejecución local

Puede comenzar un servidor de desarrollo local en `http://localhost:3000` usando: 
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

Tambien puede ejecutar una build de producción en un ambiente local, pero recuerde que primero necesita obtener la build, consulte [deployment](#deployment) para más información.

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


### Despliegue

Pada obtener la build de producción para el despligue y alojamiento, use

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

Si necesita más información sobre el despliegue, consulte la [documentación de despliegue (en inglés)](https://nuxt.com/docs/getting-started/deployment) de Nuxt.


## Roadmap

- Integración con WebSockets
- Traducción de la interfáz a Inglés

## Contribuciones

¡Cualquier contribución al proyecto es bienvenida!

Siempre es libre de crear `issues` o `pull request` al repositorio de Github, todas ellas serán revisadas.

Este proyecto se encuentra mantenido principalmente por estudiantes, por favor, espere poca frecuencia en modificaciones y actualizaciones

Por favor, sigua normás básicas de convivencia a la hora de contribuir.


## Más información
Consulte la [documentación de Nuxt](https://nuxt.com/docs/getting-started/introduction) para aprender más sobre la tecnología utilizada.

Consulte la [documentación de Vue](https://vuejs.org/guide/introduction.html) para más información sobre la tecnología usada en el front-end. 