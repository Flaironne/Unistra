/** \file main.c
 *\code contenant le programme principal executable
 *\charge une grille puis lance le jeu de la vie
 */

#include <stdio.h>

#include "../include/grille.h"
#include "../include/io.h"
#include "../include/jeu.h"


/**
*\initialisation du jeu de la vie
*/
int main (int argc, char ** argv) {
	
	if (argc != 2 )
	{
		printf("usage : main <fichier grille>");
		return 1;
	}

	grille g, gc;
	init_grille_from_file(argv[1],&g);
	alloue_grille (g.nbl, g.nbc, &gc);
	affiche_grille(g);
	
	debut_jeu(&g, &gc);

	libere_grille(&g);
	libere_grille(&gc);
	return 0;
}
