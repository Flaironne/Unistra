const { log, table, Console } = require('console');
var express = require('express');
const app = require('express')();
const fs = require("fs");
const path =require("path");
const server = require('https').createServer({
        key: fs.readFileSync(path.join(__dirname,
            "tls", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname,
            "tls", "cert.pem")),
    }, app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
const fctDB = require("./db/bdd_fonctions.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();

const jeu=require('./public/JS/JEU/Jeu');

const { Table, Joueur, JoueurDetail, Update_Data,Mains,Spectateur_Update_Data } = require('./public/JS/objet.js');


//const port = 3000;
const port = 10000;

const secretKey = 'itheima No ^_^'

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(path.join(__dirname,"./db/db.sqlite3"));
//Pour l'instant on va procéder avec des path en solide mais ca va surement passer en dynamique quand j'aurais trouvé une solution

app.use(express.urlencoded({extended:true})); 

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({
    key: "user_sid",
    secret: 'itheima No ^_^',
    cookie: {maxAge:1000*60*60},
    resave: false,
    saveUninitialized: false
}));
/*=======================================================================================================================================================================*/
/* GESTION DES ROUTES */
/*=======================================================================================================================================================================*/
const bloc_conn = require('./routes/connexion');
const bloc_inscrp = require('./routes/inscription');
const bloc_change_MDP = require('./routes/changepassword');
const bloc_change_UN = require('./routes/changeusername');
const bloc_veri = require('./routes/verifierusername');

app.use('/', bloc_conn);
app.use('/', bloc_inscrp);
app.use('/', bloc_change_MDP);
app.use('/', bloc_change_UN);
app.use('/', bloc_veri);

// Servir les fichiers statiques du répertoire dist
app.use(express.static(path.join(__dirname,'public','VUEJS','poker-gang','dist')))


//cette partie est une securité pour evité les connexion sauvage
app.get('/accueil',(req,res)=>
{
    //securité si jamais l'utilisateur veut rentrer dans la partie acceuil sans etre connecté 
    if(req.session.user===undefined)
    {   
        res.redirect('/connexion');
    }else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
})

// Si l'utilisateur est deja connecté ca l'emmene deja sur la page  connexion
app.get('/connexion',(req,res)=>{
    if(req.session.user !== undefined)
    {
        res.redirect('/accueil');
    }
    else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
});

// tmp
app.get('/inscription', (req, res) => {
    if (req.session.user !== undefined) {
        res.redirect('/accueil');
    }else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
});
app.get('/jeu', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/connexion');
    }else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
});
app.get('/classement', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/connexion');
    }else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
});
app.get('/lobby', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/connexion');
    }else
    {
        res.sendFile(`${__dirname}/public/VUEJS/poker-gang/dist/index.html`);
    }
});
//app.use('/', bloc_inscrp);


//SI l'utilisateur est connecté il sera directement envoyer dans sa page accueil 
app.get('/',(req,res)=>{
    if(req.session.user !== undefined)
    {
        //delete req.session.user;
        //res.redirect('/connexion')
        res.redirect('/accueil')
    }
})

//se déconnecter, reset des information dans la session
app.get('/logout',(req,res)=>{
    if(req.session.user){
        req.session.user = undefined;
        res.redirect('/');
    }else{
        res.redirect('/connexion');
    }
})

//interroger l'identifiant de session de chaque client : par 127.0.0.1:3000/session-id
app.get('/session-id', (req, res) => {
    const sessionId = req.sessionID;
    //si l'utilisateur ne s'est pas connecté alors demande de connexion
    if(req.session.user===undefined)
    {
        res.redirect('/connexion')
    }else
    {
        res.send(`Session ID: ${sessionId} and user is : ${req.session.user.username}`);
    }
});

//Requete permettant aux utilisaateur de récupérer des  jetons une fois que le joueur atteint - de 5000 jetons
app.get('/getMoreTokens', async (req,res)=>{
    let id_user = req.session.user.id_user
    try
    {
        await fctDB.reload_jetons(id_user);
        var jetons = await fctDB.get_nb_jetons(id_user);            //get jetons from bdd
        req.session.user = await fctDB.get_user_info(id_user);
        req.session.user.jetons = jetons;                           //ajouter jetons dans le user
        res.status(200).json(req.session.user.jetons);
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})

// requet pour envoyer les statistique au front de l'utilisateur
app.get('/getUserStats',async (req,res)=>
{
    try{
        if (req.session.user===undefined) {
            res.redirect('/connexion');
        }else
        {
            let statsUser=await fctDB.get_user_stats(req.session.user.id_user);
            res.status(200).json(statsUser);
        }
    }catch
    {
        res.status(401).json('undefined');
    }
})

//Est la demande ajax fait par acceuil 
app.get('/getUserInfo',async (req, res) => {
    let id_user=req.session.user.id_user;
    try {
        var jetons = await fctDB.get_nb_jetons(id_user);            //get jetons from bdd
        req.session.user = await fctDB.get_user_info(id_user);
        req.session.user.jetons = jetons;                           //ajouter jetons dans le user
        res.status(200).json(req.session.user); // sending a response to the client
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


//classment data
fctDB.db_open();
fctDB.create_tables();
app.get('/getClassmentInfo',async (req,res)=>
{
    let classement_userid = [];
    let classment_tmp = [];
    let classement = [];
    classement_userid = await fctDB.classement_jetons();

    for(let i=0;i<classement_userid.length;i++){
        classement.push([await fctDB.get_user_stats(classement_userid[i]), await fctDB.get_pseudo(classement_userid[i])]);
    }
    res.status(200).json(classement);
    
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public','VUEJS','poker-gang','dist', 'index.html'));
  })
  

//Ecoute du serveur sur le port : 3000/10000
server.listen(port, ()=>
{
    console.log(`Lancement du serveur sur le port ${port}...`);
})


 // Initialisation des tableaux nécéssaire pour tout actualiser et envoyer les données au front
var update_data_table = [];

let tableDeJeu=new Table(0,0,0);


/*=======================================================================================================================================================================*/
/* INITIALISATION DES VARIABLES ESENTIEL POUR LE JEU */
/*=======================================================================================================================================================================*/


//Initialisation des tableau JOUEUR et JOUEURS DETAILS
function createJoueurs() {
    let tableau_joueur = [];
    let tableau_joueurDetail = [];
    for (let i = 0; i < 6; i++) {
        tableau_joueur.push(new Joueur('',0,0));
      tableau_joueurDetail.push(new JoueurDetail(0,'',0,0));
    }
    return { tableau_joueur, tableau_joueurDetail };
  }
  
  let { tableau_joueur, tableau_joueurDetail } = createJoueurs();
  


//Initialisation du tableau de Update_Data 
let tab_temp=[]
let temp;

for (let i = 0; i < 6; i++) {
    let j=i+1
    while(i!==j) {
        
        if (j >= 6) {
            j = 0; // Réinitialiser j si nécessaire
        }
        tab_temp.push(j);
        j++
        if (j >= 6) {
            j = 0; // Réinitialiser j si nécessaire
        }
    }
    temp=new Update_Data(tableDeJeu,tableau_joueurDetail[i],tableau_joueur[tab_temp[0]],tableau_joueur[tab_temp[1]],tableau_joueur[tab_temp[2]],tableau_joueur[tab_temp[3]],tableau_joueur[tab_temp[4]])
    update_data_table.push(temp)
    tab_temp=[]
}

let timer_deconnexion=60;
let Tab_findetemp = []
let tab_tmp_iduser= []
let newTab = [];
const tempPourRej=20

let compt_joueur=0;

let Tab_spectateur = []

//cette ligne serra dans le futur lors de la création de lobby
let game = new jeu.Jeu ();
//Tableau de socket de tout les arrivant
let Tab_socket=[]

//Init de l'objet Update_data pour les spectateur pour ne pas que les spectateurs puisse voir les données de jeu "sensible" (Main , role) mais en vvoyant toujours le jeu
const data_spec=new Spectateur_Update_Data(
    tableDeJeu,
    tableau_joueur[0],
    tableau_joueur[1],
    tableau_joueur[2],
    tableau_joueur[3],
    tableau_joueur[4],
    tableau_joueur[5])

/*=======================================================================================================================================================================*/
/* GESTION DE SOCKET IO (PARTIE RECEPTION) */
/*=======================================================================================================================================================================*/

//Detection d'un nouvel arrivant sur la page
io.on('connection',(socket)=>
{   
    console.log("Un utilisateur vient d'arriver avec comme id : ", socket.id )
    
    //Detection quand une personne se deconnect (Ferme la page ou non)
    socket.on("disconnect",()=>
    {
        let toujourspresent=false
        console.log("Un utilisateur c'est deconnecté")
        //pour verifier si a été deconnecté proprement ou sauvagement ||| true = sauvage
        for (let i = 0; i < tableau_joueurDetail.length; i++) 
        {
            if (tableau_joueurDetail[i].IdSocket===socket.id) 
            {
                toujourspresent=true;
            }
            
        }
        //si sauvage alors ! 
        if (toujourspresent) {
            // quitterJoueur(tableau_joueurDetail[findIndicePlayer(socket.id)].IdJoueur);    

            if (tableDeJeu.tour===5 || tableDeJeu===0) 
            {
                quitterJoueur(tableau_joueurDetail[findIndicePlayer(socket.id)].IdJoueur);    
            }
            else
            {
                //timer de une minute avec la deconnexion si le joueur ne se reconnecte pas
                setTimeout(function(){
                    deconexionSauvage(socket.id)
                },timer_deconnexion*1000);
            }
         }
    })

    //socket.on("newdetailPlayers",(data)=>{
    socket.on("initConnection",(data)=>
    {
        let isHere=isAlreadyHere(data.id_user)
        if (isHere!==-1) 
        {
            //on remplace l'ancienne socket dans le tableau de socket
            for (let i = 0; i < Tab_socket.length; i++) {
                if (Tab_socket[i].id===tableau_joueurDetail[isHere].IdSocket) 
                {
                    Tab_socket[i]=socket;    
                }
            }
            //on remplace l'ancienne socket dans le tab joueur detail mais pas dans l'autre 
            tableau_joueurDetail[isHere].IdSocket=socket.id    
        }
        else
        {
            if (data.jetons===0) 
            {
                socket.emit("QuitterPartie");
                //On peut le mettre en spectateur et le laisser ! ici solution de facilité !
            }
            else
            {
                let placeLibre = trouveUnePlaceLibre();//Cherche une place libre dans la table
                if (placeLibre==-1) { //||tableDeJeu.Nb_Joueurs===1 Pour tester le mode spec
                    //Put in spectate mod
                    let newJoueurDetailSpec=new JoueurDetail(data.id_user,data.pseudo,data.jetons,socket.id);
                    Tab_spectateur.push(newJoueurDetailSpec);
                    Tab_socket.push(socket);
                }
                else
                {
                    let newJoueurDetail=new JoueurDetail(data.id_user,data.pseudo,data.jetons,socket.id);
                    let newJoueur=new Joueur(data.pseudo,data.jetons,socket.id);
                    tableau_joueur[placeLibre].remplacer(newJoueur);
                    tableau_joueurDetail[placeLibre].remplacer(newJoueurDetail);
                    game.initJoueur(data.id_user,data.jetons,data.jetons); // On init le joueur dans l'algorithm de jeu
                    
                    Tab_socket.push(socket)
                    
                    tableDeJeu.Nb_Joueurs++;
                    //Il faut aussi verifier qu'une partie n'est pas deja en cours
                    if(tableDeJeu.Nb_Joueurs==2 && tableDeJeu.tour===0 && timer_rejouer=== tempPourRej){   // tmp > 1
                        envoiJoueurJoined(data.pseudo);
                        envoiInfoNumTour(tableDeJeu.tour+1);
                        game.departJeuPoker();
                        //mettre tous les joueurs en en IsPlaying
                        initJoueurPresent();
                        //Sert de start car il faut bien qu'une personne commence
                        tableDeJeu.tour=1
                        initNewTour(tableDeJeu.tour);
                        //Il faut récuperer les cartes aussi quand ca fonctionnera
                    }
                    if (timer_rejouer!=tempPourRej) 
                    {
                        tab_tmp_iduser.push(tableau_joueurDetail[placeLibre].IdJoueur);
                        setTimeout(function(){
                            socket.emit("NouvelArrivantPendantTimer",timer_rejouer)
                        },1);
                    }
                }
            }
        }
        broadcast("updateData");
    })

    socket.on("miser",(data)=>
    {
        
        let indiceJoueurCourant=findIndicePlayer(socket.id)
        tableDeJeu.Mise_total += data;
        tableau_joueur[indiceJoueurCourant].nb_jetons-=data;
        tableau_joueur[indiceJoueurCourant].Mise+=data;
        tableau_joueurDetail[indiceJoueurCourant].nb_jetons-=data;
        tableau_joueurDetail[indiceJoueurCourant].Mise+=data;
        tableau_joueurDetail[indiceJoueurCourant].Mise_Tour+=data
        tableau_joueur[indiceJoueurCourant].Mise_Tour+=data

        if (data===tableDeJeu.blind && tableDeJeu.Mise_minimum===0 && tableDeJeu.blind!==0) 
        {
            tableDeJeu.Mise_minimum=tableau_joueurDetail[indiceJoueurCourant].Mise_Tour;
            prochainJoueurAJouer(indiceJoueurCourant);
            game.jouerTour(3,data);
        }
        //Si le joueur suit
        else if(tableau_joueurDetail[indiceJoueurCourant].Mise_Tour==tableDeJeu.Mise_minimum)
        {
            game.jouerTour(3,data);
            tableDeJeu.Mise_minimum=tableau_joueurDetail[indiceJoueurCourant].Mise_Tour;
            prochainJoueurAJouer(indiceJoueurCourant);
        }
        //Si joueur relance
        else
        {
            //Le mettre en tete de liste de tour du joueur 
            //actualiser la misiminimum
            tableDeJeu.Mise_minimum=tableau_joueurDetail[indiceJoueurCourant].Mise_Tour;
            prochainJoueurAJouer(indiceJoueurCourant);
            game.jouerTour(1,data);
            //Le mettre au debut du tour ? 
        }

        
        // envoi des données de l'action du joueur pour l'affichage de l'action niveau front
        let actionEnvoi=[]
        actionEnvoi.push(1); // 1 = miser
        actionEnvoi.push(data); // envoi du montant de la mise
        actionEnvoi.push(tableau_joueurDetail[indiceJoueurCourant].pseudo);
        envoiActionJoueur(actionEnvoi);
        
        //Verification du tour ici
        if (game.tour!==tableDeJeu.tour) 
        {

            tableDeJeu.tour=game.tour;
            initNewTour(tableDeJeu.tour);
            if(tableDeJeu.tour>0){
                envoiInfoNumTour(tableDeJeu.tour);
            }
                
        }

        // envoi des données de l'action du joueur pour l'affichage de l'action niveau front
        // let actionEnvoi=[]
        // actionEnvoi.push(1); // 1 = miser
        // actionEnvoi.push(data); // envoi du montant de la mise
        // actionEnvoi.push(tableau_joueurDetail[indiceJoueurCourant].pseudo);
        // envoiActionJoueur(actionEnvoi);
        //BROADCAST

        //Detection de tour
        broadcast("updateData");


    })
    
    socket.on("message",(message)=>
    {
        let aEnvoyer = [];
        let indiceJoueur=findIndicePlayer(socket.id);
        if (indiceJoueur!=-1) 
        {
            aEnvoyer.push(tableau_joueurDetail[indiceJoueur].pseudo);  
        }else
        {
            //Pour la partie spectateur
            for (let i = 0; i < Tab_spectateur.length; i++) 
            {
                if (Tab_spectateur[i].IdSocket===socket.id) 
                {
                    aEnvoyer.push(Tab_spectateur[i].pseudo);
                }   
            }
        }
        aEnvoyer.push(message);
    
        io.sockets.emit('NewMessage',aEnvoyer);
    })

    socket.on("se coucher",(data)=>
    {
        //Plus qu'a update update_data
        //Choix N°2 est se coucher
        game.jouerTour(2,0);
        let indiceJoueurCourant= findIndicePlayer(socket.id);
        tableau_joueur[indiceJoueurCourant].Coucher=true;
        tableau_joueurDetail[indiceJoueurCourant].Coucher=true;
        tableau_joueur[indiceJoueurCourant].isPlaying=false;
        tableau_joueurDetail[indiceJoueurCourant].isPlaying=false;
        prochainJoueurAJouer(indiceJoueurCourant);
        
        // envoi des données de l'action du joueur pour l'affichage de l'action niveau front
        let actionEnvoi=[]
        actionEnvoi.push(3); // 3 = se coucher
        actionEnvoi.push(0);
        actionEnvoi.push(tableau_joueurDetail[indiceJoueurCourant].pseudo);
        envoiActionJoueur(actionEnvoi);


        //Verifier tour
        if (game.tour!==tableDeJeu.tour) 
        {
            tableDeJeu.tour=game.tour;
            initNewTour(tableDeJeu.tour);
            if(tableDeJeu.tour > 0){
                envoiInfoNumTour(tableDeJeu.tour);
            }
        }

        if(tableDeJeu.tour!=0){
            broadcast("updateData");
        }

        
    })
    
    socket.on("passer",(data)=>
    {
        //plus qu'a update update_data
        game.jouerTour(4,0);
        let indiceJoueurCourant= findIndicePlayer(socket.id);
        prochainJoueurAJouer(indiceJoueurCourant);
        
        // envoi des données de l'action du joueur pour l'affichage de l'action niveau front
        let actionEnvoi=[]
        actionEnvoi.push(2); // 2 = checker
        actionEnvoi.push(0);
        actionEnvoi.push(tableau_joueurDetail[indiceJoueurCourant].pseudo);
        envoiActionJoueur(actionEnvoi);

        //Verifier tour
        if (game.tour!==tableDeJeu.tour) 
        {
            tableDeJeu.tour=game.tour;
            initNewTour(tableDeJeu.tour);
            if(tableDeJeu.tour>0){
                envoiInfoNumTour(tableDeJeu.tour);
            }
        }
        broadcast("updateData");
    })

    // reset de la partie et + attente que tous les joueurs sont prêts
    socket.on("reset",(data)=>{
        tableDeJeu.Nb_Joueurs++;
        //Il faut aussi verifier qu'une partie n'est pas deja en cours
        if(tableDeJeu.Nb_Joueurs> 1 && tableDeJeu.tour===0){ 
            game.departJeuPoker();
             //mettre tous les joueurs en en IsPlaying
            initJoueurPresent();
            //Sert de start car il faut bien qu'une personne commence
            tableDeJeu.tour=1
            initNewTour(tableDeJeu.tour);
            //Il faut récuperer les cartes aussi quand ca fonctionnera
            broadcast("updateData");

        }
        //broadcast("NouvelArrivant"); // On envoie a tout le monde les données que tout le monde veux
        
    })

    socket.on("RejoindrePartie",(data)=>
    {
        console.log(data);
    //Partie en cours ? (just a security)
    //faire un tableau temp avec id_joeurs dedans de ce qui joue
    //faire une limite de 6 joueurs
    //ou laisser tout le temps tant que les 6 joueurs deja présent ne soit pas dedans et si ils sont dedans envoie socket pour dire fin du temps pour rejoindre  
    
        if (tableDeJeu.tour==0) {
            // if (!tab_tmp_iduser.includes(data) && tab_tmp_iduser.length<6) {
            //     tab_tmp_iduser.push(data);
            // } else if (tab_tmp_iduser.length === 6) {
            //     broadcast("fin du temps pour rejoindre");
            // }
            for(let i=0;i<6;i++)
            {
                if(tableau_joueurDetail[i].IdJoueur === data) 
                {
                    tab_tmp_iduser.push(data);
                    //tableDeJeu.Nb_Joueurs++;
                }
            }

            // if(tableDeJeu.Nb_Joueurs === 6)
            // {
            //     broadcast("fin du temps pour rejoindre");
            // }
            console.log(tab_tmp_iduser)
        }
    
    })

    socket.on("deconnexion",(idJoueurQuiQuitte)=>
    {
        console.log("Deconnection");
        quitterJoueur(idJoueurQuiQuitte);
        broadcast("updateData");
    })


    socket.on("finDeTimer",()=>
    {       

        let tableau_joueurDetail_tmp = [];      //joueurs restants
        let tableau_joueur_tmp = [];
        let tab_tmp_iduser_nouv = [];              //nouveau joueur
        tab_tmp_iduser_nouv = tab_tmp_iduser.slice();
        

        if(tableDeJeu.Nb_Joueurs < 6){
            for (let i = 0; i < 6; i++) {
                for(let j=0;j<tab_tmp_iduser.length;j++){
                    if(tableau_joueurDetail[i].Id_User === tab_tmp_iduser[j]){      //trouver meme id_user
                        tableau_joueurDetail_tmp.push(tableau_joueurDetail[i]);     //reserver dans le tableau_joueurDetail_tmp
                        tab_tmp_iduser_nouv.splice(j,1);                                //Supprimez tous les joueurs du tour précédent et les autres sont de nouveaux joueurs
                    }
                }
            }

            for (let i = 0; i < 6; i++) {
                for(let j=0;j<tab_tmp_iduser.length;j++){
                    if(tableau_joueur[i].Id_User === tab_tmp_iduser[j])
                    {
                        tableau_joueur_tmp.push(tableau_joueurDetail[i]);           //reserver dans le tableau_joueur_tmp
                    }
                }
                
            }

            for(let i=0;i<tab_tmp_iduser_2;i++){
                let placeLibre = trouveUnePlaceLibre();

                tableau_joueur[placeLibre].remplacer();             
                tableau_joueurDetail[placeLibre].remplacer();
                tableDeJeu.Nb_Joueurs++;
            }
        } 
    })

    /* -----------GESTION DES ROLES-----------  */
    // VOYANTE
    //data [0] , 
    //data [1] , 
     socket.on("voyanteVisuCarte",(data)=>{ // gestion de la reception de l'utilisation du pouvoir de la voyante
        console.log("VOYANTE SERVEUR: ")
        console.log(data[0]);
        console.log(data[1]);
        envoiVisuVoyante(data);
    })

    // VOLEUR
    //data[0], pseudo du joueur ciblé
    //data[1], indice de la main du voleur pour la quelle il veut se debarrasser 
    socket.on("voleurAction",(data)=>{
        //envoiCarteVoleur(data);
        broadcastJoueurVoleur(data);
    })

    // POLICIER
    //data[0], pseudo du joueur ciblé
    //data[1], socketid du joueur provenant
    socket.on("policeAction",(data)=>{
        // broadcast("updateData"); pour signaler à tous les joueurs qu'un joueur s'est fait emprisonner
        broadcastJoueurPrison(data);
    })

    // USURPATEUR
    socket.on("usurpateurAction",(data)=>{
        //
        broadcastJoueurUsurpateur(data)
    })

    // INSOLVABLE
    // data[0], socketid du joueur
    // data[1], montant de la mise 'suivie'
    socket.on("insolvableAction",(data)=>{
        broadcastJoueurInsolvable(data)
    })

    // ESCROC
    socket.on("escrocAction",(data)=>{
        //
        broadcastJoueurEscroc(data)
    })
})

/*=======================================================================================================================================================================*/
/*---- PARCOURS DES TABLEAU ----*/
/*=======================================================================================================================================================================*/
//retourne l'indice du joueur dans les tableau Joueur et Joueur detail en prenant comme argument l'idjoueur, -1 si l'id n'existe pas.
function findIndicePlayerParID(idJoueur)
{   
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {
        if (tableau_joueurDetail[i].IdJoueur==idJoueur) 
        {
            return i;    
        }
    }
    return -1
}
//Actualise les tableaux joueur et joueurDetail avec les données present dans le jeu
function updateDesDonnees() 
{

    for (let i = 0; i < tableau_joueur.length; i++) 
    {
        if (tableau_joueur[i].isInGame===true) 
        {
            tableau_joueur[i].nb_jetons=game.joueurs[i].jetons
            tableau_joueurDetail[i].nb_jetons=game.joueurs[i].jetons
        }

    }
}
//retourne l'indice du joueur dans les tableau Joueur et Joueur detail en prenant comme argument l'idsocket
function findIndicePlayer(sock) {
    for (let i = 0;i<6;i++)
    {
        if(tableau_joueurDetail[i].IdSocket===sock)
        {
            return i
        }
    }
    return -1;
}

//Trouve une place libre , si pas de place libre alors -1
function trouveUnePlaceLibre() 
{
    for(let i=0; i < tableau_joueur.length;i++ )
    {
        if(tableau_joueur[i].pseudo==="")
        {
            return i;
        }
    }
    return -1;
}

/*=======================================================================================================================================================================*/
/*---- GESTION DES EMIT ----*/
/*=======================================================================================================================================================================*/

//Cette fonction envoie a tout les utilisateur autour de la table(Joueur+ Spectateur) les informations du gagnant (pseudo + main)
function envoieSocketGagnant(infosGagnant) 
{
    console.log("Dans la fonction envoie Gagnant le pseudo est : ", infosGagnant)
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        Tab_socket[i].emit('Gagnant',infosGagnant);
    }
}

//Emet un emit a chaque joueur personalisé grace a l'objet UPDATE_DATA, prend
function broadcast(titreSocket) 
{
    let isSpectateur = true;
    //Il manque l'envoie du mode spectateur
    let j=0;
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        // Partie Joueur 
        for (let j = 0; j < update_data_table.length; j++) 
        {
            if (Tab_socket[i].id===update_data_table[j].MonJoueur.IdSocket) 
            {
                Tab_socket[i].emit("updateData",update_data_table[j]);
                console.log("Le message a été envoyé a ",update_data_table[j].MonJoueur.pseudo);
                isSpectateur = false;
                break;
            }
        }
        if(isSpectateur){
            Tab_socket[i].emit("updateData",data_spec);
        }
        isSpectateur = true;
    }
    

    console.log("Le broadcast du ",titreSocket," est terminé");
}

// gestion de l'envoi de l'action d'un joueur (utilisé pour afficher l'animation des joueurs autour de la table)
function envoiActionJoueur(data){

    for (let i = 0; i < Tab_socket.length; i++) 
    {
        Tab_socket[i].emit("ActionJoueur",data);
    }
}

function envoiJoueurJoined(data){
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        Tab_socket[i].emit("NouveauJoueur",data);
    }
}

function envoiInfoNumTour(data){
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        Tab_socket[i].emit("InfoNumTour",data);
    }
}

/*=======================================================================================================================================================================*/
/*----GESTION PARTIE JEU ----*/
/*=======================================================================================================================================================================*/

//Renvoie l'indice du prochain joueur a jouer dans la partie
function prochainJoueurAJouer(indiceJoueurCourant) 
{
    let i=indiceJoueurCourant+1
    //On met a jour le joueur courrant qu'il ne joue plus
    tableau_joueur[indiceJoueurCourant].isPlaying=false
    tableau_joueurDetail[indiceJoueurCourant].isPlaying=false
    while (indiceJoueurCourant!==i) 
    {
        if (i >= 6) 
        {
            i = 0; // Réinitialiser i
        }
        //On met a jour le prochain joueur a jouer
        console.log(i);
        if (tableau_joueur[i].isInGame===true && tableau_joueur[i].Coucher===false ) 
        {
            tableau_joueur[i].isPlaying=true
            tableau_joueurDetail[i].isPlaying=true
            //console.log("L'update du joueur ",tableau_joueurDetail[i].pseudo," c'est bien passé")
            return 0;
        }
        i++
        if (i >= 6) 
        {
            i = 0; // Réinitialiser i
        }
    }
    console.log("Attention probleme , aucun autre joueur n'a été détecté \n Pour Debug voici le tableau complet de Update_Data \n",update_data_table);
    return 1; // joueur a gagner ou probleme ... 
}

//Initialise dans les tableau Joueur et JoueurDetail tout les joueur qui vont commencer la partie.
function initJoueurPresent() 
{
    for (let i = 0; i < tableau_joueur.length; i++) 
    {
        if(tableau_joueur[i].pseudo!==''&&tableau_joueur[i].isInGame===false)
        {
            tableau_joueur[i].isInGame=true;
            tableau_joueurDetail[i].isInGame=true;
        }
    }
    console.log("Les joueurs présent sont actuellement détecté en jeu");
}

//Reset tout les status des joueurs.
function resetStatutJoueur() {
    for (let i = 0; i < tableau_joueur.length; i++) 
    {
        if(tableau_joueur[i].pseudo!=='')
        {
            tableau_joueur[i].Coucher = false; 
            tableau_joueurDetail[i].Coucher = false; 
            tableau_joueur[i].isPremierJoueur = false; 
            tableau_joueurDetail[i].isPremierJoueur = false; 
            tableau_joueur[i].isPlaying = false; 
            tableau_joueurDetail[i].isPlaying = false;
            tableau_joueur[i].Mise = 0; 
            tableau_joueurDetail[i].Mise = 0;
            tableau_joueur[i].Mise_Tour = 0; 
            tableau_joueurDetail[i].Mise_Tour = 0;
        }
    }
    console.log("Les joueurs présent sont pret pour une nouvelle partie");
}

//Recuperation de la main de chaque joueur dans l'objet seveur MAIN (qui est dans ./Objet.js), en selectionnant chaque attribue
function recuperationMainsJoueurs() 
{
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {
        if (tableau_joueurDetail[i].isInGame) 
        {
            let temps = new Mains(game.joueurs[i].mains.cartes[0].valeur,game.joueurs[i].mains.cartes[0].couleur,game.joueurs[i].mains.cartes[1].valeur,game.joueurs[i].mains.cartes[1].couleur)
            tableau_joueurDetail[i].Main=temps;
        }
    }
}

//Permet de recuperer les cartes présente sur la table afin de l'envoyer le nombre exacte de carte a afficher pour le front pour ne pas que les joueurs puisse l'intercepter des informations pouvant facilité la win
function recuperationCartesTable(tour) 
{
    let temps={}
    if (tour===2) 
    {
        tableDeJeu.blind=0;
        for (let i = 0; i < 3; i++) 
        {
            temps[`carte${i}`]={valeur:game.dealer.CarteTable[i].valeur,couleur:game.dealer.CarteTable[i].couleur}
        }
        
    }else if(tour===3)
    {
        for (let i = 0; i < 4; i++) 
        {
            temps[`carte${i}`]={valeur:game.dealer.CarteTable[i].valeur,couleur:game.dealer.CarteTable[i].couleur}
        }
    }else if (tour===4) 
    {
        for (let i = 0; i < 5; i++) 
        {
            temps[`carte${i}`]={valeur:game.dealer.CarteTable[i].valeur,couleur:game.dealer.CarteTable[i].couleur}
        }
    }
    tableDeJeu.CartesSurTable=temps;
}

//Quand un changement de tour s'opere dans la partie alors cette fonction est déclenchée afin de d'actualiser les actions correspondante
function initNewTour(tour) 
{
    tableDeJeu.Mise_minimum=0;
    updateDesDonnees();
    tableDeJeu.Mise_maximum=recuperationLeNbDeJetonLePlusBas()
    switch (tour) 
    {
        case 1:
            //distribution des cartes aux joueurs
            RecuperationRole()
            tableDeJeu.blind=Math.floor(recuperationLeNbDeJetonLePlusBas()*0.1);
            tableDeJeu.Mise_maximum=recuperationLeNbDeJetonLePlusBas();
            initPremierJoueur();
            for (let i = 0; i < tableau_joueurDetail.length; i++) 
            {
                if (tableau_joueurDetail[i].isPremierJoueur) 
                {
                    tableau_joueur[i].isPlaying=true;
                    tableau_joueurDetail[i].isPlaying=true;
                    initBlind(tableDeJeu.blind,i)
                    tableDeJeu.CartesSurTable=0
                }
            }
            recuperationMainsJoueurs();
            updateDesDonnees();
            return
        case 5:
            //fin de partie
            //il faut récuperer les donner sortant de l'algo de jeu de Hayk et si utilisateur a plus de jeton alors il est gagnant
            //+ reset pour une nouvelle partie
            //reset isPlaying car il est possible de cliquer sur les actions dans le front
            for (let i = 0; i < tableau_joueurDetail.length; i++) {
                tableau_joueurDetail[i].isPlaying=false;
            }
            updateDesDonnees()
            broadcast('updateData')
            envoieSocketGagnant(findPseudoGagnant());
            tableDeJeu.tour=0;
            tableDeJeu.CartesSurTable=0;
            game.joueurGagnant=[];
            console.log("Debut compteur");
            envoieCompteur();
            setTimeout(SuiteDeFinDePartie,(tempPourRej+1)*1000);//21000 pour debeug on l a mis a 10 
            return
        default:
            break;
    }
    //reset de mise minimum
    resetMiseTour();
    recuperationCartesTable(tour);
    resetMiseTour();
}
resetMiseTour();

var timer_rejouer = tempPourRej;
var intervalId = null;

//Emition d'un compteur au front entre 2 partie afin qu'il soit synchro
function envoieCompteur() 
{  
    if(timer_rejouer>0) {
        intervalId = setTimeout(() => {
            timer_rejouer -= 1;  
            console.log("compteur: "+ timer_rejouer)
            io.sockets.emit('counter', timer_rejouer);
            envoieCompteur();
        }, 1000)
    }
    if(timer_rejouer === 0){
        console.log("FIN DU TEMPS POUR REJ LA PARTIE");
        return;
    }
}

//Parcours de la liste entiere afin de retourner la valeur de jetons le plus bas autour de la table actuellement
function recuperationLeNbDeJetonLePlusBas()
{
    let nbJetonsLePlusBas = tableau_joueurDetail[0].nb_jetons
    for (let i = 1; i < tableau_joueurDetail.length; i++)
    {
        if (tableau_joueurDetail[i].nb_jetons<nbJetonsLePlusBas && tableau_joueurDetail[i].pseudo!=='') 
        {
            nbJetonsLePlusBas=tableau_joueurDetail[i].nb_jetons;
        }
    }
    return nbJetonsLePlusBas
}

//Se sert de l'attribue dans le jeu "First Shooter" afin de retrouver l'id du joueur pour le comparer a toute la table afin de trouver le bon premier joueur
function initPremierJoueur() 
{
    let idJoueurPremier=game.joueursEnCours[game.indiceFirstShooter].idJoueur;
    for (let i = 0; i < tableau_joueurDetail.length; i++) {
        if (tableau_joueurDetail[i].IdJoueur===idJoueurPremier) 
        {
            tableau_joueurDetail[i].isPremierJoueur=true;
            tableau_joueur[i].isPremierJoueur=true;       
        }
    }
}

//Cette fonction regarde si le joueur est autour de la table grace a son id, marche avec la feature "deconnexion sauvage"
function isAlreadyHere(idJoueur) {
    for (let i = 0; i < tableau_joueurDetail.length; i++) {
        if (tableau_joueurDetail[i].IdJoueur===idJoueur) {
            return i;
        }       
    }
    return -1;
}

//Renvoie les informations du gagnant (Pseudo + Mains)
function findPseudoGagnant()
{
    let concatPseudo=""
    let infosGagnant = [];
    let j = game.joueurGagnant.length-1;
    while (j>=0) {
        infosGagnant.push(concatPseudo+tableau_joueurDetail[game.joueurGagnant[j]].pseudo);
        infosGagnant.push(tableau_joueurDetail[game.joueurGagnant[j]].Main);
        // infosGagnant.push(game.joueurs[game.joueurGagnant[j]].mains.rang.valeur);
        //concatPseudo=concatPseudo+tableau_joueurDetail[game.joueurGagnant[j]].pseudo;
        j--
    }
    //return concatPseudo;
    return infosGagnant;
}

//Reset les Mise_Tour de chaque joueur (est appellé entre chaque dans la fonction InitNewTour)
function resetMiseTour() {
    for (let i = 0; i < tableau_joueurDetail.length; i++) {
        if (tableau_joueurDetail[i].isInGame) {
            tableau_joueurDetail[i].Mise_Tour=0;
            tableau_joueur[i].Mise_Tour=0;
        }
    }
}

//Initialisation des blinds et actualisation pour le front et dans le jeu
function initBlind(blind,indiceJoueurPremier) {
    let i=indiceJoueurPremier+1
    cbDeBlind=0;
    if (tableDeJeu.Nb_Joueurs>2) {

        while(i!==indiceJoueurPremier) 
        {
            if (tableau_joueurDetail[i].isInGame===true) 
            {
                //SMALL BLIND
                if (cbDeBlind==0)
                {
                    game.joueurs[i].miser(game.dealer,Math.floor(blind/2));
                    tableau_joueurDetail[i].Mise=Math.floor(blind/2);
                    tableau_joueurDetail[i].Mise_Tour=Math.floor(blind/2);
                    //game.dealer.jetonsSurTable+=Math.floor(blind+blind/2);
                    tableau_joueur[i].Mise_Tour=Math.floor(blind/2);
                    tableau_joueur[i].Mise=Math.floor(blind/2);
                    cbDeBlind++;
                }
                //BIG BLIND
                if (cbDeBlind===1) 
                {
                    tableau_joueur[i].Mise=blind;
                    tableau_joueurDetail[i].Mise=blind;
                    tableau_joueurDetail[i].Mise_Tour=Math.floor(blind);
                    //game.dealer.jetonsSurTable+=Math.floor(blind);
                    tableau_joueur[i].Mise_Tour=Math.floor(blind);
                    tableDeJeu.Mise_total=blind;
                    game.joueurs[i].miser(game.dealer,blind);  
                    return  
                }
                
            }
            i++;
            if (i===6) 
            {
                i=0;
            }
        }
    }else
    {
        //si il n'y a que deux joueurs
        while (i!==indiceJoueurPremier) 
        {
            if (tableau_joueurDetail[i].isInGame===true) 
            {
                tableau_joueurDetail[i].Mise=blind;
                tableau_joueurDetail[i].Mise_Tour=Math.floor(blind);
                tableau_joueur[i].Mise_Tour=Math.floor(blind);
                tableau_joueur[i].Mise=blind;
                tableDeJeu.Mise_total=blind;
                //game.dealer.jetonsSurTable+=Math.floor(blind);
                game.joueurs[i].miser(game.dealer,blind);
                return;
            }
            i++;
            if (i===6) 
            {
                i=0;
            }
        }
    }
}

//Est la suite de la detection de fin de partie, est utile de la séparer en 2 car la fonction SetTimeout permet de lancer un fonction apres un temps donné
//Nous avions besoin aussi que chaque élément se fasse l'ordre doncnous devions leur mettre a un Await
async function SuiteDeFinDePartie()
{
    await recuperationDesJoueurs();
    await resetStatutJoueur();
    await initJoueurPresent();
    tableDeJeu.Mise_total=0;
    if (tableDeJeu.Nb_Joueurs>1) 
    {
        // game.indiceFirstShooter=-1
        game.departJeuPoker();
        tableDeJeu.tour=1;
        envoiInfoNumTour(tableDeJeu.tour);
        initNewTour(tableDeJeu.tour);
    }
    broadcast("updateData");
    timer_rejouer=tempPourRej;
    intervalId=null;

}
var timer_rejouer = tempPourRej;
var intervalId = null;

//tab_tmp_iduser  tab priorite


//Cette fonction laisse dans le tableau de joueur et joueursDetail tous les joueurs ayant cliqué sur rejouer, fait quitter ceux qui n'ont pas cliqué , et ajoute les spectateurs dans l'ordre d'arrivé de ces dernier
function recuperationDesJoueurs() 
{
    let tableau_joueurDetail_tmp = [];      //joueurs restants
    let tableau_joueur_tmp = [];
    let tab_tmp_iduser_nouv = [];              //nouveau joueur
    tab_tmp_iduser_nouv = tab_tmp_iduser.slice();
        
    updateDesDonnees();
    if(tableDeJeu.Nb_Joueurs < 6){ // ceci me semble étrange 
        let JoueurRejoue=false;
        for (let i = 0; i < 6; i++) {
            if(tableau_joueurDetail[i].pseudo!='')
            {
                if (tableau_joueurDetail[i].nb_jetons>0) 
                {
                    for(let j=0;j<tab_tmp_iduser.length;j++)
                    {
                        if(tableau_joueurDetail[i].IdJoueur === tab_tmp_iduser[j])
                        {      //trouver meme id_user
                            //Joueur decide de relancer
                            tableau_joueurDetail_tmp.push(tableau_joueurDetail[i]);     //reserver dans le tableau_joueurDetail_tmp
                            JoueurRejoue=true;
                        }
                    }
                }
                if (!JoueurRejoue) 
                {
                    //Joueur decide de ne pas relancer
                    quitterJoueur(tableau_joueurDetail[i].IdJoueur);
                }
                JoueurRejoue=false;
            }
        }

        for (let i = 0; i < 6; i++) {
            for(let j=0;j<tab_tmp_iduser.length;j++)
            {
                if(tableau_joueur[i].Id_User === tab_tmp_iduser[j])
                {
                    tableau_joueur_tmp.push(tableau_joueurDetail[i]);           //reserver dans le tableau_joueur_tmp
                }
            } 
        }
        let indice = trouveUnePlaceLibre()
        while (indice!=-1&&Tab_spectateur.length!==0) 
        {
            
            if (Tab_spectateur.length!==0) 
            {      
                let Joueur_spectateur = Tab_spectateur.shift(); 
                tableau_joueurDetail[indice].remplacer(Joueur_spectateur);
                tableau_joueur[indice].remplacer(new Joueur(Joueur_spectateur.pseudo,Joueur_spectateur.jetons));
                tableDeJeu.Nb_Joueurs++;
                //init joueur
                game.initJoueur(tableau_joueurDetail[indice].IdJoueur,tableau_joueurDetail[indice].nb_jetons,tableau_joueurDetail[indice].nb_jetons);
                indice = trouveUnePlaceLibre();
            }
        }
    tab_tmp_iduser = [] 
    }
}
/*=======================================================================================================================================================================*/
/*---- GESTION DE LA DECONNEXION DES JOUEURS ----*/
/*=======================================================================================================================================================================*/

//Supprime l'existence d'un joueurs qui part , a la fois dans le jeu ainsi que dans les données faite pour transmettre au front.
//Prends en considération toute les possibilité de quitter.
function quitterJoueur(idJoueurQuiQuitte)
{
    let indiceJoueurQuiQuitte= findIndicePlayerParID(idJoueurQuiQuitte)
    //pour ne pas faire crash le serveur quand un joueur qui a deja été kick se faire rekick sachant qu'il n'existe plus 
    if (indiceJoueurQuiQuitte!=-1) 
    {
        for(var i=0; i<Tab_socket.length;i++)
        {
        if(tableau_joueurDetail[indiceJoueurQuiQuitte].IdSocket==Tab_socket[i].id)
        {
            Tab_socket[i].emit("QuitterPartie");
        }
        }
        for (let i = 0; i < Tab_socket.length; i++) 
        {
            if (Tab_socket[i].id===tableau_joueurDetail[indiceJoueurQuiQuitte].IdSocket) 
            {
                Tab_socket.splice(i,1);
            }
        }
        //Reset dans le tableau de joueur
        tableau_joueurDetail[indiceJoueurQuiQuitte].reset();
        tableau_joueur[indiceJoueurQuiQuitte].reset();
        //Pour forcer le quitte
        if (tableDeJeu.tour!==0 && tableDeJeu.tour!==5) 
        {
            if (game.joueurCourant.idJoueur===idJoueurQuiQuitte) {
                game.jouerTour(2,0);
                
                if (game.tour!==tableDeJeu.tour) 
                {
                    tableDeJeu.tour=game.tour;
                    initNewTour(tableDeJeu.tour);
                }  
                prochainJoueurAJouer(indiceJoueurQuiQuitte);
            }
        }
        
        game.quitterJoueur(indiceJoueurQuiQuitte);
        tableDeJeu.Nb_Joueurs--;
        if (game.tour!==tableDeJeu.tour && tableDeJeu.tour!==5 && tableDeJeu.tour!==0) 
        {
            tableDeJeu.tour=game.tour;
            initNewTour(tableDeJeu.tour);
        }  

        broadcast("updateData");
    }else
    {   
        //On verifie que l'utilisateur qui quitte est un spectateur
        for (let i = 0; i < Tab_spectateur.length; i++) 
        {
            if (Tab_spectateur[i].IdJoueur===idJoueurQuiQuitte) 
            {
                Tab_spectateur.splice(i,1);
                Tab_socket.splice(i,1);
            }
        }
    }
}

//Cette fonction detect si un joueur a deja été passer dans quitter joueur , mais se fait appeller dans deco joueur 
function deconexionSauvage(socketIdDeJoueurQuiQuitte) 
{
    let leJoueurNestPasRevenu=false
    for (let i = 0; i < tableau_joueurDetail.length; i++) {
        if (tableau_joueurDetail[i].pseudo!== '') 
        {
            if (tableau_joueurDetail[i].IdSocket===socketIdDeJoueurQuiQuitte) 
            {
                quitterJoueur(tableau_joueurDetail[i].IdJoueur);
                leJoueurNestPasRevenu=true;  
            }   
        }
    }
}



/*=======================================================================================================================================================================*/
/* ------ GESTION DES ROLES ------ */
/*=======================================================================================================================================================================*/

// INDICATEUR
//data[0], pseudo du joueur ciblé
//data[1], socketid du joueur provenant
function envoiVisuVoyante(data){ // envoi de la carte à la voyante
    let pseudo_joueur = data[0];
    let id_voyante = data[1];

    let main_joueur;

    for(let j = 0; j < tableau_joueurDetail.length; j++){
        if(tableau_joueurDetail[j].pseudo === pseudo_joueur){
            main_joueur = tableau_joueurDetail[j].Main.carte1;
        }
    }

    for (let i = 0; i < Tab_socket.length; i++) 
    {
        if(Tab_socket[i].id === id_voyante){
            Tab_socket[i].emit('reponseVoyante',main_joueur);
        }    
    }
}


// POLICIER
//data[0], pseudo du joueur ciblé
//data[1], socketid du joueur provenant
function broadcastJoueurPrison(data){
    //On met le CD du role a -1 pour le rendre inutilisable
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {
        if(tableau_joueurDetail[i].pseudo===data[0])
        {
            tableau_joueurDetail[i].Cd_Pouvoir=-1;
        }
    }
    //On envoie a tout le monde qu'un joueur c'est fait emprisonner 
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        Tab_socket[i].emit('reponsePolicier',data);  // pour informer à tous les joueurs qu'un joueur a été emprisonné
    }
}

//USURPATEUR
//data[0] pseudo du joueur ciblé
//data[1] socket id de l'usurpateur
function broadcastJoueurUsurpateur(data){
    //Recuperation du role du joueur ciblé par l'usurpateur
    let role_usurpe;
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {
        if(tableau_joueurDetail[i].pseudo===data[0])
        {
            role_usurpe = tableau_joueurDetail[i].Role;
        }
    }
    // envoi du role à l'usurpateur
    for (let i = 0; i < Tab_socket.length; i++) 
    {
        if(tableau_joueurDetail[i].IdSocket === data[1]){
            tableau_joueurDetail[i].Role = role_usurpe;
        }
        if(Tab_socket[i].id === data[1]){
            Tab_socket[i].emit('reponseUsurpateur',role_usurpe);
        }    
    }
}
// VOLEUR
//data[0] pseudo du joueurciblé
//data[1] socket.id du joueur courrant
//data[2] l'indice dans la main de la carte du voleur qui veut se debarasser
function broadcastJoueurVoleur(data)
{
    //Recuperation d'une carte random du joueur ciblé dans carteVolee
    let carteVoleeValeur
    let carteVoleeCouleur
    let indiceVoleur = findIndicePlayer(data[1])
    let indiceVictime 
    let tempMainVictime=new Mains
    let tempMainVoleur=new Mains
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {
        if(tableau_joueurDetail[i].pseudo===data[0])
        {
            indiceVictime=i

            
            if(data[2]===0)
            {
                carteVoleeValeur=tableau_joueurDetail[i].Main.carte1.carte1Valeur
                carteVoleeCouleur=tableau_joueurDetail[i].Main.carte1.carte1Couleur
                tableau_joueurDetail[i].Main.carte1.carte1Valeur=tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Valeur
                tableau_joueurDetail[i].Main.carte1.carte1Couleur=tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Couleur
            }else
            {
                carteVoleeValeur=tableau_joueurDetail[i].Main.carte2.carte2Valeur
                carteVoleeCouleur=tableau_joueurDetail[i].Main.carte2.carte2Couleur
                tableau_joueurDetail[i].Main.carte2.carte2Valeur=tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Valeur
                tableau_joueurDetail[i].Main.carte2.carte2Couleur=tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Couleur  
            }
        
            //Envoie de la nouvelle carte au Volé
            for (let j = 0; j < Tab_socket.length; j++) {
                if (Tab_socket[j].id===tableau_joueurDetail[i].IdSocket) 
                {
                    Tab_socket[j].emit("MaJCartesVoleur",tableau_joueurDetail[i].Main);
                }
            }
        }
    }

    //afficher la carte recup au voleur
    if (data[2]===0) 
    {
        tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Valeur=carteVoleeValeur
        tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Couleur=carteVoleeCouleur
    }else
    {
        tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Valeur=carteVoleeValeur
        tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Couleur=carteVoleeCouleur
    }
    //Envoie de la nouvelle carte au voleur
    for (let j = 0; j < Tab_socket.length; j++) 
    {
        if (Tab_socket[j].id===tableau_joueurDetail[indiceVoleur].IdSocket) 
        {
            Tab_socket[j].emit("MaJCartesVoleur",tableau_joueurDetail[indiceVoleur].Main);
        }
    }
    
    //On met a jour dans le jeu les cartes
    game.joueurs[indiceVoleur].mains.cartes[0].valeur=tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Valeur;
    game.joueurs[indiceVoleur].mains.cartes[1].valeur=tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Valeur;
    game.joueurs[indiceVictime].mains.cartes[0].valeur=tableau_joueurDetail[indiceVictime].Main.carte1.carte1Valeur;
    game.joueurs[indiceVictime].mains.cartes[1].valeur=tableau_joueurDetail[indiceVictime].Main.carte2.carte2Valeur;

    game.joueurs[indiceVoleur].mains.cartes[0].couleur=tableau_joueurDetail[indiceVoleur].Main.carte1.carte1Couleur;
    game.joueurs[indiceVoleur].mains.cartes[1].couleur=tableau_joueurDetail[indiceVoleur].Main.carte2.carte2Couleur;
    game.joueurs[indiceVictime].mains.cartes[0].couleur=tableau_joueurDetail[indiceVictime].Main.carte1.carte1Couleur;
    game.joueurs[indiceVictime].mains.cartes[1].couleur=tableau_joueurDetail[indiceVictime].Main.carte2.carte2Couleur;
}

//ESCROC
//data = IdSocket
function broadcastJoueurEscroc(data)
{
    let indiceEscroc=findIndicePlayer(data)
 
    let sommeRecup = Math.floor(tableau_joueurDetail[indiceEscroc].Mise / 2);
  //On ajoute au joueur la moitier de la mise dans la BDD
    fctDB.update_user_jetons(tableau_joueurDetail[indiceEscroc].IdJoueur, sommeRecup);
  //On retire de la mise total les jetons recuperé 
    tableDeJeu.Mise_total-=sommeRecup;
    game.dealer.jetonsSurTable-=sommeRecup;

    tableau_joueurDetail[indiceEscroc].nb_jetons+=sommeRecup;
    tableau_joueurDetail[indiceEscroc].Mise-=sommeRecup;
    tableau_joueurDetail[indiceEscroc].Mise_Tour-=sommeRecup;

}

//INSOLVABLE
//Data[0] socket de l'insolvable
//Data[1] somme pour suivre
function broadcastJoueurInsolvable(data){
    /* ajout au joueur de la moitie de la mise qu'il vient de jouer */
    let sommeGain = Math.floor(data[1] / 2); 
    let indiceInsolvable=findIndicePlayer(data[0]);
    tableau_joueurDetail[indiceInsolvable].nb_jetons+=sommeGain; // probleme le changement n'est pas actualisé lors de la suite de la partie (solution: ajouter booleen à socket emit miser pour enlever 50% à la mise)
    fctDB.update_user_jetons(tableau_joueurDetail[indiceInsolvable].IdJoueur, sommeGain);
    game.joueurs[indiceInsolvable].jetons+=Math.floor(sommeGain);
    updateDesDonnees()
    broadcast("updateData")
}

//Mets le role aux joueurs qui n'ont pas de role
function RecuperationRole() 
{   
    game.dealer.initRoles(game.joueurs);
    for (let i = 0; i < tableau_joueurDetail.length; i++) 
    {

        if(tableau_joueurDetail[i].pseudo!=='')
        {
            let idRole=game.joueurs[i].role.idRole//ici
            tableau_joueurDetail[i].Role=idRole;//idRole
            tableau_joueurDetail[i].Cd_Pouvoir=0;
        }
        
    }
}
