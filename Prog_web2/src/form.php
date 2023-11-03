<?php

$username = htmlspecialchars($_POST['username']);
$message = htmlspecialchars($_POST['message']);

try
{
	$pdo = new PDO('sqlite:'.dirname(__FILE__).'/database.db');
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$pdo->query
	(
		'CREATE TABLE IF NOT EXISTS reviews 
		(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username VARCHAR(20) NOT NULL,
			message TEXT NOT NULL
		)'
	);

	if(preg_match('/^[\S]{1,20}$/', $username) && $message !== '')
	{
		$statement = $pdo->prepare
		(
			'INSERT INTO reviews(username, message) VALUES (:username, :message)'
		);
		$statement->bindValue('username', $username, PDO::PARAM_STR);
		$statement->bindValue('message', $message, PDO::PARAM_STR);
		$statement->execute();
	}
}
catch(PDOException $exception)
{
	var_dump($exception);
}