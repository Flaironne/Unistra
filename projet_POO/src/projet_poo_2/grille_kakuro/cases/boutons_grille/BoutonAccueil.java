package projet_poo_2.grille_kakuro.cases.boutons_grille;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

import projet_poo_2.accueil.PageAccueil;
import projet_poo_2.grille_kakuro.InterfaceGraphique;

public class BoutonAccueil extends JButton implements ActionListener
{
	private JFrame f;
	
	public BoutonAccueil(JFrame f, int x, int y, int width, int height)
	{
		this.f = f;
		this.setBounds(x,y,width,height);
		this.setText("Accueil");
		this.addActionListener(this);
		this.setBackground(Color.orange);
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		f.dispose();
		PageAccueil pageAccueil = new PageAccueil();
	}

}
