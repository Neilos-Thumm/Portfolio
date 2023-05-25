function playSound(audioName, loop) {
    let audio = new Audio(audioName);
    audio.loop = loop;
    audio.play();
}
playSound("forgis.mp3", true)