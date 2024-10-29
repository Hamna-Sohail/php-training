<?php
$string = "Hamna Sohail";
$vowels = "";
$consonent= "";

for($i = 0; $i < strlen($string); $i++){
    $c = strtolower($string[$i]);
    if($c == 'a' || $c == 'e' || $c == 'i' || $c == 'o' || $c == 'u'){
        $vowels .= $c;
    }elseif($c >= 'a' && $c <= 'z'){
        $consonent .= $c;
    }
}
echo "Vowels:".$vowels ."<br>";
echo "consonents:".$consonent;
?>