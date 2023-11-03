#include "palindrome.h"

extern char **fichierTab;
extern unsigned int fichierTaille;

char *renverser(char *str)
{
	//strlen renvoie la taille d'une chaine de caractères.
	//strlen ne compte pas le caractère '\0'.
	unsigned int n = strlen(str); 
	char *out = (char *) malloc((n)*sizeof(char));
	for(size_t i=0; i<n; ++i)
	{
		out[i] = str[n-i];
	}
	return out;
}

int est_palindrome(char *str)
{
	char *str_renv = renverser(str);
	//strcmp compare deux chaînes de caractères.
	//strcmp renvoie notamment 0 si les deux chaînes sont identiques.
	int b = strcmp(str_renv, str) == 0;
	free(str_renv);
	return b;
}

int compteTab()
{
	//A compléter
	return 0;
}
