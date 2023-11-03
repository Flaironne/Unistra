const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
var db;

// ouverture de la base de donnees
function db_open(){
    db = new sqlite3.Database("projet.db", (err) => {
        if (err) {
            throw err;
        }
      });
}

// tables et contraintes
function create_tables(){
    let table_user = `CREATE TABLE IF NOT EXISTS User (
      id_user INTEGER PRIMARY KEY AUTOINCREMENT,
      pseudo TEXT NOT NULL UNIQUE CHECK(length(pseudo) <= 50),
      datenaissance TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      mdp TEXT NOT NULL
      );`;

    let table_score = `CREATE TABLE IF NOT EXISTS Score (
        id_user INTEGER PRIMARY KEY,
        jetons INTEGER DEFAULT 100000,
        nb_parties INTEGER DEFAULT 0,
        nb_victoires INTEGER DEFAULT 0,
        FOREIGN KEY (id_user) REFERENCES User (id_user)
        );`;

    let check_user_email = `
        CREATE TRIGGER IF NOT EXISTS check_user_email
        BEFORE INSERT ON User
        BEGIN
            SELECT CASE
                WHEN NEW.email NOT LIKE '%_@__%.__%' THEN
                    RAISE (ABORT,'Invalid email address')
            END;
        END;`;

    let score_entry_new_user = `
        CREATE TRIGGER IF NOT EXISTS add_score_entry
        AFTER INSERT ON User
        BEGIN
        INSERT INTO Score(id_user) 
        VALUES(NEW.id_user);
        END;`;
    
    db.serialize(() => {
        db.run(table_user , (err) => {
            if (err) {
                console.error(err);
                throw err;
            }   
        });
        db.run(table_score , (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        db.run(check_user_email, (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        db.run(score_entry_new_user , (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
    });
}

// inscription d'un nouvel utilisateur dans la base de donnees
// retourne True si l'inscription se passe bien et False sinon
function inscription(pseudo, datenaissance, email, mdp){
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            let sql = db.prepare(`INSERT INTO User(pseudo, datenaissance, email, mdp) VALUES (?, DATE(?), ?, ?)`);

            bcrypt.genSalt().then(sel => {
                bcrypt.hash(mdp, sel).then(mdp_hash => {
                    sql.run(pseudo, datenaissance, email, mdp_hash, err => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        }
                        else{
                            console.log('Joueur inscrit avec succes');
                            resolve(true);
                        }
                    });
                    sql.finalize();
                })
            });
        });
    })
}

// connexion d'un utilisateur existant
// retourne id_user si la connection se passe bien et une erreur sinon
function connexion(email, mdp) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_user, pseudo, mdp FROM User WHERE email = ?`;

        db.get(sql, [email], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            if (!row){
                console.error(new Error('Email incorrect').message);
                reject(new Error('Email incorrect'));
            }            
            else {
                bcrypt.compare(mdp, row.mdp, (err_prw, mdp_correct) => {
                    if (err_prw) {
                        console.error(err_prw.message);
                        reject(err_prw);
                    }
                    if (mdp_correct) {
                        console.log('Utilisateur connecte avec succes');
                        resolve(row.id_user);
                    }
                    else{
                        console.error(new Error('Mot de passe incorrect').message);
                        reject(new Error('Mot de passe incorrect'));
                    }
                });
            }
        });
    })
}

// modifier le mot de passe de l'utilisateur
function change_pwd(id_user, nouveauMdp){
    let sql = `UPDATE User SET mdp = ? WHERE id_user = ?`;
  
    bcrypt.genSalt().then(sel => {
        bcrypt.hash(nouveauMdp, sel).then(mdp_hash => {
            db.run(sql, [mdp_hash, id_user] , (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Mot de passe change avec succes');
                }
            });
        });
    });
}

// obtenir le nombre de jetons d'un utilisateur donne
function get_nb_jetons(id_user) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT jetons FROM Score WHERE id_user = ?`;

        db.get(sql, [id_user], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(row.jetons);
            }
        });
    })
}

// modifier le nombre de jetons d'un utilisateur donne
function update_user_jetons(id_user, nb_jetons){
    let sql = `UPDATE Score SET jetons = jetons + ? WHERE id_user = ?`;

    db.run(sql, [nb_jetons, id_user], (err) => {
        if (err) {
            throw err;
        }
        else{
            console.log('Le nombre de jetons a ete modifie');
        }
    });
}

// soustraire jetons mises par un utilisateur de son nombre de jetons
async function bet(id_user, nb_jetons) {
    var balance = await get_nb_jetons(id_user);
    
    if (balance - nb_jetons >= 0){
        update_user_jetons(id_user, -nb_jetons);
    }
    else{
        throw new Error('User ne peut pas miser plus que son nombre de jetons');
    }
}

// ajouter 25k de jetons a un utilisateur quand il a moins de 5k jetons
async function reload_jetons(id_user){
    var balance = await get_nb_jetons(id_user);

    if (balance < 5000){
        update_user_jetons(id_user, 25000);
    }
    else{
        throw new Error('User doit avoir moins de 5000 jetons pour les recharger');
    }
}

// incrementation du nombre de parties jouees d'un utilisateur par 1
function update_nb_games(id_user){
    let sql = `UPDATE Score SET nb_parties = nb_parties + 1 WHERE id_user = ?`;

    db.run(sql, [id_user], (err) => {
        if (err) {
            throw err;
        }
        else{
            console.log('Nombre de parties a ete incremente par 1');
        }
      });
}

// incrementation du nombre de parties gagnees d'un utilisateur par 1
function update_nb_victories(id_user){
    let sql = `UPDATE Score SET nb_victoires = nb_victoires + 1 WHERE id_user = ?`;

    db.run(sql, [id_user], (err) => {
        if (err) {
          throw err;
        }
        else {
            console.log('Nombre de victoires a ete incremente par 1');
        }
    });
}

// augmenter le nombre de victoires d'un utilisateur donne
// ainsi que ajouter ses jetons gagnes
function add_winner(id_user, nb_jetons){
    update_nb_victories(id_user);
    update_user_jetons(id_user, nb_jetons);
}

// obtenir les informations d'un utilisateur donne
// retourne (id, preudo, date de naissance, email) 
function get_user_info(id_user) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id_user, pseudo, datenaissance, email FROM User WHERE id_user = ?';

        db.serialize(() => {
            db.get(sql, [id_user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    let user = {
                        id_user: row.id_user,
                        pseudo: row.pseudo,
                        datenaissance: row.datenaissance,
                        email: row.email
                    };
                    resolve(user);
                }
            });
        });
    })
}

// obtenir les statistiques d'un utilisateur donne
// retourne un objet JSON contenant 
// id, jetons, nombre de parties jouees, nombre de parties gagnees 
function get_user_stats(id_user) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Score WHERE id_user = ?';

        db.serialize(() => {
            db.get(sql, [id_user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    let stats = {
                        id_user: row.id_user,
                        jetons: row.jetons,
                        nb_parties: row.nb_parties,
                        nb_victoires: row.nb_victoires
                    };
                    resolve(stats);
                }
            });
        });
    })
}

//fonction qui récupère le pseudo d'un utilisateur depuis son id
function get_pseudo(id_user){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT pseudo FROM User WHERE id_user = ?';

        db.serialize(() => {
            db.get(sql, [id_user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    let pseudo = {
                        //id_user: row.id_user,
                        pseudo: row.pseudo
                    };
                    resolve(pseudo);
                }
            });
        });
    })
}

// classement des joueurs par nombre de jetons
// retourne un array des id_user dans le bon ordre
function classement_jetons() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT User.id_user, User.pseudo FROM User JOIN Score ON User.id_user = Score.id_user ORDER BY Score.jetons DESC, Score.nb_victoires DESC';
        db.serialize(() => {
            var users = [];

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    rows.forEach((row) => {
                        users.push(row.id_user);
                    });
                    resolve(users);
                }
            });
        });
    })
}

// classement des joueurs par nombre de victoires
// retourne un array des id_user dans le bon ordre
function classement_victoires() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT User.id_user, User.pseudo FROM User JOIN Score ON User.id_user = Score.id_user ORDER BY Score.nb_victoires DESC, Score.jetons DESC';
        db.serialize(() => {
            var users = [];

            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    rows.forEach((row) => {
                        users.push(row.id_user);
                    });
                    resolve(users);
                }
            });
        });
    })
}

//verification si un pseudo existe
function check_pseudo_exists(pseudo) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT pseudo FROM User WHERE pseudo = ?';
    
        db.serialize(() => {
            db.get(sql, [pseudo], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    if (row){
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    
                }
            });
        });
    })
}

//changement de pseudo selon id_user
function update_pseudo(id_user, new_pseudo){
    return new Promise((resolve, reject) => {
        let sql = `UPDATE User SET pseudo = ? WHERE id_user = ?`;

        db.run(sql, [new_pseudo, id_user], (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            else {
                console.log('Pseudo changé avec succès');
                resolve();
            }
        });
    })
}



// fermeture de la base de donnees
function db_close(){
    db.close((err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = {
    db_open,
    create_tables,
    inscription,
    connexion,
    change_pwd,
    get_nb_jetons,
    update_user_jetons,
    bet,
    reload_jetons,
    update_nb_games,
    update_nb_victories,
    add_winner,
    get_user_info,
    get_user_stats,
    classement_jetons,
    classement_victoires,
    db_close,
    get_pseudo,
    check_pseudo_exists,
    update_pseudo
};
