(function() {
  // Create the main container for the floating box
  const floatingBox = document.createElement('div');
  floatingBox.style.position = 'fixed';
  floatingBox.style.bottom = '20px';
  floatingBox.style.right = '20px';
  floatingBox.style.width = '300px'; // Adjust as needed
  floatingBox.style.padding = '20px';
  floatingBox.style.backgroundColor = '#FFFFFF';
  floatingBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  floatingBox.style.borderRadius = '10px';
  floatingBox.style.zIndex = '1000';
  floatingBox.style.boxSizing = 'border-box'; // Include padding in the box's width
  floatingBox.style.fontFamily = 'Arial, sans-serif'; // Use a web-safe font

  // Create the header section
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.marginBottom = '20px';

  // Add the title to the header
  const title = document.createElement('div');
  title.textContent = 'Check Your Carbon Emissions!';
  title.style.fontWeight = 'bold';
  title.style.fontSize = '18px'; // Adjust as needed

  // Add close button to the header
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '24px'; // Adjust as needed
  closeButton.style.lineHeight = '1';
  closeButton.onclick = function() {
    floatingBox.style.display = 'none'; // Hide the floating box when closed
  };

  // Append title and close button to the header
  header.appendChild(title);
  header.appendChild(closeButton);

  // Add the main content
  const content = document.createElement('div');
  content.textContent = 'View your carbon footprint by clicking the button below.';
  content.style.fontSize = '16px'; // Adjust as needed
  content.style.marginBottom = '20px'; // Adjust as needed

  // Add an apply button
  const applyButton = document.createElement('button');
  applyButton.textContent = 'Calculate';
  applyButton.style.width = '100%';
  applyButton.style.padding = '10px';
  applyButton.style.border = 'none';
  applyButton.style.borderRadius = '5px';
  applyButton.style.backgroundColor = '#FFD700'; // Gold color
  applyButton.style.color = '#000000';
  applyButton.style.fontWeight = 'bold';
  applyButton.style.cursor = 'pointer';

  // Append elements to the floating box
  floatingBox.appendChild(header);
  floatingBox.appendChild(content);
  floatingBox.appendChild(applyButton);

  // Append the floating box to the body of the document
  document.body.appendChild(floatingBox);



  // Add an event listener for the apply button
  applyButton.addEventListener('click', async function() {
  // The URL of the page to scrape
  const pageUrl = window.location.href;

  try {
    // Send a request to your local server to initiate scraping
    const response = await fetch('http://localhost:8000/scrape', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: pageUrl })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Process the server response (if necessary)
    const responseData = await response.json();
    console.log('Server response:', responseData);

    // Display the carbon data message in the floating box
    const carbonDataMessage = `You got ${responseData.carbon} kg of carbon.`; // Adjust the responseData property as needed
    content.textContent = carbonDataMessage; // 'content' is your content div inside the floating box

    } catch (error) {
      console.error('Error sending request to local server:', error);
      // Handle errors here by updating the content div or showing an error message
      content.textContent = "An error occurred while processing your request.";
    }
  });


})();