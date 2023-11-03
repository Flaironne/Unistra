/** \file jeu.c
 *\code contenant l'évolution du jeu(header)
 */

#ifndef __JEU_H
#define __JEU_H

#include "grille.h"
/** modulo modifié pour traiter correctement les bords i=0 et j=0
*\ dans le calcul des voisins avec bords cycliques
*\l'argument i pour le dividende
*\l'argument m pour le diviseur
*\et exeption sur les bords 
*/
static inline int modulo(int i, int m) {return (i+m)%m;}

/** compte le nombre de voisins vivants de la cellule (i,j)
*\ les bords sont cycliques
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
int compte_voisins_cyclique (int i, int j, grille g);

/** compte le nombre de voisins vivants de la cellule (i,j)
*\ les bords sont cycliques
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
int compte_voisins_non_cyclique (int i, int j, grille g);

/** fait évoluer la grille g d'un pas de temps
*\l'argument *g pour le pointeur de la grille du jeu
*\l'argument *gc pour avoir une grille tampon pour les évolutions
*/
void evolue (grille *g, grille *gc);

#endif

extern int (*compte_voisins_vivants)(int,int,grille);
