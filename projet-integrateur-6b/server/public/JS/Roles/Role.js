/**
 * @brief Classe mère "Role" qui permet de créer un role parmis les
 *        roles disponible. Affectation aléatoire.
 */

const Voleur = require('./Voleur');
const Policier = require('./Policier')
const Escroc = require('./Escroc');
const Insolvable = require ('./Insolvable');
const Usurpateur = require ('./Usurpateur');
const Indicateur = require ('./Indicateur');

const VOLEUR = 0;
const ESCROC = 1;
const INSOLVABLE = 2;
const POLICIER = 3;
const USURPATEUR = 4;
const INDICATEUR = 5;

class Role{
    #activationRole = false;
    #idRole;
    #roleJoueur;

    constructor (rolesDisponible){
        let continuer = true;
        let roleHasard;

        while (continuer == true){
            roleHasard = Math.floor(Math.random () * 6);
            if (rolesDisponible[roleHasard] == true){
                continuer = false;
            }
        }
 
        if (roleHasard == VOLEUR){
            this.#roleJoueur = new Voleur.Voleur ();
            this.#idRole = VOLEUR;
        }
        else if (roleHasard == ESCROC){
            this.#roleJoueur = new Escroc.Escroc ();
            this.#idRole = ESCROC;
        }
        else if (roleHasard == INSOLVABLE){
            this.#roleJoueur = new Insolvable.Insolvable ();
            this.#idRole = INSOLVABLE
        }
        else if (roleHasard == POLICIER){
            this.#roleJoueur = new Policier.Policier ();
            this.#idRole = POLICIER;
        }
        else if (roleHasard == USURPATEUR){
            this.#roleJoueur = new Usurpateur.Usurpateur ();
            this.#idRole = USURPATEUR;
        }
        else{
            this.#roleJoueur = new Indicateur.Indicateur ();
            this.#idRole = INDICATEUR;
        }
    }

    /**
     * @brief Getter de l'attribut activationRole.
     * 
     * @returns[out] Retourne le boolean activation Role.
     */
    get activationRole(){
        return this.#activationRole;
    }

    /**
     * @brief Setter de l'attribut activationRole.
     */
    set activationRole(activer){
        this.#activationRole = activer;
    }

    /**
     * @brief Getter de l'attribut idRole.
     * 
     * @returns[out] Retourne l'id du role.
     */
    get idRole(){
        return this.#idRole;
    }

    /**
     * @brief Setter de l'attribut idRole.
     */
    set idRole(idRole){
        this.#idRole = idRole;
    }

    /**
     * @brief Getter de l'attribut roleJoueur.
     * 
     * @returns Retourne le role Joueur de la classe spécialisée.
     */
    get roleJoueur(){
        return this.#roleJoueur;
    }

    /**
     * @brief Setter de l'attribut roleJoueur.
     */
    set roleJoueur(roleJoueur){
        this.#roleJoueur = roleJoueur;
    }
}

module.exports =
{
    Role
} 