package projet_poo_2.grille_kakuro.cases.boutons_grille;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;

public class BoutonBlanc extends JButton implements ActionListener
{
	private String valeur;
	
	public BoutonBlanc()
	{
	}
	
	public BoutonBlanc(int x, int y) 
	{
		this.setBounds(x*100,y*100,100,100);
		this.setBackground(Color.white);
		this.addActionListener(this);
		this.setBorder(BorderFactory.createLineBorder(Color.black));
	}
	
	public void setTexte(String texte)
	{
		if(texte == null)
		{
			this.valeur = null;
			return;
		}
		this.setText(texte);
		this.setFont(new Font("Arial",Font.ITALIC,30));
		this.valeur = texte;
	}
	
	public void setFond(Color b)
	{
		this.setBackground(b);
	}
	
	public String getValeur()
	{
		return this.valeur;
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		if(e.getSource() == this)
		{
			EditBouton choix = new EditBouton(this);
		}
		
	}
}
