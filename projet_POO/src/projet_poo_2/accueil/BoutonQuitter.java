package projet_poo_2.accueil;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

public class BoutonQuitter extends JButton implements ActionListener
{
	private JFrame f;

	public BoutonQuitter(JFrame f,int x, int y, int width, int height)
	{
		this.f = f;
		this.addActionListener(this);
		this.setBounds(x,y,width,height);
		this.setText("QUITTER");
		this.setForeground(Color.white);
		this.setBackground(Color.red);
	}
	
	@Override
	public void actionPerformed(ActionEvent e) 
	{
		f.dispose();
	}

}
