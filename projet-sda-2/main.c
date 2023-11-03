#include "arbre_genealogique.h"

int main()
{
    Genealogie g;
    genealogieInit(&g);
    ident ia = adj(&g, "Arthur", 0, 0, (date){ 9, 11, 1879 }, (date){ 12, 11, 1934 });
    ident im = adj(&g, "Marcel", ia, 0, (date){ 1, 7, 1928 }, (date){ 21, 9, 2004 });
    ident ic = adj(&g, "Clothilde", 0, 0, (date){ 30, 8, 1929 }, (date){ 26, 4, 2005 });
    ident ije = adj(&g, "Jeanne", im, ic, (date){ 13,4, 1948 }, (date){ 0,0,0 });
    ident ihe = adj(&g, "Henri", 0,0, (date){ 2,8, 1947 }, (date){ 0,0,0 });
    ident ial = adj(&g, "Aline", 0,0, (date){ 7,9, 1943 }, (date){ 0,0,0 });
    ident ipi = adj(&g, "Pierre", 0, 0, (date){ 26,6, 1941 }, (date){ 0,0,0 });
    ident iju = adj(&g, "Julien", ipi, ial, (date){ 13,8, 1965 }, (date){ 0,0,0 });
    ident ialex = adj(&g, "Alex", ipi, ial, (date){ 18,4, 1969 }, (date){ 0,0,0 });
    ident iso = adj(&g, "Sophie", ihe, ije, (date){ 9,11, 1972 }, (date){ 0,0,0 });
    ident icl = adj(&g, "Clementine", ihe, ije, (date){ 12,10, 1973 }, (date){ 0,0,0 });
    ident ima = adj(&g, "Marion", ihe, ije, (date){ 5,5, 1976 }, (date){ 0,0,0 });
    ident ich = adj(&g, "Christian", 0, 0, (date){ 13,2, 1971 }, (date){ 0,0,0 });
    ident itho = adj(&g, "Thomas", ialex, iso, (date){ 18,10, 2012 }, (date){ 0,0,0 });
    ident icloe = adj(&g, "Cloe", ialex, iso, (date){ 21,6, 2002 }, (date){ 0,0,0 });
    ident ihu = adj(&g, "Hugo", ialex, iso, (date){ 12,5, 2005 }, (date){ 0,0,0 });
    ident isa = adj(&g, "Isabelle", ich, ima, (date){ 28,4, 2003 }, (date){ 0,0,0 });
    freres_soeurs(&g,iso,ima) ? printf("Sophie et Marion sont soeurs\n") : printf("Sophie et Marion ne sont pas soeurs\n");
    freres_soeurs(&g,iso,iju) ? printf("Sophie et Julien sont frères et soeurs\n") : printf("Sophie et Julien ne sont pas frères et soeurs\n");
    cousins(&g,iso,ima) ? printf("Sophie et Marion sont cousines\n") : printf("Sophie et Marion ne sont pas cousines\n");
    cousins(&g,ihu,isa) ? printf("Hugo et Isabelle sont cousins\n") : printf("Hugo et Isabelle ne sont pas cousins\n");
    printf("Les frères et soeurs de Thomas sont: ");
    affiche_freres_soeurs(&g,itho);
    printf("\nLes cousins d'Isabelle sont: ");
    affiche_cousins(&g,isa);
    printf("\nLes oncles/tantes de Thomas sont: ");
    affiche_oncles(&g,itho);
    ancetre(&g,ia,itho) ? printf("\nArthur est l'ancêtre de Thomas\n") : printf("\nArthur n'est pas l'ancêtre de Thomas\n");
    ancetre(&g,ial,isa) ? printf("Aline est l'ancêtre d'Isabelle") : printf("Aline n'est pas l'ancêtre d'Isabelle\n");
    ancetreCommun(&g,icloe,isa) ? printf("Cloe et Isabelle ont un ancêtre commun\n") : printf("Cloe et Isabelle n'ont pas d'ancêtre commun\n");
    ancetreCommun(&g,iju,isa) ? printf("Julie et Isabelle ont un ancêtre commun\n") : printf("Julien et Isabelle n'ont pas d'ancêtre commun\n");
    printf("L'ancêtre le plus ancien connu de Cloe est %s\n",get(&g,plus_ancien(&g,icloe))->nom);
    printf("L'ancêtre le plus ancien connu de Julien est %s\n",get(&g,plus_ancien(&g,iju))->nom);
    printf("La parenté de Thomas est:\n");
    affiche_parente(&g,itho);
    printf("La descendance de Clothilde est:\n");
    affiche_descendance(&g,ic);
    genealogieFree(&g);
}