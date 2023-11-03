<?php ?>

<DOCTYPE!>
	
<header>

	<nav>
	<div class="head">
		<h4>UE Prog Web 2021/2022</h4>
		
		<div class="meta">
			WU Florian
		</div>
		<h1>How to be an anime character</h1>
	</div>

	<div class="logo">
		<a href="../index.php"><img src="../img/MultiAnime.png" alt="Logo du site"/></a>
	
	
		
	</div>

	</nav>
	
	<div class="menu">
		<div class="menu_ham">
			<label for="ham">&#9776;</label>
			<input type="checkbox" id="ham">
		</div>
		<nav class="menu_nav">
			<div class="opt"><a href="<?= $_SESSION['lang'] == "fr" ? 'index.php?lang=fr' : 'index.php?lang=en'; ?>"><?= $lang['global']['header']['menu']['index'] ?></a></div>
			<div class="opt"><a href="<?= $_SESSION['lang'] == "fr" ? 'publish.php?lang=fr' : 'publish.php?lang=en'; ?>"><?= $lang['global']['header']['menu']['publish'] ?></a></div>
			<div class="opt"><a href="<?= $_SESSION['lang'] == "fr" ? 'forum.php?lang=fr' : 'forum.php?lang=en'; ?>"><?= $lang['global']['header']['menu']['forum'] ?></a></div>			
		</nav>
	</div>
	

</header>