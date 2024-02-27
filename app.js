async function getShortenUrl(link) {
  const data = {
    url: link
  };

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    const result = await response.json();
    console.log(result)
    return result
  } catch (error) {
    console.error('Erro:', error);
  }
}
let inputUrl;
let savedUrls = []

async function getShortenUrl(originalUrl) {
  try {
    const dataToFetch = {url:originalUrl.toString()}
    const response = await fetch('https://shrtlnk.dev/api/v2/link', {
      method: 'POST',
      body: JSON.parse(dataToFetch),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'api-key': 'QXDcqzJtwUR2gTU1QT8GR76IvDCp6erjhyAoQ0Ehj1qnn'
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    return { error: 'Failed to fetch' };
  }
}

async function getValue() {
  const errorP = document.getElementById('error-p');
  const inputUrl = document.getElementById('link');

  if (!inputUrl.value) {
    errorP.innerText = 'Please add a link';
    errorP.classList.toggle("hidden")

    return;
  }

  const originalUrl = inputUrl.value;
  const { message, result_url: shrtlnk } = await getShortenUrl(originalUrl);

  if (message) {
    errorP.innerText = message;
    if (errorP.classList.contains('hidden')) {
      errorP.classList.toggle('hidden');
    }
    return
  }

  saveUrl(shrtlnk, originalUrl);
}

function saveUrl(result_url, originalUrl) {

  savedUrls.push({
    resultUrl: result_url,
    originalUrl: originalUrl,
  });

  const savedUrlsInArray = JSON.stringify(savedUrls);
  localStorage.setItem('urls', savedUrlsInArray);

  generateDivs()
}

function generateDivs(){
  const savedLocalUrls = JSON.parse(localStorage.getItem('urls'))
  if(!savedLocalUrls) return
  savedUrls = savedLocalUrls;
  const urlsDiv= document.getElementById("urls")

  savedUrls.forEach(element => {
    const div = document.createElement("div")
    div.classList.add("flex")
    div.classList.add("justify-between")
    div.classList.add("p-4")
    div.classList.add("mt-4")
    div.classList.add("bg-white")
    div.classList.add("rounded-lg")
    div.classList.add("gap-4")
    div.classList.add("items-center")
    div.classList.add("sm:flex-row")
    div.classList.add("flex-col")
    div.classList.add("divide-y")
    div.classList.add("sm:divide-none")

    const innerDiv = document.createElement("div")
    innerDiv.classList.add("flex")
    innerDiv.classList.add("gap-4")
    innerDiv.classList.add("sm:items-center")
    innerDiv.classList.add("items-start")
    innerDiv.classList.add("sm:flex-row")
    innerDiv.classList.add("flex-col")
    innerDiv.classList.add("sm:justify-end")
    innerDiv.classList.add("sm:justify-start")
    innerDiv.classList.add("w-full")

    const p = document.createElement("p")
    p.innerText = element.originalUrl;

    const a = document.createElement("a")
    a.innerHTML = element.resultUrl
    a.href = element.resultUrl
    a.classList.add("text-primary-cyan")
    a.classList.add("cursor-pointer")
    a.classList.add("pt-2")
    a.classList.add("sm:pt-0")

    const btn = document.createElement("button")
    btn.innerHTML = "Copy"
    btn.classList.add("text-white")
    btn.classList.add("bg-primary-cyan")
    btn.classList.add("px-10")
    btn.classList.add("sm:w-auto")
    btn.classList.add("w-full")
    btn.classList.add("py-2")
    btn.classList.add("rounded-lg")
    btn.classList.add("cursor-pointer")
    btn.classList.add("transition-all")
    btn.classList.add("active:bg-primary-cyan/75")
    btn.addEventListener('click', ()=>{
      navigator.clipboard.writeText(element.resultUrl)
      btn.innerText="Copied!"
      btn.classList.remove("bg-primary-cyan")
      btn.classList.add("bg-primary-dark-violet")
      setTimeout(()=>{
        btn.classList.add("bg-primary-cyan")
        btn.classList.remove("bg-primary-dark-violet")
        btn.innerText="Copy"
      },3000)
    })

    div.appendChild(p)
    innerDiv.appendChild(a)
    innerDiv.appendChild(btn)
    div.appendChild(innerDiv)

    urlsDiv.appendChild(div)

  });
}

document.addEventListener('DOMContentLoaded', function () {
  generateDivs();
});

function toggleMobileNav(){
  const mobileNav = document.getElementById("mobile-nav")
  mobileNav.classList.toggle("hidden")
}




