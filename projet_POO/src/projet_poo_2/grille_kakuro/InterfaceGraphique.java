package projet_poo_2.grille_kakuro;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.ImageIcon;
import javax.swing.JFrame;

import projet_poo_2.grille_kakuro.cases.boutons_grille.BoutonAccueil;

public class InterfaceGraphique extends JFrame
{	
	public InterfaceGraphique(int x, int y)
	{
		this.setTitle("kakuro_Wuch");
		this.setSize(x*100+150,y*100+37);//Taille de l'interface graphique en fonction de x,y
		this.setLayout(null);
		ImageIcon img = new ImageIcon("images/dominos");
		this.setIconImage(img.getImage());
		this.setResizable(false);
		BoutonAccueil bouton = new BoutonAccueil(this,x*100+25,y*100-55,100,50);
		this.add(bouton);
	}
}
