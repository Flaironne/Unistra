/** \file jeu.c
 *\code contenant l'évolution du jeu
 */

#include "../include/jeu.h"
#include "../include/io.h"


int (*compte_voisins_vivants)(int, int, grille) = compte_voisins_cyclique;

void (*vieillissement)(int,int,grille) = set_ne_vieillit_pas;

int compte_voisins_cyclique (int i, int j, grille g){
	int v = 0, l=g.nbl, c = g.nbc;
	v+= est_vivante(modulo(i-1,l),modulo(j-1,c),g);
	v+= est_vivante(modulo(i-1,l),modulo(j,c),g);
	v+= est_vivante(modulo(i-1,l),modulo(j+1,c),g);
	v+= est_vivante(modulo(i,l),modulo(j-1,c),g);
	v+= est_vivante(modulo(i,l),modulo(j+1,c),g);
	v+= est_vivante(modulo(i+1,l),modulo(j-1,c),g);
	v+= est_vivante(modulo(i+1,l),modulo(j,c),g);
	v+= est_vivante(modulo(i+1,l),modulo(j+1,c),g);

	return v; 
}

int compte_voisins_non_cyclique (int i, int j, grille g){ 
	int v = 0, l=g.nbl, c = g.nbc;
	if (i>0) { 
		if ( j > 0 ) v+= est_vivante(i-1,j-1,g);
		v+= est_vivante(i-1,j,g);
		if ( j < c-1) v+= est_vivante(i-1,j+1,g);
	}

	
	if ( j > 0 ) v+= est_vivante(i,j-1,g);
	if ( j < c-1) v+= est_vivante(i,j+1,g);

	if (i < l-1 ) { 
		if ( j > 0 ) v+= est_vivante(i+1,j-1,g);
		v+= est_vivante(i+1,j,g);
		if ( j < c-1) v+= est_vivante(i+1,j+1,g);
	}
	
	return v; 
}


void evolue (grille *g, grille *gc){
	copie_grille (*g,*gc); // copie temporaire de la grille
	int i,j,l=g->nbl, c = g->nbc,v;
	for (i=0; i<l; i++)
	{
		for (j=0; j<c; ++j)
		{
			if (est_viable(i,j,*g)){ 
				v = compte_voisins_vivants (i, j, *gc);
				if (est_vivante(i,j,*g)) 
				{ // evolution d'une cellule vivante
					if ( v!=2 && v!= 3 ) set_morte(i,j,*g);
					else vieillissement(i,j,*g); 
				}
				else 
				{ // evolution d'une cellule morte
					if ( v==3 ) set_vivante(i,j,*g);
				}
			}
		}
	}
	return;
}
