<?php
class car{
    public $color = "black";
    public $model = 2020;

    public function getCarInfo(){
        return "This car is a [$this->color][$this->model]";
    }
}
$car = new car();
echo $car->getCarInfo();

//constructor and destructor
class person{
    public $name, $age;

    public function __construct($name, $age){
        $this->name = $name;
        $this->age = $age;
    }
    public function show(){
        echo "<br>The person is:$this->name";
        echo "<br>The age is:$this->age";
    }
    public function __destruct(){
        echo "<br> Object is destroyed";
    }
}
$person = new person("Hamna", 22);
$person->show();

//encapsulation
class BankAccount{
    private $balance;
    
    public function __construct($balance){
        $this->balance= $balance;
    }
    public function getBalance(){
        return $this->balance;
    }
    public function setBalance($amount){
       if($amount >= 0){
        $this->balance  = $amount;
        return $amount;
       }else{
        echo "<br>Balance is negative";
       }
    }
    public function deposit($amount){
       if($amount > 0){
        $this->balance += $amount;
        echo "<br>Deposited amount: $amount";
       }else{
        echo "<br>Deposited amount must be positive";
       }
    }
    public function withdraw($amount){
        if($amount > 0 && $amount <= $this->balance){
            $this->balance -= $amount;
            echo "<br> Withdraw amount: $amount";
        }elseif($amount > $this->balance){
            echo "<br>Insufficient funds";
        }else{
            echo "<br>Withdrawal ammount must be positive";
        }
    }
}
$bank = new BankAccount(15000);
$bank->deposit(10000);
$bank->withdraw(6000);
echo "<br>Get Balance:".$bank->getBalance();
echo "<br>Set Balance:".$bank->setBalance(30000);
$bank->deposit(10000);
$bank->withdraw(6000);
echo "<br>Get Balance:".$bank->getBalance();

//inheritance
abstract class shape{
    abstract public function getArea();
}
class rectangle extends shape{
    public $width , $height;

    public function __construct($width,$height){
        $this->width = $width;
        $this->height = $height;
    }
    public function getArea(){
        return $this->width * $this->height;
    }
}
class circle extends shape{
    public $radius;

    public function __construct($radius){
        $this->radius = $radius;
    }
    public function getArea(){
        return 3.142 * ($this->radius) * ($this->radius);
    }
}

$rect = new rectangle(6,7);
echo "<br> Area of rectangle is :". $rect->getArea();
$circle = new circle(6);
echo "<br> Area of cricle is :". $circle->getArea();

//method overriding
class shape1 {
    public function area(){
        return 0;
    }
    public function describe(){
        return "This is generic shape";
    }
}
class rectangle1 extends shape1{
    public $width1 , $height1;
    public function __construct($width1,$height1){
        $this->width1 = $width1;
        $this->height1 = $height1;
    }
    public function area(){
        return $this->width1 * $this->height1;
    }
    public function describe(){
        return "<br>This is the rectangle with width is $this->width1 and height is $this->height1";
    }
}
class circle1 extends shape1{
    public $radius1;

    public function __construct($radius1){
        $this->radius1 = $radius1;
    }
    public function area(){
        return 3.142 * ($this->radius1) * ($this->radius1);
    }
    public function describe(){
        return "<br>This is the circle with radius is $this->radius1";
    }
}
$rect1 = new rectangle1(3,9);
echo "<br> Area of rectangle is :". $rect1->area();
echo $rect1->describe();
$circle1 = new circle1(3);
echo "<br> Area of circle is :". $circle1->area();
echo $circle1->describe();

//abstract class
abstract class animal{
    abstract public function makesound();
}
class dog extends animal{
    public function makesound(){
        return "Barking like wow wow!";
    }
}
class cat extends animal{
    public function makesound(){
        return "meow meow!";
    }
}
$dog = new dog();
echo "<br>Dog sound:". $dog->makesound();
$cat = new cat();
echo "<br>Cat sound:". $cat->makesound();

//interface
interface  PaymentGateway{
    public function pay($amount1);
    public function refund($amount1);
}
class paypal implements PaymentGateway{
    public function pay($amount1){
        return "<br>Paid $amount1 using paypal";
    }
    public function refund($amount1){
        return "<br>Refunded $amount1 using paypal";
    }
}
class stripe implements PaymentGateway{
    public function pay($amount1){
        return "<br>Paid $amount1 using stripe";
    }
    public function refund($amount1){
        return "<br>Refunded $amount1 using stripe";
    }
}
$paypal = new paypal();
echo $paypal->pay(15000);
echo $paypal->refund(15000);
$stripe = new stripe();
echo $stripe->pay(25000);
echo $stripe->refund(25000);
?>