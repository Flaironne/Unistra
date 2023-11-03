#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define LG_MAX 64
#define bool int
#define true 1
#define false 0

typedef unsigned int ident;
typedef unsigned int Nat;

typedef struct s_date{ unsigned short jour, mois, annee; } date;

typedef unsigned int ident;

typedef struct s_individu 
{
    char nom[LG_MAX];
    date naissance, deces;
    ident pere, mere, cadet, faine;
} Individu;

typedef struct s_genealogie 
{
    Individu *tab; // tableau alloué dynamiquement
    Nat id_cur; // identifiant actuel
    Nat taille_max_tab; // taille max du tableau
} Genealogie;

//Fonctions

//Constructeur de base de généalogie
void genealogieInit(Genealogie *g);

//Destructeur de généalogie (libération de mémoire)
void genealogieFree(Genealogie *g);

//Permet d'ajouter un individu à l'arbre généalogique
ident adj(Genealogie *g, char *s, ident p, ident m, date n, date d);
//Fonction auxiliaire qui permet de mettre à jour les champs faine et cadet d'un individu
void initChainageCadet(Genealogie *g, ident parent, ident x);

//Compare les dates de deux individus et retourne 1 si x est le plus vieux, 0 si y est le plus vieux et 2 si ils sont nés le même jour
int compDate(date x, date y);

//Permet de retourner un individu à l'aide de son identifiant
Individu *get(Genealogie *g, ident x);

//Permet de tester si deux individus sont frères ou soeurs
bool freres_soeurs(Genealogie *g, ident x, ident y);

//Permet de tester si deux individus sont cousins
bool cousins(Genealogie *g, ident x, ident y);

//Teste si y est le fils ou la fille de x
bool fils(Genealogie *g, ident x, ident y);

//Affiche tous les frères et soeurs d'un individu
void affiche_freres_soeurs(Genealogie *g, ident x);

//Affiche tous les enfant d'un individu
void affiche_enfants(Genealogie *g, ident x);

//Affiche tous les cousins d'un individu
void affiche_cousins(Genealogie *g, ident x);

//Affiche toutes les tantes/oncles d'un individu
void affiche_oncles(Genealogie *g, ident x);

//Fonction qui permet d'afficher les parents d'un individu
void affiche_parents(Genealogie *g, ident x);

//Permet de tester si x est un ancêtre de y
bool ancetre(Genealogie *g, ident x, ident y);

//Permet de tester si deux individus ont un ancêtre commun
bool ancetreCommun(Genealogie *g, ident x, ident y);

//Permet de récupérer l'ancêtre le plus ancien d'un individu
ident plus_ancien(Genealogie *g, ident x);

//Affiche toute la parenté d'un individu
void affiche_parente(Genealogie *g, ident x);
//Fonction auxiliaire
void affiche_parent_aux(Genealogie *g, ident y, unsigned int x);

//Affiche toute la descendance d'un individu
void affiche_descendance(Genealogie *g, ident x);
//Fonction auxiliaire
void affiche_descendance_aux(Genealogie *g, ident x, unsigned int num);

//Permet de fusionner deux arbres généalogiques
void genealogieFusion(Genealogie *gres, Genealogie *a1, Genealogie *a2);