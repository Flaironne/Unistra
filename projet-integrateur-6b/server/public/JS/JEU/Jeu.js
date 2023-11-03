/**
 * @brief Classe "Jeu" qui permet de lancer le jeu de poker 
 *        en commençant par l'initialisation des joueurs qui 
 *        rejoignent la table. Puis un départ de la partie est 
 *        lancé pour initialiser les cartes de la table et la 
 *        distribution des deux cartes à chaque joueur. Cette classe
 *        gère aussi le début du tour et l'abandon d'un joueur.
 */

// import Dealer from './Dealer.js';
// import Joueur from './Joueur.js';

const Dealer = require('./Dealer.js');
const Joueur = require('./Joueur.js');
const fctDB = require("../../../db/bdd_fonctions");

//import { createInterface } from 'readline';

// const readline = createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


class Jeu {
    #joueurs = new Array(6);
    #dealer = new Dealer.Dealer;
    #joueurCourant;
    #tour;
    #joueursEnCours=[];
    #indiceFirstShooter=-1;
    #joueurGagnant=[];
    #nbJoueur;
    #finPartie = false;

    constructor (){
        // TODO
    }

    /**
     * @brief Getter de l'attribut joueurs.
     * 
     * @returns[out] Retourne le tableau de joueurs.
     */
    get joueurs (){
        return this.#joueurs;
    }

    /**
     * @brief Setter de l'attribut joueurs.
     */
    set joueurs (joueurs){
        this.#joueurs = joueurs;
    }

    /**
     * @brief Getter de l'attribut dealer.
     * 
     * @returns Retourne le dealer.
     */
    get dealer (){
        return this.#dealer;
    }
    
    /**
     * @brief Getter de l'attribut joueurCourant.
     * 
     * @returns Retourne le joueur courant.
     */
    get joueurCourant (){
        return this.#joueurCourant;
    }

    /**
     * @brief Setter de l'attribut joueurCourant.
     * 
     */
    set joueurCourant (joueur){
        this.#joueurCourant = joueur;
    }

    /**
     * @brief Getter de l'attribut tour
     * 
     * @returns Retourne le numéro du tour.
     */
    get tour (){
        return this.#tour;
    }

    /**
     * @brief Setter de l'attribut tour.
     */
    set tour (tour){
        this.#tour = tour;
    }

    /**
     * 
     */
    get joueursEnCours (){
        return this.#joueursEnCours;
    }

    /**
     * 
     */
    set joueursEnCours (joueursEnCours){
        this.#joueursEnCours = joueursEnCours;
    }


    get joueurGagnant (){
        return this.#joueurGagnant;
    }

    /**
     * 
     */
    get indiceFirstShooter (){
        return this.#indiceFirstShooter;
    }

    /**
     * 
     */
    set indiceFirstShooter (indiceFirstShooter){
        this.#indiceFirstShooter = indiceFirstShooter;
    }

    /**
     * 
     */
    get nbJoueur (){
        return this.#nbJoueur;
    }

    /**
     * 
     */
    set nbJoueur (nbJoueur){
        this.#nbJoueur = nbJoueur;
    }

    /**
     * 
     */
    get finPartie (){
        return this.#finPartie;
    }

    /**
     * 
     */
    set finPartie (finPartie){
        this.#finPartie = finPartie;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet l'initialisation des joueurs (clients)
     *        qui rejoignenent la table de poker.
     * 
     * @param {String} idJoueur 
     * @param {int} jetons 
     * @param {int} noLimitSelfLimited 
     * @returns[out] Retourne vrai si l'initialisation est effectuée et faux
     *               lors d'un échec qui est dû à l'indiponibilité de chaise.
     */
    initJoueur (idJoueur, jetons, noLimitSelfLimited){
        for (let i = 0; i < 6; i++){
            if (!this.#joueurs[i]){
                this.#joueurs[i] = new Joueur.Joueur (idJoueur, jetons, noLimitSelfLimited);
                return true;
            }    
        }
        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui initialise les cartes de la table et 
     *        le dealer distribue les cartes à tout les joueurs présents.
     */
    departJeuPoker (){


        this.#finPartie=false;
        // A FAIRE DANS UNE AUTRE FONCTION : DESALLOUER
        for (let i = 0; i < 6; i++){
            this.#dealer.rolesDisponible[i] = true;
        }
        this.#joueurGagnant=[];

        this.#dealer = new Dealer.Dealer;
        // A FAIRE DANS UNE AUTRE FONCTION 

        this.#dealer.initCarteTable ();

        this.#joueurs.forEach((joueur) => {
            this.#dealer.distribue (joueur);
        });   

        //this.#dealer.initRoles (this.#joueurs);

        this.#joueursEnCours = this.#joueurs.filter(joueur => joueur);

        //INIT FIRST SHOOTER
        if (this.#indiceFirstShooter + 1 < this.#joueursEnCours.length) {
            this.#indiceFirstShooter++;
        }  
        else {
            this.#indiceFirstShooter = 0;
        }

        this.#joueursEnCours[this.#indiceFirstShooter].firstShooter = true;

        // Le joueur à jouer
        this.#joueurCourant = this.#joueursEnCours[this.#indiceFirstShooter];
        this.#nbJoueur = this.#joueursEnCours.length;


        // Faire le premier dépot du premier joueur
        // Mise automatique
        //this.#joueurCourant.miser(this.#dealer, 100);
        //reset du coucher des gens 
        for (let i = 0; i < this.#joueursEnCours.length; i++){
            this.#joueursEnCours[i].coucher=false;
              
        }

        // Tour 1 : Aucune Carte
        this.#tour = 1;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet de supprimer un joueur du tableau de joueurs.
     */
    quitterJoueur (index){
        
        //Trouver le joueur qui quitte dans le tableau du jeu joueursEnCours
        if (this.#tour!==undefined) {
            for (let i = 0; i < this.#joueursEnCours.length; i++) 
            {
                if (this.#joueurs[index].idJoueur=== this.#joueursEnCours[i].idJoueur) 
                {
                    this.#joueursEnCours.splice(i,1);
                }
            }
        }
        if(this.#joueursEnCours.length===1&&this.#tour!==5)
        {
            this.#tour=5;
            for (let i = 0; i < this.joueurs.length; i++) 
            {
                if (this.#joueurs[i]!== undefined) 
                {
                    if (this.#joueurs[i].idJoueur===this.#joueursEnCours[0].idJoueur) 
                    {
                        this.#joueurGagnant.push(i);    
                    }
                }
            }
            fctDB.add_winner (this.#joueurs[this.#joueurGagnant[0]].idJoueur, this.#dealer.jetonsSurTable);
            console.log ("Je suis " + this.#joueurs[this.#joueurGagnant[0]].idJoueur + " et je viens de gagner !");
            this.#finPartie = true;
        }
        else
        {
            //Le cas si c'est pas le joueur qui joue
            for (let i = 0; i < this.#joueursEnCours.length; i++) 
            {
                if (this.joueursEnCours[i].idJoueur==this.#joueurs[index].idJoueur)
                {
                    this.#joueursEnCours.splice(i,1);    
                }
            }
            this.nbJoueur--;
        }

        //Faire en sorte que le joueur soit supprimer de joueurenCourt
        //Si joueurCourant.idjoueur == joueur[index].idJoueur alors se coucher  
        


        //RESET ROLE EN DISPO
        //this.#dealer.rolesDisponible[this.#joueurs[index].role.idRole] = true;

        delete this.#joueurs[index];
        // console.log("Taille du tableau joueursEnCours : ", this.#joueursEnCours.length," Taille du tableau joueurs : ", this.#joueurs.length);

    }

    /**
     * @author Hayk ZARIKIAN et Ekaterina ZAITCEVA
     * @brief Fonction qui permet de lancer le jeu de poker avec le 
     *        basculement des tours jusqu'à la fin de la partie.
     */
    jouerTour (choix,jetonMise){
        let indexJoueurCourant = this.#joueursEnCours.indexOf(this.#joueurCourant);

        // console.log ("Je suis " + this.#joueurCourant.idJoueur + " et c'est à moi de jouer");

        // readline.question("Votre choix : ", (reponse) => {
            // let choix = parseInt(reponse);
            // CHOIX 1 = MISER
            if (choix == 1){ 
                this.#nbJoueur--;
                this.#joueurCourant.miser (this.#dealer, jetonMise);
                
                console.log("J1 deja joué tour: " +this.#joueursEnCours[0].jaiDejaJouerMonTour + "J2 deja joué tour: " +this.#joueursEnCours[1].jaiDejaJouerMonTour); // modifffffffffffffffffffffffffffffffffffffffffff
                this.#joueursEnCours[indexJoueurCourant].jaiDejaJouerMonTour = true;  // modifffffffffffffffffffffffffffffffffffffffffff
                for (let i = 0; i < this.#joueursEnCours.length; i++){
                    if (this.#joueursEnCours[i].coucher == false && i != indexJoueurCourant && this.#joueursEnCours[i].jaiDejaJouerMonTour == true){
                        this.#joueursEnCours[i].jaiDejaJouerMonTour = false;
                        this.#nbJoueur++;
                        console.log("DANS LE IF DE LA BOUCLE DE JEU i: "+i); // modifffffffffffffffffffffffffffffff
                    }
                } 
                // this.#joueursEnCours[indexJoueurCourant].jaiDejaJouerMonTour = true; 
            }
            // CHOIX 2 = COUCHER
            else if (choix == 2){ 
                this.#nbJoueur--;
                this.#joueursEnCours[indexJoueurCourant].seCoucher ();

                let compteurPasCoucher = 0;
                
                for (let i = 0; i < this.#joueursEnCours.length; i++){
                    if (this.#joueursEnCours[i].coucher == false){
                        compteurPasCoucher++;
                        this.#joueurGagnant.push(i);
                        console.log("Le tableau joueur gagnant : ", this.#joueurs[this.#joueurGagnant[0]].idJoueur,"Et je viens d'ajouter : " , i );
                    }
                }
                console.log("Compteur pas coucher (JEU)"+ compteurPasCoucher);  // modifffffffffffffffffffffffffffffffffffffffffff
                //if (compteurPasCoucher == 1){ // modifffffffffffffffffffffffffffffffffffffffffff
                if (compteurPasCoucher <= 1){  // modifffffffffffffffffffffffffffffffffffffffffff
                    // Gagnant trouver 
                    // deposeCarte : déposer les 5 cartes sur la table d'un coup 
                    fctDB.add_winner (this.#joueurs[this.#joueurGagnant[0]].idJoueur, this.#dealer.jetonsSurTable);
                    console.log ("Je suis " + this.#joueurs[this.#joueurGagnant[0]].idJoueur + " et je viens de gagner !");
                    this.#finPartie = true;
                    // readline.pause ();
                    // this.tour=4;
                    //return joueurGagnant.idJoueur;
                    //this.departJeuPoker ();
                }else
                {
                    this.#joueurGagnant=[];
                }
                console.log("Le tab joueur gagnant (Apres la partie couché ) = ", this.#joueurGagnant )
            }
            
            // CHOIX 3 : SUIVRE LA MISE
            else if (choix == 3){
                // suivre la mise
                this.#nbJoueur--; 
                this.#joueurCourant.miser (this.#dealer, jetonMise);
                this.#joueursEnCours[indexJoueurCourant].jaiDejaJouerMonTour = true;   // modifffffffffffffffffffffffffffffffffffffffffff
            }
            // CHOIX 4 : CHECKER
            else if (choix == 4){
                // Checker
                this.#nbJoueur--;
                this.#joueursEnCours[indexJoueurCourant].check ();
            }


            console.log("NB JOUEURS (JEU): "+this.#nbJoueur+"la fin de partie est a :"+this.#finPartie);  // modifffffffffffffffffffffffffffffffffffffffffff

            // Pour le tour de la table => basculer au joueur suivant
            if (this.#nbJoueur > 0 && this.#finPartie == false){
                for (let i = 1; i < this.#joueursEnCours.length; i++){
                    this.#joueurCourant = this.#joueursEnCours[(indexJoueurCourant + i) % this.#joueursEnCours.length];
                    if (this.#joueurCourant.coucher == false)
                        i = this.#joueursEnCours.length;
                }
                
                //this.jouerTour ();
            }
            // Fin du tour courant => on passe au tour suivant
            else {
                console.log("DANS LE ELSE DU JEU");   // modifffffffffffffffffffffffffffffffffffffffffff
                
                for (let i = 1; i < this.#joueursEnCours.length; i++){
                    this.#joueurCourant = this.#joueursEnCours[(indexJoueurCourant + i) % this.#joueursEnCours.length];
                    if (this.#joueurCourant.coucher == false)
                        i = this.#joueursEnCours.length;
                }

                this.#tour++;

                // Fin de partie ? 
                if (this.#tour == 5){
                    console.log ("FIN DE PARTIE");
                    this.#finPartie = false;

                    for (let i = 0; i < this.#joueursEnCours.length; i++) {
                        console.log("Nom joueur : " + this.#joueursEnCours[i].idJoueur);
                    }
                    
                    this.#joueurGagnant=this.#dealer.revelationCarteJoueur (this.#joueursEnCours);

                    //readline.pause ();
                    //this.departJeuPoker ();
                }
                else {
                    for (let i = 0; i < this.#joueursEnCours.length; i++){
                        console.log("etat du joueur i  "+ this.#joueursEnCours[i].coucher);
                        if (this.#joueursEnCours[i].coucher == false){
                            console.log("I(i)ligne346: "+i);    // modifffffffffffffffffffffffffffffffffffffffffff
                            console.log("nb joueur en reset "+ this.#nbJoueur); 
                            console.log("jouer en cours length " + this.#joueursEnCours.length);
                            this.#joueursEnCours[i].jaiDejaJouerMonTour = false;
                            this.#nbJoueur++;
                        }
                    }
                }

                console.log("NB JOUEURS APRES RESET: "+ this.#nbJoueur);     // modifffffffffffffffffffffffffffffffffffffffffff

                // Tour 2 : 3 Cartes
                if (this.#finPartie == false && this.#tour == 2){
                    console.log ("\nJe suis au TOUR 2\n");
                    //this.jouerTour ();
                }
        
                // Tour 3 : 4 Cartes
                if (this.#finPartie == false && this.#tour == 3){
                    console.log ("\nJe suis au TOUR 3\n");
                    //this.jouerTour ();
                }
        
                // Tour 4 : 5 Cartes
                if (this.#finPartie == false && this.#tour == 4){
                    console.log ("\nJe suis au TOUR 4\n");
                    //this.jouerTour ();
                }
                //Si coucher donc fin de partie true , mais besoin de recuperation du tour a 5
                //Ce cas arrive uniquement quand l'utilisateur n'est que tout seul lors du couché
                if (this.#finPartie==true) 
                {
                    this.tour=5;
                    this.#finPartie=false;
                }
                this.MaJJetonsDeJoueursEnCours();
                return -1;
            }
        //})        
    }

    async MaJJetonsDeJoueursEnCours() {
        for (let i = 0; i < this.#joueursEnCours.length; i++) 
        {
            console.log('[AVANT SYNCRO]le nombre de jeton du joueur avec l\'id : ',this.#joueursEnCours[i].idJoueur , ' a ',this.#joueursEnCours[i].jetons,' jetons ' )
            this.#joueursEnCours[i].jetons=await fctDB.get_nb_jetons(this.#joueursEnCours[i].idJoueur)
            console.log('[APRES SYNCRO]le nombre de jeton du joueur avec l\'id : ',this.#joueursEnCours[i].idJoueur , 'a ',this.#joueursEnCours[i].jetons,' jetons ' )
        }
    }
}


module.exports =
{
    Jeu
} 
