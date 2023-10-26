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

public class Correcteur extends JButton implements ActionListener
{
	ArrayList<BoutonBlanc> b;
	String grille;
	
	public Correcteur(int x, int y, int width, int height, ArrayList<BoutonBlanc> b, String grille)
	{
		this.b = b;
		this.grille = grille;
		this.setBounds(x, y, width, height);
		this.setText("KoriG");
		this.addActionListener(this);
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
				if(this.b.get(i).getValeur() != null && this.b.get(i).getValeur().equals(boucle))
				{
					this.b.get(i).setFond(Color.green);
				}
				else
				{
					this.b.get(i).setFond(Color.red);
				}
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
