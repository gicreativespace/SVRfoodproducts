
(() => {
  "use strict";

  const data = window.COTTON_KNOWLEDGE;
  const languageSelect = document.getElementById("language");
  const productsContainer = document.getElementById("products");
  const form = document.getElementById("question-form");
  const questionInput = document.getElementById("question");
  const answerBox = document.getElementById("answer");

  let currentLanguage = "both";

  function languageMode() {
    return currentLanguage === "en" ? "en" : "te";
  }

  function renderProducts() {
    productsContainer.replaceChildren();

    data.products.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";

      const imageWrap = document.createElement("div");
      imageWrap.className = "product-image";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      image.loading = "lazy";

      image.onerror = () => {
        image.remove();
        const fallback = document.createElement("span");
        fallback.className = "image-fallback";
        fallback.textContent = "🌾";
        imageWrap.appendChild(fallback);
      };

      imageWrap.appendChild(image);

      const info = document.createElement("div");
      info.className = "product-info";

      const title = document.createElement("h3");
      title.textContent = languageMode() === "te"
        ? product.telugu
        : product.title;

      const description = document.createElement("p");
      description.textContent = product.description;

      const sizes = document.createElement("p");
      sizes.className = "pack-sizes";
      sizes.textContent =
        (languageMode() === "te" ? "ప్యాక్ పరిమాణాలు: " : "Pack sizes: ") +
        product.sizes.join(", ");

      info.append(title, description, sizes);
      card.append(imageWrap, info);
      productsContainer.appendChild(card);
    });
  }

  function applyLanguage() {
    document.documentElement.lang =
      currentLanguage === "en" ? "en" : "te";

    document.querySelectorAll("[data-te][data-en]").forEach(element => {
      element.textContent =
        currentLanguage === "en"
          ? element.dataset.en
          : element.dataset.te;
    });

    questionInput.placeholder = currentLanguage === "en"
      ? "e.g. How do I prepare the 1 + 5 combination?"
      : "ఉదా: 1 + 5 కాంబినేషన్ ఎలా తయారు చేయాలి?";

    renderProducts();
  }

  function normalize(text) {
    return text
      .toLocaleLowerCase()
      .replace(/[.,!?;:()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findAnswer(question) {
    const q = normalize(question);

    if (!q) return null;

    const matches = data.faq
      .map(item => {
        let score = 0;

        item.keys.forEach(key => {
          const normalizedKey = normalize(key);

          if (q.includes(normalizedKey)) {
            score += normalizedKey.length > 3 ? 3 : 1;
          }
        });

        return { item, score };
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score);

    return matches.length ? matches[0].item : null;
  }

  function addText(parent, text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }

  function showAnswer(question) {
    answerBox.replaceChildren();
    answerBox.hidden = false;

    const heading = document.createElement("h3");
    heading.textContent = currentLanguage === "en"
      ? "Cotton Mitra's response"
      : "Cotton Mitra సమాధానం";

    answerBox.appendChild(heading);

    const match = findAnswer(question);

    if (match) {
      const answer = match.answer[languageMode()];
      addText(answerBox, answer);
    } else {
      addText(
        answerBox,
        currentLanguage === "en"
          ? "Sorry, I can currently answer only questions about SVR Idly Ravva, Urad Gota, the 1 + 5 combination, idli preparation guidance and SVR product information. For other questions or unlisted details, please contact our team."
          : "క్షమించండి. ప్రస్తుతం SVR Idly Ravva, Urad Gota, 1 + 5 కాంబినేషన్, ఇడ్లీ తయారీ సూచనలు మరియు SVR ఉత్పత్తుల సమాచారానికి సంబంధించిన ప్రశ్నలకు మాత్రమే సమాధానం ఇవ్వగలను. ఇతర ప్రశ్నలు లేదా అందుబాటులో లేని వివరాల కోసం మా బృందాన్ని సంప్రదించండి."
      );

      const contact = document.createElement("a");
      contact.className = "button primary";
      contact.href = "https://wa.me/" + data.contacts.whatsapp1;
      contact.target = "_blank";
      contact.rel = "noopener";
      contact.textContent = currentLanguage === "en"
        ? "Ask us on WhatsApp"
        : "WhatsAppలో సంప్రదించండి";

      answerBox.appendChild(contact);
    }

    answerBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  languageSelect.addEventListener("change", event => {
    currentLanguage = event.target.value;
    applyLanguage();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    showAnswer(questionInput.value);
  });

  applyLanguage();
})();
