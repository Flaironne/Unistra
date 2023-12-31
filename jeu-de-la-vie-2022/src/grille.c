/** \file grille.c
	* \code contenant le fonctionnement de la grille
	*/

#include "../include/grille.h"

void alloue_grille(int l,int c,grille* g){
	g->cellules= (int**) malloc(sizeof(int*)*l);
	if (g->cellules==NULL)exit(-1);
	for (int i = 0; i < l; ++i){
		g->cellules[i]= (int*) malloc(sizeof(int)*c);
		if (g->cellules[i]==NULL)exit(-2);
	}
	for (int j = 0; j < l; ++j){
		for (int k = 0; k < c; ++k){
			g->cellules[j][k]=0;
		}
	}
	g->nbl=l;
	g->nbc=c;
	return;
}

void libere_grille(grille* g){
	for (int i = 0; i < g->nbl; ++i){
		free(g->cellules[i]);
	}
	free(g->cellules);
	return;
}

void init_grille_from_file (char * filename, grille* g){
	FILE * pfile = NULL;
	pfile = fopen(filename, "r");
	assert (pfile != NULL);
	
	int i,j,n,l,c,vivantes=0;
	
	fscanf(pfile, "%d", & l);
	fscanf(pfile, "%d", & c);
	
	alloue_grille(l,c,g);
	
	fscanf(pfile, "%d", & vivantes);
	for (n=0; n< vivantes; ++n){
		fscanf(pfile, "%d", & i);
		fscanf(pfile, "%d", & j);
		set_vivante(i,j,*g);
	}
	
	int nonviables = 0;
	fscanf(pfile, "%d", & nonviables);
	for (n=0; n< nonviables; ++n){
		fscanf(pfile, "%d", & i);
		fscanf(pfile, "%d", & j);
		set_nonviable(i,j,*g);
	}
	
	fclose (pfile);
	return;
}

void set_ne_vieillit_pas(int i, int j, grille g){}
void set_vieillit(int i, int j, grille g){
	g.cellules[i][j] = (g.cellules[i][j]+1) % 9;
}

void copie_grille (grille gs, grille gd){
	int i, j;
	for (i=0; i<gs.nbl; ++i) for (j=0; j<gs.nbc; ++j) gd.cellules[i][j] = gs.cellules[i][j];
	return;	
}
