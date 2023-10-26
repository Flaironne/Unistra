package projet_poo_2.grille_kakuro.cases.boutons_grille;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JFrame;

public class EditBouton
{
	JFrame frame = new JFrame();
	
	public EditBouton(BoutonBlanc bouton)
	{
		this.frame.setSize(300,400);//Taille de l'interface graphique en fonction de x,y
		this.frame.setLayout(null);
		this.frame.setResizable(false);
		ImageIcon img = new ImageIcon("images/dominos");
		frame.setIconImage(img.getImage());
		this.frame.setLayout(new GridLayout(3,3));
		frame.setTitle("Choisis un nombre");
		BoutonChoixNombre a = new BoutonChoixNombre("1",bouton,frame);
		BoutonChoixNombre b = new BoutonChoixNombre("2",bouton,frame);
		BoutonChoixNombre c = new BoutonChoixNombre("3",bouton,frame);
		BoutonChoixNombre d = new BoutonChoixNombre("4",bouton,frame);
		BoutonChoixNombre e = new BoutonChoixNombre("5",bouton,frame);
		BoutonChoixNombre f = new BoutonChoixNombre("6",bouton,frame);
		BoutonChoixNombre g = new BoutonChoixNombre("7",bouton,frame);
		BoutonChoixNombre h = new BoutonChoixNombre("8",bouton,frame);
		BoutonChoixNombre i = new BoutonChoixNombre("9",bouton,frame);
		this.frame.dispose();
		this.frame.add(a);
		this.frame.add(b);
		this.frame.add(c);
		this.frame.add(d);
		this.frame.add(e);
		this.frame.add(f);
		this.frame.add(g);
		this.frame.add(h);
		this.frame.add(i);
		this.frame.setVisible(true);
	}
}
