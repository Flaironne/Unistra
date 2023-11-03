#include <stdio.h>
#include <stdbool.h>
#include "palindrome.h"
#include "io.h"

void test_variables(char *filename)
{
	unsigned int nb1, nb2, nb3;
	readFile(filename);
	printf("test_variables nb1 : %d\n", (nb1 = compteTab()));
	printf("test_variables nb2 : %d\n", (nb2 = compteTab()));
	destroyTab();
	printf("test_variables nb3 : %d\n", (nb3 = compteTab()));
}

void test_fonctions(char *filename)
{
	readFile(filename);
	printTab();
	destroyTab();
}

int main (int argc, char *argv[]) 
{
	//test_variables("./file.txt");
	//test_fonctions("./file.txt");
	if (argc < 2)
	{
		printf("Utilisation: %s <chaine>\n", argv[0]);
		exit(EXIT_FAILURE);
	}
	char *str = renverser(argv[1]);
	if (est_palindrome(argv[1]))
	{
		printf("%s est un palindrome\n", argv[1]);
	}
	else
	{
		printf("%s n'est pas un palindrome\n", argv[1]);
	}
	printf("chaine a l'envers : %s\n", str);
	free(str);

    return 0;
}
