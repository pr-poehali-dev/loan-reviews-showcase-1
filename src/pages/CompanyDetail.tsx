import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CompanyData {
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
  description: string;
  requirements: string[];
  documents: string[];
  howToApply: string[];
  advantages: string[];
  disadvantages: string[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  reply?: {
    text: string;
    date: string;
  };
}

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });

  const companiesData: Record<string, CompanyData> = {
    '1': {
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
      description: 'Быстроденьги — одна из крупнейших микрофинансовых организаций России. Компания работает с 2012 года и помогла более 3 миллионам клиентов получить быстрые займы на выгодных условиях.',
      requirements: [
        'Возраст от 18 до 70 лет',
        'Гражданство РФ',
        'Действующий паспорт',
        'Мобильный телефон',
        'Банковская карта или электронный кошелек',
      ],
      documents: [
        'Паспорт РФ (основной документ)',
        'СНИЛС (для ускорения процесса)',
      ],
      howToApply: [
        'Заполните онлайн-заявку на сайте',
        'Дождитесь решения (5-10 минут)',
        'Подтвердите получение по СМС',
        'Получите деньги на карту',
      ],
      advantages: [
        'Первый займ под 0% для новых клиентов',
        'Мгновенное одобрение заявок',
        'Работаем круглосуточно без выходных',
        'Лояльность к клиентам с плохой КИ',
        'Гибкие условия погашения',
        'Мобильное приложение',
      ],
      disadvantages: [
        'Относительно небольшие суммы (до 30 000₽)',
        'Короткий срок займа (до 30 дней)',
      ],
    },
    '2': {
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
      description: 'МигКредит — надёжная МФО с 2011 года. Специализируется на крупных суммах до 100 000 рублей и длительных сроках. Более 5 миллионов выданных займов.',
      requirements: [
        'Возраст от 21 до 65 лет',
        'Постоянная или временная регистрация в РФ',
        'Действующий паспорт РФ',
        'Контактный телефон',
        'Банковская карта',
      ],
      documents: [
        'Паспорт РФ',
        'СНИЛС или ИНН',
        'Второй документ (водительские права, загранпаспорт)',
      ],
      howToApply: [
        'Оставьте заявку онлайн',
        'Получите предварительное решение за 10 минут',
        'Загрузите фото документов',
        'Подпишите договор онлайн',
        'Деньги поступят на карту в течение часа',
      ],
      advantages: [
        'Большие суммы до 100 000 рублей',
        'Длительные сроки до 365 дней',
        'Первый займ под 0% до 10 000₽',
        'Возможность продления займа',
        'Не требуется справка о доходах',
        'Лояльная оценка кредитной истории',
      ],
      disadvantages: [
        'Более строгие требования к документам',
        'Немного дольше процесс одобрения',
      ],
    },
    '3': {
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
      description: 'Займер — проверенная временем компания (с 2011 года). Отличается прозрачными условиями и отличным сервисом. Программа лояльности для постоянных клиентов.',
      requirements: [
        'Возраст от 18 до 80 лет',
        'Гражданство РФ',
        'Паспорт РФ',
        'Номер телефона',
        'Банковская карта',
      ],
      documents: [
        'Паспорт РФ',
        'СНИЛС (по желанию)',
      ],
      howToApply: [
        'Заполните анкету на сайте (3 минуты)',
        'Получите решение за 7 минут',
        'Подтвердите получение по СМС',
        'Получите деньги на карту мгновенно',
      ],
      advantages: [
        'Первый займ под 0% до 30 дней',
        'Программа лояльности для постоянных клиентов',
        'Быстрое решение за 7 минут',
        'Возраст до 80 лет',
        'Прозрачные условия без скрытых платежей',
        'Круглосуточная поддержка',
      ],
      disadvantages: [
        'Средние суммы (до 50 000₽)',
      ],
    },
  };

  const company = id ? companiesData[id] : null;

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Мария Сидорова',
      rating: 5,
      date: '14 декабря 2024',
      text: 'Отличная компания! Взяла первый займ под 0%, всё прозрачно. Деньги пришли моментально.',
      reply: {
        text: 'Мария, спасибо за отзыв! Рады помочь вам.',
        date: '14 декабря 2024',
      },
    },
    {
      id: 2,
      name: 'Алексей Петров',
      rating: 5,
      date: '11 декабря 2024',
      text: 'Быстро одобрили заявку, деньги на карте через 10 минут. Рекомендую!',
    },
    {
      id: 3,
      name: 'Ольга Новикова',
      rating: 4,
      date: '9 декабря 2024',
      text: 'Хороший сервис, но хотелось бы больше сумму. В остальном всё отлично.',
    },
  ]);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Компания не найдена</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={20}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const addReview = () => {
    if (newReview.name && newReview.text) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к каталогу
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ЗаймПоиск</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <Card className="mb-8 border-2 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="text-7xl">{company.logo}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-0.5">{renderStars(company.rating)}</div>
                      <span className="text-xl font-semibold">{company.rating}</span>
                      <span className="text-gray-500">({company.reviewsCount} отзывов)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {company.verified && (
                        <Badge className="gradient-bg text-white">
                          <Icon name="ShieldCheck" size={14} className="mr-1" />
                          Проверено
                        </Badge>
                      )}
                      {company.topChoice && (
                        <Badge className="bg-orange-500 text-white">⭐ ТОП выбор</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-6">{company.description}</p>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Сумма</p>
                    <p className="font-bold text-lg gradient-text">
                      {company.minAmount.toLocaleString()} - {company.maxAmount.toLocaleString()}₽
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Срок</p>
                    <p className="font-bold text-lg gradient-text">{company.minTerm} - {company.maxTerm} дней</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Ставка</p>
                    <p className="font-bold text-lg gradient-text">от {company.rateFrom}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Одобрение</p>
                    <p className="font-bold text-lg gradient-text">{company.approvalRate}%</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:w-64">
                <Button className="gradient-bg text-white text-lg py-6">
                  <Icon name="ExternalLink" size={20} className="mr-2" />
                  Получить займ
                </Button>
                {company.firstLoanRate && (
                  <Badge variant="secondary" className="text-center py-2 text-sm">
                    🎁 {company.firstLoanRate}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="about">О компании</TabsTrigger>
            <TabsTrigger value="conditions">Условия</TabsTrigger>
            <TabsTrigger value="howto">Как получить</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ThumbsUp" size={24} className="text-green-500" />
                    Преимущества
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {company.advantages.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-green-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ThumbsDown" size={24} className="text-orange-500" />
                    Недостатки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {company.disadvantages.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Minus" size={20} className="text-orange-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conditions">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={24} className="text-primary" />
                    Требования к заёмщику
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {company.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={24} className="text-primary" />
                    Необходимые документы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {company.documents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="FileCheck" size={20} className="text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="howto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ClipboardList" size={24} className="text-primary" />
                  Инструкция по получению займа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.howToApply.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl">
                      <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-lg">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Clock" size={24} className="text-green-600" />
                    <h4 className="font-bold text-lg">Время получения</h4>
                  </div>
                  <p className="text-gray-700">
                    Решение по заявке: <span className="font-bold">{company.approvalTime}</span>
                  </p>
                  <p className="text-gray-700">
                    Деньги на карте: <span className="font-bold">в течение 15-60 минут</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquarePlus" size={24} className="text-primary" />
                    Оставить отзыв о компании {company.name}
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

              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="hover-lift border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="gradient-bg text-white">
                            {review.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-bold">{review.name}</h4>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.text}</p>
                          
                          {review.reply && (
                            <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-xl border-l-4 border-primary">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon name="UserCheck" size={16} className="text-primary" />
                                <span className="font-semibold text-primary text-sm">
                                  Представитель {company.name}
                                </span>
                                <span className="text-xs text-gray-500 ml-auto">{review.reply.date}</span>
                              </div>
                              <p className="text-sm text-gray-700">{review.reply.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <Card className="border-2 shadow-xl gradient-bg text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы получить займ в {company.name}?</h2>
            <p className="text-lg mb-6 opacity-90">
              Одобрение за {company.approvalTime}. Деньги на карте в течение часа.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
              <Icon name="Rocket" size={20} className="mr-2" />
              Оформить займ сейчас
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2024 ЗаймПоиск. Сервис сравнения условий микрозаймов.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyDetail;
