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

## Question 6.1
ReferenceField envoie : GET /employees?id=1 (ou GET /employees/1)
pour résoudre le manager lié au stagiaire.

## Question 6.2
Si managerId ne correspond à aucun employé, ReferenceField affiche
une cellule vide ou le texte "Not Found" selon la version de React-Admin.

## Question 7.1
InternCreate envoie POST /interns avec le corps JSON du stagiaire.

## Question 7.2
On utilise useWatch (de react-hook-form) pour lire isRemunerate en temps
réel dans le formulaire. Il permet de réagir aux changements de valeur
d'un champ sans soumettre le formulaire.

## Question 8.1
- ReferenceField : composant déclaratif, s'utilise dans un contexte List/Show,
  React-Admin optimise les requêtes en batch.
- useGetOne : hook impératif, utilisable n'importe où dans un composant React,
  plus flexible mais sans optimisation automatique.
On préfère useGetOne quand on est hors d'un contexte React-Admin standard.

## Question 8.2
Sans { enabled: !!id }, useGetOne envoie GET /employees/undefined ce qui
provoque une erreur 404. Le paramètre enabled: false empêche l'appel
tant que l'id n'est pas disponible.

## Question 9.1
- ReferenceManyField : déclaratif, lié à un champ FK, dans un contexte Show/Edit.
- useGetList : hook impératif, utilisable partout, avec filtres dynamiques.
useGetList est indispensable quand on a besoin de filtres complexes ou
d'être hors d'un contexte React-Admin.

## Question 9.2
On passe pagination: { page: 1, perPage: 1 } : json-server retourne
le header X-Total-Count sans charger tous les enregistrements.
On lit uniquement `total`, pas `data`.

## Question 10.1
useUpdate utilise PUT par défaut.
Pour forcer PATCH : useUpdate() puis passer mutationOptions: { method: 'PATCH' }
ou configurer le dataProvider.

## Question 10.2
previousData est nécessaire pour que React-Admin puisse faire un diff
et effectuer un merge optimiste (optimistic update). Sans lui, React-Admin
ne sait pas quelle était la valeur précédente et peut écraser des champs.

## Question 11.1
- useCreate : hook bas niveau, utilisable dans n'importe quel composant
  (modale, bouton...), sans changer de page.
- <Create> : composant haut niveau qui gère toute une page avec formulaire,
  redirect, notifications automatiques.

## Question 11.2
On appelle useRefresh() de React-Admin dans le callback onSuccess de useCreate.
Cela force React-Admin à re-fetcher la liste courante.

## Question 12.1
Les 4 appels useGetList se font en parallèle. React (et React-Admin)
déclenche tous les hooks simultanément au render, sans attendre le résultat
de l'un avant de lancer le suivant.

## Question 12.2
perPage: 1 est préférable car on n'a besoin que du total (X-Total-Count),
pas des données. Charger 100 enregistrements pour n'afficher qu'un chiffre
serait un gaspillage de bande passante et de mémoire.