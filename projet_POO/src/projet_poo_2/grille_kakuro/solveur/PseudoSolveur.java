package projet_poo_2.grille_kakuro.solveur;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JButton;

import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonBlanc;

public class PseudoSolveur extends JButton implements ActionListener
{
	ArrayList<BoutonBlanc> b;
	String grille;
	
	public PseudoSolveur(int x, int y, int width, int height,  ArrayList<BoutonBlanc> b,String grille)
	{
		this.grille = grille;
		this.b = b;
		this.addActionListener(this);
		this.setBounds(x,y,width,height);
		this.setText("SOLVE");
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		String file = "grilles_kakuro/solution_grille"+this.grille+".txt";
		final String separateur = " ";
		String valeurs[];
		try 
		{
			BufferedReader reader = new BufferedReader(new FileReader(file));
			String line = "";
			line = reader.readLine();
			valeurs = line.split(separateur);
			for(int i=0;i<valeurs.length;i++)
			{
				String boucle = valeurs[i];
				this.b.get(i).setTexte(boucle);
				this.b.get(i).setFond(Color.green);
			}
			
		} catch (FileNotFoundException e1) 
		{
			e1.printStackTrace();
		} catch (IOException e1) 
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}

}
