exec: main.o arbre_genealogique.o
	gcc -o exec main.o arbre_genealogique.o -Wall

main.o: main.c
	gcc -o main.o -c main.c -Wall

arbre_genealogique.o: arbre_genealogique.c 
	gcc -o arbre_genealogique.o -c arbre_genealogique.c -Wall

clean:
	rm *.o exec