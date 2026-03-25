/**
 * Shows a custom alert that disappears automatically.
 * @param {string} message - The message to display.
 * @param {number} duration - Time in milliseconds before it disappears.
 */
export function autoCloseAlert(message, duration = 3000) {
  // Create alert element
  const alertBox = document.createElement('div');
  alertBox.className = 'customAlert';
  alertBox.textContent = message;

  // Add to page
  document.body.appendChild(alertBox);

  // Show with fade-in
  requestAnimationFrame(() => alertBox.classList.add('show'));

  // Remove after duration
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => alertBox.remove(), 300); // Wait for fade-out
  }, duration);
}