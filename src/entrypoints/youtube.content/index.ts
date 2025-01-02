export default defineContentScript({
  matches: ["https://www.youtube.com/*"],
  allFrames: true,
  main() {
    console.log("Hello content.");
  },
});
