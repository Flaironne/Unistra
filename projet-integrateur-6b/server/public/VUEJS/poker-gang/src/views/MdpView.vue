<template>
    <main>
    <div class="page">
    <header>
        <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang"/>
        <div id="droite">
            <div id="infos_user">
                <span>Username</span>
                <div id="jetons">
                    <span>20 000</span>
                    <img src="../../public/img/tokens.png" alt="jetons poker">
                </div>
                <div id="menu_deroulant">
                    <button id="profil"><RouterLink id="lien_profil" to = "/profile">{{ $t("profil") }}</RouterLink></button>
                    <button id="deconnexion"><RouterLink id="lien_deconnexion" to = "/home">{{ $t("deconnexion") }}</RouterLink></button>
                </div>
            </div>
            <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
            <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>  
        </div>
    </header>

    <div id="section_bouton_logo">
        <button id="#bouton_retour"><RouterLink to="/accueil">{{ $t("retour") }}</RouterLink></button>
        <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne"/>
        <button id="#bouton_profil"><RouterLink to="/Profile">{{ $t("profil") }}</RouterLink></button>
    </div>

    <form id="form_connexion" @submit="checkForm">
        <input type="password" id="ancien_mdp" name="ancien_mdp" :placeholder="$t('ancien_mdp')">
        <input type="password" id="nouveau_mdp" name="nouveau_mdp" :placeholder="$t('nouveau_mdp')">
        <input type="password" id="confirm_mdp" name="confirm_mdp" :placeholder="$t('confirm_mdp')">
        <button id="changer_mdp" type="submit">{{ $t("confirm") }}</button>
        <p id="champ_vide">{{ $t("champ_vide") }}</p>
        <p id="erreur_mdp">{{ $t("mdp_diff") }}</p>
        <p id="mdp_change">{{ $t("mdp_change") }}</p>
    </form>

    <footer>
        <a target="_blank" href="https://www.instagram.com/"><img src="../../public/img/logo_instagram.png" alt="Instagram"></a>
    </footer>
    </div>
    </main>
</template>

<script>
import i18n from '../locales/i18n';

export default {
    beforeCreate: function () {
        document.body.className = 'all';
    },
    methods: {
        changeLangue(locale) {
            if (locale == 'en') {
                i18n.global.locale = 'fr'
            }
            if (locale == 'fr') {
                i18n.global.locale = 'en'
            }
        },
        checkForm: function(e){
            e.preventDefault();
            let ancien_mdp = document.getElementById("ancien_mdp").value;
            let nouveau_mdp = document.getElementById("nouveau_mdp").value;
            let confirm_mdp = document.getElementById("confirm_mdp").value;
            if(!ancien_mdp || !nouveau_mdp || !confirm_mdp){
                document.getElementById("erreur_mdp").style.display = "none";
                document.getElementById("mdp_change").style.display = "none";
                document.getElementById("champ_vide").style.display = "block";
            }else if(nouveau_mdp != confirm_mdp){
                document.getElementById("champ_vide").style.display = "none";
                document.getElementById("mdp_change").style.display = "none";
                document.getElementById("erreur_mdp").style.display = "block";
            }else{
                document.getElementById("champ_vide").style.display = "none";
                document.getElementById("erreur_mdp").style.display = "none";
                document.getElementById("mdp_change").style.display = "block";
            }
        }
    }
}

</script>


<style scoped>
*{
    color: white;
    font-family: 'Rowdies';
}

#app{
    background-size: cover;
}

.page{
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;   
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
    height: 45px;
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
    width: 55px ;
    border-radius: 70px;
    margin-right: 5px;
    margin-top: 10px;
}

@media all and (min-width: 500px){
    header img:last-child{
        margin-right: 20px;
    }
}

header #droite{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

@media all and (min-width: 500px){
    header #droite{
        flex-direction: row;
        align-items: center;
    }
}

header #droite #infos_user{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center;
    width: 170px;
    height: 70px;
    background-color: #022F4C;
    border: none;
    border-radius: 70px;
    font-size: 18px;
    margin-top: 0px;
    margin-right: 5px;
    cursor: pointer;
}

@media all and (min-width: 500px){
    header #droite #infos_user{
        margin-right: 30px;
        margin-top: 25px;
    }
}


@media all and (min-width: 800px){
    header #droite #infos_user{
        width: 340px; /* */
        height: 45px;
        font-size: 25px;
        margin-top: 10px;
        flex-direction: row;
    }
}



header #droite span:first-of-type{
    margin-left: 0px;
    margin-top: 5px;
}

@media all and (min-width: 800px){
    header #droite span:first-of-type{
        margin-left: 20px;
        margin-top: 0px;
    }
}


header #droite #jetons{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    visibility: visible;
}


header #droite #jetons img{
    margin: 0;
    margin-left: 5px;
    width: 40px;
    height: auto;
}

@media all and (min-width: 800px){
    header #droite #jetons img{
        margin-right: 10px;
        margin-left: 5px;
    }
}

header #droite #infos_user #menu_deroulant{
    visibility: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top: 78px;
    right: 102px;
    width: 190px;
    background: #FFFFFF;
    opacity: 0.8;
    border-radius: 15px;
}

@media all and (min-width: 800px){
    header #droite #infos_user #menu_deroulant{
        top: 59px;
        right: 130px;
        width: 300px;
    }
}

header #droite #infos_user #menu_deroulant button{
    margin-top: 7px;
    margin-bottom: 7px;
    background-color: transparent;
    border: none;
}

header #droite #infos_user #menu_deroulant a{
    color:#022F4C;
    font-size: 18px;
}

@media all and (min-width: 800px){
    header #droite #infos_user #menu_deroulant a{
        font-size: 22px;
    }

}


#section_bouton_logo{
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 60px;/* */
}

@media all and (min-width: 800px){
    #section_bouton_logo{
        margin-top: 20px;
    }
}


#section_bouton_logo img{
    width: 200px;
    height: 200px;
    margin-top: -20px;
}

@media all and (min-width: 500px){
    #section_bouton_logo img{
        width: 250px;
        height: 250px;
        margin-top: -60px;
    }
}

@media all and (min-width: 800px){
    #section_bouton_logo img{
        width: 320px;
        height: 320px;
    }
}

#section_bouton_logo button:first-of-type{
    width: 250px;
    height: 60px;
    background: rgba(2, 47, 76, 0.37);
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 65px;
}



@media all and (min-width: 700px){
    #section_bouton_logo button:first-of-type{
        font-size: 25px;
    }
}

@media all and (min-width: 1000px){
    #section_bouton_logo button:first-of-type{
        margin-left: 104px;
        width: 250px;
        height: 60px;
    }
}

#section_bouton_logo button:last-of-type{
    width: 250px;
    height: 60px;
    background: rgba(2, 47, 76, 0.37);
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-right: 0px;
    margin-top: 65px;
}

@media all and (min-width: 700px){
    #section_bouton_logo button:last-of-type{
        font-size: 25px;
    }
}

@media all and (min-width: 1000px){
    #section_bouton_logo button:last-of-type{
        margin-right: 104px;
        width: 250px;
        height: 60px;
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

@media all and (min-width: 800px){
    footer img{
        height: 45px;
    }
}

</style>
