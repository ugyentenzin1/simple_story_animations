/*//declaring Variables
//
let hero = document.querySelector('#hero');
let lightning= document.querySelector('#lightning');
let villain = document.querySelector('#villain');

//Animation

let lightningStart = {
    "left": "290px"
}

let lightningEnd= {
    "left": "1000px",
}

let options = {
    "duration": 1200,
    "easing": "cubic-bezier(0.5, 0, 0.75, 0)",
}

function onLightHit() {
    let villainStart = {
        "transform": "scale(1)",
        "opacity": 100
    }
    let villainEnd = {
        "transform": "scale(0)",
        "opacity": 0
    }

    let duration = {
        "duration": 1000,
    }
    villain.animate([villainStart, villainEnd], duration)
}


// run the animation
lightning.animate([lightningStart, lightningEnd], options).onfinish = onLightHit;


//data Visualization
const delay = 3000; //number of milliseconds to wait before updating the explanation text
const animationDuration = 1000;
const vizContainer = document.querySelector("#vizContainer");
const explanationContainer = document.querySelector("#explanationContainer");
const explanationText = document.querySelector("#explanationText");
const explanationAmount = document.querySelector("#explanationAmount");
const dataset = [{"title":"live within 50mi of a nuclear plant for a year", "measurement": 0.09, "multiplier": 2180, "color": "#80ffff"}, //cyan
    {"title":"eat a single banana", "measurement": 0.1, "multiplier": 1965, "color": "#8095ff"}, //blue
    {"title":"receive a dental x-ray", "measurement": 5, "multiplier": 39, "color": "#d480ff"}, //purple
    {"title":"be on one airline flight from NY to LA", "measurement": 40, "multiplier": 4.9, "color": "#ff80bf"}, //pink
    {"title":"sleep directly ontop of a nuclear plant for a year", "measurement": 250, "multiplier": 0.78,"color": "#ffaa80"}, //orange
    {"title":"receive a single mamogram", "measurement": 400, "multiplier": 0.49, "color": "#eaff80"}, //yellow
    {"title":"receive a single chest CT scan", "measurement": 7000, "multiplier": 0.028, "color": "#80ff80"} //green
];
const defaultMultiplier = dataset[0].multiplier; // keeps a reference to the multiplier value of the third entry
let circle = [];

dataset.forEach((dataLine, index) => {
    let newCircle = document.createElement('div');
    newCircle.style.width = '100px';
    newCircle.style.height = (dataLine.measurement*defaultMultiplier + 'vw');
    newCircle.style.borderRadius = "50%";
    newCircle.style.backgroundColor = dataLine.color;
    newCircle.style.position = "absolute";
    newCircle.style.zIndex = (dataset.length - index).toString();
    newCircle.style.left = ((dataLine.measurement*defaultMultiplier/2 * (-1))+ 'vw');
    newCircle.style.top = (((dataLine.measurement*defaultMultiplier)/2 * (-1))+ 'vw');
    console.log(((dataLine.measurement*defaultMultiplier)/2* (-1)))
    circle.push(newCircle);
    // vizContainer.append(newCircle);

    let updateText = () => {
        explanationText.innerHTML = dataset[index].title;
        explanationContainer.style.backgroundColor = dataset[index].color;
        explanationAmount.innerHTML = ( '(' +dataset[index].measurement + 'micro events)')
    }
    window.setTimeout(updateText, index*delay)
})

for(let i = 0; i < (dataset.length - 1); i++) {
    let multiplierFrom = dataset[i].multiplier;
    let multiplierTo = dataset[i+1].multiplier;

    circle.forEach((circle, circleId) => {
        let circleMeasurementId = dataset[circleId].measurement;

        let startWidth = (circleMeasurementId * multiplierFrom + 'px')
        let targetWidth = (circleMeasurementId * multiplierTo + 'px')
        let startHeight = (circleMeasurementId * multiplierFrom + 'px')
        let targetHeight = (circleMeasurementId * multiplierFrom + 'px');
        let startTop = ((circleMeasurementId * multiplierFrom/2* (-1)) + 'px')
        let targetTop = ((circleMeasurementId * multiplierTo/2*(-1)) + 'px')
        let startLeft = ((circleMeasurementId * multiplierFrom/2* (-1)) + 'px')
        let targetLeft = ((circleMeasurementId * multiplierFrom/2* (-1)) + 'px')

        let keyFramesFrom = {
            "width": startWidth,
            "height": startHeight,
            "top": startTop,
            "left": startLeft
        }

        let keyFramesTo = {
            "width": targetWidth,
            "height": targetHeight,
            "top": targetTop,
            "left": targetLeft
        }

        let animationOptions = {
            "duration": animationDuration,
            "fill": "forwards",
            "delay": ((i+1) * delay)

        }
        circle.animate([keyFramesFrom, keyFramesTo], animationOptions);
    })
}*/

//balloon poping game
const successUrl = "https://giphy.com/gifs/puma-bolt-usain-puma-running-xT0BKAB7vMb10rfnvG";
const failUrl = "https://giphy.com/gifs/fail-black-and-white-bob-dylan-li0dswKqIZNpm";
let numStopped = 0
const balloonDuration = [10000, 20000, 12000, 24000, 14000, 30000, 15000];
const balloon = [document.querySelector('#redBalloon'),
    document.querySelector('#yellowBalloon'),
    document.querySelector('#greenBalloon') ,
    document.querySelector('#blueBalloon'),
    document.querySelector('#orangeBalloon'),
    document.querySelector('#purpleBalloon'),
    document.querySelector('#skyBalloon')
]

balloon.forEach((balloons, index) => {
   balloons.animation = balloons.animate([{top: "80vh"}, {top: "5vh"}],
       {duration: balloonDuration[index], fill: "forwards"})


   balloons.animation.onfinish = () => {
      window.location.href = failUrl;
   }

   balloons.addEventListener("click", (event ) => {
       event.currentTarget.animation.pause();
       numStopped++;

       if(numStopped > 4) {
           window.location.href = successUrl;
       }
   })
})
