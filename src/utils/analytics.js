export function sendGAEvent(eventName, eventCategory, eventLabel) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  }
}
