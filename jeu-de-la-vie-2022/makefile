ifeq ($(DEBUG),yes)
	CFLAGS = -Wall -g
else
	CFLAGS = -Wall
endif

OPATH = obj/

vpath %.c src/
vpath %.h include/
vpath %.o obj/
vpath main bin/
vpath %.a lib/

ifeq ($(MODE),TEXTE)
	MAIN=main
	MAINC=main.c
	MAINO=main.o
	IOC=io.c
	IOH=io.h
	IOO=io.o
	IFLAGS=-Iinclude
	LFLAGS=-Llib -ljeu
else
	MAIN=main
	MAINC=maincairo.c
	MAINO=maincairo.o
	IOC=iographique.c
	IOH=iographique.h
	IOO=iographique.o
	IFLAGS = -Iinclude -I/usr/include/cairo/ -I/usr/include/X11/
	LFLAGS = -Llib -ljeu -L/usr/lib/ -lcairo -lX11
endif

$(MAIN) : $(MAINO) $(IOO) libjeu.a | bin
	gcc $(CFLAGS) -o $@ $(OPATH)$(MAINO) $(OPATH)$(IOO) $(LFLAGS)
	mv $@ bin/

grille.o : grille.c grille.h
$(IOO) : $(IOC) $(IOH) grille.h jeu.h
jeu.o : jeu.c jeu.h grille.h
$(MAINO) : $(MAINC) grille.h $(IOH) jeu.h

%.o : | obj
	gcc $(CFLAGS) -c $< $(IFLAGS)
	mv $@ $(OPATH)

libjeu.a : jeu.o grille.o | lib
	ar -crv libjeu.a $(OPATH)jeu.o $(OPATH)grille.o
	ranlib libjeu.a
	mv libjeu.a lib/

obj : 
	mkdir obj

lib : 
	mkdir lib

bin : 
	mkdir bin

clean : 
	rm obj/* bin/*

dist : 
	tar -f WuFlorian-Gol.tar.gz -cvz src/*.c include/*.h makefile Doxyfile 
