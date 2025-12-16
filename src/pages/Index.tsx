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

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  reply?: {
    text: string;
    date: string;
  };
}

interface Service {
  id: number;
  title: string;
  amount: string;
  term: string;
  rate: string;
  icon: string;
  popular?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [loanTerm, setLoanTerm] = useState([12]);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });

  const services: Service[] = [
    {
      id: 1,
      title: 'Экспресс-займ',
      amount: 'до 30 000 ₽',
      term: '7-30 дней',
      rate: 'от 0.5% в день',
      icon: 'Zap',
      popular: true,
    },
    {
      id: 2,
      title: 'Стандартный займ',
      amount: 'до 100 000 ₽',
      term: '1-12 месяцев',
      rate: 'от 1% в день',
      icon: 'Wallet',
    },
    {
      id: 3,
      title: 'Крупный займ',
      amount: 'до 300 000 ₽',
      term: '3-24 месяца',
      rate: 'от 0.8% в день',
      icon: 'TrendingUp',
    },
  ];

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '',
      rating: 5,
      date: '15 декабря 2024',
      text: 'Очень быстрое оформление! Деньги пришли буквально через час. Спасибо за оперативность и прозрачные условия.',
      reply: {
        text: 'Анна, благодарим за отзыв! Рады, что смогли помочь вам быстро решить финансовый вопрос. Всегда на связи!',
        date: '15 декабря 2024',
      },
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      avatar: '',
      rating: 4,
      date: '12 декабря 2024',
      text: 'Хороший сервис, понятные условия. Единственное - хотелось бы больше гибкости в сроках.',
    },
    {
      id: 3,
      name: 'Елена Иванова',
      avatar: '',
      rating: 5,
      date: '10 декабря 2024',
      text: 'Второй раз беру займ здесь. Всё прозрачно, без скрытых комиссий. Рекомендую!',
      reply: {
        text: 'Елена, спасибо за доверие! Мы ценим постоянных клиентов и всегда рады помочь.',
        date: '10 декабря 2024',
      },
    },
  ]);

  const calculateMonthlyPayment = () => {
    const amount = loanAmount[0];
    const months = loanTerm[0];
    const rate = 0.01;
    const daily = amount * rate;
    const total = daily * 30 * months;
    return Math.round(total / months);
  };

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
        size={18}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const addReview = () => {
    if (newReview.name && newReview.text) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        avatar: '',
        rating: newReview.rating,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        text: newReview.text,
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', text: '', rating: 5 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Icon name="Landmark" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ЗаймЭкспресс</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'services', 'reviews', 'calculator', 'terms', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary font-semibold' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'services' && 'Услуги'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'terms' && 'Условия'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="gradient-bg text-white">Получить займ</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Быстрые займы</span>
            <br />
            онлайн за 15 минут
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Получите деньги на карту без справок и поручителей. Одобрение 98%. Прозрачные условия.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-scale-in">
            <Button size="lg" className="gradient-bg text-white text-lg px-8 py-6 hover-lift">
              <Icon name="Rocket" size={20} className="mr-2" />
              Оформить займ
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">15 минут</h3>
              <p className="text-gray-600">Быстрое решение по вашей заявке</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">98% одобрений</h3>
              <p className="text-gray-600">Высокий процент одобрения заявок</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover-lift">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Lock" size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">100% безопасно</h3>
              <p className="text-gray-600">Защита данных по стандартам банков</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Наши услуги</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Выберите подходящий вариант займа</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.id} className="hover-lift border-2 relative overflow-hidden">
                {service.popular && (
                  <Badge className="absolute top-4 right-4 gradient-bg text-white">Популярный</Badge>
                )}
                <CardHeader>
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-lg">{service.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={18} className="text-primary" />
                      <span className="text-gray-700">Срок: {service.term}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Percent" size={18} className="text-primary" />
                      <span className="text-gray-700">Ставка: {service.rate}</span>
                    </div>
                  </div>
                  <Button className="w-full gradient-bg text-white">Оформить</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Калькулятор займа</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Рассчитайте примерную сумму платежа</p>
          
          <Card className="shadow-2xl border-2">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold text-lg">Сумма займа</label>
                    <span className="text-2xl font-bold gradient-text">{loanAmount[0].toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={5000}
                    max={300000}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>5 000 ₽</span>
                    <span>300 000 ₽</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-semibold text-lg">Срок займа</label>
                    <span className="text-2xl font-bold gradient-text">{loanTerm[0]} мес</span>
                  </div>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    min={1}
                    max={24}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 мес</span>
                    <span>24 мес</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 mb-1">Примерный ежемесячный платёж</p>
                      <p className="text-4xl font-bold gradient-text">{calculateMonthlyPayment().toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Icon name="TrendingUp" size={48} className="text-primary opacity-50" />
                  </div>
                </div>

                <Button className="w-full gradient-bg text-white text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Отзывы клиентов</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Узнайте, что говорят о нас наши клиенты</p>

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
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex gap-1">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      
                      {review.reply && (
                        <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-xl border-l-4 border-primary">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="UserCheck" size={18} className="text-primary" />
                            <span className="font-semibold text-primary">Представитель компании</span>
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

      {/* Terms Section */}
      <section id="terms" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Условия получения займа</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Простые и понятные требования</p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Icon name="User" size={24} className="text-white" />
                  </div>
                  Требования к заёмщику
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>Возраст от 18 до 70 лет</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>Гражданство РФ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>Мобильный телефон</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>Банковская карта</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-white" />
                  </div>
                  Необходимые документы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>Паспорт РФ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-green-500" />
                  <span>СНИЛС (желательно)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="X" size={20} className="text-gray-400" />
                  <span className="text-gray-500">Справка о доходах - не требуется</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="X" size={20} className="text-gray-400" />
                  <span className="text-gray-500">Поручители - не требуются</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-2 bg-gradient-to-br from-purple-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                Преимущества нашего сервиса
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="Zap" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Мгновенное решение</p>
                    <p className="text-sm text-gray-600">Ответ по заявке за 15 минут</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Безопасность данных</p>
                    <p className="text-sm text-gray-600">Шифрование по стандартам банков</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Smile" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Без скрытых комиссий</p>
                    <p className="text-sm text-gray-600">Прозрачные условия договора</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="HeadphonesIcon" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Поддержка 24/7</p>
                    <p className="text-sm text-gray-600">Всегда на связи для вас</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Контакты</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Свяжитесь с нами удобным способом</p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover-lift text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Телефон</h3>
                <p className="text-gray-600">8 (800) 555-35-35</p>
                <p className="text-sm text-gray-500 mt-1">Звонок бесплатный</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover-lift text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Email</h3>
                <p className="text-gray-600">info@zaimexpress.ru</p>
                <p className="text-sm text-gray-500 mt-1">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover-lift text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Онлайн-чат</h3>
                <p className="text-gray-600">Чат на сайте</p>
                <p className="text-sm text-gray-500 mt-1">Работаем 24/7</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Напишите нам</h3>
              <div className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input placeholder="Email или телефон" />
                <Textarea placeholder="Ваше сообщение" rows={4} />
                <Button className="w-full gradient-bg text-white text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
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
                  <Icon name="Landmark" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">ЗаймЭкспресс</span>
              </div>
              <p className="text-gray-400">Быстрые займы онлайн с прозрачными условиями</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Экспресс-займы</li>
                <li>Стандартные займы</li>
                <li>Крупные займы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О нас</li>
                <li>Отзывы</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Условия</li>
                <li>Документы</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-gray-700 mb-8" />
          <div className="text-center text-gray-400">
            <p>© 2024 ЗаймЭкспресс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
