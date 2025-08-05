// Global variables
let currentUser = null;

// Wait for the popup to load completely
document.addEventListener("DOMContentLoaded", async function () {
  // Test Supabase connection
  try {
    const { data, error } = await supabaseClient
      .from("notes")
      .select("*")
      .limit(1);
    console.log("Supabase connection successful!");
  } catch (err) {
    console.error("Supabase connection failed:", err);
  }

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (user) {
    currentUser = user;
    showMainApp();
  } else {
    showAuthForm();
  }

  // Set up event listeners
  setupEventListeners();
});

// Function to show/hide different parts of the UI
function showAuthForm() {
  document.getElementById("authForm").style.display = "block";
  document.getElementById("mainApp").style.display = "none";
}

function showMainApp() {
  document.getElementById("authForm").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
  document.getElementById("userEmail").textContent = currentUser.email;
}

// Function to show status messages
function showStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = isError ? "error" : "success";
  status.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(() => {
    status.style.display = "none";
  }, 3000);
}

// Set up all event listeners
function setupEventListeners() {
  // Auth form switching
  document.getElementById("showSignup").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
  });

  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  });

  // Login button
  document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      showStatus("Please fill in all fields", true);
      return;
    }

    const loginBtn = document.getElementById("loginBtn");
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        showStatus(error.message, true);
      } else {
        currentUser = data.user;
        showMainApp();
        showStatus("Login successful!");
      }
    } catch (err) {
      showStatus("Login failed. Please try again.", true);
      console.error("Login error:", err);
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  });

  // Signup button
  document.getElementById("signupBtn").addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) {
      showStatus("Please fill in all fields", true);
      return;
    }

    if (password.length < 6) {
      showStatus("Password must be at least 6 characters", true);
      return;
    }

    const signupBtn = document.getElementById("signupBtn");
    signupBtn.disabled = true;
    signupBtn.textContent = "Signing up...";

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        showStatus(error.message, true);
      } else {
        showStatus(
          "Signup successful! Please check your email to verify your account."
        );
        // Switch back to login form
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
      }
    } catch (err) {
      showStatus("Signup failed. Please try again.", true);
      console.error("Signup error:", err);
    } finally {
      signupBtn.disabled = false;
      signupBtn.textContent = "Sign Up";
    }
  });

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    currentUser = null;
    showAuthForm();
    showStatus("Logged out successfully!");
  });

  // Send note button
  document.getElementById("sendNote").addEventListener("click", async () => {
    const noteText = document.getElementById("noteText").value.trim();
    const recipient = document.getElementById("recipient").value.trim();

    // Basic validation
    if (!noteText) {
      showStatus("Please write a note first!", true);
      return;
    }

    if (!recipient) {
      showStatus("Please enter recipient email!", true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient)) {
      showStatus("Please enter a valid email address!", true);
      return;
    }

    const sendBtn = document.getElementById("sendNote");
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    try {
      // Insert note into database
      const { data, error } = await supabaseClient.from("notes").insert([
        {
          content: noteText,
          sender_email: currentUser.email,
          recipient_email: recipient,
          is_read: false,
        },
      ]);

      if (error) {
        showStatus("Failed to send note: " + error.message, true);
      } else {
        showStatus("Note sent successfully!");
        // Clear the form
        document.getElementById("noteText").value = "";
        document.getElementById("recipient").value = "";
      }
    } catch (err) {
      showStatus("Failed to send note. Please try again.", true);
      console.error("Send note error:", err);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Note";
    }
  });
}
