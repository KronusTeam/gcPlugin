# gcPlugin
gcPlugin es un plugin javascript basado en jquery, que contiene varias de las funciones más utilizadas, reduciendo el tiempo de que los desarrolladores utilizan en la busqueda de estas.

>No todas las funciones fueron creadas por nosotros,sino son resultado de un largo proceso de busqueda de una funcion optima para cumplir con ese requisito y las cuales si muchas fueron modificadas.

***
## Requerimientos
- [x] Jquery 1.9 o superior.
```
 <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
```

***
## ¿Como utilizar?
Muy Simple, solo recuerda tener ya importado JQuery como lo mencionamos anteriormente, luego solo basta importar el archivo de gcPlugin.
```
 <script src="turuta/gcPlugin.js"></script>
```
Una vez importado gcPlugin ya estas listo para utilizar las funciones que necesites :).

***
## Funciones Incluidas
- uiLock & uiUnlock
- goTop
- sleepFor
- isValidRut (checkDV - checkCDV)
- getDV (asdasd)
- preLoadImage
- isValidDate
- convertirFechaAIngles
- getNowDate
- getUrlVars
- isValidText
- isValidEmail
- isValidPhone
- isNumeric
- searcher
- getCookie
- setCookie
- checkCookie
- createXML
- moveScroll
- relocate
- cleanAccents
- exportTableToExcel

***
## Documentación
***
### uiLock & uiUnlock
uiLock 6 uiUnlock bloquean y desbloquean respectivamente la interfaz de usuario, la interfaz quedará bloqueada hasta que se aplique el uiUnlock;
#### uiLock - Parámetros
+ content - string o contenido html se integrara al div de bloqueo

#### Utilización
```
$.fn.uiLock(); // Bloquea la Interfaz
//nuestro código a ejecutar mientras
//la interfaz se encuentra bloqueada
$.fn.uiUnlock();// Desbloquea la interfaz
```
Utilizando parámetros en uiLock
```
$.fn.uiLock('Cargando...'); //Mensaje simple

$.fn.uiLock('<center><img src="loading.gif" /></center>'); //Adding html
```
***
### goTop
Aparece un botón (imagen) flotante que permite volver al top del sitio. Este botón aparece solo cuando cierto elemento ya no es visible en pantalla por ejemplo el menú o logo superior.
#### goTop - Parámetros
+ selector - selector (#id o .clase) del elemento que servira como referencia para ocultar y mostrar el botón.
+ src (opcional) - source path para el cambiar la imagen del botón flotante, para adaptarlo al estilo propio del sitio. por defecto es una flecha negra.

#### Utilización
```
$.fn.goTop("#logo"); // cuando ya no se vea el elemento #logo aparecera el botón para volver al top.
o
$.fn.goTop("#tuSelector"); // cuando ya no se vea el elemento #menu aparecera el botón para volver al top.
```
Utilizando parámetros en goTop
```
//referencia absoluta
$.fn.goTop("#logo","http:www.tusitio.com/images/botontop.png"); // cuando ya no se vea el elemento #logo aparecera el botón para volver al top.
//o referencia relativa
$.fn.goTop("#logo","../images/botontop.png"); // cuando ya no se vea el elemento #logo aparecera el botón para volver al top.
```
***
### sleepFor
Realiza una pausa en el código antes de ejecutar la siguiente linea.
#### sleepFor - Parámetros
+ sleepDuration - milisegundos. Duración del tiempo de espera.

#### Utilización
```
$.fn.sleepFor(2000); // Duerme por 2 segundos.
```
***
### isValidRut (Chile)
Valida si la es un rut valido, retornando true o false. Además da formato agregando puntos y guión independiente de la forma en que sea ingresado el rut.
#### isValidRut - Parámetros
+ boolAutoComplete - boolean (opcional - default = false). true para autocompletar el rut añadiendo automaticamente el digito verificador.
+ rutA - cadena (opcional). rut a validar (solo en caso de no llamarlo directo desde input)

#### isValidRut - return
+ boolean

#### Utilización
```
var sw = $("#inputTextCampoRut").isValidRut();
//----------
if($("#inputTextCampoRut").isValidRut()){
	console.log('rut valido');
}else{
	console.log('Rut Invalido');
}
```
### getDV (Chile)
retorna el digito verificador de un rut ingresado.
#### getDV - Parámetros
+ rut - cadena. Rut para obtener el digito verificador, sin puntos ni guión.

#### getDV - return
+ número o k.

#### Utilización
```
var dv = $.fn.getDV('18923777');
```
### preLoadImage (Chile)
retorna el digito verificador de un rut ingresado.
#### preLoadImage - Parámetros
+ rut - cadena. Rut para obtener el digito verificador, sin puntos ni guión.

#### preLoadImage - return
+ número o k.

#### Utilización
```
var dv = $.fn.getDV('18923777');
```