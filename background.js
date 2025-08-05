// This script runs in the background and handles extension lifecycle events

// When the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Sticky Notes Extension installed!");
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendNote") {
    // Later we'll add logic to actually send the note
    console.log("Note to send:", message.note);
    console.log("Recipient:", message.recipient);

    // For now, just respond that it was successful
    sendResponse({ success: true });
  }
});

// Function to show notifications (we'll use this later)
function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon-48.png",
    title: title,
    message: message,
  });
}
