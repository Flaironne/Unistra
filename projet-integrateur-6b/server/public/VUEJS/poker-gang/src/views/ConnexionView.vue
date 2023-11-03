<template>
    <main>
        <div class="connexion">
            <header>
                <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang" />
                <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
                <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
            </header>
            <div id="section_bouton_logo">
                <button id="#bouton_retour">
                    <RouterLink to="/">{{ $t("retour") }}</RouterLink>
                </button>
                <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne" />
                <div id="div_vide"></div>
            </div>
            <div id="connexion_titre">
                <img v-if="$i18n.locale=='fr'" id="connexion_titre_img" src="../../public/img/connexion_police_poker.png" alt="connexion" />
                <img v-else-if="$i18n.locale=='en'" id="connexion_titre_img" src="../../public/img/login_title.png" alt="connexion" />
            </div>
            <form id="form_connexion" @submit="checkForm">
                <p id="champ_invalide">{{ $t("champ_invalide") }}</p>
                <input type="text" id="username" name="username" :placeholder="$t('Email')">
                <input type="password" id="password" name="password" :placeholder="$t('password')">
                <button id="connexion" type="submit">{{ $t("connexion") }}</button>
                <p id="champ_vide">{{ $t("champ_vide") }}</p>
                <div>
                    <RouterLink to="/inscription">{{ $t("create_acc") }}</RouterLink>
                </div>

            </form>


            <footer>
                <a target="_blank" href="https://linktr.ee/poker_gang"><img src="../../public/img/logo_instagram.png"
                        alt="Instagram"></a>
            </footer>
        </div>
    </main>
</template>

<script>
import i18n from '../locales/i18n';
import musicacceuil from '../../public/sounds/acceuil.mp3'  ;


export default {
    data() {
        return{
            username: '',
            password:'',
            sound: null
        }
    },
    beforeCreate: function () {
        document.body.className = 'all';
    },
    created() {
        this.sound = new Audio(musicacceuil);
        this.sound.volume = 0.01;
        this.sound.loop = true;
        this.sound.play();
    },
    beforeRouteLeave(to, from, next) {
        this.sound.pause();
        next();
    },
    methods: {
        checkForm: function(e)
        {
        e.preventDefault();
        //recuperation des données
        let username=document.getElementById("username").value;
        let password=document.getElementById("password").value;



        document.getElementById("champ_vide").style.display="none";
        document.getElementById("champ_invalide").style.display="none";
        document.getElementById("password").style.border = "none";
        document.getElementById("username").style.border = "none";

        // si tous les champs ne sont pas remplis
        if(!username || !password){
            console.log("Tous les champs ne sont pas remplis");
            document.getElementById("champ_vide").style.display="block";
            if(!username){
                document.getElementById("username").style.border = "5px solid #ff0033";
            }
            if(!password){
                document.getElementById("password").style.border = "5px solid #ff0033";
            }
        }
        // si c'est pas un Email on peut deja rejeter sans envoyer
        else if(!validator.isEmail(username)) {
            console.log("L\'username n\'est pas un Email !");
            document.getElementById("champ_invalide").style.display="block";
            document.getElementById("username").style.border = "5px solid #ff0033";
            document.getElementById("password").style.border = "5px solid #ff0033";
        }
        // Verification de la taille du MDP pour ne pas faire de fetch pour rien
        else if (!validator.isLength(password, 6, 12)) {
            console.log("Le mot de passe n'a pas la bonne taille");
            document.getElementById("champ_invalide").style.display="block";
            document.getElementById("password").style.border = "5px solid #ff0033";
            document.getElementById("username").style.border = "5px solid #ff0033";
        }
        // Maintenant que tout semble cohérant alors nous pouvons faire un fetch
        else {
            //création du JSON avec la données qu'il faut envoyer
            const formData_connexion = {
            username: username,
            password: password
            };

            console.log(username,password)
            console.log(formData_connexion)
            //Lancement du fetch
            fetch("/connexion", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData_connexion)
            //body: formData_connexion
            })
            .then((res)=>{
            //la reponse si le fetch est passé
            if(res.status === 200) {
                //bon logs alors on passe a la partie accueil
                console.log("Connexion Réussi");
                //alors redirection vers page d'acceuil 
                this.$router.push({
                    path: '/accueil'
                });
            }
            else if(res.status === 400) {
                document.getElementById("password").style.border = "5px solid #ff0033";
                document.getElementById("username").style.border = "5px solid #ff0033";
                //mauvais logs alors signalement
                res.json().then(data => {
                    console.log(data.message);
                    // afficher le message d'erreur à l'utilisateur
                    //alert(data.message);
                    document.getElementById("champ_invalide").style.display="block";
                })
            }
            })
            .catch((err)=>{
            //si le fetch a un probleme alors on le signale de retenter plus tard 
            console.log("Problème dans le fetch");
            alert(err);
            })
        }
        },
        changeLangue(locale) {
            if (locale == 'en') {
                i18n.global.locale = 'fr';
            }
            if (locale == 'fr') {
                i18n.global.locale = 'en';
            }
        }
    }
}

</script>

<style scoped>
* {
    font-family: 'Rowdies';
    color: white;
}

main {
    height: 100%;
}

.connexion {
    text-align: justify;
    font-family: 'Rowdies';
    color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;


}


a:link {
    text-decoration: none;
    color: white;
    font-family: 'Rowdies';
}

a {
    color: #FFFFFF;
}

a:visited {
    color: #FFFFFF;
}

a:hover {
    color: #FFFFFF;
}

a:active {
    color: #FFFFFF;
}

header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 45px;
}

header img:first-child {
    height: 18px;
    width: auto;
    margin-left: 0px;
    margin-top: 10px;
}

@media all and (min-width: 500px) {
    header img:first-child {
        margin-left: 20px;
    }
}

@media all and (min-width: 800px) {
    header img:first-child {
        height: 25px;
    }
}


header img:last-child {
    height: 45px;
    width: 55px;
    border-radius: 70px;
    margin-right: 5px;
    margin-top: 10px;
}

@media all and (min-width: 500px) {
    header img:last-child {
        margin-right: 20px;
    }
}



#section_bouton_logo {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
    /**margin-bottom: 0px;*/
    margin-top: 1.5vh;
}

@media all and (min-width: 1000px) {
    #section_bouton_logo {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0px;
    }
}

#section_bouton_logo button:first-of-type {
    width: 200px;
    height: 45px;
    background: rgba(2, 47, 76, 0.37);
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-left: 0px;
    transition: all 0.3s ease-in-out;

}
#section_bouton_logo button:first-of-type:hover {
  transform: scale(1.05);
}

@media all and (min-width: 500px) {
    #section_bouton_logo button:first-of-type {
        font-size: 25px;
        width: 250px;
        height: 60px;
    }
}

@media all and (min-width: 1000px) {
    #section_bouton_logo button:first-of-type {
        margin-left: 104px;
        margin-top: 85px;
    }
}

#section_bouton_logo div:last-of-type {
    width: 0px;
    height: 0px;
    margin-right: 0px;
    margin-top: 0px;
}

@media all and (min-width: 1000px) {
    #section_bouton_logo div:last-of-type {
        width: 250px;
        height: 60px;
        margin-right: 104px;
        margin-top: 85px;
    }
}


#section_bouton_logo img {
    width: 150px;
    height: 150px;
    margin-top: -20px;
}

@media all and (min-width: 500px) {
    #section_bouton_logo img {
        width: 260px;
        height: 260px;
    }
}


#connexion_titre{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 30px;
}

#connexion_titre > img{
    width: 260px;
}

@media all and (min-width: 500px) {
    #connexion_titre{
        margin-top: 0px;
    }
}


form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
}

form p {
    font-size: 18px;
    display: none;
    border-left: 5px solid #ff0033;
    margin: 0;
    margin-bottom: 10px;
    padding-left: 5px;
}

@media all and (min-width: 600px) {
    form p {
        font-size: 22px;
    }
}

form p:last-of-type{
    margin-top: 10px;
    margin-bottom: 0;
}



form input:not(:last-child) {
    border: none;
    margin-bottom: 30px;
    text-align: center;
    color: #FFFFFF;
    background: rgba(2, 47, 76, 0.6);
    font-size: 25px;
    border-radius: 70px;
    border: none;
    width: 250px;
}

@media all and (min-width: 600px) {
    form input:not(:last-child) {
        font-size: 30px;
        width: 550px;
    }
}

@media all and (min-width: 700px) {
    form input:not(:last-child) {
        font-size: 30px;
        width: 750px;
    }
}

input::placeholder {
    color: white;
    font-family: 'Rowdies';
    opacity: 0.5;

}

input:focus {
    color: white;
    font-family: 'Rowdies';
}

form>button {
    background: #01304D;
    font-size: 25px;
    opacity: 1;
    border-radius: 70px;
    border: none;
    text-align: center;
    color: #FFFFFF;
    width: 250px;
    transition: all 0.3s ease-in-out;
}
form > button:hover {
  transform: scale(1.05);
  cursor: pointer;
}

@media all and (min-width: 600px) {
    form>button {
        font-size: 30px;
        width: 550px;
    }
}

@media all and (min-width: 700px) {
    form>button {
        width: 750px;
    }
}

form>div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: auto;
    margin-top: 15px;
    font-size: 20px;
}

@media all and (min-width: 600px) {
    form>div {
        width: 540px;
    }
}

@media all and (min-width: 700px) {
    form>div {
        width: 740px;
    }
}


::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

footer {
    position: fixed;
    bottom: 0;
    right: 0;
}

footer img {
    height: 45px;
    width: auto;
    margin-right: 30px;
    margin-bottom: 20px;
}

footer img:hover{
    cursor: pointer;
    transform: scale(1.10);
}
</style>