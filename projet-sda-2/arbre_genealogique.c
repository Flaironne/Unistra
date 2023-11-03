#include "arbre_genealogique.h"

//PARTIE 1

void genealogieInit(Genealogie *g)
{
    g->taille_max_tab = 100;
    g->tab = (Individu*) malloc(sizeof(struct s_individu)*g->taille_max_tab);
    if(g->tab == NULL) //On vérifie l'allocation mémoire au cas-où
    {
        fprintf(stderr,"Allocation mémoire échouée\n");
        exit(EXIT_FAILURE);
    }
    g->id_cur = 0; //On incrémente dans l'adjonction du coup les identifiants commenceront bien à 1
}

void genealogieFree(Genealogie *g)
{
    free(g->tab);
}

int compDate(date x, date y)
{
    if(x.annee>y.annee) return 0;
    else if (y.annee>x.annee) return 1;
    else//Si les années sont les mêmes il faut comparer les mois
    {
        if(x.mois>y.mois) return 0;
        else if(y.mois>x.mois) return 1;
        else //Si les années et les mois sont identiques il faut comparer les jours
        {
            if(x.jour>y.jour) return 0;
            else return 2; //Si ils sont nés le même jours de la même année du même mois je retourne 2
        }
    }
}

ident adj(Genealogie *g, char *s, ident p, ident m, date n, date d)
{
    Individu nouv;
    strcpy(nouv.nom,s);
    nouv.pere = p;
    nouv.mere = m;
    nouv.naissance = n;
    nouv.deces = d;
    if(g->id_cur == g->taille_max_tab)//Si jamais la taille du tableau est dépassé
    {
        g->tab = (Individu*)realloc(g->tab,sizeof(struct s_individu)*100);
        g->taille_max_tab+=100;
    }
    nouv.faine = 0;
    nouv.cadet = 0;
    g->tab[g->id_cur] = nouv;
    g->id_cur++;
    //Conditions pour mettre à jour le faine et le cadet en fonction des parents
    if(!p && !m)//Si il n'a pas de parents
    {
        return g->id_cur;
    }
    else if(p && m)//Si les deux parents sont définis
    {
        initChainageCadet(g,p,g->id_cur);
        get(g,m)->faine = get(g,p)->faine;
    }
    else if(m && !p) //La mère est définie mais pas le père
    {
        initChainageCadet(g,m,g->id_cur);
    }
    else //Le père est défini mais pas la mère
    {
        initChainageCadet(g,p,g->id_cur);
    }
    return g->id_cur;
}

void initChainageCadet(Genealogie *g, ident parent, ident x)
{
    if(!get(g,parent)->faine)//Si le parent n'a pas de fils aîné
    {
        get(g,parent)->faine = x;
        return;
    }
    else
    {
        if(compDate(get(g,get(g,parent)->faine)->naissance,get(g,x)->naissance))
        {
            ident precedent = get(g,parent)->faine;
            ident suivant = get(g,get(g,parent)->faine)->cadet;
            while(suivant != 0)
            {
                if(compDate(get(g,precedent)->naissance,get(g,x)->naissance))
                {
                    if(compDate(get(g,x)->naissance,get(g,suivant)->naissance))
                    {
                        get(g,precedent)->cadet = x;
                        get(g,x)->cadet = suivant;
                        return;
                    }
                }
                precedent = suivant;
                suivant = get(g,suivant)->cadet;
            }
            get(g,precedent)->cadet = x;
            return; 
        }
        else
        {
            get(g,x)->cadet = get(g,parent)->faine;
            get(g,parent)->faine = x;
            return;
        }
    }
}


Individu *get(Genealogie *g, ident x)
{
    return &g->tab[x-1];
}

//PARTIE 2

bool freres_soeurs(Genealogie *g, ident x, ident y)
{
    if(x==y /*C'est beau qd même, "je suis mon propre frère" ...*/|| !x || !y || g == NULL) return false;
    ident merex = get(g,x)->mere;
    ident perex = get(g,x)->pere;
    ident merey = get(g,y)->mere;
    ident perey = get(g,y)->pere;
    if(!merex || !perex || !merey || !perey) return false;
    return merex == merey && perex == perey; 
    //Les deux dernières conditions servent pour vérifier si ils ont des parents
}

bool cousins(Genealogie *g, ident x, ident y)
{
    if(freres_soeurs(g,x,y) || x == y || !x || !y || g == NULL)
    {
        return false;
    }
    ident merex = get(g,x)->mere;
    ident perex = get(g,x)->pere;
    ident merey = get(g,y)->mere;
    ident perey = get(g,y)->pere;
    //Deux individus sont cousins si un de leurs parents sont frères et soeurs
    return freres_soeurs(g,perex,merey) || freres_soeurs(g,merex,merey) || freres_soeurs(g,perey,merex) || freres_soeurs(g,perex,perey);
}

bool fils(Genealogie *g, ident x, ident y)
{
    if(x == y || !x || !y || freres_soeurs(g,x,y) || g == NULL)
    {
        return false;
    }
    return get(g,y)->mere == x || get(g,y)->pere == x;
}

//PARTIE 3

void affiche_freres_soeurs(Genealogie *g, ident x)
{
    if(x == 0 || g == NULL) return;
    for(int i=1;i<=g->id_cur;i++)
    {
        if(freres_soeurs(g,x,i))
        {
            printf("%s\n", get(g,i)->nom);
        }
    }
}

void affiche_enfants(Genealogie *g, ident x)
{
    if(x == 0 || g == NULL) return;
    for(int i=1;i<=g->id_cur;i++)
    {
        if(fils(g,x,i))
        {
            printf("%s\n", get(g,i)->nom);
        }
    }
}

void affiche_cousins(Genealogie *g, ident x)
{
    if(x == 0 || g == NULL) return;
    for(int i=1;i<=g->id_cur;i++)
    {
        if(cousins(g,x,i))
        {
            printf("%s\n", get(g,i)->nom);
        }
    }
}

void affiche_oncles(Genealogie *g, ident x)
{
    if(x == 0 || g == NULL) return;
    for(int i=1;i<=g->id_cur;i++)
    {
        if(freres_soeurs(g,get(g,x)->pere,i) ||  freres_soeurs(g,get(g,x)->mere,i))
        {
            printf("%s\n", get(g,i)->nom);
        }
    }
}

//PARTIE 4

bool ancetre(Genealogie *g, ident x, ident y)
{
    if (y == 0 || g == NULL) return false;
    if(x == y) return true;
    return ancetre(g,x,get(g,y)->mere) || ancetre(g,x,get(g,y)->pere);
}

bool ancetreCommun(Genealogie *g, ident x, ident y)
{
    if(g == NULL) return false;
    for(int i=1;i<=g->id_cur && i!=x && i!=y;i++)
    {
        if(ancetre(g,i,x)&&ancetre(g,i,y))
        {
            return true;
        }
    }
    return false;
}

ident plus_ancien(Genealogie *g, ident x)
{
    if(g == NULL) return 0;
    if(!get(g,x)->pere && !get(g,x)->mere)//Si il n'a ni mère ni père on retourne
    {
        return x;
    }
    else
    {
        if(get(g,x)->pere && !get(g,x)->mere) return plus_ancien(g,get(g,x)->pere);//Si il a juste un père on analyse le père
        if(get(g,x)->mere && !get(g,x)->pere) return plus_ancien(g,get(g,x)->mere);//Si il a juste une mère on analyse la mère
        ident merex = plus_ancien(g,get(g,x)->mere);
        ident perex = plus_ancien(g,get(g,x)->pere);
        return compDate(get(g,merex)->naissance,get(g,perex)->naissance) ? merex : perex;
    }
}

void affiche_parente(Genealogie *g, ident x)
{
    affiche_parent_aux(g,x,1);
}

void affiche_parent_aux(Genealogie *g, ident y, unsigned int x)
{
    if(!y || g == NULL ) return;
    ident mere = get(g,y)->mere;
    ident pere = get(g,y)->pere;
    if(!pere && !mere)return;
    if(x)printf("- %d:\n",x);
    affiche_oncles(g,y);
    affiche_parents(g,y);
    x++;
    affiche_parent_aux(g,mere,x);
    affiche_parent_aux(g,pere,x);
}

void affiche_parents(Genealogie *g, ident x)
{
    if(!x || g == NULL) return;
    ident mere = get(g,x)->mere;
    ident pere = get(g,x)->pere;
    if(mere) printf("%s\n",get(g,mere)->nom);
    if(pere) printf("%s\n",get(g,pere)->nom);
}

void affiche_descendance(Genealogie *g, ident x)
{
    unsigned int num=0;
    affiche_descendance_aux(g,x,num);
}

void affiche_descendance_aux(Genealogie *g, ident x, unsigned int num)
{
    num++;
    printf("- %d:",num);
    Individu* x1 = get(g,x);
    affiche_enfants(g,x);
    if (x1->faine !=0 )
    {
        ident i_ainee = x1->faine;
        Individu* ainee = get(g,x1->faine);
        while (ainee->cadet != 0 )
        {
            if (ainee->faine != 0)
            {

                affiche_descendance_aux(g,i_ainee,num);
            }
            i_ainee = ainee->cadet;
            ainee = get(g,ainee->cadet);
        }
        if (ainee->faine != 0) affiche_descendance_aux(g,ainee->faine,num);
    }
}

//PARTIE 5

void genealogieFusion(Genealogie *gres, Genealogie *a1, Genealogie *a2)
{
    bool checker = false;

    if(a1 == NULL) gres = a2;
    else if(a2 == NULL) gres = a1;
    else
    {
        for(int i = 0; i < a1->id_cur; i++)
        {
            for(int j = 0; j < a2->id_cur; j++)
            {
                if(strcmp(a1->tab[i].nom, a2->tab[j].nom) == 0 && compDate(a1->tab[i].naissance, a2->tab[j].naissance) == 2)
                checker = true;
            }
            if(checker == false)
            {
                //int not_used = adj(&gres, a1->tab[i].nom, a1->tab[i].pere,etc..);
            }
        }
    }
}