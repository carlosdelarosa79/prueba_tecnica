# WebServer + RestServer

Para clonar el repositorio deben ejecutarel sigueinte comando  ```git clone https://github.com/carlosdelarosa79/prueba_tecnica.git```

Recuerden que deben de ejecutar ```npm install``` para reconstruir los módulos de Node.

Para poder probar la app deben ejecutar ```npm start```

Puede utilizar este usuario de prueba o crear su propio usuario  ```USUARIO: test@test.com  CONTRASEÑA: 1234```


Documentacion:
Se realiza el proyecto de una pagina web , para prueba tecnica , se utiliza js, y boostrap se realiza la parte del back un poco robusta por la cual se realiza algunas validaciones y en la parte del front algo sencillo la cual solo se utiliza html , sin ningun framework, en esta carpeta llamada prueba tecnica encontramos una serie de carpetas la cual tiene cada uno una funcion para un mejor renderizacion del proyecto se separa los componentes y funciones por carpetas , en la carpeta ```controllers``` vamos a encontrar 02 files las cuales estan la implementacion de los path de los servicios, despues encontramos la sigueinte carpeta llamada ```database``` como su nombre lo indica es aquella la cual nos conectamos a la DB que realice para este ejercicio en cloud.mongodb.com , tenemos la siguiente carpeta llamada ```helpers``` la cual tenemos unas clases en esa carpeta ´para darle mejor manejo y renderizar mejor nuestro proyecto se realiza por buenas practicas , seguimos con la carpeta llamada ```middlewares``` la cual tenemos 03 files la cuales son una funciones las cuales me ayudaran antes de realizar una peticion me ayudan a una validacion de la info que me llegue de la parte del back, tenemos la carpeta llamada ```models``` la cual en los files defino el modelo de la tabla la cual va tener los campos requeridos, como tipo de datos , que propiedades va tener la tabla, cual campo sera obligatorio, por los parametros dados por la prueba tecnica, tenemos la carpeta llamada ```node_modules``` son todos los modulos este viene por default cuando instalamos los package.json, tenemos la carpeta llamada ```public``` aca tenemos la parte del front con su files html, index.js, despues tenemos la carpeta llamada ```routes``` la cual tenemos 02 files la cuales teneos los paths, donde tenemos los user la cuales aplicamos los put get, post, delete , y tenemos el file llamado ```.env``` la cual tenemos el puerto , la url de la db .