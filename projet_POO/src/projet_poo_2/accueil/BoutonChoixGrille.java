package projet_poo_2.accueil;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.JButton;

import projet_poo_2.Kakuro;

public class BoutonChoixGrille extends JButton implements ActionListener
{
	private PageAccueil a;
	private String grille;
	
	public BoutonChoixGrille(String texte, String grille, PageAccueil a, int y)
	{
		this.a = a;
		this.grille = grille;
		this.setBounds(50,y*100,400,70);
		this.setText(texte);
		this.addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		Kakuro app = new Kakuro();
		try 
		{
			app.setUp(grille);
		} catch (IOException e2) 
		{
			e2.printStackTrace();
			System.exit(1);
		}
		a.dispose();
	}
}
