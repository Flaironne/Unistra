<template>
    <header>
        <div><img src="../../public/img/quitter.png" alt="Porte déconnexion" @click="quit()"></div>
        <div><span>{{ dataTable.Table.Mise_total }} {{ $t("jetons_en_jeu") }}</span></div>
        <div><span id="regles_span" @click="regles()">{{ $t("regles") }}</span></div>
    </header>

    <!-- Affichage du message pour quitter le jeu après avoir cliqué sur la porte de sortie -->
    <div id="confirm">
        <p> {{ $t("quitter_jeu") }} </p>
        <div class = "boutons">
            <button @click = "quitGameButton()"><RouterLink to="/accueil">{{ $t("oui") }}</RouterLink></button>
            <button @click = "dontquit()">{{ $t("non") }}</button>
        </div>
   </div>

    <div id="vue_table">
        <span id="timer">20s</span>
        <!-- Affichage des joueurs autour de la table de jeu -->
        <div class="joueurs">
            <img :class="{ sleep: dataTable.Joueur2.Coucher, delete: dataTable.Joueur2.pseudo == '', delete: !dataTable.Joueur2.isInGame, zoom: dataTable.Joueur2.isPlaying && !attente_partie }" :src="j2_image" alt="Joueur">
            <img :class="{ sleep: dataTable.Joueur3.Coucher, delete: dataTable.Joueur3.pseudo == '', delete: !dataTable.Joueur3.isInGame , zoom: dataTable.Joueur3.isPlaying && !attente_partie  }" :src="j3_image" alt="Joueur">
            <img :class="{ sleep: dataTable.Joueur4.Coucher, delete: dataTable.Joueur4.pseudo == '', delete: !dataTable.Joueur4.isInGame , zoom: dataTable.Joueur4.isPlaying && !attente_partie  }" :src="j4_image" alt="Joueur">
            <span :class="{ sleep: dataTable.Joueur2.Coucher, delete: dataTable.Joueur2.pseudo == '', delete: !dataTable.Joueur2.isInGame }">{{ dataTable.Joueur2.pseudo }}:<br>{{ dataTable.Joueur2.Mise_Tour }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur2.nb_jetons }} {{ $t("jetons_restants") }}</span>
            <span :class="{ sleep: dataTable.Joueur3.Coucher, delete: dataTable.Joueur3.pseudo == '', delete: !dataTable.Joueur3.isInGame }">{{ dataTable.Joueur3.pseudo }}:<br>{{ dataTable.Joueur3.Mise_Tour }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur3.nb_jetons }} {{ $t("jetons_restants") }}</span>
            <span :class="{ sleep: dataTable.Joueur4.Coucher, delete: dataTable.Joueur4.pseudo == '', delete: !dataTable.Joueur4.isInGame }">{{ dataTable.Joueur4.pseudo }}:<br>{{ dataTable.Joueur4.Mise_Tour }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur4.nb_jetons }} {{ $t("jetons_restants") }}</span>
            <img :class="{ sleep: dataTable.Joueur1.Coucher, delete: dataTable.Joueur1.pseudo == '', delete: !dataTable.Joueur1.isInGame , zoom: dataTable.Joueur1.isPlaying && !attente_partie  }" :src="j1_image" alt="Joueur">
            <img style="visibility: hidden;" src="../../public/img/joueur_4.png" alt="Joueur">
            <img :class="{ sleep: dataTable.Joueur5.Coucher, delete: dataTable.Joueur5.pseudo == '', delete: !dataTable.Joueur5.isInGame , zoom: dataTable.Joueur5.isPlaying && !attente_partie  }" :src="j5_image" alt="Joueur">
            <span :class="{ sleep: dataTable.Joueur1.Coucher, delete: dataTable.Joueur1.pseudo == '', delete: !dataTable.Joueur1.isInGame }">{{ dataTable.Joueur1.pseudo }}:<br>{{ dataTable.Joueur1.Mise_Tour }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur1.nb_jetons }} {{ $t("jetons_restants") }}</span>
            <span></span>
            <span :class="{ sleep: dataTable.Joueur5.Coucher, delete: dataTable.Joueur5.pseudo == '', delete: !dataTable.Joueur5.isInGame }">{{ dataTable.Joueur5.pseudo }}:<br>{{ dataTable.Joueur5.Mise_Tour }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur5.nb_jetons }} {{ $t("jetons_restants") }}</span>
        </div>

        <!-- Affichage des cinq cartes disposées sur la table de jeu -->
        <div class="cartes">
            <div :class="{carte_table: true}" id="carteT1">
                <div class="carte_verso">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div class="carte_recto">
                    <img :src="carteTable1" alt="carte poker">
                </div>
            </div>
            <div :class="{carte_table: true}" id="carteT2">
                <div class="carte_verso">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div class="carte_recto">
                    <img :src="carteTable2" alt="carte poker">
                </div>
            </div>
            <div :class="{carte_table: true}" id="carteT3">
                <div class="carte_verso">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div class="carte_recto">
                    <img :src="carteTable3" alt="carte poker">
                </div>
            </div>
            <div :class="{carte_table: true}" id="carteT4">
                <div class="carte_verso">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div class="carte_recto">
                    <img :src="carteTable4" alt="carte poker">
                </div>
            </div>
            <div :class="{carte_table: true}" id="carteT5">
                <div class="carte_verso">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div class="carte_recto">
                    <img :src="carteTable5" alt="carte poker">
                </div>
            </div>
        </div>
    </div>

    <div id="vue_joueur">

        <!-- Affichage des deux cartes du joueur -->
        <div id="cartes_main"> 
            <div id="carte_main_1">
                <div id="main_verso_1">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div id="main_recto_1" :class="{ 'folded': playerFolded }">
                    <img :src="carte1MonJoueur" alt="carte">
                </div>
            </div>
            <div id="carte_main_2">
                <div id="main_verso_2">
                    <img src="../../public/img/verso.png" alt="carte poker">
                </div>
                <div id="main_recto_2" :class="{ 'folded': playerFolded }">
                    <img :src="carte2MonJoueur" alt="carte">
                </div>
            </div>
        </div>

        <!-- Affichage des données du joueur (pseudo, role, nombre de jetons)-->
        <div id="infos_joueur" >
            <img :class="{ img_joueur: dataTable.MonJoueur.isPlaying && !attente_partie && !spectateur, folded: playerFolded}" id ="img_joueur" v-on:mouseover="show_infos_roles()" v-on:mouseleave="invisible_infos_roles()" :src="role_image" alt="Illustration role">
            <img id="bouton_role" src="../../public/img/buzz_role_9.gif" alt="Bouton de déclenchement du rôle" @click="pouvoir_role()">  
            <h3 id="nom_joueur">{{ dataTable.MonJoueur.pseudo }}</h3>
            <span>{{ dataTable.MonJoueur.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.MonJoueur.nb_jetons }} {{ $t("jetons_restants") }}</span>
        </div>

        <!-- Affichage des trois actions de jeu (miser, checker, se coucher)-->
        <div id="actions">
            <div>
                <div :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded }" id="action_miser" @click="miser()">
                    <img :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur}" src="../../public/img/miser_2.png" alt="icone_miser">
                    <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur}">{{ $t("miser") }}</span>
                </div>
                <div :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded}" id="jetons_input">
                    <input type="number" placeholder="......" id="nb_jetons_mise" name="mise" @keyup.enter="miser"> 
                    <span>{{ $t("jetons") }}</span>
                </div>
                <div>
                    <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded }" id="diminuer" @click="diminuer()">-</span>
                    <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded }" @click="suivre()">{{ $t("suivre") }}</span>
                    <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded }" @click="tapis()">{{ $t("tapis") }}!</span>
                    <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || attente_partie || spectateur, folded: playerFolded }" id="augmenter" @click="augmenter()">+</span>
                </div>
                <div id="tooltip_mise_manquante">
                    <span id="mise_manquante">{{ $t("input_jetons_vide") }}</span>
                </div>
                <div id="tooltip_mise_negative">
                    <span id="mise_negative">{{ $t("mise_negative") }}</span>
                </div>
                <div id="tooltip_jetons_manquants">
                    <span id="jetons_manquants">{{ $t("jetons_manquants") }}</span>
                </div>
                <div id="tooltip_mise_mini">
                    <span id="mise_mini">{{ $t("mise_mini") }} {{ dataTable.Table.Mise_minimum }} {{ $t("jetons_mise") }}</span>
                </div>
                <div id="tooltip_mise_blind">
                    <span id="mise_blind">{{ $t("mise_blind") }} {{ dataTable.Table.blind }} (blind)</span>
                </div>
                <div id="tooltip_mise_zero">
                    <span id="mise_zero">{{ $t("mise_zero") }}</span>
                </div>
            </div>
            <div :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie || (dataTable.Table.blind!=0 && dataTable.MonJoueur.Mise_Tour != dataTable.Table.blind) || (dataTable.Table.blind == 0 && dataTable.Table.Mise_minimum != 0), folded: playerFolded}" id="action_check" @click="check()">  
                <img :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie || (dataTable.Table.blind!=0 && dataTable.MonJoueur.Mise_Tour != dataTable.Table.blind) || (dataTable.Table.blind == 0 && dataTable.Table.Mise_minimum != 0), folded: playerFolded}" src="../../public/img/checker_2.png" alt="icone_checker">
                <span id="check_span" :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie || (dataTable.Table.blind!=0 && dataTable.MonJoueur.Mise_Tour != dataTable.Table.blind) || (dataTable.Table.blind == 0 && dataTable.Table.Mise_minimum != 0), folded: playerFolded}">{{ $t("check") }}</span>
            </div>
            <div :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie, folded: playerFolded}" id="action_coucher" @click="fold()">
                <img :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie, folded: playerFolded}" src="../../public/img/se_coucher_2.png" alt="icone_se_coucher">
                <span :class="{ unclickable: !dataTable.MonJoueur.isPlaying || spectateur || attente_partie, folded: playerFolded}">{{ $t("coucher") }}</span>
            </div>
        </div>
    </div>



    <!-- Affichage des illustrations après l'action du joueur -->
    <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser">
    <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher">
    <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check">


    <!-- Affichage des illustrations après l'action des joueurs autour de la table -->
    <div id="actions_autres_joueurs">
        <div id="j1_actions">
            <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser_j1">
            <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher_j1">
            <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check_j1">
            <span id="action_j1"></span>
        </div>

        <div id="j2_actions">
            <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser_j2">
            <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher_j2">
            <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check_j2">
            <span id="action_j2"></span>
        </div>

        <div id="j3_actions">
            <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser_j3">
            <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher_j3">
            <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check_j3">
            <span id="action_j3"></span>
        </div>

        <div id="j4_actions">
            <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser_j4">
            <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher_j4">
            <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check_j4">
            <span id="action_j4"></span>
        </div>

        <div id="j5_actions">
            <img src="../../public/img/tokens.png" alt="animation action" id="illust_miser_j5">
            <img src="../../public/img/coucher_anim.png" alt="animation action" id="illust_coucher_j5">
            <img src="../../public/img/knock_zoom.gif" alt="animation action" id="illust_check_j5">
            <span id="action_j5"></span>
        </div>

    </div>


    <!-- Affichage d'une illustrations après l'utilisation du pouvoir du rôle -->
    <img src="../../public/img/eye.gif" alt="oeil" id="oeil_voyante">
    <img src="../../public/img/pieces_boom_2.gif" alt="pieces qui tombent" id="piece_insolvable">
    <img src="../../public/img/money.gif" alt="argent qui s'envole" id="argent_escroc">
    <img src="../../public/img/eye_voleur.gif" alt="yeux de voleur" id="oeil_voleur">
    <img src="../../public/img/menottes.gif" alt="menottes" id="menottes">
    <img src="../../public/img/usurp_anim.gif" alt="deguisement" id="usurp_anim">
    <img src="../../public/img/au_voleur.gif" alt="au voleur" id="au_voleur">




    <!-- Affichage de la liste des joueurs en jeu pour utilisation des rôles infiltré/voleur/usurpateur/policier -->
    <div id="liste_joueurs">
        <h4 id="fermer_liste" @click="fermer_choix()">{{ $t("fermer") }}</h4>
        <h3 id="select_voleur">{{ $t("select_voleur") }}</h3>
        <h3 id="select_voyante">{{ $t("select_voyante") }} </h3>
        <h3 id="select_police">{{ $t("select_police") }} </h3>
        <h3 id="select_usurpateur">{{ $t("select_usurpateur") }} </h3>
        <div>
            <div :class="{ sleep: dataTable.Joueur1.Coucher, delete: dataTable.Joueur1.pseudo == '', delete: !dataTable.Joueur1.isInGame, }"  @click="role_vo_vo_us_po(dataTable.Joueur1.pseudo)">
                <img :class="{ sleep: dataTable.Joueur1.Coucher, delete: dataTable.Joueur1.pseudo == '', zoom: dataTable.Joueur1.isPlaying }" src="../../public/img/joueur_5.png" alt="Joueur">
                <span :class="{ sleep: dataTable.Joueur1.Coucher, delete: dataTable.Joueur1.pseudo == '' }">{{ dataTable.Joueur1.pseudo }}:<br>{{ dataTable.Joueur1.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur1.nb_jetons }} {{ $t("jetons_restants") }}</span>
            </div>
            <div :class="{ sleep: dataTable.Joueur2.Coucher, delete: dataTable.Joueur2.pseudo == '', delete: !dataTable.Joueur2.isInGame }" @click="role_vo_vo_us_po(dataTable.Joueur2.pseudo)">
                <img :class="{ sleep: dataTable.Joueur2.Coucher, delete: dataTable.Joueur2.pseudo == '', zoom: dataTable.Joueur2.isPlaying  }" src="../../public/img/joueur_1.png" alt="Joueur">
                <span :class="{ sleep: dataTable.Joueur2.Coucher, delete: dataTable.Joueur2.pseudo == '' }">{{ dataTable.Joueur2.pseudo }}:<br>{{ dataTable.Joueur2.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur2.nb_jetons }} {{ $t("jetons_restants") }}</span>
            </div>
            <div :class="{ sleep: dataTable.Joueur3.Coucher, delete: dataTable.Joueur3.pseudo == '', delete: !dataTable.Joueur3.isInGame }"  @click="role_vo_vo_us_po(dataTable.Joueur3.pseudo)">
                <img :class="{ sleep: dataTable.Joueur3.Coucher, delete: dataTable.Joueur3.pseudo == '', zoom: dataTable.Joueur3.isPlaying  }" src="../../public/img/joueur_2.png" alt="Joueur">
                <span :class="{ sleep: dataTable.Joueur3.Coucher, delete: dataTable.Joueur3.pseudo == '' }">{{ dataTable.Joueur3.pseudo }}:<br>{{ dataTable.Joueur3.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur3.nb_jetons }} {{ $t("jetons_restants") }}</span>
            </div>
            <div :class="{ sleep: dataTable.Joueur4.Coucher, delete: dataTable.Joueur4.pseudo == '', delete: !dataTable.Joueur4.isInGame }" @click="role_vo_vo_us_po(dataTable.Joueur4.pseudo)">
                <img :class="{ sleep: dataTable.Joueur4.Coucher, delete: dataTable.Joueur4.pseudo == '', zoom: dataTable.Joueur4.isPlaying  }" src="../../public/img/joueur_4.png" alt="Joueur">
                <span :class="{ sleep: dataTable.Joueur4.Coucher, delete: dataTable.Joueur4.pseudo == '' }">{{ dataTable.Joueur4.pseudo }}:<br>{{ dataTable.Joueur4.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur4.nb_jetons }} {{ $t("jetons_restants") }}</span>
            </div>
            <div :class="{ sleep: dataTable.Joueur5.Coucher, delete: dataTable.Joueur5.pseudo == '', delete: !dataTable.Joueur5.isInGame }"  @click="role_vo_vo_us_po(dataTable.Joueur5.pseudo)">
                <img :class="{ sleep: dataTable.Joueur5.Coucher, delete: dataTable.Joueur5.pseudo == '', zoom: dataTable.Joueur5.isPlaying  }" src="../../public/img/joueur_3.png" alt="Joueur">
                <span :class="{ sleep: dataTable.Joueur5.Coucher, delete: dataTable.Joueur5.pseudo == '' }">{{ dataTable.Joueur5.pseudo }}:<br>{{ dataTable.Joueur5.Mise }} {{ $t("jetons_en_jeu") }}<br> {{ dataTable.Joueur5.nb_jetons }} {{ $t("jetons_restants") }}</span>
            </div>
        </div>
    </div>

    <!-- Affichage du message de choix d'échange de carte pour le voleur -->
    <div id="choix_carte_voleur">
        <h4 id="fermer_liste" @click="fermer_choix()">{{ $t("fermer") }}</h4>
        <h3 id="select_carte">{{ $t("select_echange") }}</h3>
        <div>
            <img :src="carte1MonJoueur" alt="carte" @click="role_voleur(0)">
            <img :src="carte2MonJoueur" alt="carte" @click="role_voleur(1)">
        </div>
    </div>

    <!-- Affichage de la carte visualisée par l'infiltré -->
    <div id="visu_carte_voyante">
        <h3>{{ $t("visu_carte_voyante") }} {{ pseudo_est_vu }} {{ $t("est") }}: </h3>
        <img :src="carte_voyante" alt="carte">
    </div>

    <!-- Affichage du message de validation de pouvoir pour l'insolvable -->
    <div id="action_insolvable">
        <h4 id="fermer_insolvable" @click="fermer_choix()">{{ $t("fermer") }}</h4>
        <h3>{{ $t("pouvoir_insolvable_1") }} ({{ montant_suivre }} {{ $t("jetons") }}) {{ $t("pouvoir_insolvable_2") }} <br>{{ $t("pouvoir_insolvable_3") }}</h3>
        <div>
            <div @click="role_insolvable(montant_suivre)">
                <img src="../../public/img/miser_2.png" alt="suivre">
                <span>{{ $t("suivre") }}</span>
            </div>
            <div @click="fermer_choix()">
                <span>{{ $t("non_pouvoir") }}</span>
            </div>
        </div>
    </div>

    <!-- Affichage du message de confirmation de pouvoir pour l'escroc -->
    <div id="confirmation_escroc">
        <h4 @click="fermer_choix()">{{ $t("fermer") }}</h4>
        <h3>{{ $t("pouvoir_escroc_1") }}<br>{{ $t("pouvoir_escroc_2") }}</h3>
        <div>
            <span @click="role_escroc()">{{ $t("pouvoir_escroc_3") }}</span>
            <span @click="fermer_choix()">{{ $t("non_pouvoir") }}</span>
        </div>
    </div>


    <!-- Affichage du gagnant de la partie ainsi que ses deux cartes -->
    <div id="message_gagnant">
        <img src="../../public/img/logo_bleu.png" alt="logo poker gang">
        <span>{{ gagnant }} {{ $t("gagner_partie") }}: </span>
        <div id="cartes_gagnant">
            <img :src="carte1Gagnant" alt="carte">
            <img :src="carte2Gagnant" alt="carte">
        </div>
        <span>{{ dataTable.Table.Mise_total }} {{ $t("remporter_jetons") }}!</span>
    </div>

    <!-- Affichage du message pour rejouer une partie -->
    <div id="message_rejouer">
        <img src="../../public/img/logo_bleu.png" alt="logo poker gang">
        <span>{{ $t("rejouer_partie") }}</span>
        <button @click = "ready()">{{ $t("pret") }}</button>
        <span id="timer_rejouer">{{ timer_rejouer }} s </span>
    </div>


    <!-- Affichage des différents messages d'attente avant le début de la partie -->
    <div id="message_attente_debut" :class="{ delete: dataTable.Table.tour != 0}">
        <span id="atente_joueurs">{{ $t("attente_joueurs") }}...</span>
    </div>
    <div id="message_attente_reset">
        <span id="atente_joueurs">{{ $t("attente_joueurs") }} ({{ timer_rejouer }}s)...</span>
    </div>
    <div id="message_attente_spec" :class="{ affiche: !dataTable.MonJoueur.isInGame && dataTable.Table.tour > 0 }">
        <span id="atente_spec">{{ $t("attente_spec") }}</span>
    </div>
    <div v-if="spectateur" id="message_attente_spec_six">
        <span id="atente_spec_six">{{ $t("attente_spec_six") }} {{ dataTable.MonJoueur.pseudo }}</span>
    </div>

    <!-- Affichage d'un message d'information sur le déroulement du jeu -->
    <div id="message_action_mise">
        <span id="info_mise_joueur">{{ pseudo_joueur_action }} {{ $t("mise_action") }} {{ derniereMise }} {{ $t("jetons_mise") }}. </span>
    </div>
    <div id="message_action_check">
        <span id="info_check_joueur">{{ pseudo_joueur_action }} {{ $t("check_action") }}. </span>
    </div>
    <div id="message_action_coucher">
        <span id="info_coucher_joueur">{{ pseudo_joueur_action }} {{ $t("coucher_action") }}. </span>
    </div>

    <!-- Affichage d'un message d'information sur le rôle du joueur au survol de la souris -->
    <div id="infos_roles">
        <span id="infos_roles_h"></span>
        <p id="infos_roles_p"></p>
        <p id="clic">{{ $t("clic_cristal") }}</p>
    </div>

    <!-- Affichage d'une fenêtre affichant dynamiquement le déroulement du jeu -->
    <ul v-if="dataTable.Table.tour != 0" id="liste_actions_joueurs">
        <li id="liste_item" v-for="(item, index) in actions" :class="{ nouveau_tour: item.tour == true, nouveau_joueur: item.nv_joueur == true }">{{ item.joueurPseudo + item.type }}</li>
    </ul>


    <!-- Affichage d'une fenêtre contenant trois onglets: paramètres, astuces, et chat -->
    <div id="fenetre_chat_tuto">
        <div id="icons_chat_tuto">
            <img src="../../public/img/rouage.png" alt="Paramètre" @click="afficher_parametre()">
            <img src="../../public/img/tuto.png" alt="Point d'interrogation" @click="afficher_tuto()">
            <img src="../../public/img/chat.png" alt="Discussion" @click="afficher_chat()">
            <img src="../../public/img/minimize.png" alt="Réduire fenêtre" id="reduire_fenetre" @click="fermer_chat_tuto()">
        </div>
        <div id="settings">
            <div id="settings_music">
                <span><mark>{{ $t("musique_jeu") }}</mark></span>
                <div id="mute">
                    <label for="music_box">Mute:</label>
                    <input type="checkbox" id="music_box" name="music_box" value="Music" v-on:change="mute_music()">
                </div>
                <div id="range_volume">
                    <label for="vol">Volume:</label>
                    <input type="range" id="vol" name="vol" value="5" min="0" max="10" v-on:change="volume_music()"  oninput="volumeOutput.value = vol.value">
                    <output id="volumeOutput">5</output>
                </div>
            </div>
            <div id="settings_langue">
                <span><mark>{{ $t("choix_langue") }}</mark></span>
                <div v-if="$i18n.locale=='fr'" @click="changeLangue($i18n.locale)">
                    <span>English</span>
                    <img src="../../public/img/uk.png" alt="drapeau UK">
                </div>
                <div v-if="$i18n.locale=='en'" @click="changeLangue($i18n.locale)">
                    <span>Français</span>
                    <img src="../../public/img/fr.png" alt="drapeau France">
                </div>
            </div>
        </div>
        <div id="tuto">
            <ul id="liste_tuto">
                <li><mark>{{ $t("astuce_n1") }}</mark></li>
                <li>{{ $t("astuce_1") }}</li>
                <li><mark>{{ $t("astuce_n2") }}</mark></li>
                <li>{{ $t("astuce_2") }}</li>
                <li><mark>{{ $t("astuce_n3") }}</mark></li>
                <li>{{ $t("astuce_3") }}</li>
                <li><mark>{{ $t("astuce_n4") }}</mark></li>
                <li>{{ $t("astuce_4") }}</li>
            </ul>
        </div>
        <div id="chat">
            <p>{{ $t("chat_p") }}</p>
            <ul id="liste_chat">
                <li id="chat_item" v-for="(item, index) in messages"><span>{{ item.time }}</span><mark>{{ item.joueurPseudo }}</mark> {{" " + item.msg }}</li>
            </ul>
            <div>
                <input id="input_msg_chat" type="text" :placeholder="$t('message')" @keyup.enter="envoyer_msg">
                <img src="../../public/img/send_chat.png" alt="Envoyer message" @click="envoyer_msg()">
            </div>
        </div>
    </div>


    <!-- Affichage des règles du jeu -->
    <div id="regles_jeu">
        <h3 id="fermer_regles" @click="fermer_regles()">{{ $t("fermer") }}</h3>
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
    </div>
</template>

<script>

import Cartes from "../img_cartes";

import i18n from '../locales/i18n';
import en from "../locales/en.json";
import fr from "../locales/fr.json";

import verso from "../../public/img/Cartes/verso.png";

import j1_prison from "../../public/img/j1_prison.png";
import j1_normal from "../../public/img/joueur_1.png";
import j2_prison from "../../public/img/j2_prison.png";
import j2_normal from "../../public/img/joueur_2.png";
import j3_prison from "../../public/img/j3_prison.png";
import j3_normal from "../../public/img/joueur_3.png";
import j4_prison from "../../public/img/j4_prison.png";
import j4_normal from "../../public/img/joueur_4.png";
import j5_prison from "../../public/img/j5_prison.png";
import j5_normal from "../../public/img/joueur_5.png";

import attente_role from "../../public/img/attente_role.gif";

import policier_normal from "../../public/img/policier_fond_blanc.gif";
import policier_prison from "../../public/img/policier_prison.gif";

import indic_normal from "../../public/img/voyante_fond_blanc.gif";
import indic_prison from "../../public/img/indic_prison.gif";

import escroc_normal from "../../public/img/escroc_2_fond_blanc.gif";
import escroc_prison from "../../public/img/escroc_2_prison.gif";

import usurpateur_normal from "../../public/img/usurpateur_fond_blanc.gif";
import usurpateur_prison from "../../public/img/usurpateur_prison.gif";

import voleur_normal from "../../public/img/voleur_fond_blanc.gif";
import voleur_prison from "../../public/img/voleur_prison.gif";

import insolvable_normal from "../../public/img/insolvable_fond_blanc.gif";
import insolvable_prison from "../../public/img/insolvable_prison.gif";


import io from 'socket.io-client';
import checkaud from '../../public/sounds/Checker.mp3'  ;
import miseaud from '../../public/sounds/Miser.mp3'  ;
import coucheraud from '../../public/sounds/Coucher.mp3'  ;
import musicingame from '../../public/sounds/in_game.mp3'  ;




export default {
    data() {
        return {
            socket: null,
            user:[],
            playerFolded: false,
            checked:false,
            updateData: [],
            dataTable: [],
            nb_jetons_mise: null,
            derniereMise: null,
            cartes: Cartes,
            carte1MonJoueur: verso,
            carte2MonJoueur: verso,
            carte1Gagnant: verso,
            carte2Gagnant: verso,
            carteTable1: null,
            carteTable2: null,
            carteTable3: null,
            carteTable4: null,
            carteTable5: null,
            gagnant : '',
            numJoueurPlaying: null,
            timerVar: null,
            timeleft: 30,
            timer_rejouer: 20,
            intervalId: null,
            reset: false,
            var_pcq_mise: false,
            carte_voyante: verso,
            pseudo_est_vu: '',
            pseudo_en_prison: '',
            pseudo_usurpe: '',
            pseudo_vole: '',
            pouvoir_dispo: true,
            ready_bool: false,
            j1_image: j1_normal,
            j2_image: j2_normal,
            j3_image: j3_normal,
            j4_image: j4_normal,
            j5_image: j5_normal,
            flic_image: policier_normal,
            pseudo_joueur_action: '',
            actions: [{joueurPseudo:'', type:'', tour:false, nv_joueur:false}],
            action: {joueurPseudo:'', type:'', tour:false, nv_joueur:false},
            messages: [{time: '', joueurPseudo:'', msg:''}],
            message: {time: '', joueurPseudo:'', msg:''},
            attente_partie: true,
            role_attribue: false,
            role_image: attente_role,
            trad: fr,
            carte_swap: null,
            Mise_total_jeu: 0,
            montant_suivre: 0,
            sound : null,
            spectateur: false
        };
    },
    created() {
        this.sound = new Audio(musicingame);
        this.sound.volume = 0.5;
        this.sound.loop = true;
        this.sound.play(); 
    },
    beforeRouteLeave(to, from, next) {
        this.sound.pause();
        next();
    },
    beforeCreate: function () {
        document.body.className = 'interface';
    },
    methods: {
        changeLangue(locale) {
            if (locale == 'en') {
                i18n.global.locale = 'fr';
                this.trad = fr;
            }
            if (locale == 'fr') {
                i18n.global.locale = 'en';
                this.trad = en;
            }
        },
        Rejoindre(){
            this.socket.emit('RejoindrePartie',this.user.id_user);
        },
        regles(){
            document.getElementById("regles_jeu").style.visibility = 'visible';
        },
        async getUserInfo() {
            try {
                const response = await fetch('/getUserInfo');
                const data = await response.json();
                this.user = data;
                console.log("i'm here "+JSON.stringify(this.user));
                return data;
            } catch (error) {
                console.error('Error', error);
                throw error;
            }
        },
        fermer_regles(){
            document.getElementById("regles_jeu").style.visibility = 'hidden';
        },
        miser(){  // ACTION: MISER
            const soundmise = new Audio(miseaud);
            soundmise.play();
            if(this.dataTable.MonJoueur.isPlaying){
                var input = document.getElementById("nb_jetons_mise");
                let envoiValid = true;

                let blind = this.dataTable.Table.blind;
                let int_input_value = parseInt(input.value);


                // gestion des cas généraux (< 0, > nb_jetons, input vide, 0):
                if(!input.value){    // quand l'utilisateur essaye de rentrer une donnée vide dans mise
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'visible';
                    return;
                }
                if(input.value < 0 ){//quand l utilisateur mise un montant negatif
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'visible';
                    return;
                }
                if(input.value > this.dataTable.MonJoueur.nb_jetons)//Quand l'utilisateur essaye de miser plus de jetons qu'il en a
                {
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'visible';
                    return;
                }
                if(input.value == 0){    // quand l'utilisateur essaye de miser 0
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'visible';
                    return;
                }
                
                //vérification que mise supérieure à 0
                if(int_input_value == 0){
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_zero").style.visibility = 'visible';
                    envoiValid = false;
                }

                // vérifier si la mise du joueur dépasse la mise maximale autorisée pour la table
                if(int_input_value > this.dataTable.Table.Mise_maximum){
                    input.value = this.dataTable.Table.Mise_maximum; // définir la valeur de l'input sur la mise maximale autorisée
                }

                // gestion des cas sans blind
                if(this.dataTable.Table.blind == 0){
                    // si mise du joueur inférieure à la mise minimum
                    if(int_input_value + this.dataTable.MonJoueur.Mise_Tour < this.dataTable.Table.Mise_minimum ){
                        document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                        document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                        document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                        document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                        document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                        document.getElementById("tooltip_mise_mini").style.visibility = 'visible';
                        document.getElementById("tooltip_mise_zero").style.visibility = 'hidden';
                        envoiValid = false;
                    }
                    
                }
                // gestion des cas avec blind
                else{
                    console.log("gestion des cas avec blind ");
                    // si mise minimum == 0
                    if(this.dataTable.Table.Mise_minimum == 0){
                        if(int_input_value + this.dataTable.MonJoueur.Mise_Tour < blind){  // si mise du joueur inférieure à la blind
                            document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                            document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_blind").style.visibility = 'visible';
                            document.getElementById("tooltip_mise_zero").style.visibility = 'hidden';
                            envoiValid = false;
                        }
                    }else{
                        
                        if(int_input_value + parseInt(this.dataTable.MonJoueur.Mise_Tour) < this.dataTable.Table.Mise_minimum ){
                            document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                            document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                            document.getElementById("tooltip_mise_mini").style.visibility = 'visible';
                            document.getElementById("tooltip_mise_zero").style.visibility = 'hidden';
                            envoiValid = false;
                        }
                    }
                }

                if(envoiValid){ // envoi des données si tout est ok
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_zero").style.visibility = 'hidden';
                    var anim = document.getElementById("illust_miser");

                    anim.classList.remove('anim');
                    setTimeout(() => {
                        anim.classList.add('anim');
                    }, 0);
                    this.socket.emit('miser', parseInt(input.value));
                    document.getElementById("nb_jetons_mise").value = "";
                }


        
            }

        },
        fold(){ // ACTION: SE COUCHER
            const soundcoucher = new Audio(coucheraud);
            soundcoucher.play();
            if(this.dataTable.MonJoueur.isPlaying){
                document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                var anim = document.getElementById("illust_coucher");
                anim.classList.remove('anim');
                setTimeout(() => {
                    anim.classList.add('anim');
                }, 0);
                this.playerFolded = true;
                this.socket.emit('se coucher',this.user.id_user);
            }
        },
        check(){  // ACTION: CHECKER
            const soundcheck = new Audio(checkaud);
            soundcheck.play();
            if(this.dataTable.Table.Mise_minimum === 0 || this.dataTable.MonJoueur.Mise_Tour == this.dataTable.Table.blind){

                if(this.dataTable.MonJoueur.isPlaying){
                    document.getElementById("tooltip_mise_manquante").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_negative").style.visibility = 'hidden';
                    document.getElementById("tooltip_jetons_manquants").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_mini").style.visibility = 'hidden';
                    document.getElementById("tooltip_mise_blind").style.visibility = 'hidden';
                    var anim = document.getElementById("illust_check");
                    anim.classList.remove('anim');
                    setTimeout(() => {
                        anim.classList.add('anim');
                    }, 0);
                    this.socket.emit('passer',this.user.id_user);
                    document.getElementById("nb_jetons_mise").value = "";
                }
            }
            
        },
        ready(){ // lorsque le joueur est prêt pour rejouer une nouvelle partie
            document.getElementById("message_rejouer").style.visibility = 'hidden';
            document.getElementById("message_attente_reset").style.visibility = 'visible';
            this.ready_bool = true;
            this.socket.emit('RejoindrePartie', this.user.id_user);
        }, 
        check_ready(){ // si le joueur n'a pas appuyé sur le bouton 'pret' après la fin de la partie
            if(this.timer_rejouer===0 && !this.ready_bool){
                this.socket.emit('deconnexion', this.user.id_user);
                this.socket.disconnect(); 
                this.$router.push({ name: 'accueil' });
            }
        },
        disconnect() {
            this.$router.push({ name: 'accueil' });
            this.socket.emit('deconnexion', this.user.id_user);
            this.socket.disconnect();

        },
        augmenter(){ // Bouton '+' pour augmenter le montant de la mise
            if(this.nb_jetons_mise+100 <= this.dataTable.MonJoueur.nb_jetons){
                this.nb_jetons_mise+=100;
                document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
            }
        },
        diminuer(){ // Bouton '-' pour diminuer le montant de la mise
            let mise = document.getElementById("nb_jetons_mise").value;
            if(mise && mise >= 100){
                this.nb_jetons_mise-=100;
                document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
            }
        },
        suivre(){ // Bouton 'Suivre' pour miser le même montant que le joueur précédent
            if( parseInt(this.dataTable.MonJoueur.nb_jetons) >= parseInt(this.dataTable.Table.blind)&& parseInt(this.dataTable.Table.blind)>0)
            {
                if (parseInt(this.dataTable.Table.Mise_minimum)===0)
                {
                    this.nb_jetons_mise = parseInt(this.dataTable.Table.blind);
                    document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
                }
                else{
                    this.nb_jetons_mise = parseInt(this.dataTable.Table.Mise_minimum) - parseInt(this.dataTable.MonJoueur.Mise_Tour)  ;
                    document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
                }                
            }   
            else {
                    this.nb_jetons_mise = parseInt(this.dataTable.Table.Mise_minimum) - parseInt(this.dataTable.MonJoueur.Mise_Tour);
                    document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
            }
            
        },
        tapis(){ // Bouton 'Tapis' pour miser tous les jetons 
            this.nb_jetons_mise = this.dataTable.MonJoueur.nb_jetons,
            document.getElementById("nb_jetons_mise").value = this.nb_jetons_mise;
        },
        quit(){ // Après avoir cliqué sur la porte de sortie, un message de confirmation s'affiche
            document.getElementById("confirm").style.display = "block";
        },
        quitGameButton(){ 
            this.socket.emit('deconnexion', this.user.id_user);
            this.socket.disconnect();
        },
        dontquit(){
            document.getElementById("confirm").style.display = "none";
        },
        timer () { // Gestion du timer lors du tour du joueur ("flash" du timer si le temps restant est inférieur à 5 secondes)
            if(this.timeleft <= 5){
                document.getElementById("timer").classList.add('time_limit');
            }
            if(this.timeleft>0) {
                this.timerVar = setTimeout(() => {
                    this.timeleft -= 1;
                    document.getElementById("timer").textContent = this.timeleft+"s";
                    this.timer();
                }, 1000)
            }
            if(this.timeleft==0){
                document.getElementById("timer").classList.remove('time_limit');
                document.getElementById("timer").style.visibility = 'hidden';   
                document.getElementById("action_insolvable").style.visibility = 'hidden';
                document.getElementById("confirmation_escroc").style.visibility = 'hidden';
                document.getElementById("select_voyante").style.display = "none";
                document.getElementById("select_usurpateur").style.display = "none";
                document.getElementById("select_police").style.display = "none";
                document.getElementById("select_voleur").style.display = "none";
                document.getElementById("liste_joueurs").style.visibility = "hidden";
                if(this.dataTable.Table.blind !=0 && this.dataTable.MonJoueur.Mise_Tour == 0){
                    this.fold();
                }
                else if(this.dataTable.Table.Mise_minimum > 0){
                    this.fold();
                } else {
                    this.check();
                }
            }
        },
        distribCartes(v1, c1, v2, c2){ // Distribution et affichage des deux cartes du joueur
            this.carte1MonJoueur = this.cartes[c1-1][v1-2];
            this.carte2MonJoueur = this.cartes[c2-1][v2-2];
            document.getElementById("carte_main_1").classList.add('flip');
            document.getElementById("carte_main_2").classList.add('flip');
        },
        retourneCartes(data){ // Retournement des cartes sur la table du jeu
            if(data.Table.tour == 2){
                let v1 = data.Table.CartesSurTable.carte0.valeur;
                let c1 = data.Table.CartesSurTable.carte0.couleur;
                let v2 = data.Table.CartesSurTable.carte1.valeur;
                let c2 = data.Table.CartesSurTable.carte1.couleur;
                let v3 = data.Table.CartesSurTable.carte2.valeur;
                let c3 = data.Table.CartesSurTable.carte2.couleur;
                this.carteTable1 = this.cartes[c1-1][v1-2];
                this.carteTable2 = this.cartes[c2-1][v2-2];
                this.carteTable3 = this.cartes[c3-1][v3-2];
                document.getElementById("carteT1").classList.add('flip');
                document.getElementById("carteT2").classList.add('flip');
                document.getElementById("carteT3").classList.add('flip');
            }
            if(data.Table.tour == 3){
                let v1 = data.Table.CartesSurTable.carte0.valeur;
                let c1 = data.Table.CartesSurTable.carte0.couleur;
                let v2 = data.Table.CartesSurTable.carte1.valeur;
                let c2 = data.Table.CartesSurTable.carte1.couleur;
                let v3 = data.Table.CartesSurTable.carte2.valeur;
                let c3 = data.Table.CartesSurTable.carte2.couleur;
                this.carteTable1 = this.cartes[c1-1][v1-2];
                this.carteTable2 = this.cartes[c2-1][v2-2];
                this.carteTable3 = this.cartes[c3-1][v3-2];
                let v4 = data.Table.CartesSurTable.carte3.valeur;
                let c4 = data.Table.CartesSurTable.carte3.couleur;
                this.carteTable4 = this.cartes[c4-1][v4-2];
                document.getElementById("carteT1").classList.add('flip');
                document.getElementById("carteT2").classList.add('flip');
                document.getElementById("carteT3").classList.add('flip');
                document.getElementById("carteT4").classList.add('flip');
            }
            if(data.Table.tour == 4){
                let v1 = data.Table.CartesSurTable.carte0.valeur;
                let c1 = data.Table.CartesSurTable.carte0.couleur;
                let v2 = data.Table.CartesSurTable.carte1.valeur;
                let c2 = data.Table.CartesSurTable.carte1.couleur;
                let v3 = data.Table.CartesSurTable.carte2.valeur;
                let c3 = data.Table.CartesSurTable.carte2.couleur;
                this.carteTable1 = this.cartes[c1-1][v1-2];
                this.carteTable2 = this.cartes[c2-1][v2-2];
                this.carteTable3 = this.cartes[c3-1][v3-2];
                let v4 = data.Table.CartesSurTable.carte3.valeur;
                let c4 = data.Table.CartesSurTable.carte3.couleur;
                this.carteTable4 = this.cartes[c4-1][v4-2];
                let v5 = data.Table.CartesSurTable.carte4.valeur;
                let c5 = data.Table.CartesSurTable.carte4.couleur;
                this.carteTable5 = this.cartes[c5-1][v5-2];
                document.getElementById("carteT1").classList.add('flip');
                document.getElementById("carteT2").classList.add('flip');
                document.getElementById("carteT3").classList.add('flip');
                document.getElementById("carteT4").classList.add('flip');
                document.getElementById("carteT5").classList.add('flip');
            }   
        },
        afficherCartesPlateau(){ // Affichage des cinq cartes faces cachées sur la table du jeu
            var cartesAnim = document.querySelectorAll('.carte_table');
            [...cartesAnim].forEach((carteAnim)=>{
                carteAnim.classList.add('animated');
            });
        },
        retirerCartesPlateau(){ // Retrait des cinq cartes de la table de jeu après la fin de la partie
            var cartesAnim = document.querySelectorAll('.carte_table');
            [...cartesAnim].forEach((carteAnim)=>{
                carteAnim.classList.remove('animated');
                carteAnim.classList.remove('flip');
            });
        },
        findJoueurPlaying(data){ 
            if(data.Joueur1.isPlaying===true){
                this.numJoueurPlaying = 1;
            }
            else if(data.Joueur2.isPlaying===true){
                this.numJoueurPlaying = 2;
            }
            else if(data.Joueur3.isPlaying===true){
                this.numJoueurPlaying = 3;
            }
            else if(data.Joueur4.isPlaying===true){
                this.numJoueurPlaying = 4;
            }
            else if(data.Joueur5.isPlaying===true){
                this.numJoueurPlaying = 5;
            }
            else if(data.MonJoueur.isPlaying===true){
                this.numJoueurPlaying = 0;
            }
        },
        deleteAnimActions(){ // Reset des animations des actions des joueurs autour de la tble
            // anims joueur1
            document.getElementById("illust_miser_j1").classList.remove('anim_action');  
            document.getElementById("illust_coucher_j1").classList.remove('anim_action');  
            document.getElementById("illust_check_j1").classList.remove('anim_action');  
            document.getElementById("action_j1").classList.remove('anim_action'); 

            // anims joueur2
            document.getElementById("illust_miser_j2").classList.remove('anim_action');  
            document.getElementById("illust_coucher_j2").classList.remove('anim_action');  
            document.getElementById("illust_check_j2").classList.remove('anim_action');  
            document.getElementById("action_j2").classList.remove('anim_action'); 

            // anims joueur3
            document.getElementById("illust_miser_j3").classList.remove('anim_action');  
            document.getElementById("illust_coucher_j3").classList.remove('anim_action');  
            document.getElementById("illust_check_j3").classList.remove('anim_action');  
            document.getElementById("action_j3").classList.remove('anim_action'); 

            // anims joueur4
            document.getElementById("illust_miser_j4").classList.remove('anim_action');  
            document.getElementById("illust_coucher_j4").classList.remove('anim_action');  
            document.getElementById("illust_check_j4").classList.remove('anim_action');  
            document.getElementById("action_j4").classList.remove('anim_action'); 

            // anims joueur5
            document.getElementById("illust_miser_j5").classList.remove('anim_action');  
            document.getElementById("illust_coucher_j5").classList.remove('anim_action');  
            document.getElementById("illust_check_j5").classList.remove('anim_action');  
            document.getElementById("action_j5").classList.remove('anim_action'); 
        },
        afficheActionJoueurs(data){ // affichage de l'action du joueur 
            switch (this.numJoueurPlaying){
                case 1:
                    if(data[0]==1){ // 1 = action miser
                        this.derniereMise = data[1];
                        document.getElementById("action_j1").textContent = "mise: "+data[1];
                        document.getElementById("illust_miser_j1").classList.add('anim_action'); //action miser joueur  
                        document.getElementById("action_j1").classList.add('anim_action'); // affichage de la mise du joueur
                    }
                    else if(data[0]==2){ // 2 = action 'checker'
                        document.getElementById("action_j1").textContent = "check";
                        document.getElementById("illust_check_j1").classList.add('anim_action'); 
                        document.getElementById("action_j1").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    else if(data[0]==3){ // 3 = action 'se coucher'
                        document.getElementById("action_j1").textContent = "se couche";
                        document.getElementById("illust_coucher_j1").classList.add('anim_action'); 
                        document.getElementById("action_j1").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    return;
                case 2:
                    if(data[0]==1){ // 1 = action miser
                        this.derniereMise = data[1];
                        document.getElementById("action_j2").textContent = "mise: "+data[1];
                        document.getElementById("illust_miser_j2").classList.add('anim_action');
                        document.getElementById("action_j2").classList.add('anim_action'); // affichage de la mise du joueur
                    }
                    else if(data[0]==2){ // 2 = action 'checker'
                        document.getElementById("action_j2").textContent = "check";
                        document.getElementById("illust_check_j2").classList.add('anim_action'); 
                        document.getElementById("action_j2").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    else if(data[0]==3){ // 3 = action 'se coucher'
                        document.getElementById("action_j2").textContent = "se couche";
                        document.getElementById("illust_coucher_j2").classList.add('anim_action'); 
                        document.getElementById("action_j2").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    return;
                case 3:
                    if(data[0]==1){ // 1 = action miser
                        this.derniereMise = data[1];
                        document.getElementById("action_j3").textContent = "mise: "+data[1];
                        document.getElementById("illust_miser_j3").classList.add('anim_action');
                        document.getElementById("action_j3").classList.add('anim_action'); // affichage de la mise du joueur
                    }
                    else if(data[0]==2){ // 2 = action 'checker'
                        document.getElementById("action_j3").textContent = "check";
                        document.getElementById("illust_check_j3").classList.add('anim_action'); 
                        document.getElementById("action_j3").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    else if(data[0]==3){ // 3 = action 'se coucher'
                        document.getElementById("action_j3").textContent = "se couche";
                        document.getElementById("illust_coucher_j3").classList.add('anim_action');
                        document.getElementById("action_j3").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    return;
                case 4:
                    if(data[0]==1){ // 1 = action miser
                        this.derniereMise = data[1];
                        document.getElementById("action_j4").textContent = "mise: "+data[1];
                        document.getElementById("illust_miser_j4").classList.add('anim_action'); 
                        document.getElementById("action_j4").classList.add('anim_action'); // affichage de la mise du joueur
                    }
                    else if(data[0]==2){ // 2 = action 'checker'
                        document.getElementById("action_j4").textContent = "check";
                        document.getElementById("illust_check_j4").classList.add('anim_action'); 
                        document.getElementById("action_j4").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    else if(data[0]==3){ // 3 = action 'se coucher'
                        document.getElementById("action_j4").textContent = "se couche";
                        document.getElementById("illust_coucher_j4").classList.add('anim_action'); 
                        document.getElementById("action_j4").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    return;
                case 5:
                    if(data[0]==1){ // 1 = action miser
                        this.derniereMise = data[1];
                        document.getElementById("action_j5").textContent = "mise: "+data[1];
                        document.getElementById("illust_miser_j5").classList.add('anim_action'); 
                        document.getElementById("action_j5").classList.add('anim_action'); // affichage de la mise du joueur
                    }
                    else if(data[0]==2){ // 2 = action 'checker'
                        document.getElementById("action_j5").textContent = "check";
                        document.getElementById("illust_check_j5").classList.add('anim_action'); 
                        document.getElementById("action_j5").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    else if(data[0]==3){ // 3 = action 'se coucher'
                        document.getElementById("action_j5").textContent = "se couche";
                        document.getElementById("illust_coucher_j5").classList.add('anim_action');
                        document.getElementById("action_j5").classList.add('anim_action'); // affichage du nom de l'action du joueur
                    }
                    return;
                default:
                    break;
            }
        },
        pouvoir_role(){ // Lorsque le joueur clique sur la boule de cristal pour activer son rôle
            var num_role = this.dataTable.MonJoueur.Role;
            switch(num_role){
                case 0: // VOLEUR
                    var anim_role = document.getElementById("oeil_voleur");
                    break;
                case 1: // ESCROC
                    var anim_role = document.getElementById("argent_escroc");
                    break;
                case 2: // INSOLVABLE
                    var anim_role = document.getElementById("piece_insolvable");
                    break;
                case 3: // POLICIER
                    var anim_role = document.getElementById("menottes");
                    break;  
                case 4: // USURPATEUR
                    var anim_role = document.getElementById("usurp_anim");
                    break;
                case 5: // INDIC
                    var anim_role = document.getElementById("oeil_voyante");
                    break;
                

            }
            // Affichage de l'animation selon le rôle
            anim_role.classList.remove('anim');
            setTimeout(() => {
                anim_role.classList.add('anim');
            }, 0);

            document.getElementById("select_voleur").style.display = "none";
            document.getElementById("select_police").style.display = "none";
            document.getElementById("select_usurpateur").style.display = "none";
            document.getElementById("select_voyante").style.display = "none";

            if(num_role == 0 || num_role == 3 || num_role == 4 || num_role == 5){ // pour les rôles qui ont besoin de choisir le joueur qui subit le pouvoir
                setTimeout(() =>{
                    document.getElementById("liste_joueurs").style.visibility = "visible";
                    switch (num_role){
                        case 0: // VOLEUR
                            document.getElementById("select_voleur").style.display = "block";
                            break;
                        case 3: // POLICIER
                            document.getElementById("select_police").style.display = "block";
                            break;
                        case 4: // USURPATEUR
                            document.getElementById("select_usurpateur").style.display = "block";
                            break;
                        case 5: // INDIC
                            document.getElementById("select_voyante").style.display = "block";
                            break;
                    }
                }, 1500);
            }
            else if(num_role ==2){ // INSOLVABLE
                if( parseInt(this.dataTable.MonJoueur.nb_jetons) >= parseInt(this.dataTable.Table.blind)&& parseInt(this.dataTable.Table.blind)>0)
                { 
                    if (parseInt(this.dataTable.Table.Mise_minimum)===0)
                    {  
                        this.montant_suivre = parseInt(this.dataTable.Table.blind);
                    }
                    else{
                        this.montant_suivre = parseInt(this.dataTable.Table.Mise_minimum) - parseInt(this.dataTable.MonJoueur.Mise_Tour);
                    } 
                }   
                else{
                    this.montant_suivre = parseInt(this.dataTable.Table.Mise_minimum) - parseInt(this.dataTable.MonJoueur.Mise_Tour);
                }
                setTimeout(() =>{
                    document.getElementById("action_insolvable").style.visibility = 'visible';
                }, 1500);
            }
            else if(num_role == 1){ // ESCROC
                setTimeout(() =>{
                    document.getElementById("confirmation_escroc").style.visibility = 'visible';
                }, 1000);
            } 
        },
        role_insolvable(montant_suivre){ // Gestion du rôle insolvavble
            document.getElementById("action_insolvable").style.visibility = 'hidden';
            let action_insolvable_data = [];
            action_insolvable_data.push(this.dataTable.MonJoueur.IdSocket);
            action_insolvable_data.push(montant_suivre);
            this.socket.emit('miser', montant_suivre);
            this.socket.emit('insolvableAction', action_insolvable_data);
            document.getElementById("bouton_role").classList.remove('active');
            this.pouvoir_dispo = false;
        },
        role_escroc(){ // Gestion du rôle escroc
            document.getElementById("confirmation_escroc").style.visibility = 'hidden';
            this.socket.emit('escrocAction', this.dataTable.MonJoueur.IdSocket);
            document.getElementById("bouton_role").classList.remove('active');
            this.pouvoir_dispo = false;
            this.fold();
        },
        role_vo_vo_us_po(pseudo_joueur){ // Gestion des rôles qui interagissent avec les autres joueurs (infiltré, voleur, usurpateur, policier)
            var num_role = this.dataTable.MonJoueur.Role; 
            switch(num_role){
                case 0: // VOLEUR
                    document.getElementById("liste_joueurs").style.visibility = 'hidden';
                    document.getElementById("choix_carte_voleur").style.visibility = 'visible';
                    this.pseudo_vole = pseudo_joueur;
                    break;
                case 3: // POLICIER
                    this.pseudo_en_prison = pseudo_joueur;
                    let data_socket_police = [];
                    this.socket.emit('policeAction', pseudo_joueur);
                    document.getElementById("liste_joueurs").style.visibility = "hidden";
                    document.getElementById("bouton_role").classList.remove('active');
                    this.pouvoir_dispo = false;
                    break;
                case 4: // USURPATEUR
                    this.pseudo_usurpe = pseudo_joueur;
                    let data_socket_usurpateur = [];
                    data_socket_usurpateur.push(pseudo_joueur); // l'id du joueur dont l'usurpateur souhaite voler le rôle
                    data_socket_usurpateur.push(this.dataTable.MonJoueur.IdSocket);
                    this.socket.emit('usurpateurAction', data_socket_usurpateur);
                    document.getElementById("liste_joueurs").style.visibility = "hidden";
                    document.getElementById("bouton_role").classList.remove('active');
                    this.pouvoir_dispo = false;
                    break;
                case 5: // INDIC
                    this.pseudo_est_vu = pseudo_joueur;
                    let data_socket_voyante = [];
                    data_socket_voyante.push(pseudo_joueur); // l'id du joueur dont l'infiltré souhaite visualiser la carte
                    data_socket_voyante.push(this.dataTable.MonJoueur.IdSocket); 
                    this.socket.emit('voyanteVisuCarte', data_socket_voyante);
                    document.getElementById("liste_joueurs").style.visibility = "hidden";
                    document.getElementById("bouton_role").classList.remove('active');
                    this.pouvoir_dispo = false;
                    break;
            }

        },
        role_voleur(carte){ // Gestion du rôle voleur
            this.carte_swap = carte;
            document.getElementById("choix_carte_voleur").style.visibility = 'hidden';
            let data_socket_voleur = [];
            data_socket_voleur.push(this.pseudo_vole); // l'id du joueur dont le voleur souhaite voler la carte
            data_socket_voleur.push(this.dataTable.MonJoueur.IdSocket);
            data_socket_voleur.push(carte); 
            console.log("Je veux voler"+this.pseudo_vole+" ma socket id est: "+this.dataTable.MonJoueur.IdSocket+" et je me débarasse de ma carte n°"+carte);
            this.socket.emit('voleurAction', data_socket_voleur);
            this.pouvoir_dispo = false;
            document.getElementById("bouton_role").classList.remove('active');
            
        },
        fermer_choix(){ // Si le joueur ne veut finalement pas utiliser son pouvoir
            document.getElementById("liste_joueurs").style.visibility = 'hidden';
            document.getElementById("choix_carte_voleur").style.visibility = 'hidden';
            document.getElementById("action_insolvable").style.visibility = 'hidden';
            document.getElementById("confirmation_escroc").style.visibility = 'hidden';
        },
        afficherMessagesActions(data){ /** affichage des infos de la partie en cours (numéro du tour, action joueur...) */
            document.getElementById("message_action_mise").style.visibility = 'hidden';
            document.getElementById("message_action_check").style.visibility = 'hidden';
            document.getElementById("message_action_coucher").style.visibility = 'hidden';
            this.pseudo_joueur_action = data[2];
            if(data[0]==1){ // 1 = action miser
                this.derniereMise = data[1];
                this.actions.push({joueurPseudo: data[2], type: " "+this.trad["mise_action"]+ ": "+this.derniereMise + " "+ this.trad["jetons_mise"]+"!", tour: false, nv_joueur: false});
                document.getElementById("message_action_mise").style.visibility = 'visible';
                setTimeout(() => {
                    document.getElementById("message_action_mise").style.visibility = 'hidden';
                }, 2500)

            }
            else if(data[0]==2){ // 2 = action 'checker'
                this.actions.push({joueurPseudo: data[2], type: " "+this.trad["check_action"]+"!", tour: false, nv_joueur: false});            
                document.getElementById("message_action_check").style.visibility = 'visible';
                setTimeout(() => {
                    document.getElementById("message_action_check").style.visibility = 'hidden';
                }, 2500)
                
            }
            else if(data[0]==3){ // 3 = action 'se coucher'
                this.actions.push({joueurPseudo: data[2], type: " "+this.trad["coucher_action"]+"!", tour: false, nv_joueur: false});
                document.getElementById("message_action_coucher").style.visibility = 'visible';
                setTimeout(() => {
                    document.getElementById("message_action_coucher").style.visibility = 'hidden';
                }, 2500)
            }
            var lastLi = document.querySelector('#liste_actions_joueurs li:last-child');
	        lastLi.scrollIntoView({behavior: "smooth"});

        },
        afficher_parametre(){ 
            document.getElementById("chat").style.visibility = 'hidden';
            document.getElementById("tuto").style.visibility = 'hidden';
            document.getElementById("settings").style.visibility = 'visible';
            document.getElementById("reduire_fenetre").style.display = 'block';

            document.getElementById("fenetre_chat_tuto").style.border = '0.5vh solid white';
            document.getElementById("icons_chat_tuto").style.border = 'none';
            document.getElementById("icons_chat_tuto").style.borderRadius = '0';
            document.getElementById("icons_chat_tuto").style.borderBottom = '0.4vh solid white';
        },
        afficher_tuto(){
            document.getElementById("chat").style.visibility = 'hidden';
            document.getElementById("tuto").style.visibility = 'visible';
            document.getElementById("settings").style.visibility = 'hidden';
            document.getElementById("reduire_fenetre").style.display = 'block';

            document.getElementById("fenetre_chat_tuto").style.border = '0.5vh solid white';
            document.getElementById("icons_chat_tuto").style.border = 'none';
            document.getElementById("icons_chat_tuto").style.borderRadius = '0';
            document.getElementById("icons_chat_tuto").style.borderBottom = '0.4vh solid white';
        },
        afficher_chat(){
            document.getElementById("tuto").style.visibility = 'hidden';
            document.getElementById("chat").style.visibility = 'visible';
            document.getElementById("settings").style.visibility = 'hidden';
            document.getElementById("reduire_fenetre").style.display = 'block';

            document.getElementById("fenetre_chat_tuto").style.border = '0.5vh solid white';
            document.getElementById("icons_chat_tuto").style.border = 'none';
            document.getElementById("icons_chat_tuto").style.borderRadius = '0';
            document.getElementById("icons_chat_tuto").style.borderBottom = '0.4vh solid white';
        },
        fermer_chat_tuto(){
            document.getElementById("tuto").style.visibility = 'hidden';
            document.getElementById("chat").style.visibility = 'hidden';
            document.getElementById("settings").style.visibility = 'hidden';
            document.getElementById("reduire_fenetre").style.display = 'none';
            document.getElementById("icons_chat_tuto").style.border = 'none';
            document.getElementById("icons_chat_tuto").style.border = '0.4vh solid white';
            document.getElementById("icons_chat_tuto").style.borderRadius = '3vh';
            document.getElementById("fenetre_chat_tuto").style.border = 'none';
        },
        envoyer_msg(){ // Gestion de l'envoi de message pour le chat
            var msg_input = document.getElementById("input_msg_chat").value;
            if(msg_input){
                this.socket.emit('message', msg_input)
                document.getElementById("input_msg_chat").value = '';
            }
        },
        mute_music(){
            var checkbox = document.getElementById('music_box');
            if(checkbox.checked == true){
                this.sound.volume = 0;
            }     
            else{
                var volume_slide = document.getElementById("vol").value;
                this.sound.volume = 0+(volume_slide/10);
            }
        },
        volume_music(){
            var volume_slide = document.getElementById('vol').value;
            this.sound.volume = 0+(volume_slide/10);
        },
        show_infos_roles(){ // Affichage de la description du rôle du joueur au survol de la souris
            if(this.attente_partie == true){
                document.getElementById("infos_roles_h").innerText = "";
                document.getElementById("infos_roles_p").innerText = this.trad["role_attribuer"];
            }else{
                switch(this.dataTable.MonJoueur.Role){
                    case 0:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_voleur"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_voleur"];
                        break;
                    case 1:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_escroc"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_escroc"];
                        break;
                    case 2:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_insolvable"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_insolvable"];
                        break;
                    case 3:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_policier"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_policier"];
                        break;
                    case 4:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_usurpateur"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_usurpateur"];
                        break;
                    case 5:
                        document.getElementById("infos_roles_h").innerText = this.trad["h4_voyante"];
                        document.getElementById("infos_roles_p").innerText = this.trad["p_voyante"];
                        break;
                }
            }
            document.getElementById("infos_roles").style.visibility = 'visible';
        },
        invisible_infos_roles(){ // Pour enlever l'affichage de la description du rôle
            document.getElementById("infos_roles").style.visibility = 'hidden';
        }
    },
    async mounted(){
        await this.getUserInfo()

        //this.socket = io('http://localhost:3000/');
        this.socket = io('https://185.155.93.105:21000/');
        this.socket.emit('initConnection',this.user);

        if(i18n.global.locale=='fr'){
            this.trad = fr;
        }
        else if(i18n.global.locale == 'en'){
            this.trad = en;
        }
        

        // Traitement des données de jeu reçues depuis le serveur
        await this.socket.on("updateData", (data) => {
            console.log(data);
            if(data.MonJoueur.IdJoueur){
                clearTimeout(this.intervalId);
                this.timer_rejouer = 20;
                this.dataTable = data;
                this.Mise_total_jeu = this.dataTable.Table.Mise_total;
                console.log("Tour actuel: "+data.Table.tour);

                // Gestion du scroll pour la fenêtre de gauche    
                var lastLi = document.querySelector('#liste_actions_joueurs li:last-child');
                if(lastLi){
                    lastLi.scrollIntoView({behavior: "smooth"});
                }
    
            
                /* Gestion de l'affichage pour le spectateur (si moins de 6 joueurs) */
                if(!data.MonJoueur.isInGame && this.dataTable.Table.Nb_Joueurs !=1){
                    console.log("je suis spectateur!");
                    setTimeout(() => {
                        this.afficherCartesPlateau();
                        this.retourneCartes(this.dataTable);
                    }, 1000)
                }
                

                if(this.dataTable.Table.tour == 1){
                    this.attente_partie = false;
                    //ATTRIBUTION DE L'IMAGE DU ROLE POUR LE JOUEUR
                    if(!this.role_attribue){
                        if(this.dataTable.MonJoueur.Role == 0){
                            this.role_image = voleur_normal;
                            this.role_attribue = true;
                        }
                        else if(this.dataTable.MonJoueur.Role == 1){
                            this.role_image = escroc_normal;
                            this.role_attribue = true
                        }
                        else if(this.dataTable.MonJoueur.Role == 2){
                            this.role_image = insolvable_normal;
                            this.role_attribue = true;
                        }
                        else if(this.dataTable.MonJoueur.Role == 3){
                            this.role_image = policier_normal;
                            this.role_attribue = true;
                        }
                        else if(this.dataTable.MonJoueur.Role == 4){
                            this.role_image = usurpateur_normal;
                            this.role_attribue = true;
                        }
                        else if(this.dataTable.MonJoueur.Role == 5){
                            this.role_image = indic_normal;
                            this.role_attribue = true;
                        }
                    }
                    setTimeout(() => {
                        this.distribCartes(this.dataTable.MonJoueur.Main.carte1.carte1Valeur, this.dataTable.MonJoueur.Main.carte1.carte1Couleur, this.dataTable.MonJoueur.Main.carte2.carte2Valeur, this.dataTable.MonJoueur.Main.carte2.carte2Couleur);
                        this.afficherCartesPlateau();
                    }, 1000)
                    this.reset = false;
                    var btn_role = document.getElementById("bouton_role");
                    if(btn_role){
                        btn_role.classList.remove("desactive");
                    }
                    document.getElementById("message_attente_reset").style.visibility = 'hidden';
                    
                }

                this.findJoueurPlaying(this.dataTable); // (pour afficher les anim d'action au bon endroit)

                this.retourneCartes(this.dataTable);
                
                
                // gestion du time(ove)r
                if(this.dataTable.MonJoueur.isPlaying){
                    clearTimeout(this.timerVar);
                    this.timeleft = 30;
                    document.getElementById("timer").textContent = this.timeleft+"s";
                    document.getElementById("timer").classList.remove('time_limit');
                    document.getElementById("timer").style.visibility = 'visible';
                    if(this.pouvoir_dispo){
                        document.getElementById("bouton_role").classList.add('active');
                    }
                    this.timer();
                }else{
                    var btn_role = document.getElementById("bouton_role");
                    var timer_class_modif = document.getElementById("timer");
                    if(btn_role){
                        btn_role.classList.remove('active');
                    }
                    if(timer_class_modif){
                        timer_class_modif.classList.remove('time_limit');
                        timer_class_modif.style.visibility = 'hidden';   
                    }
    
                }
                if(this.dataTable.Table.Mise_minimum > 0) // si une montant a été misé au cours de la partie
                {
                    this.var_pcq_mise = true;
                }
                else{
                    this.var_pcq_mise = false;
                }
            }else // Gestion du cas où six joueurs sont actuellement en train de jouer. Le joueur qui rejoint la partie est spectateur (du joueur 1)
            {
                console.log("SPECTATEUR");

                this.spectateur = true;
                this.dataTable=data;
            
                setTimeout(() => {
                    this.afficherCartesPlateau();
                    this.retourneCartes(this.dataTable);
                }, 1000)
                
                console.log(this.dataTable);
            }

            console.log("updateData = "+ JSON.stringify(this.dataTable));
        });


        this.socket.on("Gagnant",(data)=>{ // pour gérer l'affichage du gagnant après son envoi par le serveur
            
            this.role_image = attente_role;
            this.role_attribue = false;

            this.gagnant = data[0]; 
            this.dataTable.MonJoueur.isPlaying = false;
            this.reset = true;
            
            this.actions =  [{joueurPseudo:'', type:''}];
            this.action =  {joueurPseudo:'', type:''};

            // affichage des cartes du vainqueur:
            let v1 = data[1].carte1.carte1Valeur;
            let c1 = data[1].carte1.carte1Couleur;
            let v2 = data[1].carte2.carte2Valeur;
            let c2 = data[1].carte2.carte2Couleur;
            this.carte1Gagnant = this.cartes[c1-1][v1-2];
            this.carte2Gagnant = this.cartes[c2-1][v2-2];

            

            clearTimeout(this.timerVar);
            document.getElementById("timer").classList.remove('time_limit');
            document.getElementById("timer").style.visibility = 'hidden';   

            document.getElementById("message_attente_spec").style.visibility = 'hidden';



            document.getElementById("message_gagnant").style.visibility = 'visible';

            setTimeout(()=>{
                document.getElementById("message_gagnant").style.visibility = 'hidden';
                
                this.spectateur = false;
                
                document.getElementById("message_rejouer").style.visibility = 'visible';

                clearTimeout(this.timerVar);
                document.getElementById("timer").classList.remove('time_limit');
                document.getElementById("timer").style.visibility = 'hidden';   

                this.retirerCartesPlateau();

                this.playerFolded = false;

                document.getElementById("carte_main_1").classList.remove('flip');
                document.getElementById("carte_main_2").classList.remove('flip');

                document.getElementById("bouton_role").classList.remove('active');

                // réinitialisation des variables pour le reset d'une partie
                this.gagnant = '';
                this.pouvoir_dispo = true;
                this.j1_image = j1_normal;
                this.j2_image = j2_normal;
                this.j3_image = j3_normal;
                this.j4_image = j4_normal;
                this.j5_image = j5_normal;
                this.flic_image = policier_normal;

            }, 3000);
        })

        this.socket.on("ActionJoueur",(data)=>{ // Réception de l'action du joueur pour afficher l'information sur l'interface
            this.derniereMise = data[1];
            this.deleteAnimActions();
            this.afficheActionJoueurs(data);
            this.afficherMessagesActions(data);
        
        })

        this.socket.on("NouveauJoueur",(data)=>{ // Lorsqu'un nouveau joueur rejoint la partie, l'information est affichée sur la fenêtre de gauche
            this.actions.push({joueurPseudo: data, type: " "+this.trad["joueur_join"]+"!", tour: false, nv_joueur: true});
            var lastLi = document.querySelector('#liste_actions_joueurs li:last-child');
	        if(lastLi){
                lastLi.scrollIntoView({behavior: "smooth"});
            }
        })

        this.socket.on("InfoNumTour",(data)=>{ // Lorsqu'un nouveau tour débute
            this.actions.push({joueurPseudo: "", type: "- "+this.trad["début_tour"]+data+"!", tour: true, nv_joueur: false});
            var lastLi = document.querySelector('#liste_actions_joueurs li:last-child');
	        if(lastLi){
                lastLi.scrollIntoView({behavior: "smooth"});
            }
        })

        this.socket.on("NouvelArrivantPendantTimer", (data)=>{
            console.log("Je suis arrivé pendant le timer !")
            this.timer_rejouer = data;
            document.getElementById("message_rejouer").style.visibility = 'visible';
            this.attente_partie = true;
            this.role_image = attente_role;
            this.role_attribue = false;
            this.actions =  [{joueurPseudo:'', type:''}];
            this.action =  {joueurPseudo:'', type:''};
        })

        this.socket.on("counter", (data)=>{
            console.log("COUNTER"+data);
            this.timer_rejouer = data;
            this.check_ready();
        })

        this.socket.on('NewMessage', (data)=>{ // Gestion du chat 
            var currentDate = new Date();
            var currentHour = currentDate.getHours();
            currentHour = ("0"+currentHour).slice(-2);
            var currentMinute = currentDate.getMinutes();
            currentMinute = ("0"+currentMinute).slice(-2);

            console.log("Current time :"+currentHour+":"+currentMinute);
            
            this.messages.push({time: "("+currentHour+":"+currentMinute+")  ", joueurPseudo: data[0]+":", msg: data[1]});
            var msgChat = document.getElementById("liste_chat");
            msgChat.scrollTop = msgChat.scrollHeight;
        })

        this.socket.on("QuitterPartie",()=>{
            this.$router.push({ name: 'accueil' });
        })


        /* ----- GESTION DES ROLES ----- */
        // INFILTRE
        this.socket.on("reponseVoyante", (data)=>{
            let c1 = data.carte1Couleur;
            let v1 = data.carte1Valeur;

            this.carte_voyante = this.cartes[c1-1][v1-2];

            document.getElementById("visu_carte_voyante").style.visibility = "visible";
            setTimeout(()=>{
                document.getElementById("visu_carte_voyante").style.visibility = "hidden";
            },3000)
        })


        //VOLEUR
        this.socket.on("MaJCartesVoleur", (data)=>{
            console.log(data);
            console.log(this.pseudo_vole);

            let v1 = data.carte1.carte1Valeur;
            let c1 = data.carte1.carte1Couleur;
            let v2 = data.carte2.carte2Valeur;
            let c2 = data.carte2.carte2Couleur;
            this.carte1MonJoueur = this.cartes[c1-1][v1-2];
            this.carte2MonJoueur = this.cartes[c2-1][v2-2];

        })

        // POLICIER
        this.socket.on("reponsePolicier", (data)=>{
            console.log("REPONSE POLICIER: "+data);
            if(this.dataTable.Joueur1.pseudo === data){
                this.j1_image = j1_prison;
            }
            else if(this.dataTable.Joueur2.pseudo === data){
                this.j2_image = j2_prison;
            }
            else if(this.dataTable.Joueur3.pseudo === data){
                this.j3_image = j3_prison;
            }
            else if(this.dataTable.Joueur4.pseudo === data){
                this.j4_image = j4_prison;
            }
            else if(this.dataTable.Joueur5.pseudo === data){
                this.j5_image = j5_prison;
            }
            else if(this.dataTable.MonJoueur.pseudo === data){ // pour afficher l'anim des menottes au joueur qui vient d'etre emprisonne
                switch(this.dataTable.MonJoueur.Role){
                    case 0:
                        this.role_image= voleur_prison;
                        break;
                    case 1:
                        this.role_image = escroc_prison; 
                        break;
                    case 2:
                        this.role_image = insolvable_prison ;
                        break;
                    case 3:
                        this.role_image = policier_prison;
                        break;
                    case 4:
                        this.role_image = usurpateur_prison;
                        break;
                    case 5:
                        this.role_image = indic_prison;
                        break;
                }
                var anim_role = document.getElementById("menottes");
                anim_role.classList.remove('anim');
                setTimeout(() => {
                    anim_role.classList.add('anim');
                }, 0);
                this.pouvoir_dispo = false;
                document.getElementById("bouton_role").classList.remove('active');
            }
        })

        // USURPATEUR
        this.socket.on("reponseUsurpateur",(data)=>{
            this.dataTable.MonJoueur.Role = data;
            switch(data){
                case 0:
                    this.role_image= voleur_normal;
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
                case 1:
                    this.role_image = escroc_normal; 
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
                case 2:
                    this.role_image = insolvable_normal;
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
                case 3:
                    this.role_image = policier_normal;
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
                case 4:
                    this.role_image = usurpateur_normal;
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
                case 5:
                    this.role_image = indic_normal;
                    document.getElementById("bouton_role").classList.add('active');
                    this.pouvoir_dispo = true;
                    break;
            }
        })

        // ESCROC
        this.socket.on("reponseEscroc",(data)=>{
            this.dataTable.MonJoueur.jetons = data;
        })

        // INSOLVABLE
        this.socket.on("reponseInsolvable",(data)=>{
            this.dataTable.MonJoueur.jetons+=data;
        })





    }


}

</script>

<style scoped>
a:link {
    text-decoration: none;
}

/* HAUT DE PAGE (déconnexion, bouton règles, ...) */

header {
    display: grid;
    grid-template-columns: repeat(3,33%);
    justify-content: center;
    width: 100%;
    height: 8vh;
}

header > div{
    width: 100%;
}

header > div:first-of-type{
    justify-self: start;
    align-self: center;
}

header > div:nth-of-type(2){
    justify-self: center;
    align-self: center;
    text-align: center;
}

header > div:nth-of-type(2) > span{
    font-size: 2vh;
    padding: 1vh;
    margin-top: 0.8vh;
    margin-bottom: 0.8vh;
    background-color: white;
    border: 0.6vh solid #00172C;
    border-radius: 7vh;
    width: 15%;
    height: 3vh;
    color: #00172C;
}

header > div:last-of-type{
    justify-self: end;
    align-self: center;
    text-align: end;
}

header img{
    height: 5vh;
    width: auto;
    cursor: pointer;
}


header div span:last-of-type {
    font-size: 2vh;
    margin-right: 1vw;
    cursor: pointer;
}


/* boite de dialogue pour quitter la partie */
#confirm {
    display: none;
    border-radius: 7vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #025891;
    text-align: center;
    height: 26vh;
    width: 30vw;
    border: 2vh solid red;
    box-shadow: -3vh 0vh 3vh #022F4C;
    font-size: 4vh;
    z-index: 12;
}

#confirm > p{
    padding-left: 1vh;
    padding-right: 1vh;
    color: white;
}

.boutons>button{
    color: red;
    /*position: relative;*/
    text-align: center;
    font-size: 4vh;
    border: 0.5vh solid #a9a9a9;
    border-radius: 3vh;
}

.boutons>button>a{
    color: red;
}

.boutons>button:first-of-type{
    margin-right: 1vh;
}
.boutons>button:last-of-type{
    margin-left: 1vh;
    cursor: pointer;
    color: #00172C;

}


/* VUE TABLE (plateau, joueurs, cartes communes */

/* timer */
#vue_table > #timer{
    visibility: hidden;
    font-size: 5vh;
    position: absolute;
    top: 13vh;
    right: 4vw;
    border: 0.5vh solid white;
    border-radius: 50vh;
    width: 5vw;
    text-align: center;
    padding: 2vh;
    padding-left: 4vh;
    padding-right: 4vh;
}
#vue_table > #timer.time_limit{
    border: 0.5vh solid  white;
    animation-name: time_limit;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}

@keyframes time_limit{
    50%{
        border-color: red;
    }
}



#vue_table {
    height: 65%;
    background-color: #00172C;
    background-image: url("../img/table.png");
    background-size: 80vh;
    background-repeat: no-repeat;
    background-position: center;
    border-top: 0.5vh solid white;
    border-bottom: 0.5vh solid white;
    display: flex;
    justify-content: center;
}

#vue_table > div:first-of-type {
    display: grid;
    grid-template-columns: repeat(3, 40vh);
    grid-template-rows: 20vh 15vh 15vh 10vh;
}

#vue_table div:first-of-type span{
    font-size: 2vh;
    place-self: start center;
    min-width: 6vw;
    border: 0.4vh solid white;
    background-color: #025891;
    border-radius: 2vh;
    text-align: center;
    padding: 0.6vh;
    max-height: 13vh;
}

#vue_table div:first-of-type span:nth-of-type(2){
    margin-top: -5.3vh;
    width: auto;
    min-width: 6vw;
    max-width: 18vw;
    max-height: 7vh;
    padding: 0.6vh;
}

#vue_table div:first-of-type span:nth-of-type(5){
    visibility: hidden;
}

#vue_table .joueurs > img {
    place-self: center;
    width: 18vh;
    height: auto;
    margin: 0.5vh;
    border-radius: 10vh;
}

#vue_table div:first-of-type img:nth-of-type(1), #vue_table div:first-of-type img:nth-of-type(3), #vue_table div:first-of-type img:nth-of-type(4), #vue_table div:first-of-type img:nth-of-type(5){
    place-self: end center;
}

#vue_table div:first-of-type img:nth-child(2) {
    margin-top: -4vh;
    margin-left: 1vw;
}

/* animation tour joueurs */

#vue_table > div:first-of-type img:nth-of-type(1).zoom, #vue_table > div:first-of-type img:nth-of-type(2).zoom, #vue_table > div:first-of-type img:nth-of-type(3).zoom, #vue_table > div:first-of-type img:nth-of-type(4).zoom, #vue_table > div:first-of-type img:nth-of-type(6).zoom{
    border-radius: 10vh;
    border: 0.8vh solid #eef7f9; 
    border: 0.5vh solid #eef7f9; 


    animation-name: tour_joueur;
    animation-duration: 2.4s;
    animation-iteration-count: infinite;
}

@keyframes tour_joueur {
    50%{
        transform: scale(0.93);
        border-color: #025891;
    }      
}


.sleep{
    filter: brightness(0.5);
}
.delete{
    visibility: hidden;
}


/* animations/ilustrations actions autres joueurs */


#actions_autres_joueurs > div > img{
    visibility: hidden;
    height: 6vh;
    width: auto;
    display: block;
}

/* anim/illustration actions j2 */
#actions_autres_joueurs > #j2_actions > img{
    position: absolute;
    top: 25vh;
    left: 70vh;
}
#actions_autres_joueurs > #j2_actions > span{
    visibility: hidden;
    position: absolute;
    top: 10vh;
    left: 56vh;
    font-size: 2vh;
    border-left: 0.7vh solid #025891;
    padding-left: 0.5vh;
}
#actions_autres_joueurs > #j2_actions > span.anim_action{
    visibility: visible;
    animation: fade 5s ease-in both;
}


/* anim/illustration actions j3 */
#actions_autres_joueurs > #j3_actions > img{
    position: absolute;
    top: 22vh;
    left: 97vh;
}
#actions_autres_joueurs > #j3_actions > span{
    visibility: hidden;
    position: absolute;
    top: 10vh;
    left: 82vh;
    font-size: 2vh;
    border-left: 0.7vh solid #025891;
    padding-left: 0.5vh;
}
#actions_autres_joueurs > #j3_actions > span.anim_action{
    visibility: visible;
    animation: fade 5s ease-in both;
}


/* anim/illustration actions j4 */
#actions_autres_joueurs > #j4_actions > img{
    position: absolute;
    top: 25vh;
    left: 122vh;
}
#actions_autres_joueurs > #j4_actions > span{
    visibility: hidden;
    position: absolute;
    top: 10vh;
    left: 136vh;
    font-size: 2vh;
    border-left: 0.7vh solid #025891;
    padding-left: 0.5vh;
}
#actions_autres_joueurs > #j4_actions > span.anim_action{
    visibility: visible;
    animation: fade 5s ease-in both;
}

/* anim/illustration actions j1 */
#actions_autres_joueurs > #j1_actions > img{
    position: absolute;
    top: 49vh;
    left: 70vh;
}
#actions_autres_joueurs > #j1_actions > span{
    visibility: hidden;
    position: absolute;
    top: 45vh;
    left: 41vh;
    font-size: 2vh;
    border-left: 0.7vh solid #025891;
    padding-left: 0.5vh;
}
#actions_autres_joueurs > #j1_actions > span.anim_action{
    visibility: visible;
    animation: fade 5s ease-in both;
}

/* anim/illustration actions j5 */
#actions_autres_joueurs > #j5_actions > img{
    position: absolute;
    top: 49vh;
    left: 122vh;
}
#actions_autres_joueurs > #j5_actions > span{
    visibility: hidden;
    position: absolute;
    top: 45vh;
    left: 150vh;
    font-size: 2vh;
    border-left: 0.7vh solid #025891;
    padding-left: 0.5vh;
}
#actions_autres_joueurs > #j5_actions > span.anim_action{
    visibility: visible;
    animation: fade 5s ease-in both;
}


#actions_autres_joueurs > div > img.anim_action{
    visibility: visible;
    animation: fade 4.5s ease-in both;
}







/* gestion affichage/animation cartes table */

.load-cards {
    padding: 1rem;
    cursor: pointer;
    position: absolute;
    top: 18vh;
    left: 5vw;
    background-color: white;
    color: black;
}


#vue_table .cartes{
    position: absolute;
    top: 32vh;
    /*height: 35vh;*/
    perspective: 1000px;
    display: flex;
    flex-direction: row;
}

#vue_table .cartes .carte_table{
    position: relative;
    transform-style: preserve-3d;
    transition: all 1.8s ease;
    margin: 0.3vw;

    transform: translateY(-125vh);
}

#vue_table .cartes .carte_table:nth-child(1).animated {
    transition-delay: 0s;
}

#vue_table .cartes .carte_table:nth-child(2).animated {
    transition-delay: 0.15s;
}

#vue_table .cartes .carte_table:nth-child(3).animated {
    transition-delay: 0.3s;
}

#vue_table .cartes .carte_table:nth-child(4).animated {
    transition-delay: 0.45s;
}
#vue_table .cartes .carte_table:nth-child(5).animated {
    transition-delay: 0.6s;
}


#vue_table .cartes .carte_table:nth-child(1).animated.flip {
    transition-delay: 0s; /* gestion temps transition flip */
}
#vue_table .cartes .carte_table:nth-child(2).animated.flip {
    transition-delay: 0s; /* gestion temps transition flip */
}
#vue_table .cartes .carte_table:nth-child(3).animated.flip {
    transition-delay: 0s; /* gestion temps transition flip */
}
#vue_table .cartes .carte_table:nth-child(4).animated.flip {
    transition-delay: 0s; /* gestion temps transition flip */
}

#vue_table .cartes .carte_table:nth-child(5).animated.flip {
    transition-delay: 0s; /* gestion temps transition flip */
}


#vue_table .cartes .carte_table.animated { /* animation affichage des cartes sur le plateau */
    transform: translateY(0); 
    transition: transform 1.5s;
}


#vue_table .cartes .carte_table.flip{ /* animation retournement des cartes sur le plateau */
    transform: rotateY(180deg);
}

#vue_table .cartes .carte_table .carte_recto{
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    transform: rotateY(180deg);
}

#vue_table .cartes .carte_table .carte_verso{
    backface-visibility: hidden;
}

#vue_table .cartes .carte_table img{
    width: 10vh;
    height: auto;
}

#vue_table .cartes .carte_table .carte_recto img{
    border-radius: 0.8vh;
}



/* VUE JOUEUR (role,actions,jetons */

#vue_joueur {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

#vue_joueur #cartes_main{
    position: relative;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 33vw;
}

#vue_joueur #cartes_main #carte_main_1, #vue_joueur #cartes_main #carte_main_2{
    transform-style: preserve-3d;
    transition: all 1.8s ease;
}

#main_verso_1, #main_verso_2{
    backface-visibility: hidden;
}

#main_recto_1, #main_recto_2{
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    transform: rotateY(180deg);
}

#vue_joueur #cartes_main #carte_main_1.flip, #vue_joueur #cartes_main #carte_main_2.flip{
    transform: rotateY(180deg); 
}


#vue_joueur #cartes_main img{
    height: 25vh;
    width: auto;
    margin-left: 2vh;
    margin-right: 2vh;
    margin-top: 1.4vh;
    margin-bottom: 1.4vh;
    border-radius: 0.5vh;
}

#vue_joueur #infos_joueur {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#vue_joueur #infos_joueur > img:first-of-type {
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
    border: 0.7vh solid #00172C;
    margin-top: -14vh;
}

#vue_joueur #infos_joueur > img:first-of-type.img_joueur{
    /*border-color: #025891;*/
    border-color: white;
    border-bottom: 0.7vh white;
    z-index: 1;

    animation: hl_joueur;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
}


@keyframes hl_joueur {
    50%{
        transform: scale(1.07);
        /*border-color: white;*/
    }       
}


#vue_joueur #infos_joueur img:nth-of-type(2){
    margin-top: -3vh;
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    border-bottom: 0.4vh solid white;
    border-left: 0.2vh solid white;
    border-right: 0.2vh solid white;
    z-index: 8;
    /*pointer-events: none;*/
}

#vue_joueur #infos_joueur #bouton_role{
    filter: brightness(0.3);
    border: none;
    pointer-events: none;
}

#vue_joueur #infos_joueur #bouton_role.active{
    filter: brightness(1);
    pointer-events: auto;

    animation: role_bouton_flash; 
    animation-duration: 1.8s;
    animation-iteration-count: infinite; 
}

@keyframes role_bouton_flash {
   
    50%{
        transform: scale(1.2);

    }
    
}

#vue_joueur #infos_joueur #bouton_role.active:hover{
    animation: none;
    transform: scale(1.3);
    cursor: pointer;
}


#vue_joueur #infos_joueur h3 {
    margin: 0;
    margin-top: 1vh;
    font-size: 4vh;
}

#vue_joueur #infos_joueur span {
    display: block;
    margin-top: 0.5vh;
    font-size: 3vh;
    background-color: #00172C;
    padding: 1vh;
    border: 0.5vh solid white;
    border-radius: 7vh;
    min-width: 15vw;
    max-width: 25vw;
    color: white;

}

.unclickable{
    cursor: not-allowed;
    transform: scale(1);
    filter: brightness(0.5);
    pointer-events: none;
}

#action_check.unclickable_pcq_mise{
    cursor: not-allowed;
    transform: scale(1);
    filter: brightness(0.5);
    pointer-events: none;
}

#augmenter.unclickable, #diminuer.unclickable{
    /**cursor: not-allowed;*/
    filter: brightness(1);
}

#vue_joueur #actions img {
    height: 10vh;
    border-radius: 50%;
    border: 0.4vh solid white;
}

#vue_joueur #actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2vh;
}

#vue_joueur #actions > div:first-of-type > div:first-of-type, #vue_joueur #actions > div:nth-of-type(2), #vue_joueur #actions > div:nth-of-type(3){
    padding-top: 1.2vh;
}

#vue_joueur #actions #action_miser:hover, #vue_joueur #actions #action_coucher:hover, #vue_joueur #actions #action_check:hover{
    transform: scale(0.9);
    cursor: pointer;
    border-radius: 45%;
    background-color: #024978;
}
#vue_joueur #actions #action_miser:hover.unclickable, #vue_joueur #actions #action_coucher:hover.unclickable, #vue_joueur #actions #action_check:hover.unclickable{
    transform: scale(1);
    cursor: not-allowed;
    filter: brightness(0.5);
    background-color: transparent;
}


#vue_joueur #actions div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 11vw;
}

#vue_joueur #actions #action_coucher, #vue_joueur #actions #action_check{
    height: 16vh;
}


#vue_joueur #actions div #jetons_input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #00172C;
    border-radius: 3vh;
    padding-left: 1vw;
    padding-right: 2vw;
    /*margin-top: 2vh;*/
}

#vue_joueur #actions div span {
    font-size: 3vh;
    margin-top: 0.4vh;
    margin-bottom: 0.4vh;
}

#vue_joueur #actions div #jetons_input span {
    margin: 0;
    font-size: 3vh;
}

#vue_joueur #actions input {
    position: relative;
    z-index: 1;
    width: 6vw;
    padding-right: 1vh;
    background-color: #00172C;
    outline: none;
    border: none;
    font-size: 2.5vh;
    text-align: center;
}


#vue_joueur #actions input::placeholder {
    color: white;
    opacity: 1;
}

#vue_joueur #actions > div:first-of-type > div:nth-of-type(2).unclickable{
    filter: brightness(1);
}

#vue_joueur #actions > div:first-of-type > div:nth-of-type(3){
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span{
    font-size: 2.5vh;
    cursor: pointer;
}
#vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span:hover{
    transform: scale(0.92);
    cursor: pointer;   
}

#vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span:nth-of-type(2):hover.unclickable, #vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span:nth-of-type(3):hover.unclickable{
    transform: scale(1);
    cursor: not-allowed;   
    filter: brightness(0.5);
}

#vue_joueur #actions > div:first-of-type > div:nth-of-type(3){
    width: 13vw;
}


#vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span:nth-of-type(2){
    margin-right: 1vh;
    border-radius: 0vh;
    border-right: 0.4vh solid white;
    border-left: 0.4vh solid white;
    padding-right: 1vh;
    padding-left: 1vh;
}
#vue_joueur #actions > div:first-of-type > div:nth-of-type(3) > span:nth-of-type(3){
    margin-left: 0vh;
    padding-left: 0vh;
    padding-right: 1vh;
    border-right: 0.4vh solid white;
}

#diminuer{
    background-color: #ccc;
    border-radius: 100%;
    padding: 1vh;
    cursor: pointer;
    margin-right: 0.5vh;
    margin-bottom: 0;
    margin-top: 0.3vh;
}

#augmenter{
    background-color: #ccc;
    border-radius: 100%;
    padding: 1vh;
    cursor: pointer;
    margin-left: 0.5vh;
    margin-bottom: 0;
    margin-top: 0.3vh;
}



#vue_joueur #actions > div:first-of-type #tooltip_mise_manquante{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_negative{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_jetons_manquants{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_mini{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_blind{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_zero{
    visibility: hidden;
    width: 15vw;
    background-color: white;
    position: absolute;
    right: 40vh; 
    top: 64vh;
    border: 0.5vh solid red;
    box-shadow: -1.2vh 0vh 1.2vh red;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_manquante span {
    color: red;
    text-align: center;
    font-size: 2.4vh;
    padding: 0.3vh;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_negative span {
    color: red;
    text-align: center;
    font-size: 2.4vh;
    padding: 0.3vh;
}

#vue_joueur #actions > div:first-of-type #tooltip_jetons_manquants span {
    color: red;
    text-align: center;
    font-size: 2.4vh;
    padding: 0.3vh;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_mini span {
    color: red;
    text-align: center;
    font-size: 2.4vh;
    padding: 0.3vh;
}

#vue_joueur #actions > div:first-of-type #tooltip_mise_blind span {
    color: red;
    text-align: center;
    font-size: 2.4vh;
    padding: 0.3vh;
}







/* Gestion animations actions de jeu */
#illust_miser{
    display: none;
    height: 13vh;
    width: auto;
    position: absolute;
    right: 55vh; 
    top: 74vh;
}

#illust_coucher{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#illust_check{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0;
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#illust_miser.anim{
    display: block;
    animation: fade_miser 1.7s ease-in both;
}

#illust_coucher.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}

#illust_check.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}

@keyframes fade_miser{
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
        transform: translate(-40vh, -50vh) rotate(360deg);
        display: none;
    }
}

@keyframes fade{
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
        display: none;
    }
}

/* animation pour checker */
@keyframes zoom {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.2);
    }
}
.zoom {
    animation: zoom 1s;
}

/* quand le joueur se couche */
.folded{
    /* filter : brightness(0.5); */
    animation-name: anim_coucher;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

@keyframes anim_coucher{
    from{
        filter : brightness(1);
    }
    to{
        filter : brightness(0.3);
    }
}


/* Affichage de l'oeil de la voyante */
#oeil_voyante{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#oeil_voyante.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}

/* Affichage des pièces de l'insolvable */
#piece_insolvable{
    display: none;
    height: 20vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 58vh;
    margin-left: auto; 
    margin-right: auto;
    border-radius: 50%;
}

#piece_insolvable.anim{
    display: block;
    animation: fade_insovable 3.5s ease-in both;
}

@keyframes fade_insovable{
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
        display: none;
    }
}
#argent_escroc{
    display: none;
    height: 20vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 58vh;
    margin-left: auto; 
    margin-right: auto;
    border-radius: 50%;
}
#argent_escroc.anim{
    display: block;
    animation: fade_insovable 3.5s ease-in both;
}
#oeil_voleur{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#oeil_voleur.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}

#menottes{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#menottes.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}


#usurp_anim{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#usurp_anim.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}


#au_voleur{
    display: none;
    height: 16vh;
    width: auto;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 43vh;
    margin-left: auto; 
    margin-right: auto;
}

#au_voleur.anim{
    display: block;
    animation: fade 2.5s ease-in both;
}




/* Affichage liste joueurs pour rôles action rôles voyante/voleur/usurpateur/policier */
#liste_joueurs{
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 80vw;
    height: 50vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 6;
}

#liste_joueurs h4{
    text-align: end;
    margin-left: auto;
    margin-bottom: 0;
    padding-right: 4vw;
    cursor: pointer;
    color: red;
}

#liste_joueurs h3{
    font-size: 4vh;
    color: #00172C;
    display: none;
}

#liste_joueurs > div:first-of-type{
    display: flex;
    flex-direction: row;
}

#liste_joueurs > div > div{
    display: flex;
    flex-direction: column;
    margin-left: 3vh;
    margin-right: 3vh;
    padding: 1vh;
}

#liste_joueurs > div > div:hover{
    border-radius: 10%;
    border: 0.3vh solid #025891;
    transform: scale(1.03);
    cursor: pointer;
}

#liste_joueurs div img{
    width: 18vh;
    height: 18vh;
}

#liste_joueurs div span{
    font-size: 2vh;
    min-width: 6vw;
    border: 0.4vh solid white;
    background-color: #025891;
    border-radius: 2vh;
    text-align: center;
    padding: 0.6vh;
    max-height: 13vh;
}

/** Choix carte swap voleur */
#choix_carte_voleur{
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 80vw;
    height: 45vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 6;
}

#choix_carte_voleur h4{
    text-align: end;
    margin-left: auto;
    margin-bottom: 0;
    padding-right: 4vw;
    cursor: pointer;
    color: red;
}

#choix_carte_voleur h3{
    font-size: 4vh;
    color: #00172C;
    display: block;
    margin-top: 0;
}

#choix_carte_voleur > div{
    display: flex;
    flex-direction: row;
}

#choix_carte_voleur > div > img{
    height: 25vh;
    width: auto;
    margin-left: 2vh;
    margin-right: 2vh;
    border-radius: 0.5vh;
}

#choix_carte_voleur > div > img:hover{
    cursor: pointer;
}

/** Visu carte voyante */
#visu_carte_voyante{
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 50vw;
    height: 50vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 6;
}

#visu_carte_voyante h3{
    font-size: 4vh;
    color: #00172C;
}

#visu_carte_voyante img{
    height: 25vh;
}

/** Affichage action insolvable */
#action_insolvable{
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 70vw;
    height: 50vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 6;
}

#action_insolvable h4{
    text-align: end;
    margin-left: auto;
    margin-bottom: 0;
    padding-right: 4vw;
    cursor: pointer;
    color: red;
}

#action_insolvable h3{
    font-size: 3vh;
    color: #00172C;
    margin-top: 2vh;
}

#action_insolvable > div:first-of-type{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#action_insolvable > div > div:first-of-type{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 3vw;
}

#action_insolvable > div > div:first-of-type:hover{
    cursor: pointer;
    transform: scale(1.02);
}

#action_insolvable > div > div:first-of-type img{
    height: 22vh;
    width: auto;
}

#action_insolvable > div > div:first-of-type span{
    font-size: 3vh;
    color: #00172C;
    margin-top: 1.5vh;
}

#action_insolvable > div > div:last-of-type{
    margin-left: 3vw;
}

#action_insolvable > div > div:last-of-type:hover{
    cursor: pointer;
    transform: scale(1.02);
}

#action_insolvable > div > div:last-of-type span{
    font-size: 3vh;
    color: red;
}

/** Affichage confirmation escroc */
#confirmation_escroc{
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 55vw;
    height: 42vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 6;
}

#confirmation_escroc h4{
    text-align: end;
    margin-left: auto;
    margin-bottom: 0;
    padding-right: 4vw;
    cursor: pointer;
    color: red;
}

#confirmation_escroc h3{
    font-size: 3vh;
    color: #00172C;
    margin: 2vh;
}

#confirmation_escroc > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#confirmation_escroc > div span:first-of-type{
    color: green;
    font-size: 3vh;
    margin: 2vh
}

#confirmation_escroc > div span:last-of-type{
    color: red;
    font-size: 3vh;
    margin: 2vh;
}

#confirmation_escroc > div span:first-of-type:hover{
    cursor: pointer;
    transform: scale(1.02);
}

#confirmation_escroc > div span:last-of-type:hover{
    cursor: pointer;
    transform: scale(1.02);
}



/*gagnant*/
#message_gagnant {
    visibility: hidden;
    background-color: #eee;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 8vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 65vw;
    height: 80vh;
    opacity: 0.99;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 9;
}
#message_gagnant  span{
    font-size: 5vh;
    font-weight: bold;
    text-align: center;
    color: #00172C;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

#message_gagnant > img:first-of-type{
    height: 30vh;
    margin-top: 0vh;
}

#message_gagnant div img{
    height: 25vh;
    margin-top: 1vh;
    margin-left: 0.5vh;
    margin-right: 0.5vh;
    border-radius: 0.5vh;
}

/* Affichage message rejouer */
#message_rejouer {
    visibility: hidden;
    background-color: white;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 15vh;
    border-radius: 8vh;
    border: 0.5vh solid #00172C;
    box-shadow: -1.2vh 0vh 1.2vh #00172C;
    width: 60vw;
    height: 63vh;
    opacity: 0.95;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 9;
}

#message_rejouer  span{
    font-size: 5vh;
    font-weight: bold;
    text-align: center;
    color: #00172C;
}

#message_rejouer img{
    height: 30vh;
    margin-top: 4vh;
}

#message_rejouer button{
    color: white;
    background-color: #00172C;
    text-align: center;
    margin-top: 2vh;
    width: 7vw;
    font-size: 4vh;
    border-radius: 20vh;
    border: none;
    margin-bottom: 2vh;
}

#message_rejouer button:hover{
    cursor: pointer;
    transform: scale(1.04);
}

/* Affichage message attente de joueurs */
#message_attente_debut{
    visibility: visible;
    position: absolute;
    top: 17vh;
    left: 3vw;
    width: 20vw;
    height: 6vh;
    border: 0.5vh solid #025891;
    border-radius: 20vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_attente_debut.delete{
    visibility: hidden;
}

#message_attente_debut > span{
    color: #00172C;
    display: inline-block;
    font-size: 2.5vh;
    clip-path: inset(0 1.5ch 0 0);
    animation: loading 1.3s steps(4) infinite;
}


@keyframes loading {
    to{
        clip-path: inset(0 -0.5ch 0 0);
    }   
}

/* Message attente lors du reset (après avoir cliqué 'pret') */
#message_attente_reset{
    visibility: hidden;
    position: absolute;
    top: 17vh;
    left: 3vw;
    width: 20vw;
    height: 6vh;
    border: 0.5vh solid #025891;
    border-radius: 20vh;
    background-color: white; /* #eef7f9 */
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_attente_reset > span{
    color: #00172C;
    font-size: 2.5vh;
}

/* Message info lorsque mode spectateur */
#message_attente_spec{
    visibility: hidden;
    position: absolute;
    top: 17vh;
    left: 3vw;
    width: 26vw;
    height: 9vh;
    border: 0.5vh solid #025891;
    border-radius: 20vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_attente_spec > span{
    color: #00172C;
    font-size: 2.5vh;
    text-align: center;
}

#message_attente_spec.affiche{
    visibility: visible;
}

/* Message d'attente pour spectateur si plus de 6 joueurs */
#message_attente_spec_six{
    position: absolute;
    top: 14vh;
    left: 2vw;
    width: 23vw;
    height: 12vh;
    border: 0.5vh solid #025891;
    border-radius: 20vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_attente_spec_six > span{
    color: #00172C;
    font-size: 2.5vh;
    text-align: center;
}

/* Messages d'information des actions des joueurs*/
#message_action_mise{
    visibility: hidden;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 7vh;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_action_mise > span{
    color: #f7e282;
    font-weight: bold;
    font-size: 3vh;
}


#message_action_check{
    visibility: hidden;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 7vh;
    border-radius: 20vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_action_check > span{
    color: #f7e282;
    font-weight: bold;
    font-size: 3vh;
    padding-left: 1vw;
}

#message_action_coucher{
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 7vh;
    border-radius: 20vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

#message_action_coucher > span{
    color: #f7e282;
    font-weight: bold;
    font-size: 3vh;
    padding-left: 1vw;
}

/* Affichage fenêtre d'événements */
#liste_actions_joueurs{
    position: absolute;
    top: 29vh;
    left: 3vw;
    width: 17vw;
    height: 27vh;
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 3vh;
    border: 0.5vh solid white;
    background-color: #00172C; /* #002446 */
    list-style-type: none;
    padding: 0;
}

#liste_actions_joueurs li{
    font-size: 2vh;
    color: white;
    margin-left: 1vw;
    margin-right: 1vw;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
}

#liste_actions_joueurs li.nouveau_tour{
    color: #cc99cc;
}

#liste_actions_joueurs li.nouveau_joueur{
    color: 	#f7e282;
}

/* Affichage fenêtre de tuto et de chat */
#fenetre_chat_tuto{
    position: absolute;
    top: 29vh;
    right: 3vw;
    width: 17vw;
    height: 29vh;
    border-radius: 3vh;
    border: 0.5vh solid white;
    background-color: #00172C; /* #002446 */
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style-type: none;
}

#fenetre_chat_tuto #icons_chat_tuto{
    display: flex;
    flex-direction: row;
    height: 5vh;
    border-bottom: white 0.4vh solid;
}


#fenetre_chat_tuto #icons_chat_tuto > img{
    width: 3vh;
    height: 3vh;
    margin-left: 1vh;
    margin-right: 1vh;
    place-self: center;
    display: block;
}

#fenetre_chat_tuto #icons_chat_tuto > img:hover{
    cursor: pointer;
}

#fenetre_chat_tuto #settings{
    height: 24vh;
    width: 100%;
    margin-top: 5vh;
    margin-left: 1.2vh;
    position: absolute;
    align-self: start;
    visibility: hidden;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}

#fenetre_chat_tuto #settings span{
    font-size: 2vh;
    margin-bottom: 1.5vh;
    margin-top: 2vh;
}

#fenetre_chat_tuto #settings #settings_music{
    display: flex;
    flex-direction: column;
}

#fenetre_chat_tuto #settings #settings_music > div{
    display: flex;
    flex-direction: row;
}

#fenetre_chat_tuto #settings #settings_music input{
    margin: 0.5vh;
}
#fenetre_chat_tuto #settings #settings_music label{
    margin: 0.5vh;
}


#fenetre_chat_tuto #settings #settings_music output{
    margin: 0.5vh;
}

#fenetre_chat_tuto #settings #settings_langue{
    display: flex;
    flex-direction: column;
}

#fenetre_chat_tuto #settings #settings_langue > div{
    display: flex;
    flex-direction: row;
    margin-bottom: 1.3vh;
    margin: 0.5vh;
}

#fenetre_chat_tuto #settings #settings_langue > div > span{
    font-size: 1.9vh;
    color: white;
    place-self: center;
}

#fenetre_chat_tuto #settings #settings_langue > div > img{
    width: 4vh;
    height: 4vh;
    margin-left: 1vh;
    margin-right: 1vh;
    border-radius: 8vh;
    place-self: center;
}

#fenetre_chat_tuto #settings #settings_langue > div:hover{
    cursor: pointer;
}




#fenetre_chat_tuto #tuto{
    height: 24vh;
    margin-top: 5vh;
    width: 100%;
    position: absolute;
    align-self: start;
    visibility: hidden;
    overflow: hidden;
    overflow-y: scroll;
}

#fenetre_chat_tuto #tuto ul{
    padding: 0;
    margin-bottom: 0;
}

#fenetre_chat_tuto #tuto li{
    font-size: 1.9vh;
    list-style-type: none;
    margin-left: 1.2vh;
    margin-bottom: 0.4vh;
}

#fenetre_chat_tuto #chat{
    height: 24vh;
    margin-top: 5vh;
    width: 100%;
    position: absolute;
    align-self: start;
    visibility: visible;
}

mark{
    background-color: transparent;
    color: #f7e282;
}

#fenetre_chat_tuto #chat p{
    font-size: 1.5vh;
    color: #ccc;
    font-style: italic;
    margin-left: 1.2vh;
}

#fenetre_chat_tuto #chat ul{
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    height: 9.5vh;
    padding-bottom: 5vh;
    overflow-y: scroll;
}

#fenetre_chat_tuto #chat ul span{
    font-size: 1.7vh;
    color: #ccc;
    font-style: italic;
}

#fenetre_chat_tuto #chat li{
    list-style-type: none;
    font-size: 2vh;
    padding: 0;
    margin-left: 1.2vh;
    margin-bottom: 0.4vh;
    padding-bottom: 0.5vh;
}



#fenetre_chat_tuto #chat > div{
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    height: 4vh;
    background-color: transparent;
    border-top: 0.4vh solid white;
    width: 100%;
}


#fenetre_chat_tuto #chat input{
    background-color: transparent;
    color: white;
    border: none;
    font-size: 2vh;
    margin-left: 1vh;
    width: 13.5vw;
}

#fenetre_chat_tuto #chat > div > img{
    width: 3vh;
    height: 3vh;
    margin-left: 1vh;
    margin-right: 1vh;
    place-self: center;
}

#fenetre_chat_tuto #chat > div > img:hover{
    cursor: pointer;
}

/* Affichage du pouvoir du rôle au survol de la souris */
#infos_roles{
    visibility: hidden;
    position: absolute;
    left: 0; 
    right: 0; 
    top: 40vh;
    margin-left: auto; 
    margin-right: auto;
    width: 20vw;
    height: 24vh;
    background-color: white;
    opacity: 0.95;
    border-radius: 4vh;
    border: 0.4vh solid #F85B1A;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;

    /**overflow: hidden;
    overflow-y: scroll;*/

}

#infos_roles span{
    color: #F85B1A;
    place-self: start;
    margin-left: 2vh;
}


#infos_roles p{
    color: #00172C;
    margin: 2vh;
    margin-bottom: 0.6vh;
    margin-top: 0.4vh;
}

#infos_roles p:last-of-type{
    color: #F85B1A;
    margin-top: 0.6vh;
}

/*AFFICHAGE REGLES DU JEU */

#regles_jeu {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 3%;
    background-color: white;
    opacity: 0.95;
    border-radius: 4vh;
    padding: 2vh;
    width: 95vw;
    height: 91vh;
    overflow: scroll;
    overflow-x: hidden;
    visibility: hidden;
    z-index: 10;
}

#regles_jeu h3:first-child {
    position: sticky;
    top: 5vh;
    text-align: end;
    margin-bottom: 0;
    padding-right: 1vw;
    cursor: pointer;
    color: red;
}

#regles_jeu h2:first-of-type {
    margin-top: 0px;
}

#regles_jeu h4,
#regles_jeu h3,
#regles_jeu h2,
#regles_jeu p,
#regles_jeu li {
    color: #00172C;
}

#regles_jeu img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 0.7vh solid #022F4C;
}

#regles_jeu #mains img{
    height: 110px;
    width: auto;
    border-radius: 0%;
    border: none;
}

#regles_jeu #mains p{
    margin-top: 7px;
}

#regles_jeu #mains p:first-of-type{
    text-indent: 0;
}



/* Suppression flèches input par défaut */
#vue_joueur #actions input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

#vue_joueur #actions input {
    -moz-appearance: textfield;
}

#liste_actions_joueurs, #fenetre_chat_tuto #chat ul,  #fenetre_chat_tuto #tuto, #fenetre_chat_tuto #settings{
    -ms-overflow-style: none;  
    scrollbar-width: none; 
}
#liste_actions_joueurs::-webkit-scrollbar, #fenetre_chat_tuto #chat ul::-webkit-scrollbar, #fenetre_chat_tuto #tuto::-webkit-scrollbar, #fenetre_chat_tuto #settings::-webkit-scrollbar{ 
    display: none; 
}

</style>
