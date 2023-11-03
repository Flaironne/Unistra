<template>
    <main>
        <div class="regles">
            <header>
                <img id="logo_texte" src="../../public/img/poker_gang.png" alt="Poker Gang" />
                <img v-if="$i18n.locale=='fr'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/uk.png" alt="Drapeau Royaume-Uni"/>
                <img v-else-if="$i18n.locale=='en'" id="drapeau" @click="changeLangue($i18n.locale)" src="../../public/img/fr.png" alt="Drapeau France"/>
            </header>

            <div id="go_back">
                <button id="#bouton_retour">
                    <RouterLink to="/accueil">{{ $t("retour") }}</RouterLink>
                </button>
            </div>

            <div id="logo_div">
                <img id="logo" src="../../public/img/logo_bleu.png" alt="Logo couronne" />
            </div>

            <section id="regles_section">
                <h2>{{ $t("regles") }}</h2>
                <div id="liste_regles">
                    <p>{{ $t("p_1") }}</p>
                    <p>{{ $t("p_2") }}</p>
                    <h3> {{ $t("h3_1") }}</h3>
                    <ul>
                        <li>{{ $t("ul_1_li_1") }}</li>
                        <li>{{ $t("ul_1_li_2") }}</li>
                        <li>{{ $t("ul_1_li_3") }}</li>
                        <li>{{ $t("ul_1_li_4") }}</li>
                        <li>{{ $t("ul_1_li_5") }}</li>
                    </ul>
                    <p>{{ $t("p_3") }}</p>
                    <h3> {{ $t("h3_2") }}</h3>
                    <ul>
                        <li>{{ $t("ul_2_li_1") }}</li>
                        <li>{{ $t("ul_2_li_2") }}</li>
                        <li>{{ $t("ul_2_li_3") }}</li>
                        <li>{{ $t("ul_2_li_4") }}</li>
                    </ul>
                    <h3>{{ $t("h3_3") }}</h3>
                    <ul>
                        <li>{{ $t("ul_3_li_1") }}</li>
                        <li>{{ $t("ul_3_li_2") }}</li>
                        <li>{{ $t("ul_3_li_3") }}</li>
                        <li>{{ $t("ul_3_li_4") }}</li>
                        <li>{{ $t("ul_3_li_5") }}</li>
                        <li>{{ $t("ul_3_li_6") }}</li>
                    </ul>
                    <h3>{{ $t("classement_mains")}}</h3>
                    <ul id="mains">
                        <li>
                            <h4 id="qfr">Quinte Flush Royale:</h4>
                            <img src="../../public/img/qfr.png" alt="cartes quinte flush royale">
                            <p id="qfr_desc">{{ $t("qfr_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="qf">Quinte Flush:</h4>
                            <img src="../../public/img/qf.png" alt="cartes quinte flush">
                            <p id="qf_desc">{{ $t("qf_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="carre">{{ $t("carre") }}</h4>
                            <img src="../../public/img/carre.png" alt="cartes carre">
                            <p id="carre_desc">{{ $t("carre_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="full">Full:</h4>
                            <img src="../../public/img/full.png" alt="cartes full">
                            <p id="full_desc">{{ $t("full_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="couleur">{{ $t("couleur") }}</h4>
                            <img src="../../public/img/couleur.png" alt="cartes couleur">
                            <p id="couleur_desc">{{ $t("couleur_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="quinte">{{ $t("quinte") }}</h4>
                            <img src="../../public/img/quinte.png" alt="cartes quinte">
                            <p id="quinte_desc">{{ $t("quinte_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="brelan">{{ $t("brelan") }}</h4>
                            <img src="../../public/img/brelan.png" alt="cartes brelan">
                            <p id="brelan_desc">{{ $t("brelan_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="deux_paires">{{ $t("deux_paires") }}</h4>
                            <img src="../../public/img/deux_paires.png" alt="cartes deux paires">
                            <p id="deux_paires_desc">{{ $t("deux_paires_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="une_paire">{{ $t("une_paire") }}</h4>
                            <img src="../../public/img/une_paire.png" alt="cartes une_paire">
                            <p id="une_paire_desc">{{ $t("une_paire_desc") }}</p>
                        </li>
                        <li>
                            <h4 id="hauteur">{{ $t("hauteur") }}</h4>
                            <img src="../../public/img/hauteur.png" alt="cartes hauteur">
                            <p id="hauteur_desc">{{ $t("hauteur_desc") }}</p>
                        </li>
                    </ul>
                    <h3>{{ $t("h3_4") }}</h3>
                    <ul id="roles">
                        <p>{{ $t("pouvoir_role") }}</p>
                        <li>
                            <h4 id="h4_voleur">{{ $t("h4_voleur") }}</h4>
                            <img src="../../public/img/voleur.gif" alt="Illustration animée" />
                            <p id="p_voleur">{{ $t("p_voleur") }}</p>
                        </li>
                        <li>
                            <h4 id="h4_escroc">{{ $t("h4_escroc") }}</h4>
                            <img src="../../public/img/escroc_2.gif" alt="Illustration animée" />
                            <p id="p_escroc">{{ $t("p_escroc") }}</p>
                        </li>
                        <li>
                            <h4 id="h4_voyante">{{ $t("h4_voyante") }}</h4>
                            <img src="../../public/img/voyante.gif" alt="Illustration animée" />
                            <p id="p_voyante">{{ $t("p_voyante") }}</p>
                        </li>
                        <li>
                            <h4 id="h4_policier">{{ $t("h4_policier") }}</h4>
                            <img src="../../public/img/police.gif" alt="Illustration animée" />
                            <p id="p_policier">{{ $t("p_policier") }}
                            </p>
                        </li>
                        <li>
                            <h4 id="h4_usurpateur">{{ $t("h4_usurpateur") }}</h4>
                            <img src="../../public/img/usurpateur.gif" alt="Illustration animée" />
                            <p id="p_usurpateur">{{ $t("p_usurpateur") }}</p>
                        </li>
                        <li>
                            <h4 id="h4_insolvable">{{ $t("h4_insolvable") }} </h4>
                            <img src="../../public/img/insolvable.gif" alt="Illustration animée" />
                            <p id="p_insolvable">{{ $t("p_insolvable") }}</p>
                        </li>
                    </ul>
                </div>
            </section>

            <footer>
                <a target="_blank" href="https://www.instagram.com/"><img src="../../public/img/logo_instagram.png"
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
            sound: null
        }
    },
    beforeCreate: function () {
        document.body.className = 'regles';
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
* {
    color: white;
    font-family: 'Rowdies';
}


.regles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: auto;




    text-align: justify;
    letter-spacing: 0.05em;
}


a:link {
    text-decoration: none;
    color: white;
    font-family: 'Rowdies';
}
a {color:#FFFFFF;}      
a:visited {color:#FFFFFF;}
a:hover {color:#FFFFFF;} 
a:active {color:#FFFFFF;} 

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
    margin-top: 5px;
}

@media all and (min-width: 500px) {
    header img:last-child {
        margin-right: 20px;
    }
}

@media all and (max-width: 500px) {
    #go_back{
        place-self: center;
    }
}

#go_back button:first-of-type {
    width: 200px;
    height: 45px;
    background: rgba(2, 47, 76, 0.5);
    border: none;
    border-radius: 70px;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 10px;
    margin-right: 0px;
    transition: all 0.3s ease-in-out;
}
#go_back button:first-of-type:hover {
    transform: scale(1.05);
}

@media all and (min-width: 500px) {
    #go_back button:first-of-type {
        font-size: 25px;
        width: 250px;
        height: 60px;
        position: fixed;
        top: 60px;
        z-index: 1000;
    }
}

@media all and (min-width: 1000px) {
    #go_back button:first-of-type {
        margin-left: 104px;
        margin-top: 85px;
        position: fixed;
        top: 60px;
        z-index: 1000;
    }
}


#logo_div{
    place-self: center;
}
#logo_div img {
    width: 150px;
    height: 150px;
    margin-top: -20px;
}

@media all and (min-width: 500px) {
    #logo_div img {
        width: 260px;
        height: 260px;
    }
}


#regles_section {
    width: 88%;
    margin-left: 5px;
}

@media all and (min-width: 400px) {
    #regles_section {
        margin-left: 32px;
    }
}

@media all and (min-width: 1000px) {
    #regles_section {
        margin-left: 65px;
    }
}

#regles_section h2 {
    font-size: 35px;
}

#regles_section h3 {
    font-size: 28px;
}

#regles_section h4 {
    font-size: 25px;
    margin-bottom: 7px;
}

#regles_section p {
    font-size: 20px;
}

#regles_section p:first-of-type {
    text-indent: 5%;
}

#regles_section li {
    font-size: 20px;
    margin-bottom: 4px;
}

#mains img{
    height: 110px;
}

#mains p{
    margin-top: 7px;
}

#mains p:first-of-type{
    text-indent: 0;
}

#roles img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 7px solid #022F4C;
}

#roles p {
    margin-top: 7px;

}

#roles p:first-of-type {
    text-indent: 0;
}


footer {
    position: fixed;
    bottom: 0;
    right: 0;
}

footer img {
    height: 30px;
    width: auto;
    margin-right: 30px;
    margin-bottom: 20px;
}

footer img:hover{
    cursor: pointer;
    transform: scale(1.10);
}

@media all and (min-width: 800px) {
    footer img {
        height: 45px;
    }
}</style>