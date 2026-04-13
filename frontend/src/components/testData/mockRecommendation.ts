import jockerImg from '../../assets/jocker_mock.jpg';
import jk_mock from '../../assets/jk_mock.jpg';
import jk2_mock from '../../assets/jk2_mock.jpg';

export interface RecommendationData {
    id: string;
    title: string;
    description: string;
    backgroundImage: string;
    rating: number;
    bottomLeftLabel: string;
    bottomLeftText: string;
    details: { label: string; value: string }[];
    galleryTitle: string;
    galleryImages: string[];
}

export const mockMovieRecommendations: RecommendationData[] = [
    {
        id: 'joker-2019',
        title: 'Джокер',
        description: 'Комік Артур Флек живе у Ґотем-сіті зі своєю хворою матір\'ю. Постійні приниження та самотність змушують його поступово втрачати розум.',
        backgroundImage: jockerImg, 
        rating: 4,
        bottomLeftLabel: 'Актори:',
        bottomLeftText: 'Хоакін Фенікс, Роберт Де Ніро',
        details: [
            { label: 'Прем\'єра', value: '2019' },
            { label: 'Режисер', value: 'Тод Філліпс' },
            { label: 'Жанр', value: 'Драма, Кримінал' }
        ],
        galleryTitle: 'Кадри з фільму',
        galleryImages: [jk_mock, jk2_mock]
    },
    {
        id: 'batman-2022',
        title: 'Бетмен',
        description: 'Два роки блукань вулицями Ґотема в ролі Бетмена, що вселяє жах у серця злочинців, привели Брюса Вейна в самі тіні міста.',
        backgroundImage: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1200', 
        rating: 5,
        bottomLeftLabel: 'Актори:',
        bottomLeftText: 'Роберт Паттінсон, Зої Кравіц',
        details: [
            { label: 'Прем\'єра', value: '2022' },
            { label: 'Режисер', value: 'Метт Рівз' },
            { label: 'Жанр', value: 'Екшн, Детектив' }
        ],
        galleryTitle: 'Кадри з фільму',
        galleryImages: ['https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800']
    }
];

export const mockBookRecommendations: RecommendationData[] = [
    {
        id: 'little-life-book',
        title: 'Маленьке життя',
        description: 'Глибока та болюча історія чотирьох друзів, які намагаються знайти себе у Нью-Йорку.',
        backgroundImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200', 
        rating: 5,
        bottomLeftLabel: 'Автор:',
        bottomLeftText: 'Ханья Янаґіхара',
        details: [
            { label: 'Дата публікації', value: '2015' },
            { label: 'Жанр', value: 'Драма, Психологія' },
            { label: 'Сторінок', value: '1000' }
        ],
        galleryTitle: 'Книга в ілюстраціях',
        galleryImages: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800']
    },
    {
        id: 'dune-book',
        title: 'Дюна',
        description: 'Історія про молодого Поля Атріда, чия родина приймає управління пустельною планетою Арракіс.',
        backgroundImage: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200', 
        rating: 5,
        bottomLeftLabel: 'Автор:',
        bottomLeftText: 'Френк Герберт',
        details: [
            { label: 'Дата публікації', value: '1965' },
            { label: 'Жанр', value: 'Фантастика' },
            { label: 'Сторінок', value: '896' }
        ],
        galleryTitle: 'Світ Дюни',
        galleryImages: ['https://images.unsplash.com/photo-1509316785289-025f5d846b35?q=80&w=800']
    }
];

export const mockSeriesRecommendations: RecommendationData[] = [
    {
        id: 'stranger-things',
        title: 'Дивні дива',
        description: 'У 1980-х роках у маленькому містечку зникає хлопчик. Поки друзі та поліція шукають відповіді, вони стикаються з містикою.',
        backgroundImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200', 
        rating: 5,
        bottomLeftLabel: 'У ролях:',
        bottomLeftText: 'Міллі Боббі Браун, Фінн Вулфгард',
        details: [
            { label: 'Режисер', value: 'Брати Даффер' },
            { label: 'Жанр', value: 'Фантастика, Жахи' },
            { label: 'Епізоди', value: '34 серії (4 сезони)' } 
        ],
        galleryTitle: 'Кадри з серіалу',
        galleryImages: ['https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=800']
    },
    {
        id: 'wednesday',
        title: 'Венздей',
        description: 'Дочка Гомеса та Мортіші Аддамс навчається в академії «Невермор», розслідуючи серію вбивств.',
        backgroundImage: 'https://images.unsplash.com/photo-1627315589602-092bf0788647?q=80&w=1200', 
        rating: 4,
        bottomLeftLabel: 'У ролях:',
        bottomLeftText: 'Дженна Ортега',
        details: [
            { label: 'Режисер', value: 'Тім Бертон' },
            { label: 'Жанр', value: 'Детектив, Фентезі' },
            { label: 'Епізоди', value: '8 серій (1 сезон)' }
        ],
        galleryTitle: 'Академія Невермор',
        galleryImages: ['https://images.unsplash.com/photo-1627315589602-092bf0788647?q=80&w=800']
    }
];

export const mockAnimeRecommendations: RecommendationData[] = [
    {
        id: 'attack-on-titan',
        title: 'Wangan Midnight',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        backgroundImage: 'https://i.pinimg.com/1200x/69/15/a4/6915a4e18b25a39f5388a6d49f90aff4.jpg', 
        rating: 5,
        bottomLeftLabel: 'Студія:',
        bottomLeftText: 'WIT Studio / MAPPA',
        details: [
            { label: 'Рік випуску', value: '2013' },
            { label: 'Жанр', value: 'Екшн, Драма' },
            { label: 'Епізоди', value: '94 серії' }
        ],
        galleryTitle: 'Кадри з аніме',
        galleryImages: ['https://i.pinimg.com/736x/de/3f/41/de3f41780849c2c5a472918fcc9be2ec.jpg', 'https://upload.wikimedia.org/wikipedia/en/9/9b/Wangan_Midnight_1.png', 'https://i1.sndcdn.com/artworks-zEAFMfy6y61VQlnj-17uwKg-t500x500.jpg', 'https://i.ytimg.com/vi/Onpx9bTR-xU/maxresdefault.jpg']
    },
    {
        id: 'death-note',
        title: 'Зошит смерті',
        description: 'Старшокласник знаходить магічний зошит, який дозволяє йому вбивати будь-кого, чиє ім’я він туди запише.',
        backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTgHj6Jk70MGnCuqOcF7UqIQLpaW7HWAEMXw&s', 
        rating: 5,
        bottomLeftLabel: 'Студія:',
        bottomLeftText: 'Madhouse',
        details: [
            { label: 'Рік випуску', value: '2006' },
            { label: 'Жанр', value: 'Трилер, Детектив' },
            { label: 'Епізоди', value: '37 серій' }
        ],
        galleryTitle: 'Рюку та Лайт',
        galleryImages: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTgHj6Jk70MGnCuqOcF7UqIQLpaW7HWAEMXw&s']
    }
];