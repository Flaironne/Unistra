package projet_poo_2.grille_kakuro.cases;

import java.util.ArrayList;

public class CaseSomme extends Case{
	
	ArrayList<Integer> pair;
		
	public CaseSomme(int id ,ArrayList<Integer> pair) {
			super(id);
			this.pair = pair;
	}
	
	
	public int getElem1() {
		
		return pair.get(1);
	}
	
	public int getElem2() {
		
		return pair.get(2);
	}
}
