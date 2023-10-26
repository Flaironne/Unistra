package projet_poo_2.grille_kakuro.cases.triangles;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JComponent;

public class TriangleInferieur extends JComponent
{
	private int x;
	private int y;
	
	public TriangleInferieur(int x,int y)
	{
		this.x = x;
		this.y = y;
		this.setBounds(x-20, y-20, x+120, y+120);
	}
	
	protected void paintComponent(Graphics g)
	{
		Graphics2D g2d = (Graphics2D) g;
		g2d.setColor(Color.black);
		int xpoints[] = {x-10,x,x+125};
		int ypoints[] = {y-15,y+120,y+120};
		int nbPoints = 3;
		g2d.fillPolygon(xpoints, ypoints, nbPoints);
	}

}
