const galleryData = [
    {
        image: "img/mounts.png",
        title: "Горы",
        description: "Красивый вид на горы.",
        tags: ["nature"]
    },
    {
        image: "img/лев.png",
        title: "Лев",
        description: "Царь зверей в дикой природе.",
        tags: ["animals"]
    },
    {
        image: "img/город.png",
        title: "Нью-Йорк",
        description: "Панорама города Нью-Йорк.",
        tags: ["cities"]
    },
    {
        image: "img/лес.png",
        title: "Лес",
        description: "Зеленый лес с густыми деревьями.",
        tags: ["nature"]
    },
    {
        image: "img/слон.png",
        title: "Слон",
        description: "Слон в саванне.",
        tags: ["animals"]
    },
    {
        image: "img/башня.png",
        title: "Париж",
        description: "Эйфелева башня в Париже.",
        tags: ["cities"]
    }
];

function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const tags = document.createElement("div");
    tags.classList.add("tags");
    item.tags.forEach(tag => {
        const tagSpan = document.createElement("span");
        tagSpan.textContent = tag;
        tags.appendChild(tagSpan);
    });

    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardContent.appendChild(tags);

    card.appendChild(image);
    card.appendChild(cardContent);

    return card;
}

// Функция для отображения карточек
function displayCards(data) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    data.forEach(item => {
        const card = createCard(item);
        gallery.appendChild(card);
    });
}

// Функция для фильтрации карточек
function filterCards(filter) {
    const filteredData = filter === "all" 
        ? galleryData 
        : galleryData.filter(item => item.tags.includes(filter));
    displayCards(filteredData);

    // Анимация исчезновения и появления карточек
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.classList.add("hide");
        setTimeout(() => {
            card.classList.remove("hide");
        }, 300);
    });
}

// Инициализация галереи
displayCards(galleryData);

// Обработчики событий для кнопок фильтрации
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        filterCards(filter);
    });
});

// Обработчик события для формы добавления изображения
document.getElementById("addImageForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем данные из формы
    const imageFile = document.getElementById("imageFile").files[0];
    const imageTitle = document.getElementById("imageTitle").value;
    const imageDescription = document.getElementById("imageDescription").value;
    const imageTags = document.getElementById("imageTags").value.split(',').map(tag => tag.trim());

    // Проверяем, что файл был выбран
    if (!imageFile) {
        alert("Пожалуйста, выберите изображение.");
        return;
    }

    // Создаем URL для выбранного изображения
    const imageUrl = URL.createObjectURL(imageFile);

    // Создаем новый объект для карточки
    const newCard = {
        image: imageUrl,
        title: imageTitle,
        description: imageDescription,
        tags: imageTags
    };

    // Добавляем новую карточку в массив galleryData
    galleryData.push(newCard);

    // Обновляем отображение галереи
    displayCards(galleryData);

    // Очищаем форму
    document.getElementById("addImageForm").reset();
});