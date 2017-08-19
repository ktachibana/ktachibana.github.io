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

f.openMic().then((input) => {
  log("openMic input:", input);
  global.detectionTimer = f.startMicLevelDetection(input, (micLevel) => {
    log(`micLevel: ${micLevel}`);
  });
});

$('#stop').click(() => {
  if (global.detectionTimer) {
    clearInterval(global.detectionTimer);
  }
});
