// Synthesizers objects
let simpSynth;
let simpSynth1;

// Sound effect variables
let gain;
let gain1;
let vibrado;
let slider;

// Load in gain effect to destination then connect vibrado to gain to control loudness
function preload() {
    gain = new Tone.Gain(1).toDestination();
    gain1 = new Tone.Gain(.04).toDestination();
    vibrado = new Tone.Vibrato("C4", 0).connect(gain1);
}

// Create synthesizers with different sounds
function setup() {
    createCanvas(400, 400);

    // base synth note
    simpSynth = new Tone.MembraneSynth({
        oscillator: {type: "triangle"},
        envelope: {
            attack: 0.0, // beginning sound stretch
            decay: 0,
            sustain: 0.1,
            release: 0.5 // end sound stretch
        }
    }).connect(gain);

    // other sounds
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
}

// Add text and control vibrado effect with slider
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
}

function keyPressed(){
    // #1
    if (keyCode == 49){
        simpSynth.triggerAttackRelease("A0", 1);
    }
    // #2
    else if (keyCode == 50){
        simpSynth1.triggerAttackRelease("C1", 1);
    }
    // #3
    else if (keyCode == 51){
        simpSynth1.triggerAttackRelease("A2", 1);
    }
    // #4
    else if (keyCode == 52){
        simpSynth1.triggerAttackRelease("A3", 1);
    }
    // #5
    else if (keyCode == 53){
        simpSynth1.triggerAttackRelease("A4", 1);
    }
    // #6
    else if (keyCode == 54){
        simpSynth1.triggerAttackRelease("A5", 1);
    }
}