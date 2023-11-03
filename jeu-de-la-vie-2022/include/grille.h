/** \file grille.c
	* \code contenant le fonctionnement de la grille(header)
	*/


#ifndef __GRILLE_H
#define __GRILLE_H

#include <stdlib.h>
#include <stdio.h>
#include <assert.h>

/**structure grille : 
*\nombre de lignes, 
*\nombre de colonnes, 
*\tableau de tableau de cellules
*/
typedef struct {int nbl; int nbc; int** cellules;} grille;
 
/**alloue une grille de taille l*c
*\initialise toutes les cellules à mortes
*\l'argument l pour le nb de lignes
*\l'argument c pour le nb de colonnes
*\l'argument *g pour le pointeur de grille
*/
void alloue_grille (int l, int c, grille* g);

/** libère une grille
*\l'argument *g pour le pointeur de grille
*/
void libere_grille (grille* g);

/**alloue et initalise la grille g à partir d'un fichier
*\l'argument *filename pour le pointeur vers un nom de fichier
*\l'argument *g pour le pointeur de grille
*/
void init_grille_from_file (char * filename, grille* g);

/** rend vivante la cellule (i,j) de la grille g
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
static inline void set_vivante(int i, int j, grille g){g.cellules[i][j] = 1;}

/**rend morte la cellule (i,j) de la grille g
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
static inline void set_morte(int i, int j, grille g){g.cellules[i][j] = 0;}

/** teste si la cellule (i,j) de la grille g est vivante
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
static inline int est_vivante(int i, int j, grille g){return g.cellules[i][j] > 0;}

/** la cellule vieillit
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
void set_vieillit(int i, int j, grille g);

/** la cellule ne vieillit plus
*\l'argument i pour l'indice ligne dans la grille
*\l'argument j pour l'indice colonne dans la grille
*\l'argument g pour la grille
*/
void set_ne_vieillit_pas(int i, int j, grille g);
/** recopie gs dans gd (sans allocation)
*\l'argument gs pour la grille source
*\l'argument gd pour la grille de destination
*/

static inline void set_nonviable(int i, int j, grille g){g.cellules[i][j] = -1;}

static inline int est_viable(int i, int j, grille g){return g.cellules[i][j] >= 0;}

void copie_grille (grille gs, grille gd);

#endif
