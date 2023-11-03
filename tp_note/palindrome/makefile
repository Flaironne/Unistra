CC=gcc

all: main tag

main: main.o palindrome.o io.o
	$(CC) -o main main.o palindrome.o io.o

main.o: main.c palindrome.h
	$(CC) -g -c main.c

palindrome.o: palindrome.c palindrome.h
	$(CC) -g -c palindrome.c

io.o: io.c io.h
	$(CC) -g -c io.c

tag: io.h
	echo //@`whoami` >> $<

clean:
	rm -rf main *.o
