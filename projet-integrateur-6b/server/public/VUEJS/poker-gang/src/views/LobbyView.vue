<template>
    <div class="lobby">
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

    <div id="boutons_lobby">

        <RouterLink to="/jeu" >
        <button v-on:click="">{{ $t("rejoindre_partie") }}</button>
        </RouterLink>
        
    </div>


    <footer>
      <a target="_blank" href="https://www.instagram.com/"><img src="../../public/img/logo_instagram.png" alt="Instagram"></a>
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



#boutons_lobby{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 30px;
}

#boutons_lobby  button{
    width: 230px;
    height: 45px;
    margin: 20px;
    border-radius: 70px;
    background-color: #01304D;
    font-size: 20px;
    border: none;
    transition: all 0.3s ease-in-out;
}
#boutons_lobby  button:hover {
  transform: scale(1.05);
  cursor: pointer;
}
@media all and (min-width: 500px){
    #boutons_lobby  button{
        width: 350px;
        font-size: 25px;
    }
}

@media all and (min-width: 800px){
    #boutons_lobby button{
        width: 750px;
        font-size: 25px;
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
  