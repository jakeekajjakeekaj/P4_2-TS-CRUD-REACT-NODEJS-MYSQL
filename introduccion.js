// Lo que haremos para esta ocasión, es que vamos a transformar el código que ya se tenía a TS, por lo que lo que se hará es:
// Una vez creada la carpeta de server y los archivos de .gitignore, .nvmrc, introduccion.js y README.md creamos un "npm create vite" colocando el nombre de "client" para la creación de nuestra carpeta client y dentro los archivos que se alojarán, ahora nos metemos a esta carpeta desde la consola y ejecutamos "npm install" y después ya podemos escribir "npm run dev" siguiendo las instrucciones que se nos indica al momento de crear el proyecto vite

// Ahora para el lado del server, lo que se hará es que en la consola, dentro de server escribiremos "npm init" y después instalaremos los paquetes "npm i mysql express"

// Ahora procederemos a limpiar un poco ya que se tiene código de ejemplo, para esta entramos a client y en App.jsx quitamos todo y agregamos un código básico, podemos eliminar el App.css ya que ya no se está utilizando más, de igual manera eliminamos todo el código de index.css y el main.jsx lo dejamos igual.

// Ahora nos dirigiremos al lado del server, y dentro del package.json, escribimos dentro de "scripts" lo que ya conocemos para inicializar de forma rápida a nuestro servidor "dev": "nodemon index.js"

// Instalamos del lado del servidor "npm i nodemon -D", la -D indica que se instalará dentro de las dependencias, pero que no será necesario tenerse para el deploy

// Ahora definimos nuestro index.ts del lado del servidor, definiendo así los tipados que nos pide TS y no solo eso, sino que también en la consola del lado del server, necesitamos instalar: "npm i --save-dev @types/express @types/node" para que funcionen los tipados, ya que de lo contrario estos no funcionarían, y así funcionan tanto con express como con node

// ** HASTA AQUÍ NO FUNCIONA COMO ESPERAMOS, PORQUE HAY COSAS QUE DEBEMOS CAMBIAR AL USAR TS **

// Debemos instalar "npm install ts-node typescript --save-dev"
// Esto se encargará d instalarlo como dependencias de desarrollo
// Dentro del package.json configurar a TS:
// {
//   "scripts": {
//         "dev": "nodemon --experimental-loader ./loaders.mjs src/index.ts"

//   }
// }
// --experimental-loader indica que es algo experimental, de esta manera ya no usamos --loader y no dependemos de los cambios que hagan después en Node, y así nosotros nos encargamos de cargar el archivo loaders.mjs
// Crear un tsconfig.json que aunque es opcional, es recomendable para que así ts-node sepa cómo compilar el código:
// npx tsc --init
// Así mismo en server creamos un loaders.mjs y dentro del mismo escribiremos: 
// import { register } from 'node:module';
// import { pathToFileURL } from 'node:url';

// register('ts-node/esm', pathToFileURL('./'));
// y listo, esto solo es necesario si deseamos usar el import en vez del require, sin embargo se preguntará para ver si es necesario tanto, o si mejor usamos el require

// *** AL FINAL MANEJAREMOS index.js en vez de .ts, queda comprobado que en proyectod grandes si usan al index como js y no solo eso, sino que al parecer si es buena práctica usar js en vez de ts ***

// *** AL FINAL FINAL SI MANEJAREMOS TODO CON TS, PERO SERÁ DIFERENTE, MODIFICAMOS NUESTRO package.json quitando el "module": "type" y aparte instalamos @types/cors, aparte creamos un tsc con esta configuración:
// {
//   "compilerOptions": {
//     "target": "es6",
//     "module": "commonjs",
//     "strict": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true,
//     "outDir": "./dist"
//   }
// }
// y listo, a su vez para evitar tener problemas, ya no mencionaremos las extensiones .ts, ya que de incluirlas en los import, nos podría generar algunos problemas y se tendrían que hacer más movimientos que realmente no es tan necesario