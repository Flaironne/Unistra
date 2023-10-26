 package projet_poo_2;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import projet_poo_2.accueil.PageAccueil;
import projet_poo_2.grille_kakuro.InterfaceGraphique;
import projet_poo_2.grille_kakuro.cases.*;
import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonBlanc;
import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonReset;
import projet_poo_2.grille_kakuro.solveur.*;


public class Kakuro
{
	public static void main (String []args)
	{
		PageAccueil pageAccueil = new PageAccueil();
	}
	public Kakuro() {}
	
	public void setUp(String grille) throws IOException 
	{
		int x,y;//Servira à prendre les dimensions/données des différents éléments
		String w,z,valeurs[],valeurs2[];
		String file = "grilles_kakuro/grille"+grille+".txt";
		final String separateur = " ", separateur2 = "/";
		BufferedReader reader = new BufferedReader(new FileReader(file));
		String line = "";
		line = reader.readLine();
		valeurs = line.split(separateur);
		x = Integer.parseInt(valeurs[0]);
		y = Integer.parseInt(valeurs[1]);
		InterfaceGraphique frame = new InterfaceGraphique(x,y);
		int x1=0;
		int y1=0;
		ArrayList<BoutonBlanc> b = new ArrayList<BoutonBlanc>();
		line = reader.readLine();
		while(!line.equals("EOF"))
		{
			valeurs = line.split(separateur);
			for(int i=0;i<valeurs.length;i++)
			{
				if(!valeurs[i].contains("/"))
				{
					if(valeurs[i].equals("0"))//CaseNoire
					{
						CaseNoire caseNoire = new CaseNoire(x1,y1);
						frame.add(caseNoire);
					}
					else if(valeurs[i].equals("-1"))//CaseBlanchen 
					{
						BoutonBlanc bouton = new BoutonBlanc(x1,y1);
						b.add(bouton);
						frame.add(bouton);
					}
					if(!valeurs[i].equals("-1") && (!valeurs[i].equals("0"))) //Somme
					{
						CaseBlanche caseBlanche = new CaseBlanche(x1,y1,valeurs[i]);
						frame.add(caseBlanche);
					}
				}
				else
				{
					valeurs2 = valeurs[i].split(separateur2);
					CaseRemplie caseRemplie = new CaseRemplie(x1,y1,valeurs2[0],valeurs2[1]);
					frame.add(caseRemplie);				
				}
				x1++;
			}
			y1++;
			x1=0;
			line = reader.readLine();
		}
		PseudoSolveur solveur = new PseudoSolveur(x*100+25,y*100/4*2+10,100,50,b,grille);
		Correcteur correcteur = new Correcteur(x*100+25,y*100/4*3+10,100,50,b,grille);
		BoutonReset reset = new BoutonReset(x*100+25,10,100,50,b,true);
		BoutonReset thanos = new BoutonReset(x*100+25,y*100/4+10,100,50,b,false);
		frame.add(thanos);
		frame.add(reset);
		frame.add(solveur);
		frame.add(correcteur);
		frame.setVisible(true);
	}
}
