package projet_poo_2.grille_kakuro.cases.boutons_grille;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

public class BoutonChoixNombre extends JButton implements ActionListener
{
	private String valeur;
	private BoutonBlanc b;
	private JFrame f;
	public BoutonChoixNombre(String valeur,BoutonBlanc b, JFrame f)
	{
		super(valeur);
		this.addActionListener(this);
		this.valeur = valeur;
		this.b = b;
		this.f = f;
	}
	
	void AjouteValeur(BoutonBlanc b)
	{
		if(valeur.equals("0"))
		{
			b.setTexte(null);
			return;
		}
		b.setTexte(valeur);
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		this.AjouteValeur(this.b);
		f.dispose();
	}
}
