<template>
    <div class="contact">
    <header>
        <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang"/>
        <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
        <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
    </header>
    
    <div id="section_bouton_logo">
        <button id="#bouton_retour"><RouterLink to="/accueil">{{ $t("retour") }}</RouterLink></button>
        <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne"/>
        <div id="div_vide"></div>
    </div>

    <form id="form_contact" @submit="checkForm">
        <input  type="text" id="username" name="username" :placeholder =" $t('username') ">
        
        <input type="text" id="mail" name="mail" :placeholder="$t('Email')">
        <p id="mail_invalide">{{ $t("mail_invalide") }}</p>


        <textarea id="message" name="message" rows="5" cols="110" :placeholder="$t('message')"></textarea>


        <button id="contacter_valider" type="submit">{{ $t("envoyer") }}</button>
        <p id="champ_vide">{{ $t("champ_vide") }}</p>
        
    </form>


    <footer>
      <a target="_blank" href="https://linktr.ee/poker_gang"><img src="../../public/img/logo_instagram.png" alt="Instagram"></a>
    </footer>
    </div>
</template>

<script>
import i18n from '../locales/i18n';
import musicacceuil from '../../public/sounds/acceuil.mp3'  ;



export default {
    data() {
        return{
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
        let mail=document.getElementById("mail").value;
        let message=document.getElementById("message").value;    

        console.log(username,mail)

        document.getElementById("champ_vide").style.display="none";
        document.getElementById("mail_invalide").style.display="none";
        document.getElementById("mail").style.border = "none";
        document.getElementById("username").style.border = "none";
        document.getElementById("message").style.border = "none";
       

        // si tous les champs ne sont pas remplis
        if(!username || !mail || !message){
            console.log("Tous les champs ne sont pas remplis");
            document.getElementById("champ_vide").style.display="block";
            if(!username){
                document.getElementById("username").style.border = "5px solid #ff0033";
            }
            if(!mail){
                document.getElementById("mail").style.border = "5px solid #ff0033";
            }
            if(!message){
                document.getElementById("message").style.border = "5px solid #ff0033";
            }
            
        }
        // si c'est pas un Email on peut deja rejeter sans envoyer
        else if(!validator.isEmail(mail)) {
            console.log("L\'username n\'est pas un Email !");
            document.getElementById("mail_invalide").style.display="block";
            document.getElementById("mail").style.border = "5px solid #ff0033";
        }
        
        // Maintenant que tout semble cohérant alors nous pouvons faire un fetch
        else {
            //création du JSON avec les données qu'il faut envoyer
            // envoyer le message à l'adresse mail reliée à Poker Gang
        }
        },

        changeLangue(locale) {
            if (locale == 'en') {
                i18n.global.locale = 'fr'
            }
            if (locale == 'fr') {
                i18n.global.locale = 'en'
            }
        }
    }
}

</script>

  
<style scoped>
body{
    background: pink;
}
.classement{
    color: white;
    font-family: 'Rowdies';

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: justify;
    letter-spacing: 0.05em;    
}


a:link{
    text-decoration: none;
    color: white;
    font-family: 'Rowdies';
}
a {color:#FFFFFF;}      
a:visited {color:#FFFFFF;}
a:hover {color:#FFFFFF;} 
a:active {color:#FFFFFF;} 

header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 45x; 
}

header img:first-child{
    height: 18px; 
    width: auto;
    margin-left: 0px;
    margin-top: 10px;
}

@media all and (min-width: 500px){
    header img:first-child{
        margin-left: 20px;
    }
}

@media all and (min-width: 800px){
    header img:first-child{
        height: 25px;
    }
}

header img:last-child{
    height: 45px;
    width: 55px;
    border-radius: 70px;
    margin-right: 5px;
    margin-top: 5px;
}

@media all and (min-width: 500px){
    header img:last-child{
        margin-right: 20px;
    }
}

#section_bouton_logo{
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0px;
}

@media all and (min-width: 1000px){
    #section_bouton_logo{
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
}

#section_bouton_logo button:first-of-type{
    width: 200px;
    height: 45px;
    background: rgba(2, 47, 76, 0.37);
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 10px;
    margin-right: 0px;
    transition: all 0.3s ease-in-out;

}
#section_bouton_logo button:first-of-type:hover {
  transform: scale(1.05);
}

@media all and (min-width: 500px){
    #section_bouton_logo button:first-of-type{
        font-size: 25px;
        width: 250px;
        height: 60px;

    }
}

@media all and (min-width: 1000px){
    #section_bouton_logo button:first-of-type{
        margin-left: 104px;
        margin-top: 85px;
    }
}

#section_bouton_logo div:last-of-type{
    width: 0px;
    height: 0px;
    margin-right: 0px;
    margin-top: 0px;
}

@media all and (min-width: 1000px){
    #section_bouton_logo div:last-of-type{
        width: 250px;
        height: 60px;
        margin-right: 104px;
        margin-top: 85px;
    }
}


#section_bouton_logo img{
    width: 150px;
    height: 150px;
    margin-top: -20px;
}

@media all and (min-width: 500px){
    #section_bouton_logo img{
        width: 260px;
        height: 260px;
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



form input{
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

form input:first-of-type{
    margin-top: 20px;
}

form textarea{
    border: none;
    margin-bottom: 30px;
    color: #FFFFFF;
    background: rgba(2, 47, 76, 0.6);
    font-size: 22px;
    border-radius: 20px;
    padding: 5px;

}

@media all and (min-width: 600px) {
    form input, form textarea {
        font-size: 30px;
        width: 550px;
    }
}

@media all and (min-width: 700px) {
    form input, form textarea {
        font-size: 30px;
        width: 750px;
    }
}

input::placeholder {
    color: white;
    font-family: 'Rowdies';
    opacity: 0.5;
}

textarea::placeholder{
    color: white;
    font-family: 'Rowdies';
    opacity: 0.5;
}

textarea:focus{
    color: white;
    font-family: 'Rowdies';
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







footer{
    position: fixed;
    bottom: 0;
    right: 0;
}

footer img{
    height: 30px;
    width: auto;
    margin-right: 30px;
    margin-bottom: 20px;
}

footer img:hover{
    cursor: pointer;
    transform: scale(1.10);
}

@media all and (min-width: 800px){
    footer img{
        height: 45px;
    }
}
  </style>
  