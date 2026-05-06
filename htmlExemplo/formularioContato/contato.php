<?php
// Inserir em um webserver com suporte a PHP
// Get data from form 
$nome = $_POST['nome'];
$email= $_POST['email'];
$msg= $_POST['mensagem'];

 
//echo "MENSAGEM: " . $nome . $email . $msg . "<BR>";

$username = 'root';
$password = '';
	
try {
	//Realizar conexão
	$conn = new PDO('mysql:host=localhost;dbname=test', $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	//Inserir dados
    $stmt = $conn->prepare('INSERT INTO contato (nome,email,mensagem) VALUES (?, ?, ?)');
	$stmt->bindParam(1, $nome);
	$stmt->bindParam(2, $email);
	$stmt->bindParam(3, $msg);

	if (!$stmt->execute())
		echo "ERRO: não foi possível executar a declaração SQL.";
	
	//Ler dados
	$stmt = $conn->prepare("SELECT * FROM contato");
 
    if ($stmt->execute())
        while ($rs = $stmt->fetch(PDO::FETCH_OBJ))
            echo "<p>Nome: ".$rs->nome." - E-mail: ".$rs->email." Mensagem: ".$rs->mensagem;
    else 
        echo "ERRO: não foi possível recuperar os dados do banco de dados.";


} catch(PDOException $e) {
    echo 'ERRO: ' . $e->getMessage();
}

// Redirect to
header("Location:index.html");
?>