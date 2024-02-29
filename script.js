var sound = new Howl({
  src: ['music.mp3']
});

var scrubber = document.getElementById('scrubber');
var seekTime = 10; // time to seek in seconds

// Update the max value of the scrubber when the sound is loaded
sound.once('load', function(){
  scrubber.max = sound.duration();
});

document.getElementById('play').addEventListener('click', function(){
  sound.play();
  requestAnimationFrame(updateScrubber);
});

document.getElementById('pause').addEventListener('click', function(){
  sound.pause();
});

document.getElementById('stop').addEventListener('click', function(){
  sound.stop();
  scrubber.value = 0; // Reset scrubber when sound is stopped
});

document.getElementById('seek-forward').addEventListener('click', function(){
  var newSeekTime = sound.seek() + seekTime;
  if (newSeekTime > sound.duration()) newSeekTime = sound.duration();
  sound.seek(newSeekTime);
  if (!sound.playing()) {
    sound.play();
    requestAnimationFrame(updateScrubber);
  }
});

document.getElementById('seek-backward').addEventListener('click', function(){
  var newSeekTime = sound.seek() - seekTime;
  if (newSeekTime < 0) newSeekTime = 0;
  sound.seek(newSeekTime);
  if (!sound.playing()) {
    sound.play();
    requestAnimationFrame(updateScrubber);
  }
});

// Update the value of the scrubber as the sound plays
function updateScrubber() {
  scrubber.value = sound.seek();
  if (sound.playing()) {
    requestAnimationFrame(updateScrubber);
  }
}

// Seek when the scrubber position is changed
scrubber.addEventListener('input', function(){
  if (!sound.playing()) {
    sound.play();
    requestAnimationFrame(updateScrubber);
  }
  sound.seek(scrubber.value);
});