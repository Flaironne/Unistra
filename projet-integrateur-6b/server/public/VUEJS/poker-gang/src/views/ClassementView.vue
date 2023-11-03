<template>
    <div class="classement">
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

    <table>
    
        <tr>
            <th id="rang">{{ $t("rang") }}</th>
            <th id="joueur">{{ $t("joueur") }}</th>
            <th id="victoire">{{ $t("victoire") }}</th>
            <th id="jetons">{{ $t("jetons") }}</th>
        </tr>
        <tr v-for="(joueur, index) in ClassementInfo" :key="joueur.id_user">
            <td>{{ index + 1 }}</td>
            <td>{{joueur[1].pseudo}}</td>
            <td>{{joueur[0].nb_victoires }}</td>
            <td>{{joueur[0].jetons }}</td>
        </tr>
    </table>
            
   

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
        return {
            ClassementInfo: [],
            sound: null
        };
    },

    beforeCreate: function () {
        document.body.className = 'all';
    },
    created() {
        this.getclassmentinfo();
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
        getclassmentinfo() {
            fetch('/getClassmentInfo')
            .then(response => response.json())
            .then(data => {
                this.ClassementInfo = data;
                console.log("classment = "+ JSON.stringify(this.ClassementInfo));
            })
            .catch(error => {
                console.log(error);
            });
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


table{
    width: 90%;
    margin-top: 20px;
    font-weight: bold;
}

table td, table th{
    text-align: center;
    width: 25%;
}

table td{
    font-size: 18px;
}

@media all and (min-width: 700px){
    table td{
        font-size: 25px;
    }
}

@media all and (min-width: 1200px){
    table td{
        font-size: 35px;
    }
}

table th{
    font-size: 18px;
    padding: 15px;
}

@media all and (min-width: 700px){
    table th{
        font-size: 25px;
    }
}

@media all and (min-width: 1200px){
    table th{
        font-size: 45px;
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
  