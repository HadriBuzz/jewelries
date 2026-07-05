const TYPE_LABELS = {
  bague: "Bague",
  bracelet: "Bracelet",
  boucle: "Boucle",
  boucles: "Boucles",
  collier: "Collier",
  pendentif: "Pendentif",
};

const TYPE_DESCRIPTIONS = {
  bague: "Une piece delicate pensee pour accompagner les instants precieux.",
  bracelet: "Un bracelet lumineux a porter seul ou en accumulation.",
  boucle: "Une creation elegante qui apporte de la lumiere au visage.",
  boucles: "Une creation elegante qui apporte de la lumiere au visage.",
  collier: "Un collier equilibre qui sublime la silhouette avec douceur.",
  pendentif: "Un pendentif fin au style intemporel et raffine.",
};

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function humanizeName(rawName) {
  return rawName
    .split("-")
    .filter(Boolean)
    .map(capitalize)
    .join(" ");
}

function parseFilename(filename) {
  const cleanName = filename.replace(/\.[^.]+$/, "");
  const [prefix, type, price, ...nameParts] = cleanName.split("_");

  if (prefix !== "bijou" || !type || !price || nameParts.length === 0) {
    return null;
  }

  const numericPrice = Number(price);
  const name = humanizeName(nameParts.join("_").replaceAll("_", "-"));
  const typeLabel = TYPE_LABELS[type] || capitalize(type);

  return {
    filename,
    imagePath: `images/${filename}`,
    type,
    typeLabel,
    price: Number.isFinite(numericPrice) ? numericPrice : price,
    name,
    title: `${typeLabel} ${name}`,
    description: TYPE_DESCRIPTIONS[type] || "Une piece singuliere a l'allure minimaliste et elegante.",
  };
}

function renderHero(products) {
  const heroVisual = document.getElementById("hero-visual");

  heroVisual.innerHTML = products
    .slice(0, 2)
    .map(
      (product) => `
        <div class="gem-card">
          <div class="gemstone">
            <img src="${product.imagePath}" alt="${product.title}" loading="eager" />
          </div>
          <p class="gem-name">${product.title}</p>
        </div>
      `
    )
    .join("");
}

function renderProducts(products) {
  const productGrid = document.getElementById("product-grid");

  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">
            <img src="${product.imagePath}" alt="${product.title}" loading="lazy" />
          </div>
          <div class="product-copy">
            <span class="product-type">${product.typeLabel}</span>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <span class="price">€${product.price}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderMessage(message) {
  const heroVisual = document.getElementById("hero-visual");
  const productGrid = document.getElementById("product-grid");
  const markup = `<p class="status-message">${message}</p>`;

  heroVisual.innerHTML = markup;
  productGrid.innerHTML = markup;
}

async function loadCatalog() {
  try {
    const response = await fetch("catalog.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const entries = await response.json();
    const products = entries.map(parseFilename).filter(Boolean);

    if (products.length === 0) {
      renderMessage("Aucun bijou n'est visible pour le moment.");
      return;
    }

    renderHero(products);
    renderProducts(products);
  } catch (error) {
    console.error("Impossible de charger le catalogue:", error);
    renderMessage("Le catalogue n'a pas pu etre charge.");
  }
}

loadCatalog();
