const $textarea = document.querySelector("textarea");
const $copyButton = document.getElementById("copyButton");
const $encryptButton = document.getElementById("encryptButton");
const $decryptButton = document.getElementById("decryptButton");
const $resultMessage = document.getElementById('resultMessage');
const $resultInitial = document.querySelector('.result--initial');
const $resultFinal = document.querySelector('.result--final');
const $alertMessage = document.querySelector('.alert-mensaje');

$encryptButton.disabled = true;

const dictionary = {
  "a": "ai",
  "e": "enter",
  "i": "imes",
  "o": "ober",
  "u": "ufat"
}
const listOfLetters = ['a', 'e', 'i', 'o', 'u'];

function encrypt () {
  const charText = $textarea.value.toLowerCase().split('');
  let encryptedText = '';
  charText.forEach(char => {
    if (listOfLetters.includes(char)) {
      const word = dictionary[char];
      encryptedText += `${word}`;
    } else {
      encryptedText += `${char}`
    }
  })

  $resultInitial.classList.add('hidden');
  $resultFinal.classList.remove('hidden');
  $resultMessage.textContent = encryptedText;
}

function decrypt () {
  const encryptedText = $textarea.value.toLowerCase();
  const dictionaryEntries = Object.entries(dictionary)

  let finalText = encryptedText;
  dictionaryEntries.forEach(entry => {
    if(finalText.includes(entry[1])) {
      finalText = finalText.replaceAll(entry[1], entry[0]);
    }
  })
  $resultMessage.textContent = finalText;
}

function autoResize() {
  $encryptButton.disabled = false;

  if (window.innerWidth < 650) {
    $textarea.style.height = `${$textarea.scrollHeight}px`;
  }
  if ($textarea.value === '') {
    $textarea.style.height = "auto";
  }
}
$textarea.addEventListener('input', autoResize);
$encryptButton.onclick = encrypt;
$decryptButton.onclick = decrypt;

$copyButton.onclick = () => {
  navigator.clipboard.writeText($resultMessage.textContent).then(()=>{
    $alertMessage.textContent = 'Copiado en el portapapeles!';
    $alertMessage.classList.remove('hidden');
    setTimeout(() => {
      $alertMessage.classList.add('hidden');
    }, 1500)
  })
};
