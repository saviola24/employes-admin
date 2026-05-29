# REPONSES.md

## Question 1.1
Le `dataProvider` est l'interface entre React-Admin et l'API backend.
Il traduit les actions CRUD de l'interface (liste, création, modification, suppression)
en requêtes HTTP (GET, POST, PUT, DELETE) vers l'API REST.
Sans dataProvider, React-Admin ne sait pas comment communiquer avec le serveur.

## Question 1.2
Au chargement de la liste, la requête envoyée est :
`GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=10`
Elle récupère les employés avec tri, pagination et filtres encodés en paramètres URL.

## Question 2.1
La prop `rowClick="edit"` sur le Datagrid redirige l'utilisateur vers le formulaire
de modification de l'employé lorsqu'il clique sur une ligne du tableau.

## Question 2.2
En passant `perPage={2}`, seuls 2 employés s'affichent par page.
La pagination en bas de liste devient active et permet de naviguer entre les pages.
React-Admin envoie `_start=0&_end=2` puis `_start=2&_end=4`, etc.

## Question 3.1
Si le formulaire est soumis sans remplir le prénom, React-Admin affiche
un message d'erreur rouge sous le champ : "Required" (ou "Ce champ est requis").
Le formulaire ne se soumet pas tant que le champ n'est pas rempli.

## Question 3.2
En saisissant un salaire de 500 €, la validation `minValue(1500)` se déclenche
et affiche le message : "Salaire minimum : 1500 €".
Le formulaire est bloqué et aucune requête n'est envoyée au serveur.

## Question 4.1
Lors de la sauvegarde d'une modification, React-Admin envoie une requête HTTP **PUT**
vers `http://localhost:3002/employees/:id` avec le corps JSON contenant toutes les données.

## Question 4.2
`useRecordContext()` est disponible uniquement à l'intérieur d'un composant enfant
d'un contexte React-Admin (Edit, Show, Datagrid row, etc.).
Si l'enregistrement n'est pas encore chargé (chargement en cours), il retourne `undefined`.
C'est pourquoi on vérifie `if (!record) return ...` avant d'utiliser ses propriétés.

## Question 5.1
- `SimpleShowLayout` : affiche tous les champs en liste verticale simple, les uns sous les autres.
- `TabbedShowLayout` : organise les champs en plusieurs onglets cliquables,
  utile quand il y a beaucoup de champs à regrouper par catégorie.