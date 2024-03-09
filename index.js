const textarea = document.querySelector("textarea");
function autoResize() {
  console.log({scroll: textarea.scrollHeight});
  textarea.style.height = textarea.scrollHeight + "px";
  if (textarea.value === '') {
    textarea.style.height = "auto";
  }
}
textarea.addEventListener('input', autoResize);