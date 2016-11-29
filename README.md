## Présentation

MEAN STACK

## Prérequis


## Installation
Faire un : "npm install" dans à la racine du projet<br />
Faire un : "node server.js" pour lancer le serveur(pour TEST1)<br />
Faire un : "node www" pour lancer le serveur(pour TEST2 dossier bin)<br />
Créer l'arborescence "C:\data\db" (c'est ici que la bdd va se trouver)<br />

Lancer la base de donnée MongoDB <br />
C:\Program Files\MongoDB\Server\3.2\bin<br />
et faire "mongod.exe"<br />

Pour tester<br />
netstat -ano | find ":27017"<br />


## Informations complémentaires

Commande de base si les ports sont déjà occupés :<br />
netstat -ano | find ":2222" & netstat -ano | find ":3333" <br />
TASKKILL /PID 10856 -f <br />


