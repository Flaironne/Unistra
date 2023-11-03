/** \file io.c
 * code contenant les entrées et sorties; input/output
 */

#include "../include/io.h"
#include "../include/grille.h"
#include "jeu.c"
#include <string.h>


void (*vieillissement)(int,int,grille);
static int temps = 0;

void affiche_trait (int c){
	int i;
	for (i=0; i<c; ++i) printf ("|---");
	printf("|\n");
	return;
}

void affiche_ligne (int c, int* ligne){
	int i;
	if(vieillissement)//si le vieillissement est activé
	{
		for (i=0; i<c; ++i)
		{
			if (ligne[i] == 0 ) printf ("|   ");// cellules mortes
			else if (ligne[i] == -1 ) printf ("| X ");//cellules non-viables
			else printf("| %d ",ligne[i]);// on affiche l'âge d'une cellule vivante
		}

	}
	else//si le vieillissement est desactivé
	{
		for (i=0; i<c; ++i) 
		{
			if (ligne[i] == 0 ) printf ("|   ");//cellules mortes
			else if (ligne[i] == -1 ) printf ("| X ");//celules non-viables
			else printf ("| O ");//cellules vivantes
		}
	}
	printf("|\n");
	return;
}

void affiche_grille (grille g){
	int i, l=g.nbl, c=g.nbc;
	printf("\n");
	printf("temps t = %d\n", temps);
	affiche_trait(c);
	for (i=0; i<l; ++i) {
		affiche_ligne(c, g.cellules[i]);
		affiche_trait(c);
	}	
	printf("\n"); 
	return;
}

void efface_grille (grille g){
	printf("\n\e[%dA",g.nbl*2 + 5); 
}

int (*compte_voisins_vivants)(int, int, grille);

void debut_jeu(grille *g, grille *gc){
	compte_voisins_vivants = &(compte_voisins_non_cyclique);
	char c = getchar(); 
	while (c != 'q') // touche 'q' pour quitter
	{ 
		switch (c) {
			case '\n' : 
			{ // touche "entree" pour évoluer
				evolue(g,gc);
				temps++;
				efface_grille(*g);
				affiche_grille(*g);
				break;
			}
			case 'n' :
			{ //touche "n" pour charger une nouvelle grille

				char grll[20]="./grilles/grille";
				char num[2];
				printf("Enter the number of a grille to access: \n");
				scanf("%s",&num);
				strcat(grll,num);
				strcat(grll,".txt");
				libere_grille(g);
				libere_grille(gc);
				init_grille_from_file (grll,g);
				alloue_grille(g->nbl,g->nbc,gc);
				affiche_grille(*g);
				printf("\n\e[2A");
				printf("\n");
				break;
			}
			case 'c' : 
			{ // touche "c" pour activer / desactiver le voisinage cyclique
				if (compte_voisins_vivants == &(compte_voisins_non_cyclique)){
					compte_voisins_vivants = &(compte_voisins_cyclique);
					printf("voisinage cyclique \n");
				}
				else {
					compte_voisins_vivants = &(compte_voisins_non_cyclique);
					printf("voisinage non cyclique \n");
				}
				
				break;
			}

			case 'v' :
			{ // touche "v" pour activer/desactiver le viellissement des cellules
				if (vieillissement == set_ne_vieillit_pas){
					vieillissement = set_vieillit;
					printf("vieillissement actif \n");
				}
				else {
					vieillissement = set_ne_vieillit_pas;
					printf("vieillissement inactif \n");
				}
				
				break;
			}
			default : 
			{ // touche non traitée
				printf("\n\e[1A");
				break;
			}
		}
		c = getchar(); 
	}
	return;	
}
