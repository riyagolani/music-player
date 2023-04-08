const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['overflow', 'sunny', 'water']
let songIndex = 0;


function loadSong(song){
    // Making the title camel case
    title.innerHTML = song.charAt(0).toUpperCase() + song.slice(1);
    audio.src = `music/${song}.mp3`;
    cover.src = `music/${song}.jpg`;
}
loadSong(songs[songIndex]);


function playSong(){
    // Add class play in the class list
    musicContainer.classList.add('play');
    // remove icon of play i.e fa-play
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    // add icon of pause instead
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}


function pauseSong(){
    // Remove class play in the class list
    musicContainer.classList.remove('play');
    // add icon of play i.e fa-play
    playBtn.querySelector('i.fas').classList.add('fa-play');
    // remove icon of pause
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}


playBtn.addEventListener('click', ()=>{
    // know the current state of the music by checking 'play' in classList
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying){
        pauseSong();
    }else {
        playSong();
    }
});


function prevSong(){
    if (songIndex > 0){
        songIndex = songIndex - 1;
    }else{
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong(){
    if (songIndex < songs.length - 1){
        songIndex = songIndex + 1;
    }else{
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if (progressPercent == 100){
        nextSong();
    }
  }
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);