<template>
    <main>
    <div class="page">
    <header>
        <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang"/>
        <div id="droite">
            <div id="infos_user">
                <span>{{ user.pseudo }}</span>
                <div id="jetons">
                    <span>{{ user.jetons }}</span>
                    <img src="../../public/img/tokens.png" alt="jetons poker">
                </div>
                <div id="menu_deroulant">
                    <button id="profil"><RouterLink id="lien_profil" to = "/profile">{{ $t("profil") }}</RouterLink></button>
                    <button id="deconnexion"><RouterLink id="lien_deconnexion" to = "/connexion">{{ $t("deconnexion") }}</RouterLink></button>
                </div>
            </div>
            <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
            <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
        </div>
    </header>

    <div id="section_bouton_logo">
        <div></div>
        <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne"/>
        <button @click = "getMoreTokensCheck()" id="#bouton_jetons"><RouterLink to="/accueil">{{ $t("obt_jetons") }}</RouterLink></button>
    </div>

    <div id="err_get_tokens">
        <span>{{ $t("err_get_tokens") }}</span>
    </div>

    <nav>
        <ul>
            <RouterLink to="/lobby">
                <li v-on:click="" >{{ $t("jouer") }}</li>
            </RouterLink>
            <RouterLink to="/classement">
            <li v-on:click="">{{ $t("classement") }}</li>
            </RouterLink> 
            <RouterLink to="/regles"> 
            <li v-on:click="">{{ $t("regles") }}</li>
            </RouterLink>
        </ul>
    </nav>

    <ul id="illustrations">
        <li>
            <img src="../../public/img/voleur.gif" alt="Illustration animée" id="voleur"/>
        </li>
        <li>
            <img src="../../public/img/police.gif" alt="Illustration animée" id="police"/>
        </li>
        <li>
            <img src="../../public/img/insolvable.gif" alt="Illustration animée" id="insolvable"/>
        </li>
        <li>
            <img src="../../public/img/voyante.gif" alt="Illustration animée" id="indic"/>
        </li>
        <li>
            <img src="../../public/img/escroc_2.gif" alt="Illustration animée" id="escroc"/>
        </li>
        <li>
            <img src="../../public/img/usurpateur.gif" alt="Illustration animée" id="usurpateur"/>
        </li>
    </ul>


    <footer>
        <div id="contact_credits">
            <button id="bouton_contact"><RouterLink to="/contact">{{ $t("contact") }}</RouterLink></button>
            <button id="bouton_contact"><RouterLink to="/credits">{{ $t("credits") }}</RouterLink></button>
        </div>
        <a target="_blank" href="https://linktr.ee/poker_gang"><img src="../../public/img/logo_instagram.png" alt="Instagram"></a>
    </footer>
    </div>
    </main>
</template>

<script>
import musicacceuil from '../../public/sounds/acceuil.mp3'  ;




import i18n from '../locales/i18n';


export default {
    data() {
        return {
            user:[],
            sound: null
        };
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
    
    beforeCreate: function () {
        document.body.className = 'all';
    },

    methods: {

        logout(){
            sessionStorage.removeItem('user');
            //this.$router.push({ path: '/connexion' });
        },

        getUserInfo() {
            fetch('/getUserInfo')
                .then(response => response.json())
                .then(data => {
                    console.log("data",JSON.stringify(data));
                    this.user = data;
                    console.log("i'm here "+JSON.stringify(this.user));
                })
                .catch(error => {
                    console.error('Error', error);
                    console.log("erreur getuserinfo")
                });
        },
        getMoreTokens(){
            fetch('/getMoreTokens')
                .then(response => response.json())
                .then(data => {
                    this.user.jetons = data;
                })
                .catch(error => {
                    console.error('Error', error);
                    console.log("erreur getMoreTokens");
                });
        },
        getMoreTokensCheck(){
            if(this.user.jetons >= 5000){
                document.getElementById("err_get_tokens").style.visibility = 'visible';
                setTimeout(() => {
                    document.getElementById("err_get_tokens").style.visibility = 'hidden';
                }, 2000);
            }
            else{
                this.getMoreTokens();
            }
        },
        changeLangue(locale) {
            if (locale == 'en') {
                i18n.global.locale = 'fr';
                this.setImgtitle();
            }
            if (locale == 'fr') {
                i18n.global.locale = 'en';
                this.setImgtitle();
            }
        },
        setImgtitle(){
            if(i18n.global.locale == 'fr'){
                document.getElementById("voleur").setAttribute('title', "Le voleur");
                document.getElementById("police").setAttribute('title', "Le flic");
                document.getElementById("insolvable").setAttribute('title', "L'insolvable");
                document.getElementById("indic").setAttribute('title', "L'infiltré");
                document.getElementById("escroc").setAttribute('title', "L'escroc");
                document.getElementById("usurpateur").setAttribute('title', "L'usurpateur");
            }
            if(i18n.global.locale == 'en'){
                document.getElementById("voleur").setAttribute('title', "The thief");
                document.getElementById("police").setAttribute('title', "The policeman");
                document.getElementById("insolvable").setAttribute('title', "The insolvent");
                document.getElementById("indic").setAttribute('title', "The infiltrator");
                document.getElementById("escroc").setAttribute('title', "The scammer");
                document.getElementById("usurpateur").setAttribute('title', "The usurper");
            }
        }
    },
    mounted(){
        this.getUserInfo();
        this.setImgtitle();
        
        window.addEventListener('click', function(e){   
            if (document?.getElementById('infos_user')?.contains(e.target)){
                document.getElementById("menu_deroulant").style.visibility = 'visible';
            } else{
                document.getElementById("menu_deroulant").style.visibility = 'hidden';
            }
        });
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

ul{
    list-style: none;
    padding: 0;
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
    width: 100%;
}

header #droite #jetons span{
    width: 100%;
    text-align: end;
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

#section_bouton_logo div:first-of-type{
    width: 250px;
    height: 60px;
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 65px;
}




@media all and (min-width: 700px){
    #section_bouton_logo div:first-of-type{
        font-size: 25px;
    }
}

@media all and (min-width: 1000px){
    #section_bouton_logo div:first-of-type{
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
    transition: all 0.3s ease-in-out;

}
#section_bouton_logo button:last-of-type:hover {
  transform: scale(1.05);
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


#err_get_tokens{
    visibility: hidden;
    position: absolute;
    width: 240px;
    top: 210px;
    right: 105px;
    background-color: white;
    border: 0.5vh solid red;
    padding: 6px;
}


#err_get_tokens > span{
    color: red;
    text-align: justify;
    font-size: 16px;
}


nav li {
  position: relative;
  width: 250px;
  height: 55px;
  background-color: #022F4C;
  border: none;
  border-radius: 70px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 33px;
  font-size: 22px;
  transition: all 0.3s ease-in-out;
}


@media all and (min-width: 600px){
    nav li{
        font-size: 30px;
        width: 550px;
        opacity: 1;
    }
    nav li:hover{
        transform: scale(1.03);
        /*opacity: 0.8;*/
        background-color: #033e65;
    }

}


@media all and (min-width: 800px){
    nav li{
        font-size: 33px;
        width: 770px;
        opacity: 1;
    }
    nav li:hover{
        /*opacity: 0.8;*/
        transform: scale(1.03);
        background-color: #033e65;
    }

}


#illustrations{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    width: 60%;
    height: auto;
    padding: 0;
}

@media all and (min-width: 1200px){
    #illustrations{
        flex-wrap: nowrap;
    }
}

#illustrations li{
    margin-right: 40px;
    margin-left: 40px;
    margin-bottom: 30px;
}

#illustrations li img{
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    border: 7px solid #022F4C;
    height: 100px;
    width: 100px;
}


footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

footer button{
    border: none;
    background: none;
    font-size: 10px;
    margin-left: 3px;
    cursor: pointer;
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

#contact_credits{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

@media all and (min-width: 800px){
    footer img{
        height: 45px;
    }
    footer button{
        font-size: 16px;
        margin-left: 10px;
    }
}

</style>