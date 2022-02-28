// Load sounds in
// const sounds = new Tone.Players({
//     boom: "boom.mp3",
//     jump: "jump.mp3",
//     gameover: "arcadegameover.wav",
//     alarm: "retroalarm.wav",
//     notification: "retronotification.wav"
// });

// Array of sound names
// let soundsName = ['Boom', 'Jump', 'Game Over', 'Alarm', 'Notification'];

// Variables
let simpSynth;
let simpSynth1;

let gain;
let gain1;
let vibrado;
// let buttons = [];
let slider;

// Load in Gain effect to destination then connect in sounds to Gain
function preload() {
    gain = new Tone.Gain(1).toDestination();
    gain1 = new Tone.Gain(.04).toDestination();
    vibrado = new Tone.Vibrato("C4", 0).connect(gain1);
    // sounds.connect(gain);
}

// Create buttons with sound
function setup() {
    createCanvas(400, 400);

    simpSynth = new Tone.MembraneSynth({
        oscillator: {type: "triangle"},
        envelope: {
            attack: 0.0, // beginning sound stretch
            decay: 0,
            sustain: 0.1,
            release: 0.5 // end sound stretch
        }
    }).connect(gain);

    simpSynth1 = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {
            attack: 0,
            decay: 0,
            sustain: 0.2,
            release: 0
        }
    }).connect(vibrado);


    slider = createSlider(0,1,0,0.1);

    // for (i = 0; i < 5; i++){
    //     buttons[i] = createButton(soundsName[i]);
    //     buttons[i].position(50, 50*(i+1));
    //     let names = soundsName[i].replace(/\s/g, '').toLowerCase();
    //     buttons[i].mousePressed( () => buttonSound(names) );
    // }
}
// 1 222222 1 222222 1 878 222222 1 6545 8888887
// Change Gain effect with slider
function draw() {
    background(220);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("Press numbers 1 - 6", 200, 200);
    text("1 is bass", 200, 215);
    text("2 - 6 is affected by vibrato", 200, 230);
    textAlign(LEFT, BOTTOM);
    text("Vibrato Adjustment", 0, 400);
    vibrado.depth.value = slider.value();
    // gain.gain.value = slider.value();
}

// function mousePressed(){
//     simpSynth.triggerAttackRelease("C2", duration = "0.1");
//     simpSynth1.triggerAttackRelease("A4", "1", "+0.1");
//     // simpSynth1.triggerAttackRelease("A2", "1", "+0.1");
// }

function keyPressed(){
    if (keyCode == 49){
        simpSynth.triggerAttackRelease("A0", 1);
    }
    else if (keyCode == 50){
        simpSynth1.triggerAttackRelease("A1", 1);
    }
    else if (keyCode == 51){
        simpSynth1.triggerAttackRelease("A2", 1);
    }
    else if (keyCode == 52){
        simpSynth1.triggerAttackRelease("A3", 1);
    }
    else if (keyCode == 53){
        simpSynth1.triggerAttackRelease("A4", 1);
    }
    else if (keyCode == 54){
        simpSynth1.triggerAttackRelease("A5", 1);
    }
}

// Play sound from sounds object
// function buttonSound(sound) {
//     sounds.player(sound).start();
// }