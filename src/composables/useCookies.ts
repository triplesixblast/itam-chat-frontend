import { ref } from "vue";

export enum COOKIES {
  "jwtToken" = "jwtToken",
}

// Helper function to read from document.cookie (non-reactive)
function getCookieFromDocument(cname: string): string {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i] as string;
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Reactive cookie store - similar to error store pattern
// This allows Vue watchers to detect cookie changes
// Initialize the ref from the actual cookie value on module load
const jwtTokenRef = ref<string>(getCookieFromDocument(COOKIES.jwtToken));

// Legacy function for backward compatibility (non-reactive)
export function getCookie(cname: string) {
  if (cname === COOKIES.jwtToken) {
    // Return reactive value for JWT token
    return jwtTokenRef.value;
  }
  // For other cookies, read from document directly
  return getCookieFromDocument(cname);
}

// Reactive getter for JWT token (use this in watchers)
export function useJwtToken() {
  return jwtTokenRef;
}

// Updated setCookie to also update reactive ref
export function setCookie(cname: string, cvalue: any, exdays = 14) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

  // Update reactive ref if it's the JWT token
  if (cname === COOKIES.jwtToken) {
    jwtTokenRef.value = cvalue;
  }
}

// Function to clear cookie and update reactive ref
export function removeCookie(cname: string) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Update reactive ref if it's the JWT token
  if (cname === COOKIES.jwtToken) {
    jwtTokenRef.value = "";
  }
}
