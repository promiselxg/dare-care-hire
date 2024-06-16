"use client";
import { useEffect } from "react";

const Tawk = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document?.createElement("script"),
        s0 = document?.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/666eddcb981b6c56477de54b/1i0gh4pgc";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null;
};

export default Tawk;
