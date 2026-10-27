
(() => {
  "use strict";

  const data = window.COTTON_KNOWLEDGE;

  const languageSelect = document.getElementById("language");
  const productsContainer = document.getElementById("products");
  const form = document.getElementById("question-form");
  const questionInput = document.getElementById("question");
  const answerBox = document.getElementById("answer");

  if (!data || !Array.isArray(data.products)) {
    console.error("Cotton Mitra: knowledge.js data is missing.");
    if (productsContainer) {
      productsContainer.textContent =
        "Product information is temporarily unavailable.";
    }
    return;
  }

  let currentLanguage = "te";

  const fallbackText = {
    te: "చిత్రం అందుబాటులో లేదు",
    en: "Image unavailable"
  };

  function textFor(te, en) {
    return currentLanguage === "en" ? en : te;
  }

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase()
      .replace(/[.,!?;:()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function setProductImage(image, imageWrap, imagePath, altText) {
    image.alt = altText;
    image.loading = "lazy";
    image.decoding = "async";

    // Prevent repeated error handlers if a size is changed.
    image.onerror = () => {
      image.onerror = null;
      image.remove();

      let fallback = imageWrap.querySelector(".image-fallback");

      if (!fallback) {
        fallback = document.createElement("span");
        fallback.className = "image-fallback";
        fallback.setAttribute("role", "img");
        imageWrap.appendChild(fallback);
      }

      fallback.textContent = "🌾 " + fallbackText[currentLanguage];
    };

    const fallback = imageWrap.querySelector(".image-fallback");
    if (fallback) fallback.remove();

    image.src = imagePath || "";
  }

  function renderProducts() {
    if (!productsContainer) return;

    productsContainer.replaceChildren();

    data.products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      const imageWrap = document.createElement("div");
      imageWrap.className = "product-image";

      const image = document.createElement("img");
      imageWrap.appendChild(image);

      const info = document.createElement("div");
      info.className = "product-info";

      const title = document.createElement("h3");
      title.textContent = textFor(product.telugu, product.title);

      const description = document.createElement("p");
      description.textContent = product.description || "";

      const variants = Array.isArray(product.variants)
        ? product.variants
        : [];

      const legacySizes = Array.isArray(product.sizes)
        ? product.sizes
        : [];

      const usableVariants = variants.length
        ? variants
        : legacySizes.map((size) => ({
            size,
            image: product.image || ""
          }));

      let sizeLabel = null;
      let sizeSelect = null;

      if (usableVariants.length) {
        sizeLabel = document.createElement("label");
        sizeLabel.className = "size-label";
        sizeLabel.textContent = textFor(
          "ప్యాక్ పరిమాణం ఎంచుకోండి",
          "Select pack size"
        );

        sizeSelect = document.createElement("select");
        sizeSelect.className = "size-select";
        sizeSelect.setAttribute(
          "aria-label",
          textFor("ప్యాక్ పరిమాణం", "Pack size")
        );

        usableVariants.forEach((variant, index) => {
          const option = document.createElement("option");
          option.value = String(index);
          option.textContent = variant.size || "Pack";
          sizeSelect.appendChild(option);
        });

        function showSelectedVariant() {
          const selected = usableVariants[Number(sizeSelect.value)] ||
            usableVariants[0];

          if (!selected) return;

          const altText = (product.title || "SVR product") +
            " - " + (selected.size || "");

          setProductImage(
            image,
            imageWrap,
            selected.image,
            altText
          );
        }

        sizeSelect.addEventListener("change", showSelectedVariant);

        info.appendChild(sizeLabel);
        info.appendChild(sizeSelect);

        // Display the first size by default.
        showSelectedVariant();
      } else {
        setProductImage(
          image,
          imageWrap,
          product.image || "",
          product.title || "SVR product"
        );
      }

      const enquiry = document.createElement("a");
      enquiry.className = "button primary product-enquiry";
      enquiry.href =
        "https://wa.me/" +
        (data.contacts?.whatsapp1 || "919491084447");

      enquiry.target = "_blank";
      enquiry.rel = "noopener noreferrer";
      enquiry.textContent = textFor(
        "ధర / వివరాల కోసం WhatsApp",
        "Enquire on WhatsApp"
      );

      info.append(title, description, enquiry);
      card.append(imageWrap, info);
      productsContainer.appendChild(card);
    });
  }

  function applyLanguage() {
    document.documentElement.lang =
      currentLanguage === "en" ? "en" : "te";

    document.querySelectorAll("[data-te][data-en]").forEach((element) => {
      element.textContent =
        currentLanguage === "en"
          ? element.dataset.en
          : element.dataset.te;
    });

    if (questionInput) {
      questionInput.placeholder = textFor(
        "ఉదా: 1 + 5 కాంబినేషన్ ఎలా తయారు చేయాలి?",
        "e.g. How do I prepare the 1 + 5 combination?"
      );
    }

    renderProducts();
  }

  function findAnswer(question) {
    const q = normalize(question);

    if (!q || !Array.isArray(data.faq)) return null;

    const matches = data.faq
      .map((item) => {
        let score = 0;

        (item.keys || []).forEach((key) => {
          const normalizedKey = normalize(key);

          if (normalizedKey && q.includes(normalizedKey)) {
            score += normalizedKey.length > 3 ? 3 : 1;
          }
        });

        return { item, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    return matches.length ? matches[0].item : null;
  }

  function addText(parent, value) {
    const paragraph = document.createElement("p");
    paragraph.textContent = value;
    parent.appendChild(paragraph);
  }

  function showAnswer(question) {
    if (!answerBox) return;

    answerBox.replaceChildren();
    answerBox.hidden = false;

    const heading = document.createElement("h3");
    heading.textContent = textFor(
      "Cotton Mitra సమాధానం",
      "Cotton Mitra's response"
    );
    answerBox.appendChild(heading);

    const match = findAnswer(question);

    if (match && match.answer) {
      addText(
        answerBox,
        match.answer[currentLanguage] ||
          match.answer.te ||
          match.answer.en ||
          textFor(
            "ఈ ప్రశ్నకు సమాధానం అందుబాటులో లేదు.",
            "An answer is not available for this question."
          )
      );
    } else {
      addText(
        answerBox,
        textFor(
          "క్షమించండి. ప్రస్తుతం SVR Idly Ravva, Rice Ravva, Urad Gota, 1 + 5 కాంబినేషన్, ఇడ్లీ తయారీ draft సూచనలు మరియు SVR ఉత్పత్తుల సమాచారానికి సంబంధించిన ప్రశ్నలకు మాత్రమే సమాధానం ఇవ్వగలను. ఇతర వివరాల కోసం మా బృందాన్ని సంప్రదించండి.",
          "Sorry, I can currently answer only questions about SVR Idly Ravva, Rice Ravva, Urad Gota, the 1 + 5 combination, draft idli preparation guidance and SVR product information. Please contact our team for other details."
        )
      );

      const contact = document.createElement("a");
      contact.className = "button primary";
      contact.href =
        "https://wa.me/" +
        (data.contacts?.whatsapp1 || "919491084447");

      contact.target = "_blank";
      contact.rel = "noopener noreferrer";
      contact.textContent = textFor(
        "WhatsAppలో సంప్రదించండి",
        "Ask us on WhatsApp"
      );

      answerBox.appendChild(contact);
    }

    answerBox.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      currentLanguage = event.target.value === "en" ? "en" : "te";
      applyLanguage();
    });
  }

  if (form && questionInput) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showAnswer(questionInput.value);
    });
  }

  applyLanguage();
})();
