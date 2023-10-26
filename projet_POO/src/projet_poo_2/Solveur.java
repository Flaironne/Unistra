/*
package projet_poo_2;
import java.util.Array;
import java.util.ArrayList;

import projet_poo_2.accueil.PageAccueil;
import projet_poo_2.grille_kakuro.InterfaceGraphique;
import projet_poo_2.grille_kakuro.cases.*;
import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonBlanc;
import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonReset;
import projet_poo_2.grille_kakuro.solveur.*;
 
public class Solveur { // liste de solutions pour une ligne/colonne
	
	ArrayList<Case> g;
	public Solveur(ArrayList<Case> g){
		this.g = g;
	}
	
	public int nbCases (ArrayList<Case> g, ArrayList(CaseSomme) pair{
		
		int nombre = 0;
		for(int i=0;i<size(g);i++){ //test si la grille est valide
		
			if( i*i == size(g)){
				
				for(int j=0;j<size(g);j++{
					
					//cas pour une somme en ligne
					if (pair.getElem2() != 0 ){
					int idligne = 0;
						while(g.hasNext())
							idligne ++;
							if(g.get(j) == pair){
								ArrayList<CaseSomme> tamp = g.get(j);
								//end
							}
							
							
						ArrayList<Case> tamp = g;
						while( tamp.get(idligne) != "noir" || != pair ){
							nombre ++;
							idligne ++;
							tamp = tamp.hasnext;
						}
					return nombre;
						
					}
					
					//cas pour une somme en colonne
					if (pair.getElem1() != 0){
						int idcolonne = 0;
						while(g.hasNext())
							idcolonne ++;
							if(g.get(j) == pair){
								ArrayList<CaseSomme> tamp = g.get(j);
								//end
							}
							
							
						ArrayList<Case> tamp = g;
						while( tamp.get(idligne) != "noir" || != pair ){
							nombre ++;
							idcolonne ++;
							tamp = tamp.hasnext;
						}
				}
				
			}
			
		}
	}
	
	
	public static Arraylist<Long> Possibilités(int somme, int cases){
		ArrayList<Long> sol = new ArrayList<>(0);
		String min = "1";
		String max = "9";
		for(int i=0;i<(cases-1);i++);{
			min += "0";
			max += "9";
		}
	long minimum = Long.parseLong(min);
	long maximum = Long.parseLong(max);
	
	for(;minimum <= maximum ; ++minimum) {
		if(isUnique(minimum)&& (sumOfDigits(minimum)== somme) && !newLong(minimum).toString().contains("0"))){
			sol.add(minimum);
		}
	}
	return sol;
	
	}
	
	
	}
	
}
*/