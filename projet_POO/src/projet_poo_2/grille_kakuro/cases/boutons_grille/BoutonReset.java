package projet_poo_2.grille_kakuro.cases.boutons_grille;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.JButton;

public class BoutonReset extends JButton implements ActionListener
{
	ArrayList<BoutonBlanc> b;
	boolean bool;
	
	public BoutonReset(int x, int y, int width, int height, ArrayList<BoutonBlanc> b, boolean bool)
	{
		this.setBounds(x,y,width,height);
		this.b = b;
		this.bool = bool;
		if(!bool)this.setText("Thanos");
		else this.setText("Reset");
		this.addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) 
	{
		if(!bool)
		{
			for(int i=0;i<b.size();i+=2)
			{
				this.b.get(i).setText(null);
				this.b.get(i).setFond(Color.white);
			}
		}
		else
		{
			for(int i=0;i<b.size();i++)
			{
				this.b.get(i).setText(null);
				this.b.get(i).setFond(Color.white);
			}
		}
	}

}
