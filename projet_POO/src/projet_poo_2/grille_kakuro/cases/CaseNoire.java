package projet_poo_2.grille_kakuro.cases;

import java.awt.Color;

import javax.swing.BorderFactory;

public class CaseNoire extends Case //Rectangle
{
	public CaseNoire(int x,int y) 
	{
		super(x,y,Color.black);
	}
	
	public String noir ;
	
	
	public CaseNoire(int id ,String noir) {
		
		super(id);
		this.noir = noir;
	}
}
