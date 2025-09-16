const mealsData = [
  {
    day: 1,
    coffee: '200 ml lapte + 3 espresso',
    meals: [
      {
        meal: 1,
        options: [
          {
            title: 'Omelet cu ton și ciuperci',
            ingredients: [
              '2 ouă + 100g albuș',
              '1 conservă ton 145g scurs',
              '100g ciuperci brune',
              '50g roșii',
              '1 linguriță ulei de măsline',
            ],
            method:
              'Sotează ciupercile, adaugă ton și roșiile; toarnă ouăle bătute, gătește ca omletă.',
            calories: 420,
            protein: 55,
          },
          {
            title: 'Wrap proteic cu hering și brânză',
            ingredients: [
              '1 lipie tortilla 50g',
              '1 conservă hering 125g scurs',
              '30g cremă de brânză light',
              '50g salată verde + castravete murat',
            ],
            method: 'Întinde crema pe lipie, adaugă hering și legume, rulează.',
            calories: 390,
            protein: 33,
          },
        ],
      },
      {
        meal: 2,
        options: [
          {
            title: 'Pulpe de pui cu legume asiatice și noodles',
            ingredients: [
              '200g pulpe pui fără piele',
              '200g legume asiatice congelate',
              '60g udon noodles',
              'Sos soia',
            ],
            method:
              'Sotează pulpele tăiate, adaugă legumele și noodles fierte, asezonează cu sos.',
            calories: 660,
            protein: 54,
          },
          {
            title: 'Lasagna rapidă cu ton și mozzarella',
            ingredients: [
              '4 foi lasagna 80g',
              '1 conservă ton 145g scurs',
              '150g roșii pasate',
              '50g mozzarella light',
            ],
            method:
              'Montezi straturi cu ton și sos, presari mozzarella, coci 20 min la 180°C.',
            calories: 640,
            protein: 42,
          },
        ],
      },
    ],
  },
  {
    day: 2,
    coffee: '200 ml lapte + 3 espresso',
    meals: [
      {
        meal: 1,
        options: [
          {
            title: 'Omletă cu ciuperci și parmezan',
            ingredients: [
              '2 ouă + 100g albuș',
              '100g ciuperci brune',
              '25g parmezan',
              '1 linguriță ulei',
            ],
            method:
              'Sotează ciupercile, adaugă ouăle bătute, presari parmezan.',
            calories: 410,
            protein: 34,
          },
          {
            title: 'Smoothie cu iaurt și măr',
            ingredients: [
              '200ml lapte',
              '150g iaurt grecesc',
              '1 măr',
              '20g ovăz',
            ],
            method: 'Blenduiește totul până se omogenizează.',
            calories: 390,
            protein: 24,
          },
        ],
      },
      {
        meal: 2,
        options: [
          {
            title: 'Aripi de pui cu legume mexicane',
            ingredients: [
              '200g aripi de pui',
              '250g legume mexicane',
              '70g orez basmati',
            ],
            method: 'Coci aripile, fierbi orezul, sotezi legumele.',
            calories: 670,
            protein: 46,
          },
          {
            title: 'Lasagna cu piept de pui și sos de roșii',
            ingredients: [
              '4 foi lasagna 80g',
              '150g piept de pui gătit',
              '150g roșii pasate',
              '40g mozzarella light',
            ],
            method: 'Montezi straturi și coci 20 min la 180°C.',
            calories: 640,
            protein: 44,
          },
        ],
      },
    ],
  },
];

// Populare select
const daySelect = document.getElementById('day-select');
const dayNumber = document.getElementById('day-number');
const coffeeEl = document.getElementById('coffee');
const mealsContainer = document.getElementById('meals-container');

mealsData.forEach((day) => {
  const option = document.createElement('option');
  option.value = day.day;
  option.textContent = `Ziua ${day.day}`;
  daySelect.appendChild(option);
});

// Funcție afișare zi
function displayDay(dayNum) {
  const dayData = mealsData.find((d) => d.day == dayNum);
  if (!dayData) return;

  dayNumber.textContent = dayData.day;
  coffeeEl.textContent = `Cafea: ${dayData.coffee}`;
  mealsContainer.innerHTML = '';

  dayData.meals.forEach((meal) => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');

    const mealTitle = document.createElement('h3');
    mealTitle.textContent = `Meal ${meal.meal}`;
    mealDiv.appendChild(mealTitle);

    // Toggle între opțiuni
    const optionContainers = [];
    meal.options.forEach((option) => {
      const optDiv = document.createElement('div');
      optDiv.classList.add('option-container');

      const title = document.createElement('h4');
      title.innerHTML = `${option.title} <span class="heart">♥</span>`;
      optDiv.appendChild(title);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('option-content');

      const ingr = document.createElement('p');
      ingr.textContent = `Ingrediente: ${option.ingredients.join(', ')}`;
      contentDiv.appendChild(ingr);

      const method = document.createElement('p');
      method.textContent = `Mod de preparare: ${option.method}`;
      contentDiv.appendChild(method);

      const cal = document.createElement('p');
      cal.textContent = `Calorii: ${option.calories} kcal / Proteine: ${option.protein} g`;
      contentDiv.appendChild(cal);

      optDiv.appendChild(contentDiv);
      mealDiv.appendChild(optDiv);

      contentDiv.style.display = 'none';
      optionContainers.push(contentDiv);
    });

    // Arată prima opțiune inițial
    if (optionContainers.length > 0)
      optionContainers[0].style.display = 'block';

    // Buton toggle între opțiuni
    if (optionContainers.length > 1) {
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = 'Vezi cealaltă opțiune';
      let current = 0;
      toggleBtn.addEventListener('click', () => {
        optionContainers[current].style.display = 'none';
        current = (current + 1) % optionContainers.length;
        optionContainers[current].style.display = 'block';
      });
      mealDiv.appendChild(toggleBtn);
    }

    mealsContainer.appendChild(mealDiv);
  });
}

// Inițial ziua 1
displayDay(1);

// Change event
daySelect.addEventListener('change', (e) => displayDay(e.target.value));
