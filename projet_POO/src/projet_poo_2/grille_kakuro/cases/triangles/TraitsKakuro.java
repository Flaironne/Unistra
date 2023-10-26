package projet_poo_2.grille_kakuro.cases.triangles;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JComponent;


public class TraitsKakuro extends JComponent
{
	private int x;
	private int y;
	
	public TraitsKakuro(int x,int y)
	{
		this.x = x;
		this.y = y;
		this.setBounds(this.x-20,this.y-20,this.x+120,this.y+120);
	}
	
	protected void paintComponent(Graphics g)
	{
		Graphics2D g2d = (Graphics2D) g;
		g2d.setColor(Color.black);
		g2d.setStroke(new BasicStroke(2));
		g2d.drawLine(this.x-20, this.y-20, this.x+130, this.y+130);
	}
}
