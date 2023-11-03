#include "io.h"

char **fichierTab;
unsigned int fichierTaille;

void readFile(char *filePath)
{
	FILE *fp = fopen(filePath, "r");
	if(fp == NULL)
	{
		perror(filePath);
		exit(EXIT_FAILURE);
	}
	else
	{
		//initialisation Tab
		fichierTaille = numberOfLines(fp);
		fichierTab = (char **)malloc(fichierTaille * sizeof(char *));
		char *buffer = NULL;
  		size_t bufsiz = 0;
  		ssize_t nbytes;
		unsigned int i=0;
		//lecture et remplissage de tab
  		while ((nbytes = getline(&buffer, &bufsiz, fp)) != -1)
  		{
			fichierTab[i] = (char *)malloc((nbytes) * sizeof(char));
			memcpy(fichierTab[i], buffer, nbytes-1);
			fichierTab[i++][nbytes-1] = '\0';
  		}
		//fermeture du fichier et suppression du buffer de lecture
		free(buffer);
		fclose(fp);
	}
}

void printTab()
{
	printf("---\n");
	for(unsigned int i=0; i<fichierTaille; ++i)
	{
		printf("%s\n", fichierTab[i]);
	}
	printf("---\n");
}

void destroyTab()
{
	for(unsigned int i=0; i<fichierTaille; ++i)
	{
		free(fichierTab[i]);
	}
	free(fichierTab);
	fichierTaille = 0;
}

static unsigned int numberOfLines(FILE *fp)
{
	char buffer[257], lastchar = '\n';
    size_t bytes;
    unsigned int lines = 0;
    while ((bytes = fread(buffer, 1, sizeof(buffer)-1, fp))) 
	{
        lastchar = buffer[bytes - 1];
        for (char *c = buffer; (c = memchr(c, '\n', bytes - (c-buffer))); c++) 
            ++lines;
    }
    if (lastchar != '\n') 
	{
        ++lines;
    }
    if (ferror(fp)) 
	{
        perror("numberOfLines");
        fclose(fp);
        exit(EXIT_FAILURE);
    }
    rewind(fp);
   	return lines;
}
