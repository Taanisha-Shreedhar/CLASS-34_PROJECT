const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,knife,ground;
var knife_con;
var knife_con_2;
var knife_con_3;
var rope3;
var rope2;

var bg_img;
var knife_img;
var bloodedknife_img;
var boy;
var zombie;

var button,button2,button3;
var boy_img, boy_dead_img;
var zombie_img, zombie_dead_img, zombie_attack_img;
var mute_btn;

var bk_sound;
var cut_sound;

function preload() {
  bg_img = loadImage('background.png');
  knife_img = loadImage('knife.png');
  bloodedknife_img = loadImage('blooded_knife.png');
  zombie_img = loadAnimation("z_Idle(1).png", "z_Idle(2).png", "z_Idle(3).png");
  zombie_dead_img = loadAnimation("z_Dead(1).png", "z_Dead(2).png", "z_Dead(3).png", "z_Dead(4).png");
  zombie_attack_img = loadAnimation("z_Attack(1).png", "z_Attack(2).png", "z_Attack(3).png");
  boy_img = loadAnimation("b_Idle(1).png", "b_Idle(2).png", "b_Idle(1).png");
  boy_dead_img = loadAnimation("b_Dead(1).png", "b_Dead(2).png", "b_Dead(3).png", "b_Dead(4).png")

  zombie_img.playing = true;
  zombie_attack_img.playing = true;
  zombie_dead_img.playing = true;
  boy_img.playing = true;

  bk_sound = loadSound('bk_sound.mp3');
  cut_sound = loadSound('rope_cut.mp3');
}

function setup() {
  createCanvas(500,700);

  bk_sound.play();
  bk_sound.setVolume(0.4);

  engine = Engine.create();
  world = engine.world;

  //button 1
  button = createImg('cut_button.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //button 2
  button2 = createImg('cut_button.png');
  button2.position(330, 35);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  //button3
  button3 = createImg('cut_button.png');
  button3.position(360, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  mute_btn = createImg('mute_button.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  rope = new Rope(7,{x:370,y:40});
  rope2 = new Rope(8,{x:40, y:30});
  rope3 = new Rope(4, {x:400, y:225});

  ground = new Ground(200,690,600,20);

  zombie = createSprite(420,620,100,100);
  zombie.scale = 0.5;
  zombie.addAnimation(zombie_img);
  zombie.addAnimation(zombie_attack_img);
  zombie.addAnimation(zombie_dead_img);
  zombie.changeAnimation(zombie_img);

  boy = createSprite(80, 620, 100, 100);
  boy.scale = 0.5;
  boy.addAnimation(boy_img);
  boy.addAnimation(boy_dead_img);
  boy.changeAnimation(boy_img);

  knife = Bodies.rectangle(300,300,20);
  Matter.Composite.add(rope.body,knife);

  knife_con = new Link(rope,knife);
  knife_con_2 = new Link(rope2, knife);
  knife_con_3 = new Link(rope3, knife);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}


function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(knife!=null){
    image(knife_img,knife.position.x,knife.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);

  drawSprites();

  if(collide(knife,boy)==true)
  {
    boy.changeAnimation(boy_dead_img);
  }

  if(collide(knife,zombie)==true)
  {
    zombie.changeAnimation(zombie_dead_img);
  }

  if(knife!=null && knife.position.y>=650)
  {
    zombie.changeAnimation(zombie_attack_img);
    bk_sound.stop();
    knife = null;
   }
}

function drop()
{
  cut_sound.play();
  rope.break();
  knife_con.detach();
  knife_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  knife_con_2.detach();
  knife_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  knife_con_3.detach();
  knife_con_3 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               knife = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute()
{
  if(bk_sound.isPlaying())
     {
      bk_sound.stop();
     }
     else{
      bk_sound.play();
     }
}