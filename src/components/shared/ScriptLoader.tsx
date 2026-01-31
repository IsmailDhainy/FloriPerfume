import { useEffect } from "react";

function ScriptLoader() {
  useEffect(() => {
    const scripts = [
      "/js/jquery.min.js",
      "/js/bootstrap.min.js",
      "/js/swiper-bundle.min.js",
      "/js/carousel.js",
      "/js/bootstrap-select.min.js",
      "/js/lazysize.min.js",
      "/js/count-down.js",
      "/js/wow.min.js",
      "/js/multiple-modal.js",
      "/js/main.js",
      "/js/nouislider.min.js",
      "/js/shop.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // keep the correct order
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup (optional)
      scripts.forEach((src) => {
        const found = document.querySelector(`script[src="${src}"]`);
        if (found) found.remove();
      });
    };
  }, []);

  return null;
}

export default ScriptLoader;
