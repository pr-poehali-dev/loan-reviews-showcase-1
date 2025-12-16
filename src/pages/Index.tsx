import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  companyName: string;
  reply?: {
    text: string;
    date: string;
  };
}

interface LoanCompany {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  rateFrom: string;
  approvalRate: number;
  approvalTime: string;
  firstLoanRate?: string;
  features: string[];
  verified?: boolean;
  topChoice?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [loanTerm, setLoanTerm] = useState([30]);
  const [sortBy, setSortBy] = useState('rating');
  const [filterAmount, setFilterAmount] = useState('all');
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5, company: '' });

  const loanCompanies: LoanCompany[] = [
    {
      id: 1,
      name: 'Быстроденьги',
      logo: '💰',
      rating: 4.8,
      reviewsCount: 2847,
      minAmount: 1000,
      maxAmount: 30000,
      minTerm: 7,
      maxTerm: 30,
      rateFrom: '0%',
      firstLoanRate: '0% для новых',
      approvalRate: 98,
      approvalTime: '5 минут',
      features: ['Первый займ 0%', 'Без отказа', 'Круглосуточно'],
      verified: true,
      topChoice: true,
    },
    {
      id: 2,
      name: 'МигКредит',
      logo: '⚡',
      rating: 4.7,
      reviewsCount: 5621,
      minAmount: 3000,
      maxAmount: 100000,
      minTerm: 10,
      maxTerm: 365,
      rateFrom: '0.5%',
      firstLoanRate: '0% до 10 000₽',
      approvalRate: 95,
      approvalTime: '10 минут',
      features: ['До 100 000₽', 'Продление займа', 'Без проверки КИ'],
      verified: true,
      topChoice: true,
    },
    {
      id: 3,
      name: 'Займер',
      logo: '🎯',
      rating: 4.6,
      reviewsCount: 3912,
      minAmount: 2000,
      maxAmount: 50000,
      minTerm: 7,
      maxTerm: 168,
      rateFrom: '0%',
      firstLoanRate: '0% до 30 дней',
      approvalRate: 96,
      approvalTime: '7 минут',
      features: ['Акция 0%', 'Лояльность', 'Без скрытых комиссий'],
      verified: true,
    },
    {
      id: 4,
      name: 'Монеймен',
      logo: '💳',
      rating: 4.5,
      reviewsCount: 4238,
      minAmount: 5000,
      maxAmount: 70000,
      minTerm: 5,
      maxTerm: 180,
      rateFrom: '0.8%',
      approvalRate: 93,
      approvalTime: '15 минут',
      features: ['Большие суммы', 'Гибкие условия', 'Онлайн 24/7'],
      verified: true,
    },
    {
      id: 5,
      name: 'Веббанкир',
      logo: '🏦',
      rating: 4.4,
      reviewsCount: 2156,
      minAmount: 1000,
      maxAmount: 30000,
      minTerm: 7,
      maxTerm: 30,
      rateFrom: '1%',
      approvalRate: 91,
      approvalTime: '10 минут',
      features: ['Быстрое решение', 'Без справок', 'Плохая КИ ОК'],
    },
    {
      id: 6,
      name: 'Турбозайм',
      logo: '🚀',
      rating: 4.3,
      reviewsCount: 1893,
      minAmount: 3000,
      maxAmount: 40000,
      minTerm: 10,
      maxTerm: 120,
      rateFrom: '0%',
      firstLoanRate: '0% до 15 000₽',
      approvalRate: 89,
      approvalTime: '8 минут',
      features: ['Новичкам 0%', 'Без отказа', 'Автоодобрение'],
    },
    {
      id: 7,
      name: 'Kredito24',
      logo: '💎',
      rating: 4.2,
      reviewsCount: 1674,
      minAmount: 2000,
      maxAmount: 80000,
      minTerm: 14,
      maxTerm: 365,
      rateFrom: '0.7%',
      approvalRate: 87,
      approvalTime: '12 минут',
      features: ['До 80 000₽', 'Долгий срок', 'Рефинансирование'],
    },
    {
      id: 8,
      name: 'Займоград',
      logo: '🏰',
      rating: 4.1,
      reviewsCount: 987,
      minAmount: 1000,
      maxAmount: 25000,
      minTerm: 5,
      maxTerm: 90,
      rateFrom: '1.2%',
      approvalRate: 85,
      approvalTime: '20 минут',
      features: ['Простое оформление', 'Без проверок', 'Выгодно'],
    },
  ];

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '',
      rating: 5,
      date: '15 декабря 2024',
      companyName: 'Быстроденьги',
      text: 'Взяла первый займ под 0%, всё прозрачно и быстро! Деньги пришли через 5 минут на карту.',
      reply: {
        text: 'Анна, благодарим за отзыв! Рады помочь вам. Приходите ещё!',
        date: '15 декабря 2024',
      },
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      avatar: '',
      rating: 5,
      date: '12 декабря 2024',
      companyName: 'МигКредит',
      text: 'Отличный агрегатор! Сравнил условия и выбрал лучшее. МигКредит одобрил 100 000₽.',
    },
    {
      id: 3,
      name: 'Елена Иванова',
      avatar: '',
      rating: 4,
      date: '10 декабря 2024',
      companyName: 'Займер',
      text: 'Хороший сервис, помог найти займ с плохой КИ. Спасибо!',
      reply: {
        text: 'Елена, рады помочь! Мы работаем с разными ситуациями.',
        date: '10 декабря 2024',
      },
    },
    {
      id: 4,
      name: 'Игорь Васильев',
      avatar: '',
      rating: 5,
      date: '8 декабря 2024',
      companyName: 'Монеймен',
      text: 'Первый раз пользуюсь агрегатором - впечатлён! Нашёл выгодные условия за минуты.',
    },
  ]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const addReview = () => {
    if (newReview.name && newReview.text && newReview.company) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        avatar: '',
        rating: newReview.rating,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        text: newReview.text,
        companyName: newReview.company,
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', text: '', rating: 5, company: '' });
    }
  };

  const getSortedCompanies = () => {
    let filtered = [...loanCompanies];
    
    if (filterAmount !== 'all') {
      const amount = parseInt(filterAmount);
      filtered = filtered.filter(c => c.maxAmount >= amount);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'amount') return b.maxAmount - a.maxAmount;
      if (sortBy === 'rate') return parseFloat(a.rateFrom) - parseFloat(b.rateFrom);
      return 0;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ЗаймПоиск</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'catalog', 'calculator', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary font-semibold' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="gradient-bg text-white">Подобрать займ</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Найдите лучший займ</span>
            <br />
            среди 50+ компаний
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Сравните условия, прочитайте отзывы и выберите идеальное предложение. Бесплатно и без регистрации.
          </p>
          
          <Card className="max-w-3xl mx-auto shadow-2xl border-2 animate-scale-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Быстрый подбор займа</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold">Сумма</label>
                    <span className="text-xl font-bold gradient-text">{loanAmount[0].toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={1000}
                    max={100000}
                    step={1000}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold">Срок</label>
                    <span className="text-xl font-bold gradient-text">{loanTerm[0]} дней</span>
                  </div>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    min={5}
                    max={365}
                    step={5}
                  />
                </div>
                <Button className="w-full gradient-bg text-white text-lg py-6" onClick={() => scrollToSection('catalog')}>
                  <Icon name="Search" size={20} className="mr-2" />
                  Найти предложения
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-bold text-2xl mb-1 gradient-text">50+</h3>
              <p className="text-gray-600">МФО в базе</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-2xl mb-1 gradient-text">15 сек</h3>
              <p className="text-gray-600">Подбор займа</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-2xl mb-1 gradient-text">98%</h3>
              <p className="text-gray-600">Одобрений</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-2xl mb-1 gradient-text">15k+</h3>
              <p className="text-gray-600">Отзывов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Каталог займов</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">Все предложения от проверенных компаний</p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="amount">По сумме</SelectItem>
                <SelectItem value="rate">По ставке</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAmount} onValueChange={setFilterAmount}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сумма займа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сумма</SelectItem>
                <SelectItem value="10000">До 10 000₽</SelectItem>
                <SelectItem value="30000">До 30 000₽</SelectItem>
                <SelectItem value="50000">До 50 000₽</SelectItem>
                <SelectItem value="100000">До 100 000₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {getSortedCompanies().map((company, index) => (
              <Card key={company.id} className="hover-lift border-2 relative overflow-hidden">
                {company.topChoice && (
                  <div className="absolute top-0 right-0 gradient-bg text-white px-4 py-1 rounded-bl-xl font-semibold">
                    ⭐ ТОП выбор
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-4 md:w-1/4">
                      <div className="text-5xl">{company.logo}</div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">{company.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">{renderStars(company.rating)}</div>
                          <span className="text-sm text-gray-600">{company.rating}</span>
                          <span className="text-xs text-gray-400">({company.reviewsCount})</span>
                        </div>
                        {company.verified && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            <Icon name="ShieldCheck" size={12} className="mr-1" />
                            Проверено
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Сумма</p>
                        <p className="font-bold text-lg">{company.minAmount.toLocaleString()} - {company.maxAmount.toLocaleString()} ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Срок</p>
                        <p className="font-bold text-lg">{company.minTerm} - {company.maxTerm} дней</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ставка</p>
                        <p className="font-bold text-lg gradient-text">от {company.rateFrom}</p>
                        {company.firstLoanRate && (
                          <p className="text-xs text-green-600 font-semibold">{company.firstLoanRate}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-48">
                      <Button className="gradient-bg text-white">
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Получить
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon name="Clock" size={14} />
                        <span>Решение: {company.approvalTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon name="TrendingUp" size={14} />
                        <span>Одобрение: {company.approvalRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {company.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Калькулятор займа</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Рассчитайте стоимость займа</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle>Параметры займа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold">Сумма займа</label>
                    <span className="text-xl font-bold gradient-text">{loanAmount[0].toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={1000}
                    max={100000}
                    step={1000}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold">Срок займа</label>
                    <span className="text-xl font-bold gradient-text">{loanTerm[0]} дней</span>
                  </div>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    min={5}
                    max={365}
                    step={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 bg-gradient-to-br from-purple-50 to-orange-50">
              <CardHeader>
                <CardTitle>Результат расчёта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">К возврату (1% в день)</p>
                  <p className="text-3xl font-bold gradient-text">
                    {(loanAmount[0] + loanAmount[0] * 0.01 * loanTerm[0]).toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Переплата</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {(loanAmount[0] * 0.01 * loanTerm[0]).toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <Button className="w-full gradient-bg text-white" onClick={() => scrollToSection('catalog')}>
                  Найти предложения
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Отзывы клиентов</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Реальные отзывы о компаниях</p>

          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageSquarePlus" size={24} className="text-primary" />
                Оставить отзыв
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
                <Input
                  placeholder="Название компании"
                  value={newReview.company}
                  onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                />
                <Textarea
                  placeholder="Ваш отзыв"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  rows={4}
                />
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Оценка:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      >
                        <Icon
                          name="Star"
                          size={24}
                          className={i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={addReview} className="gradient-bg text-white">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить отзыв
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover-lift border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback className="gradient-bg text-white text-lg">
                        {review.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{review.name}</h4>
                          <p className="text-sm text-gray-500">Компания: {review.companyName} • {review.date}</p>
                        </div>
                        <div className="flex gap-1">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      
                      {review.reply && (
                        <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-xl border-l-4 border-primary">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="UserCheck" size={18} className="text-primary" />
                            <span className="font-semibold text-primary">Представитель {review.companyName}</span>
                            <span className="text-sm text-gray-500 ml-auto">{review.reply.date}</span>
                          </div>
                          <p className="text-gray-700">{review.reply.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Контакты</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Свяжитесь с нами</p>

          <Card className="shadow-xl border-2">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@zaimpoisk.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-gray-600">8 (800) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                      <Icon name="Clock" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-gray-600">Круглосуточно</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" />
                  <Textarea placeholder="Сообщение" rows={4} />
                  <Button className="w-full gradient-bg text-white">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Icon name="Search" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">ЗаймПоиск</span>
              </div>
              <p className="text-gray-400">Агрегатор займов №1 в России</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Сервис</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Каталог займов</li>
                <li>Калькулятор</li>
                <li>Отзывы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О проекте</li>
                <li>Контакты</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Правовая информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Пользовательское соглашение</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-gray-700 mb-8" />
          <div className="text-center text-gray-400">
            <p>© 2024 ЗаймПоиск. Сервис сравнения условий микрозаймов.</p>
            <p className="text-sm mt-2">Мы не выдаём займы, а помогаем найти лучшие предложения.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
