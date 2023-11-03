INCLUDE = include/
SRC = src/
OBJ = obj/
BIN = bin/
FLAG = -Wall -g

vpath %.o obj/
vpath %.c src/
vpath %.h include/


main: $(OBJ)main.o 
	gcc $(FLAG) -o $(BIN)$@ $^ lib/libf.so -L lib

$(OBJ)%.o: %.c
	gcc $(FLAG) -o $@ -c $<
	
clean: 
	rm -f $(OBJ)*.o $(BIN)main


