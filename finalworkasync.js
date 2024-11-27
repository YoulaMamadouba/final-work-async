// exo 1 Créez une fonction delayedMessage 
// qui retourne une Promise qui se résout après 2 secondes avec le message "Bonjour!".

function delayedMessage() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Bonjour!"); 
        }, 2000);
    }); 
}
  
// Test
delayedMessage().then(message => console.log(message));
// Devrait afficher "Bonjour!" après 2 secondes

// exo 2 
// Si b n'est pas 0, on résout la Promise avec le résultat
// Si b est 0, on rejette la Promise avec un message d'erreur

function divideNumbers(a, b) {
    
    return new Promise((resolve, reject) => {
        if (b !== 0) {
          resolve(a / b); 
        } else {
          reject("division par zero impossible"); 
        }
    });
}
  
// Tests
divideNumbers(10, 2).then(result => console.log(result)); // devrait afficher 5
divideNumbers(10, 0).catch(error => console.log(error)); // devrait afficher "Division par zéro impossible!"
  
// exo 3 

function fetchUser(id) {
  // Doit retourner une Promise qui se résout après 1s avec: { id: id, name: "User " + id }
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({ id: id, name: "User " + id });
    }, 1000);
  });
}

function fetchUserPosts(user) {
  // Doit retourner une Promise qui se résout après 1s avec un tableau de posts
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { postId: 1, title: " for family " },
        { postId: 2, title: "far from home" },
      ]);
    }, 1000);
  });
}

function fetchPostComments(post) {
  // Doit retourner une Promise qui se résout après 1s avec un tableau de commentaires
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { commentId: 1, content: "Comment 1" },
        { commentId: 2, content: "Comment 2" },
      ]);
    }, 1000);
  });
}

function getFirstPostComments(userId) {
  // Utilisez les 3 fonctions précédentes en chaîne pour obtenir les commentaires
  // du premier post de l'utilisateur
  // Étape 1 : Récupérer l'utilisateur
  return fetchUser(userId)
    .then((user) => {
      // Récupérer user 
      console.log("Utilisateur récupéré:", user);
      // les posts de cet utilisateur
      return fetchUserPosts(user);
    })
    .then((posts) => {
      console.log("Posts récupérés:", posts);
      // Prendre le premier post et récupérer ses commentaires
        return fetchPostComments(posts[0]);
      } 
    )
    .then((comments) => {
      console.log("Commentaires du premier post:", comments);
      return comments;
    })
    .catch((error) => {
      console.error("Erreur:", error.message);
    });
}

getFirstPostComments(1);

// exos 4 

// reprendre l'exo 3 mais avec la methode asyn/await au lieu de then 
// reprise de juste la partie fonction 
// Fonction principale réécrite avec async/await sans try/catch

async function getFirstPostCommentsAsync(userId) {

    const user = await fetchUser(userId);

    console.log("Utilisateur récupéré :", user);

    const posts = await fetchUserPosts(user);

    console.log("Posts récupérés :", posts);

    const comments = await fetchPostComments(posts[0]);

    console.log("Commentaires du premier post :", comments);
  
    return comments;
}

// exo 5 

// Créez une fonction qui récupère en parallèle les informations d'une ville :

function getCityInfo(town) {
    // les promesses de meteo , population , et pour les monuments 
    const meteoPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ temps: 20, condition: "Ensoleillé" });
      }, 1000);
    });
  
    const populationPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve(1000000);
      }, 1000);
    });
  
    const monumentsPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve(["Monument 1", "Monument 2"]);
      }, 1000);
    });
  
    // Utilisation de Promise.all pour récupérer les 3 informations en parallèle
    return Promise.all([meteoPromise, populationPromise, monumentsPromise])
      .then(([meteo, population, monuments]) => {
        return {
          town: town,
          meteo: meteo,
          population: population,
          monuments: monuments
        };
    });
}

// Test de la fonction
getCityInfo("Miami")
  .then(townInfo => {
    console.log(townInfo);
})
.catch(error => console.log(error));

// exo 6 
// // Utilisation de Promise.race pour obtenir la réponse la plus rapide du server 

function getFastestServer() {
    // Simulation des  ppels aux serveurs avec des délais différents (en millisecondes)
    const server1 = new Promise(resolve => {
      setTimeout(() => {
        resolve("Réponse du Serveur 1");
      }, 3000);  
    });
  
    const server2 = new Promise(resolve => {
      setTimeout(() => {
        resolve("Réponse du Serveur 2");
      }, 1000);  
    });
  
    const server3 = new Promise(resolve => {
      setTimeout(() => {
        resolve("Réponse du Serveur 3");
      }, 2000);  
    });

    return Promise.race([server1, server2, server3])
      .then(response => {
        return response;  // La première réponse reçue sera retournée
    });
}
// simulation 
getFastestServer()
.then(response => {
    console.log("Réponse la plus rapide:", response);
    
})

// exo 7

// exo 8 

function timeoutstuff(tasks, timeout) {
    // creation d'une promesse qui sera rejetée après le délai du timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout dépassé")), timeout);
    });
  
    //toutes les tâches en parallèle seront executées avec Promise.all
    const tasksPromise = Promise.all(tasks);
  
    // Utiliser Promise.race pour renvoyer la première promesse qui se résout ou qui se rejette
    return Promise.race([tasksPromise, timeoutPromise]);
}

// text 

const task1 = new Promise(resolve => setTimeout(resolve, 1000, "tâche 1"));
const task2 = new Promise(resolve => setTimeout(resolve, 2000, "tâche 2"));
const task3 = new Promise(resolve => setTimeout(resolve, 3000, "tâche 3"));

const tasks = [task1, task2, task3];

timeoutstuff(tasks, 2500)
  .then(results => {
    console.log("Résultats des tâches :", results);  // Sera appelé si tout se termine avant 2500 ms
})
.catch(error => {
 console.log(error.message);  // Affiche "Timeout dépassé" si le timeout est dépassé
});

// exo 9

// exo 10 

function executeAllTasks(tasks) {
    return Promise.allSettled(tasks)
      .then(results => {
        // Initialisation  des tableaux de réussite et d'échec
        const succ = [];
        const fail = [];
  
        // Parcourir les résultats de toutes les promesses
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            // Si la promesse a réussi, on ajoute la valeur au tableau "succ"
            succ.push(result.value);
          } else {
            // Si la promesse a échoué, on ajoute la raison de l'échec au tableau "fail"
            fail.push(result.reason);
          }
        });
  
        // Retourner un objet avec les deux tableaux
        return {
          succeeded: succ,
          failed: fail
        };
    });
}
  

