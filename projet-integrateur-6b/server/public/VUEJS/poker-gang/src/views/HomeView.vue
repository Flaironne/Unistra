<template>
  <div class="index">
    <header>
        <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
        <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
    </header>
    <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne" width="50" height="50" />
    <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang" width="50" height="50" />
    <p id="slogan">{{ $t("slogan") }}</p>
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
    <RouterLink to="/inscription">
      <button id="inscription" v-on:click="">{{ $t("inscriptiongang") }}</button>
    </RouterLink>
    <RouterLink to="/connexion">
      <button id="connexion" v-on:click="">{{ $t("connexion") }}</button>
    </RouterLink>
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
        changeLangue(locale){
            if(locale=='en'){
                i18n.global.locale = 'fr';
                this.setImgtitle();
            }
            if(locale=='fr'){
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
        this.setImgtitle();
    }
}
</script>

<style scoped>
*{
    color: white;
    font-family: 'Rowdies';
}

.index{
    display: flex;
    flex-direction: column;
    align-items: center;


    margin: 0px;
    margin-bottom: 10px;
    height: 100%;

}

@media all and (min-width: 1000px) and (max-width: 1400px){
    .index{
        margin-top: 5px; /* 70 */
    }
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
    justify-content: flex-end;
    width: 100%;
    height: 45px;
}

header img:first-child{
    height: 45px;
    width: 55px ; /* */
    border-radius: 70px;
    margin-right: 10px;
    margin-top: 10px;
}
#logo{
    width: 150px;
    height: 150px;
}

@media all and (min-width: 500px){
    #logo{
        width: 250px; /*300*/
        height: 250px; /*300*/
    }
}

@media all and (min-width: 1400px){
    #logo{
        width: 320px; /*350*/
        height: 320px; /*350*/
    }
}

#logo_texte{
    width: 300px;
    height: auto;
    margin-top: 10px;
}

@media all and (min-width: 1400px){
    #logo_texte{
        width: 450px;
        margin-top: -20px;
    }
}


#slogan{
    font-size: 20px;
    margin-top: 20px;
}

@media all and (min-width: 1400px){
    #slogan{
        font-size: 25px;
        margin-top: 20px;
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
    display: none;
}

@media all and (min-width: 1000px){
    #illustrations{
        flex-wrap: nowrap;
        display: flex;
    }
}

@media all and (min-width: 800px){
    #illustrations{
        display: flex;
    }
}

#illustrations li{
    margin-right: 40px;
    margin-left: 40px;
    margin-bottom: 15px; /*30 */
}


#illustrations li img{
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    border: 7px solid #022F4C;
    height: 50px;
    width: 50px;
}


@media all and (min-width: 1400px){
    #illustrations li img{
        height: 80px; /*100 */
        width: 80px; /*100*/
    }
}

#inscription{
    background-color: #022F4C;
    border-radius: 70px;
    border: none;
    width: 350px;
    height: 35px;
    font-size: 25px;
    margin-bottom: 25px;
    transition: all 0.3s ease-in-out;
}
#inscription:hover {
  transform: scale(1.05);
  cursor: pointer;
}
@media all and (min-width: 1400px){
    #inscription{
        width: 600px;
        height: 50px;
        font-size: 35px;
        margin-bottom: 10px; /*25 */
    }
}


#connexion{
    background-color: transparent;
    border: none;
    font-size: 25px;
    transition: all 0.3s ease-in-out;
}
#connexion:hover {
  transform: scale(1.05);
  cursor: pointer;
}

@media all and (min-width: 1400px){
    #connexion{
        font-size: 40px;
    }
}


</style>
