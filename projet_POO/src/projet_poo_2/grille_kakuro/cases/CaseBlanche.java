package projet_poo_2.grille_kakuro.cases;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.JLabel;

public class CaseBlanche extends Case
{
	public CaseBlanche(int x, int y, String z) 
	{
		super(x,y,Color.white);
		this.setLayout(new BorderLayout());
		JLabel label = new JLabel();
		label.setText(z);
		label.setFont(new Font("Arial",Font.BOLD,30));
		label.setVerticalAlignment(JLabel.CENTER);
		label.setHorizontalAlignment(JLabel.CENTER);
		this.add(label);
	}
	
	public int valeur;
	
	public CaseBlanche(int id, int valeur){
		
		super(id);
		this.valeur = valeur;
	}
	
}
