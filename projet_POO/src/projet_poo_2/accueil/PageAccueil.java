package projet_poo_2.accueil;

import java.awt.Color;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class PageAccueil extends JFrame implements KeyListener
{
	public PageAccueil() 
	{
		this.setTitle("kakuro_Wuch");
		this.setSize(500,700);
		this.getContentPane().setBackground(Color.green);
		this.setLayout(null);
		this.addKeyListener(this);
		ImageIcon img = new ImageIcon("images/dominos");
		this.setIconImage(img.getImage());
		JLabel label = new JLabel();
		label.setBounds(0,0,500,700);
		ImageIcon title = new ImageIcon("images/title.png");
		label.setVerticalAlignment(JLabel.TOP);
		label.setHorizontalAlignment(JLabel.CENTER);
		label.setIcon(title);
		this.add(label);
		BoutonChoixGrille button1 = new BoutonChoixGrille ("FACILE","1",this,2);
		BoutonChoixGrille button2 = new BoutonChoixGrille ("MOYEN","2",this,3);
		BoutonChoixGrille button3 = new BoutonChoixGrille ("DIFFICILE","3",this,4);
		BoutonQuitter quit = new BoutonQuitter(this,150,500,200,50);
		button1.setFocusable(false);
		button2.setFocusable(false);
		button3.setFocusable(false);
		quit.setFocusable(false);
		this.add(button1);
		this.add(button2);
		this.add(button3);
		this.add(quit);
;		JLabel label2 = new JLabel();
		label2.setBounds(0,0,500,700);
		ImageIcon warren = new ImageIcon("images/warren.png");
		label2.setVerticalAlignment(JLabel.BOTTOM);
		label2.setHorizontalAlignment(JLabel.LEFT);
		label2.setIcon(warren);
		JLabel label3 = new JLabel();
		label3.setBounds(0,0,500,700);
		ImageIcon florian = new ImageIcon("images/florian.png");
		label3.setVerticalAlignment(JLabel.BOTTOM);
		label3.setHorizontalAlignment(JLabel.RIGHT);
		label3.setIcon(florian);
		this.add(label);
		this.add(label2);
		this.add(label3);
		this.setResizable(false);
		this.setVisible(true);
	} 

	@Override
	public void keyTyped(KeyEvent e) {
		
	}

	@Override
	public void keyPressed(KeyEvent e) {
	}

	@Override
	public void keyReleased(KeyEvent e) 
	{
		switch (e.getKeyChar())
		{
			case 'g':
				this.getContentPane().setBackground(Color.green);
				break;
			case 'b':
				this.getContentPane().setBackground(Color.blue);
				break;
			case 'o':
				this.getContentPane().setBackground(Color.orange);
				break;
			case 'p':
				this.getContentPane().setBackground(Color.pink);
				break;
			case 'm':
				this.getContentPane().setBackground(Color.MAGENTA);
				break;
			case 'c':
				this.getContentPane().setBackground(Color.cyan);
				break;
		}
	}
	
}
