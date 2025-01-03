export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  self.addEventListener("fetch", (e) => {
    console.log(e);
  });
});
