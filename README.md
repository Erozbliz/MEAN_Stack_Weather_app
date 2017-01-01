## Présentation

MEAN STACK
Tutoriel : <br />
https://www.sitepoint.com<br />
http://jasonwatmore.com/<br />
Travis Tidwell tutorial<br />
Express and MongoDB Brad Traversy<br />

## Le projet final est le TEST3

## Client
Utilisation : HTML, AngularJS, JS, JQuery, Bootstrap, CSS, Openweathermap, Mapbox.   

## Prérequis
nodeJS, MongoDB, robomongo, postman extension(chrome),


## Installation démo
Faire un : "npm install" à la racine du projet<br />
Faire un : "node server.js" pour lancer le serveur(pour TEST1)<br />
Faire un : "node www" pour lancer le serveur(pour TEST2 dossier bin)<br />
Faire un : "node app.js" pour lancer le serveur(pour TEST3)<br />
Créer l'arborescence "C:\data\db" (c'est ici que la bdd va se trouver)<br />


Lancer la base de donnée MongoDB <br />
C:\Program Files\MongoDB\Server\3.2\bin<br />
et faire "mongod.exe"<br />

## Installation projet
- Faire un : "npm install" dans dossier client et serveur<br />
- Lancer la base de donnée MongoDB avec "mongod"<br />
(ou C:\Program Files\MongoDB\Server\3.2\bin<br />
et faire "mongod.exe")<br />
- Faire un : "node index.js" pour lancer simplement le serveur(dans le dossier serveur)<br /><br />
- Pour client (Pas encore testé)
<br />Faire un : "npm install -g yo"
<br />Faire un : "npm install -g generator-angular"
<br />Faire un : "bower install --save restangular"  -> option restangular

- Faire un : "grunt serve" pour lancer le serveur + client(dans le dossier client)<br />


## Informations complémentaires

Possiblité de se rendre sur les url depuis un autres appareil en faisant </br>
adresseIpDuServeur:3000/...
</br>
adresseIpDuServeur est l'adresse ip de l'ordinateur qui a lancé le "node server.js"

<br />
Commande de base si les ports sont déjà occupés :<br />
netstat -ano | find ":3000" <br />
TASKKILL /PID 10856 -f <br />
<br />
installer yo</br>
</br>
si pb :   at Function.Module._resolveFilename (module.j...</br>
npm install ms



