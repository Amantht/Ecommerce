import { useEffect } from "react";

function ChatWidget() {
  useEffect(() => {
    const Tawk_API = Tawk_API || {};
    const Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = import.meta.env.VITE_TAWK_URL;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, []);

  return null;
}

export default ChatWidget;
