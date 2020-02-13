const btn_install = document.getElementById("btn_install");

const field_inicial = document.getElementById("field_temp_inicial");
const field_inicial_error = document.getElementById("field_temp_inicial_error");
const field_final = document.getElementById("field_temp_final");
const field_final_error = document.getElementById("field_temp_final_error");
const field_volume = document.getElementById("field_volume");
const field_volume_error = document.getElementById("field_volume_error");

const cb_5000 = document.getElementById("cb_5000w");
cb_5000.checked = true;
const cb_8000 = document.getElementById("cb_8000w");

const result = document.getElementById("result");

let temp_inicial = 0;
let temp_final = 0;
let volume = 0;
let potencia = 5000;

let result_seconds = 0;

function getData(field){  
    
    temp_inicial = parseFloat(field_inicial.value === "" ? 0 : field_inicial.value);
    if(isNaN(temp_inicial)){        
        field_inicial_error.style.display = "inline";
        field_inicial_error.textContent = "VALOR INVÁLIDO";
        temp_inicial = 0;
    }else{
        field_inicial_error.style.display = "none";
        field_inicial_error.textContent = ""            
    }   

    temp_final = parseFloat(field_final.value === "" ? 0 : field_final.value);
    if(isNaN(temp_final)){        
        field_final_error.style.display = "inline";
        field_final_error.textContent = "VALOR INVÁLIDO";
        temp_final = 0;
    }else{
        field_final_error.style.display = "none";
        field_final_error.textContent = ""            
    }   

    volume = parseFloat(field_volume.value === "" ? 0 : field_volume.value);
    if(isNaN(volume)){        
        field_volume_error.style.display = "inline";
        field_volume_error.textContent = "VALOR INVÁLIDO";
        volume = 0;
    }else{
        field_volume_error.style.display = "none";
        field_volume_error.textContent = ""            
    }   
}

function checkBoxChange(value){
    potencia = parseInt(value);    
    if(value == 5000){
        cb_8000.checked = false;
    }
    if(value == 8000){
        cb_5000.checked = false;
    }
    calcTime();
}

function calcTime(){
    getData();
    
    if(temp_inicial == 0 || temp_final == 0 || volume == 0 || temp_final <= temp_inicial){        
        result_seconds = 0;
    }else{
        let potNess = (4.2 * volume * (temp_final-temp_inicial));        
        result_seconds = potNess / (potencia/1000);
        console.log(result_seconds);
    }
    convertSeconds();
}

convertSeconds();
function convertSeconds(){
    let text = "";
    let hours = "00";
    let minutes = "00";
    let seconds = "00";

    if(result_seconds > 0){
        hours = parseInt(result_seconds / 60 / 60);
        minutes = parseInt(result_seconds / 60 - (hours * 60));
        seconds = parseInt(result_seconds - (minutes * 60) - (hours * 60 * 60));        
        if(hours < 10){ hours = "0" + hours; }
        if(minutes < 10){ minutes = "0" + minutes; }
        if(seconds < 10){ seconds = "0" + seconds; }
    }

    text = hours + ":" + minutes + ":" + seconds;

    result.textContent = text;
}

//PWA CODE
if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/SinapseTempoAquecimento/sw.js')
             .then(function() { console.log('Service Worker Registered'); });
}

if (window.matchMedia('(display-mode: standalone)').matches) {  
    btn_install.style.display = 'none';
}

// Code to handle install prompt on desktop

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  btn_install.style.display = 'absolute';

  btn_install.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button    
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          btn_install.style.display = 'none';
        } else {
          btn_install.style.display = 'absolute';
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

window.addEventListener('appinstalled', (evt) => {  
    console.log("App already installed");
    btn_install.style.display = 'none';
  });

  

