import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { NotificationToast } from "@/components/toaster/NotificationToaster";
import { queryClient } from "../tanstackConfig/tanstackConfig";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const messaging = getMessaging(app);

export const requestForToken = async (): Promise<string | null> => {
  try {
    if (!("Notification" in window)) {
      console.warn("Notifications not supported in this browser");
      return null;
    }

    if (!("serviceWorker" in navigator)) {
      console.warn("Service workers not supported in this browser");
      return null;
    }

    console.log("Registering service worker...");
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker registered:", registration);

    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);

    if (permission !== "granted") {
      console.warn("Notification permission not granted");
      return null;
    }

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log("FCM TOKEN:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
    return null;
  }
};

export const listenForForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    const title = payload.notification?.title || "New Notification";
    const body = payload.notification?.body || "You have a new message";

    queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
    toast.custom((t) => <NotificationToast t={t} title={title} body={body} />, {
      duration: 3000,
    });
  });
};
