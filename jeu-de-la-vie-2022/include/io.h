/** \file io.c
 * \code contenant les entrées et sorties; input/output(header)
 */
#ifndef __IO_H
#define __IO_H

#include <stdio.h>
#include "grille.h"
#include "jeu.h"


/**affichage d'un trait horizontal
*\l'argument c pour le nb de colonnes
*/
void affiche_trait (int c);

/** affichage d'une ligne de la grille
*\l'argument c pour le nb de colonnes
*\l'argument *ligne pour le pointeur d'une ligne dans la grille
*/
void affiche_ligne (int c, int* ligne);

/** affichage d'une grille
*\l'argument g pour la grille à afficher
*/
void affiche_grille (grille g);

/** effacement d'une grille
*\l'argument g pour la grille à effacer
*/
void efface_grille (grille g);

/** debute le jeu
*\lance le jeu de la vie
*\l'argument *g pour le pointeur de la grille du jeu
*\l'argument *gc pour avoir une grille tampon pour les évolutions
*/
void debut_jeu(grille *g, grille *gc);

extern void vieillisement;
extern int (*compte_voisins_vivants)(int,int,grille);


#endif
