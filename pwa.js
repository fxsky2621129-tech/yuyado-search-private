let installPrompt;
const installButton = document.getElementById('installApp');
const offlineStatus = document.getElementById('offlineStatus');
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  document.getElementById('installHelp').classList.add('hidden');
}
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event;
  installButton.classList.remove('hidden');
});
installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  const prompt = installPrompt;
  installPrompt = null;
  installButton.classList.add('hidden');
  await prompt.prompt();
  await prompt.userChoice;
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  document.getElementById('installHelp').classList.add('hidden');
});
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => {
    offlineStatus.textContent = 'オフラインで開く準備ができました。';
  }).catch(() => {
    offlineStatus.textContent = 'オフラインの準備ができませんでした。通信できる状態で開き直してください。';
  });
} else {
  offlineStatus.textContent = 'このブラウザーではオフライン起動に対応していません。';
}
