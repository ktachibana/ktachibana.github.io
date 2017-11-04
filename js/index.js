import f from './functions';
import $ from 'jquery';

global.log = (...args) => {
  const line = $('<pre>');
  line.text(args.join(', '));
  $('#console').prepend(line);
};

window.onerror = function (msg, url, line) {
  $('#console').prepend(`<pre style="color: red;">ERROR: ${msg} ${url} ${line}</pre>`);
}

document.querySelector('#start').onclick = () => {
  global.audioContext = new AudioContext();

  f.openMic().then((source) => {
    log("openMic source:", source);
    global.detectionTimer = f.startMicLevelDetection(source, (micLevel) => {
      $('#mic').text(micLevel);
    });
  });
};

$('#stop').click(() => {
  if (global.detectionTimer) {
    clearInterval(global.detectionTimer);
  }
});
