import { defineKeyframes } from "@pandacss/dev";

// Define the base RGB string
const spinnerColor = "255, 255, 255";

export const keyframes = defineKeyframes({
  mulShdSpin: {
    "0%": {
      boxShadow:
        // Opacities: 1.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.7
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 1), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.7)`,
    },
    "12.5%": {
      boxShadow:
        // Opacities: 0.7, 1.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.7), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 1), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.5)`,
    },
    "25%": {
      boxShadow:
        // Opacities: 0.5, 0.7, 1.0, 0.2, 0.2, 0.2, 0.2, 0.2
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.5), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 1), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2)`,
    },
    "37.5%": {
      boxShadow:
        // Opacities: 0.2, 0.5, 0.7, 1.0, 0.2, 0.2, 0.2, 0.2
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.2), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 1), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2)`,
    },
    "50%": {
      boxShadow:
        // Opacities: 0.2, 0.2, 0.5, 0.7, 1.0, 0.2, 0.2, 0.2
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.2), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 1), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2)`,
    },
    "62.5%": {
      boxShadow:
        // Opacities: 0.2, 0.2, 0.2, 0.5, 0.7, 1.0, 0.2, 0.2
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.2), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 1), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2)`,
    },
    "75%": {
      boxShadow:
        // Opacities: 0.2, 0.2, 0.2, 0.2, 0.5, 0.7, 1.0, 0.2
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.2), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 1), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2)`,
    },
    "87.5%": {
      boxShadow:
        // Opacities: 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.7, 1.0
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 0.2), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.7), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 1)`,
    },
    "100%": {
      boxShadow:
        // Opacities: 1.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.7 (loops back to 0%)
        `0em -2.6em 0em 0em rgba(${spinnerColor}, 1), ` +
        `1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `2.5em 0em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `1.75em 1.75em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `0em 2.5em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-1.8em 1.8em 0 0em rgba(${spinnerColor}, 0.2), ` +
        `-2.6em 0em 0 0em rgba(${spinnerColor}, 0.5), ` +
        `-1.8em -1.8em 0 0em rgba(${spinnerColor}, 0.7)`,
    },
  },
});
