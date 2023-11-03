import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccueilView from '../views/AccueilView.vue'
import ReglesView from '../views/ReglesView.vue'
import ClassementView from '../views/ClassementView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import ConnexionView from '../views/ConnexionView.vue'
import JeuView from '../views/JeuView.vue'
import LobbyView from '../views/LobbyView.vue'
import ContactView from '../views/ContactView.vue'
import CreditsView from '../views/CreditsView.vue'
import ProfileView from '../views/ProfileView.vue'
import MdpView from '../views/MdpView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/regles',
      name: 'regles',
      component: ReglesView
    },
    {
      path: '/classement',
      name: 'classement',
      component: ClassementView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: InscriptionView
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView
    },
    {
      path: '/jeu',
      name: 'jeu',
      component: JeuView
    },

    {
      path:'/lobby',
      name: 'lobby',
      component: LobbyView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/mdp',
      name: 'mdp',
      component: MdpView
    },


    {
      path:'/contact',
      name:'contact',
      component: ContactView
    },

    {
      path:'/credits',
      name:'credits',
      component: CreditsView
    }
  ]
})

export default router