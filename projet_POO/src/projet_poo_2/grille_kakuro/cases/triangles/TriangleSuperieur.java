package projet_poo_2.grille_kakuro.cases.triangles;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JComponent;

public class TriangleSuperieur extends JComponent
{
	private int x;
	private int y;
	
	public TriangleSuperieur(int x,int y)
	{
		this.x = x;
		this.y = y;
		this.setBounds(x-20, y-20, x+120, y+120);
	}
	
	protected void paintComponent(Graphics g)
	{
		Graphics2D g2d = (Graphics2D) g;
		g2d.setColor(Color.black);
		int xpoints[] = {x-10,x+120,x+120};
		int ypoints[] = {y,y,y+125};
		int nbPoints = 3;
		g2d.fillPolygon(xpoints, ypoints, nbPoints);
	}
}
