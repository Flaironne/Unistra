package projet_poo_2.grille_kakuro.cases;

import java.awt.Color;

import javax.swing.BorderFactory;
import javax.swing.JPanel;

public abstract class Case extends JPanel 
{

	public Case(int x, int y, Color color) 
	{
		this.setBackground(color);
		this.setBounds(x*100,y*100,100,100);
		this.setLayout(null);
		this.setBorder(BorderFactory.createLineBorder(Color.black));
	}
	
	public int id;
	
	public Case(int id) {
		this.id = id;

	}
}
