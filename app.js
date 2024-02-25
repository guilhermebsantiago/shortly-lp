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
    const response = await fetch('https://cleanuri.com/api/v1/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(originalUrl)}`,
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
    errorP.classList.remove('invisible');
    errorP.classList.add('visible');
    return;
  }

  const originalUrl = inputUrl.value;
  const { error, result_url } = await getShortenUrl(originalUrl);

  if (error) {
    errorP.innerText = error;
    if (errorP.classList.contains('invisible')) {
      errorP.classList.toggle('invisible');
    }
    return
  }

  saveUrl(result_url, originalUrl);
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

    const innerDiv = document.createElement("div")
    innerDiv.classList.add("flex")
    innerDiv.classList.add("gap-4")
    innerDiv.classList.add("items-center")

    const p = document.createElement("p")
    p.innerText = element.originalUrl;

    const a = document.createElement("a")
    a.innerHTML = element.resultUrl
    a.href = element.resultUrl
    a.classList.add("text-primary-cyan")
    a.classList.add("cursor-pointer")

    const btn = document.createElement("button")
    btn.innerHTML = "Copy"
    btn.classList.add("text-white")
    btn.classList.add("bg-primary-cyan")
    btn.classList.add("px-10")
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





