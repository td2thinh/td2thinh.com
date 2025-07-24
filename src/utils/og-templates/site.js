import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

// Helper to construct Twemoji URLs
const twemojiURL = (codepoint) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codepoint}.svg`;

export default async () => {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "linear-gradient(135deg, #cba6f7 0%, #eff1f5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: '"Source Serif 4", "Source Code Pro"',
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-20%",
                right: "-10%",
                width: "120%",
                height: "120%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
                transform: "rotate(-25deg)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "32px",
                padding: "70px",
                width: "84%",
                height: "72%",
                boxShadow: "0 32px 64px -12px rgba(136, 57, 239, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              },
              children: [
                // Modern dot pattern background
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.08,
                      background: `
                                                radial-gradient(circle at 25px 25px, #cba6f7 2px, transparent 2px),
                                                radial-gradient(circle at 75px 75px, #cba6f7 1px, transparent 1px)
                                            `,
                      backgroundSize: "50px 50px, 25px 25px",
                    },
                  },
                },
                // Subtle grid lines
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.03,
                      background: `
                                                linear-gradient(90deg, #cba6f7 1px, transparent 1px),
                                                linear-gradient(180deg, #cba6f7 1px, transparent 1px)
                                            `,
                      backgroundSize: "60px 60px",
                    },
                  },
                },
                // Decorative corner accents
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(45deg, rgba(136, 57, 239, 0.1) 0%, transparent 70%)",
                      borderRadius: "50%",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      width: "100px",
                      height: "100px",
                      background: "linear-gradient(-45deg, rgba(136, 57, 239, 0.06) 0%, transparent 60%)",
                      borderRadius: "50%",
                    },
                  },
                },
                {
                  type: "img",
                  props: {
                    src: twemojiURL("1f680"), // 🚀
                    width: 70,
                    height: 70,
                    style: {
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                      opacity: "0.12",
                      transform: "rotate(-20deg)",
                    },
                  },
                },
                {
                  type: "img",
                  props: {
                    src: twemojiURL("1f4ab"), // 💫
                    width: 55,
                    height: 55,
                    style: {
                      position: "absolute",
                      bottom: "-5px",
                      right: "-5px",
                      opacity: "0.12",
                      transform: "rotate(25deg)",
                    },
                  },
                },
                {
                  type: "img",
                  props: {
                    src: twemojiURL("1f310"), // 🌐
                    width: 80,
                    height: 80,
                    style: {
                      marginBottom: "30px",
                      filter: "drop-shadow(0 4px 8px rgba(136, 57, 239, 0.4))",
                      zIndex: 10,
                      position: "relative",
                    },
                  },
                },
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: 64,
                      fontWeight: 800,
                      color: "#4c4f69",
                      lineHeight: 1.1,
                      marginBottom: "16px",
                      zIndex: 10,
                      position: "relative",
                    },
                    children: SITE.title,
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontFamily: '"Source Code Pro"',
                      fontSize: 28,
                      color: "#cba6f7",
                      fontWeight: 500,
                      lineHeight: 1.5,
                      maxWidth: "90%",
                      marginBottom: "30px",
                      zIndex: 10,
                      position: "relative",
                    },
                    children: SITE.desc,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      bottom: "30px",
                      left: "0",
                      right: "0",
                      margin: "0 auto",
                      fontSize: 18,
                      color: "#4c4f69",
                      opacity: 0.7,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      justifyContent: "center",
                      zIndex: 10,
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: twemojiURL("1f517"), // 🔗
                          width: 18,
                          height: 18,
                        },
                      },
                      {
                        type: "span",
                        props: {
                          children: new URL(SITE.website).hostname,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
    }
  );
};