document.addEventListener('DOMContentLoaded', function() {
  const fetchButton = document.getElementById('fetchButton');
  const responseContainer = document.getElementById('responseContainer');

  fetchButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleYellowBox'});
      });
  });
});
