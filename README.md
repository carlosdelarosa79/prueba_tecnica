# WebServer + RestServer

Para clonar el repositorio deben ejecutarel sigueinte comando  ```git clone https://github.com/carlosdelarosa79/prueba_tecnica.git```

Recuerden que deben de ejecutar ```npm install``` para reconstruir los módulos de Node.

Para poder probar la app deben ejecutar ```npm start```

Puede utilizar este usuario de prueba o crear su propio usuario  ```USUARIO: test@test.com  CONTRASEÑA: 1234```


Documentacion:
Se realiza el proyecto de una pagina web , para prueba tecnica , se utiliza js y boostrap y html se realiza la parte del back un poco robusta por la cual se realiza algunas validaciones y en la parte del front algo sencillo la cual solo se utiliza html , sin ningun framework, en esta carpeta llamada prueba tecnica encontramos una serie de carpetas separadas con sus respectivos nombres y cada una de ellas con sus archivos, para una mejor arqiuitectura, orden y renderizacion del proyecto.
en la carpeta ```controllers``` vamos a encontrar 02 files las cuales estan la implementacion de los path de los servicios, despues encontramos la sigueinte carpeta llamada ```database``` como su nombre lo indica es aquella la cual nos conectamos a la DB que realice para este ejercicio en cloud.mongodb.com , tenemos la siguiente carpeta llamada ```helpers``` la cual tenemos 3 archivos y estos nos ayuda a realizar unas validaciones para a DB , generar un JWT y verifica en google , ya que en este proyecto agregue un login para cuando el usuario desee registarse con su cuenta de google , seguimos con la carpeta llamada ```middlewares``` son unas funciones las cuales antes de ejecutar algo , ejecuto las funciones de los middlewares, la cual me realizara una validacion de input y el JWT ```models``` en esta carpeta defino el modelo de la tabla la cual va tener los campos requeridos, como tipo de datos , que propiedades va tener la tabla, cual campo sera obligatorio, por los parametros dados por la prueba tecnica, tenemos la carpeta llamada ```node_modules``` son todos los modulos este viene por default cuando instalamos los package.json, tenemos la carpeta llamada ```public``` aca tenemos la parte del front con su archivo html y dentro de esta tenemos una serie de secciones para poder renderizar y que sea mas legible el codigo y dentro estas secciones tenemos tenemos los container , input label con sus respectivas etiquetas , index.js ya que este archivo nos realiza una serie de funciones para poder darle funcionamiento interactividad a lo que esta en nuestro html, despues tenemos la carpeta llamada ```routes``` la cual tenemos 02 archivosaca tenemos los paths, donde tenemos los user la cuales aplicamos los put get, post, delete , y tenemos el file llamado ```.env``` la cual tenemos el puerto , la url de la db con sus respectivas credenciales para conectarnos a la DB , puerto y google .