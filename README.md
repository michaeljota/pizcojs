# PizcoJS

Este fue el proyecto de final de carrera para optar para el título de Ingeniero
en Informática en la Universidad Rómulo Gallegos. Hecho por, los ahora
ingenieros, Michael De Abreu y Jose Seijas. 

## Licencia

Se libera bajo licencia MIT. Ver en LICENSE.md

## Requisitos

* NodeJS (v0.12.x)
* Bower
* Grunt

## Lista de tareas

* `npm start`: Inicia `grunt serve` desde el grunt local.
* Tareas grunt (Debes tener instalado `grunt-cli` en global para usarlas o llamarlas con el `grunt-cli` dentro de `node_modules`):
    * `grunt serve`: Sirve la página para desarrollo.
    * `grunt test`: Realiza las pruebas. (Shame on me, esta app no tiene pruebas)
    * `grunt build`: Construye la app para ser distribuida. En principio, creo que no funciona. :D. 

## Información Adicional

Basado en [Angular-Fullstack Generator (v2)](https://github.com/angular-fullstack/generator-angular-fullstack/tree/legacy-2.x.x)

Sin embargo, la base de datos se ha cambiado de MongoDB a NeDB para que sea en
memoria. Además, se hicieron modificaciones en los arhivos del frontend para
que siguieran la guia de estilos de John Papa para la programación en AngularJS
([link](https://github.com/johnpapa/angular-styleguide/tree/master/a1)). 

Por lo tanto, ninguno de los archivos generados por el generador son
compatibles con esta aplicación y deben de modificarse para que sigan las
mismas caracteristicas.

## Aviso

Esta versión se libera tal como está y no se mantendrá más. Tengo por hacer
una nueva versión adaptada a los estandares actuales y a futuro. Por la misma
razón no se aceptaran PR ni nuevas Issues.

Actualizaré esta información con el link a la nueva aplicación.

