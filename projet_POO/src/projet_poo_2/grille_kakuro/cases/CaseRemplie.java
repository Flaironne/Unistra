package projet_poo_2.grille_kakuro.cases;

import java.awt.Color;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;

import projet_poo_2.grille_kakuro.cases.triangles.TraitsKakuro;
import projet_poo_2.grille_kakuro.cases.triangles.TriangleInferieur;
import projet_poo_2.grille_kakuro.cases.triangles.TriangleSuperieur;

public class CaseRemplie extends Case	
{
	public CaseRemplie(int x, int y, String w, String z) 
	{
		super(x,y, Color.white);
		if(!w.equals("0") && !z.equals("0"))
		{
			TraitsKakuro trait = new TraitsKakuro(x,y);
			this.add(trait);
			JLabel label = new JLabel(w);
			label.setFont(new Font("Arial",Font.ITALIC,30));
			label.setHorizontalAlignment(JLabel.LEFT);
			label.setVerticalAlignment(JLabel.BOTTOM);
			label.setBounds(x,y,x+100,y+95);
			this.add(label);
			JLabel label2 = new JLabel(z);
			label2.setFont(new Font("Arial",Font.ITALIC,30));
			label2.setHorizontalAlignment(JLabel.RIGHT);
			label2.setVerticalAlignment(JLabel.TOP);
			label2.setBounds(x,y,x+90,y+95);
			this.add(label2);
		}
		else if(!w.equals("0"))//Z vaut 0
		{
			TriangleSuperieur triangle = new TriangleSuperieur(x,y);
			this.add(triangle);
			JLabel label = new JLabel(w);
			label.setFont(new Font("Arial",Font.ITALIC,30));
			label.setHorizontalAlignment(JLabel.LEFT);
			label.setVerticalAlignment(JLabel.BOTTOM);
			label.setBounds(x,y,x+100,y+95);
			this.add(label);
		}
		else//W vaut 0		
		{
			TriangleInferieur triangle = new TriangleInferieur(x,y);
			this.add(triangle);
			JLabel label = new JLabel(z);
			label.setFont(new Font("Arial",Font.ITALIC,30));
			label.setHorizontalAlignment(JLabel.RIGHT);
			label.setVerticalAlignment(JLabel.TOP);
			label.setBounds(x,y,x+85,y+95);
			this.add(label);
		}
	}
}
