<template>
    <main>
    <div class="inscription">
    <header>
        <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang" />
        <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
        <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
    </header>
    <div id="section_bouton_logo">
        <button id="#bouton_retour"><RouterLink to="/">{{ $t("retour") }}</RouterLink></button>
        <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne" />
        <div id="div_vide"></div>
    </div>

    <div id="inscription_titre">
        <img v-if="$i18n.locale=='fr'" id="inscription_titre_img" src="../../public/img/inscription_police_poker.png" alt="inscription" />
        <img v-else-if="$i18n.locale=='en'" id="inscription_titre_img" src="../../public/img/sign_up_title.png" alt="inscription" />
    </div>
    <form id="form_inscr" @submit="checkForm">
        <p id="username_existe">{{ $t("username_existe") }}</p>
        <input  type="text" id="username" name="username" :placeholder =" $t('username') ">
        <p id="username_invalide">{{ $t("username_invalide") }}</p>

        <input type="text" id="mail" name="mail" :placeholder="$t('Email')">
        <p id="mail_invalide">{{ $t("mail_invalide") }}</p>


        <input type="password" id="password" name="password" :placeholder="$t('password')">
        <p id="password_invalide">{{ $t("password_invalide") }}</p>


        <div id="birthday">
            <label for="birthday">{{ $t("birthday") }}</label>
            <input type="date" id="jjmmaaaa" name="birthday">
        </div>
        <p id="majeur">{{ $t("majeur") }}</p>


        <button id="inscription" type="submit">{{ $t("inscription") }}</button>
        <p id="champ_vide">{{ $t("champ_vide") }}</p>
        <div><RouterLink to="/connexion">{{ $t("compte") }}</RouterLink></div>


    </form>

    <footer>
        <a target="_blank" href="https://linktr.ee/poker_gang"><img src="../../public/img/logo_instagram.png" alt="Instagram"></a>
    </footer>
    </div>
    </main>
</template>


<script>

import isAdult from '../../public/inscription';
import i18n from '../locales/i18n';
import musicacceuil from '../../public/sounds/acceuil.mp3'  ;

export default {
    data() {
        return{
            username: '',
            mail:'',
            password:'',
            birthday:'',
            sound: null
        }
    },
    beforeCreate: function() {
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
            let username=document.getElementById("username").value;
            let mail=document.getElementById("mail").value;
            let password=document.getElementById("password").value;
            let birthday=document.getElementById("jjmmaaaa").value;

            
            console.log(username,mail,password,birthday)
            
            document.getElementById("champ_vide").style.display="none";
            document.getElementById("mail_invalide").style.display="none";
            document.getElementById("username_invalide").style.display="none";
            document.getElementById("password_invalide").style.display="none";
            document.getElementById("majeur").style.display="none";
            document.getElementById("username").style.border = "none";
            document.getElementById("mail").style.border = "none";
            document.getElementById("password").style.border = "none";
            document.getElementById("birthday").style.border = "none";

            // si tous les champs ne sont pas remplis
            if(!username || !mail || !password || !birthday)
            {
                console.log("Tous les champs ne sont pas remplis ");
                document.getElementById("champ_vide").style.display="block";
                if(!username){
                    document.getElementById("username").style.border = "5px solid #ff0033";
                }
                if(!mail){
                    document.getElementById("mail").style.border = "5px solid #ff0033";
                }
                if(!password){
                    document.getElementById("password").style.border = "5px solid #ff0033";
                }
                if(!birthday){
                    document.getElementById("birthday").style.border = "5px solid #ff0033";
                }
            }
            // si l'adresse mail n'est pas valide
            else if(!validator.isEmail(mail)){
                console.log("L'adresse mail n'est pas valide");
                document.getElementById("mail_invalide").style.display="block";
                document.getElementById("mail").style.border = "5px solid #ff0033";
            }
            // si l'username n'a pas la bonne taille
            else if(!validator.isLength(username, 6, 12) ){
                console.log("L'username n'a pas la bonne taille'");
                document.getElementById("username_invalide").style.display="block";
                document.getElementById("username").style.border = "5px solid #ff0033";
            }
            // si le mdp est invalide
            else if(!validator.isLength(password, 6, 12)){
                console.log("Le mdp n'est pas valide");
                document.getElementById("password_invalide").style.display="block";
                document.getElementById("password").style.border = "5px solid #ff0033";
            }
            // si l'utilisateur est mineur
            else if(!isAdult(new Date(birthday))){
                console.log("L'utilisateur est mineur");
                document.getElementById("majeur").style.display="block";
                document.getElementById("birthday").style.border = "5px solid #ff0033";
            }
            // si toutes les conditions sont validées, l'user peut être inscrit
            else {
                console.log("Je veux m'inscrire");
                //Création du JSON pour être envoyé
                const formData = {
                    username: username,
                    mail: mail,
                    password: password,
                    birthday: birthday
                };

                fetch('/inscription', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                    .then(res => {
                        if (res.status === 201) {
                            console.log("je suis inscrit");
                            this.$router.push({
                                path: '/connexion'
                            });
                        } else if (res.status === 400) {
                            res.json().then(data => {
                                console.log(data.message);
                                // afficher le message d'erreur à l'utilisateur
                                alert(data.message);
                            })
                        } else {
                            console.log("Erreur dans l'inscription", res);
                            alert(res)
                        }
                    })
                    .catch(err => {
                        console.log("Problème dans le fetch");
                        alert(err);
                    })
            }
        
        },
        changeLangue(locale){
            if(locale=='en'){
                i18n.global.locale = 'fr';
            }
            if(locale=='fr'){
                i18n.global.locale = 'en';
            } 
        }
    }
}
</script>

<style scoped>

*{
    font-family: 'Rowdies';
    color: white;
}

main{
    height: 100%;
}

.inscription{
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




#section_bouton_logo{
    width: 100%;
    display: flex;

    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 1.5vh;
}

@media all and (min-width: 1000px){
    #section_bouton_logo{
        
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0px;
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

#inscription_titre{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 30px;
}

#inscription_titre > img{
    width: 290px;
}

@media all and (min-width: 500px) {
    #inscription_titre{
        margin-top: 0px;
    }
}




form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
}

form p{
    font-size: 18px;
    display: none;
    border-left: 5px solid red;
    margin-top: 0;
    padding-left: 5px;
}

form p:last-of-type{
    margin-top: 10px;
}

@media all and (min-width: 600px){
    form p{
        font-size: 22px;
    }
}




form input:not(:last-child),form>div{
    border: none;
    margin-bottom: 30px;
    text-align: center;
    color: #FFFFFF;
    background: rgba(2, 47, 76,0.6);
    font-size: 25px;
    border-radius: 70px;
    border: none;
    width: 250px;
 
}
@media all and (min-width: 600px){
    form input:not(:last-child),form>div{
        font-size: 30px;
        width: 550px;

    }

}
@media all and (min-width: 700px){
    form input:not(:last-child),form>div{
        font-size: 30px;
        width: 750px;

    }

}
form > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
@media all and (min-width: 600px){
    form > div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
#jjmmaaaa{
    border: none;
    text-align: center;
    color: #FFFFFF;
    background: none;
    font-size: 25px;
    width: 200px;
    border: none;
    font-family: 'Rowdies';

}
@media all and (min-width: 600px){
    #jjmmaaaa{
        font-size: 30px;
        width: 225px;

    }

}
@media all and (min-width: 700px){
    #jjmmaaaa{
        font-size: 30px;
        width: 375px;

    }

}
input::placeholder{
    color: white;
    font-family: 'Rowdies';
    opacity: 0.5;

}   
input:focus{
   
    color: white;
    font-family: 'Rowdies';
}
form > button {
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
@media all and (min-width: 600px){
    form > button{
        font-size: 30px;
        width: 550px;
    }

}
@media all and (min-width: 700px){
    form > button{
        width: 750px;
    }
}

form div:last-child{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: auto;
    margin-top: 15px;
    font-size: 20px;
    background: none;
}

@media all and (min-width: 600px){
    form > div:last-child{
        width: 540px;
    }
}

@media all and (min-width: 700px){
    form > div:last-child{
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
