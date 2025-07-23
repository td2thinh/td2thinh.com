import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

// Helper to construct Twemoji URLs
const twemojiURL = (codepoint) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codepoint}.svg`;

export default async post => {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "linear-gradient(135deg, #8839ef 0%, #eff1f5 100%)",
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
                padding: "60px",
                width: "84%",
                height: "72%",
                boxShadow: "0 32px 64px -12px rgba(136, 57, 239, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                                                radial-gradient(circle at 25px 25px, #8839ef 2px, transparent 2px),
                                                radial-gradient(circle at 75px 75px, #8839ef 1px, transparent 1px)
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
                                                linear-gradient(90deg, #8839ef 1px, transparent 1px),
                                                linear-gradient(180deg, #8839ef 1px, transparent 1px)
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
                    src: twemojiURL("1f4dd"), // 📝
                    width: 60,
                    height: 60,
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
                    src: twemojiURL("2728"), // ✨
                    width: 50,
                    height: 50,
                    style: {
                      position: "absolute",
                      bottom: "-5px",
                      right: "-5px",
                      opacity: "0.12",
                      transform: "rotate(25deg)",
                    },
                  },
                },
                // Main content area
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      flex: 1,
                      justifyContent: "center",
                      zIndex: 10,
                      position: "relative",
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: twemojiURL("1f4d6"), // 📖
                          width: 60,
                          height: 60,
                          style: {
                            marginBottom: "20px",
                            filter: "drop-shadow(0 4px 8px rgba(136, 57, 239, 0.4))",
                          },
                        },
                      },
                      {
                        type: "h1",
                        props: {
                          style: {
                            fontSize: 56,
                            fontWeight: 800,
                            color: "#4c4f69",
                            lineHeight: 1.1,
                            marginBottom: "20px",
                            maxHeight: "60%",
                            overflow: "hidden",
                            textAlign: "center",
                          },
                          children: post.data.title,
                        },
                      },
                    ],
                  },
                },
                // Author and site info
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      fontSize: 24,
                      color: "#8839ef",
                      fontWeight: 500,
                      zIndex: 10,
                      position: "relative",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          },
                          children: [
                            {
                              type: "img",
                              props: {
                                src: twemojiURL("1f464"), // 👤
                                width: 20,
                                height: 20,
                              },
                            },
                            {
                              type: "span",
                              props: {
                                children: `by ${post.data.author}`,
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#4c4f69",
                            opacity: 0.8,
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
                                children: SITE.title,
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
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      ),
    }
  );
};