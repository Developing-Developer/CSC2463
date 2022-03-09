// Synthesizers objects
let simpSynth;
let simpSynth1;
let sequence;

// Sequence of notes for background music
let bgMuse = ["A3", "B3", "A3", "B3", "A3", "B3", "A3", "B3", "A4", "A3", "A4", "A3", "A4", "A3", "A4"];

// Sound effect variables
let gain;
let gain1;

let toneStarted = 0;
let showImg = 0;

// Load in gain effect to lower sounds of notes since they're loud
// Load in picture
function preload() {
    gain = new Tone.Gain(.15).toDestination();
    gain1 = new Tone.Gain(.04).toDestination();
    img = loadImage('X.png');
}

// Create synthesizers with different sounds and background music loop
function setup() {
    createCanvas(400, 400);

    // sound effect synth
    simpSynth = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {
            attack: 0.0,
            decay: 0,
            sustain: 0.1,
            release: 0.5
        }
    }).connect(gain);

    // background music synth
    simpSynth1 = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {
            attack: 0.05,
            decay: 0.5,
            sustain: 1,
            release: 5
        }
    }).connect(gain1);

    // the sequence of notes to play
    sequence = new Tone.Sequence(function(time, note){
        simpSynth1.triggerAttackRelease(note, .5);
    }, bgMuse, .15);
    
    // loop for sequence of notes
    Tone.Transport.bpm.value = 80;
    Tone.Transport.start();
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = '8:0:0';

    sequence.start();
}

// Add text and show image when clicked
function draw() {
    background(220);
    textAlign(CENTER, CENTER);
    textSize(14);
    if (showImg == 1){
        image(img, 0 - 50, 0 - 40);
    }
    text("Try Clicking!", 200, 200);
    textAlign(LEFT, BOTTOM);
}

// Click for background music to start and trigger sound effect
function mouseClicked(){
    if(toneStarted == 0){
        toneStarted = 1;
        showImg = 1;
        Tone.start();
    }
    simpSynth.triggerAttackRelease("A1", .15);
}