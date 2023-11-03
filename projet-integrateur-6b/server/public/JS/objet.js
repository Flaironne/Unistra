class Table{
    constructor(Mise_total,Mise_minimum,CartesSurTable)
    {
        this.Mise_total=Mise_total
        this.Mise_maximum=0
        this.Mise_minimum=Mise_minimum
        this.Nb_Joueurs=0
        this.CartesSurTable=CartesSurTable
        this.blind=0;
        this.tour=0;
    }
    reset()
    {
        this.Mise_total = 0;
    }
}
class Joueur
{
    constructor(pseudo,nb_jetons)
    {
        this.pseudo = pseudo
        this.nb_jetons= nb_jetons
        this.Mise=0
        this.Mise_Tour=0
        this.Coucher=false
        this.isPlaying=false
        this.isInGame=false
        this.isPremierJoueur=false
        
    }
    remplacer(NewObjet)
    {
        this.pseudo = NewObjet.pseudo
        this.nb_jetons= NewObjet.nb_jetons
        this.Mise=0
        this.Mise_Tour=0
        this.Coucher=false //Bool
        this.isPlaying=false
        this.isInGame=false
        this.isPremierJoueur=false
    }
    reset()
    {
        this.pseudo = ''
        this.nb_jetons= 0
        this.Mise=0
        this.Mise_Tour=0
        this.Coucher=false //Bool
        this.isPlaying=false
        this.isInGame=false
        this.isPremierJoueur=false
    }
}
class JoueurDetail{
    constructor(IdJoueur,pseudo,nb_jetons,IdSocket)
    {
        this.IdJoueur=IdJoueur
        this.pseudo = pseudo
        this.nb_jetons= nb_jetons
        this.Mise=0
        this.Mise_Tour=0
        this.Coucher=false //Bool
        this.Main=0
        this.Role=-1//wip
        this.Cd_Pouvoir=-1
        this.isPlaying=false
        this.isInGame=false
        this.IdSocket=IdSocket
        this.isPremierJoueur=false
    }

    remplacer(NewObjet )
    {
        if(!(NewObjet instanceof JoueurDetail))
        {
            return "Erreur dans l'objet";
        }
        else
        {
            this.IdJoueur=NewObjet.IdJoueur
            this.pseudo = NewObjet.pseudo
            this.nb_jetons= NewObjet.nb_jetons
            this.Mise=0
            this.Mise_Tour=0
            this.Coucher=false //Bool
            this.Main=0
            this.Role=-1//wip
            this.Cd_Pouvoir=-1
            this.IdSocket=NewObjet.IdSocket
            this.isPlaying=false
            this.isInGame=false
            this.isPremierJoueur=false
        }
    }
    reset()
    {
        this.IdJoueur=0
        this.pseudo = ''
        this.nb_jetons= 0
        this.Mise=0
        this.Mise_Tour=0
        this.Coucher=false //Bool
        this.Main=0
        this.Role=-1//wip
        this.Cd_Pouvoir=-1
        this.IdSocket=0
        this.isPlaying=false
        this.isInGame=false
        this.isPremierJoueur=false
    }
}


class Update_Data{
    constructor(Table,MonJoueur,Joueur1,Joueur2,Joueur3,Joueur4,Joueur5)
    {
        this.Table=Table//table
        this.MonJoueur=MonJoueur//Joueur Detail
        this.Joueur1=Joueur1//Joueur
        this.Joueur2=Joueur2
        this.Joueur3=Joueur3
        this.Joueur4=Joueur4
        this.Joueur5=Joueur5
    }
}
class Mains
{
    constructor(carte1Valeur,carte1Couleur,carte2Valeur,carte2Couleur)
    {
        this.carte1={carte1Valeur,carte1Couleur}
        this.carte2={carte2Valeur,carte2Couleur}
    }
}

class Spectateur_Update_Data{
    constructor(Table,Joueur1,Joueur2,Joueur3,Joueur4,Joueur5,Joueur6)
    {
        this.Table=Table
        this.MonJoueur=Joueur1 //Faux monjoueur question d'adressage pour le front
        this.Joueur1=Joueur2
        this.Joueur2=Joueur3
        this.Joueur3=Joueur4
        this.Joueur4=Joueur5
        this.Joueur5=Joueur6
    }
}


module.exports = {
    Update_Data,
    JoueurDetail,
    Joueur,
    Table,
    Mains,
    Spectateur_Update_Data
};