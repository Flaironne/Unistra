#include <stdio.h>
#include <stdlib.h>

unsigned int fun(int i)
{
	++i;
	int j=i;
	for(j; j<10; ++i)
	{
		if(i-1)
			i = i++;
		j++;
	}
	return j=i;
}

int main(int argc, char **argv)
{	
	int i=-1;
	i = fun(i++);
	++i;
	return 0;
}
