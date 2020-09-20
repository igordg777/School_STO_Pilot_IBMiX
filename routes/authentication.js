const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const router = express.Router();
const Pilot = require('../models/pilot');
const Comander = require('../models/comander');
const sessionChecker = require('../middleware/auth');

const saltRounds = 10;

router.post('/api/signup', async (req, res, next) => {
  const { email } = req.body;

  const dbemailComander = await Comander.findOne({ email });
  const dbemailPilot = await Pilot.findOne({ email });

  if ((dbemailComander && dbemailComander.email === email) ||
    (dbemailPilot && dbemailPilot.email === email)) {
    res.status(400).json({ response: 'emailExist' });
  } else {
    res.status(200).json({ response: 'success' });
  }
}).post('/api/signup/noowner', async (req, res, next) => {

  const { email, firstName, lastName, password } = req.body;
  let arrFlights = [
    {
      "where_to": "Париж",
      "where_from": "Москва",
      "flight_time": 4.30,
      "time_of_departure": "2020-09-21",
      "time_of_arrival": "2020-09-21",
      "level_flights": 7,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Шарль де Голль"
    },
    {
      "where_to": "Хабаровск",
      "where_from": "Москва",
      "flight_time": 10.21,
      "time_of_departure": "2020-09-23",
      "time_of_arrival": "2020-09-24",
      "level_flights": 7,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Новый"
    },
    {
      "where_to": "Санкт-Петербург",
      "where_from": "Москва",
      "flight_time": 1.50,
      "time_of_departure": "2020-09-25",
      "time_of_arrival": "2020-09-25",
      "level_flights": 4,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Пулково"
    },
    {
      "where_to": "Лондон",
      "where_from": "Москва",
      "flight_time": 5.15,
      "time_of_departure": "2020-09-27",
      "time_of_arrival": "2020-09-27",
      "level_flights": 6,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Heathrow"
    },
    {
      "where_to": "Чита",
      "where_from": "Москва",
      "flight_time": 6.15,
      "time_of_departure": "2020-09-29",
      "time_of_arrival": "2021-09-30",
      "level_flights": 5,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Кадала"
    },
    {
      "where_to": "Новосибирск",
      "where_from": "Москва",
      "flight_time": 5.55,
      "time_of_departure": "2020-10-01",
      "time_of_arrival": "2021-10-01",
      "level_flights": 3,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Толмачёво"
    },
    {
      "where_to": "Рио-де-Жанейро",
      "where_from": "Москва",
      "flight_time": 15,
      "time_of_departure": "2020-10-05",
      "time_of_arrival": "2021-10-06",
      "level_flights": 8,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Галеан"
    },
    {
      "where_to": "Братислава",
      "where_from": "Москва",
      "flight_time": 2.45,
      "time_of_departure": "2020-10-08",
      "time_of_arrival": "2021-10-08",
      "level_flights": 4,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Bratislava-Ivanka"
    },
    {
      "where_to": "Прага",
      "where_from": "Москва",
      "flight_time": 3.30,
      "time_of_departure": "2020-10-10",
      "time_of_arrival": "2020-10-10",
      "level_flights": 6,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Вацлава Гавела"
    }
  ]

  let arrWish = [
    {
      "month": {
        "description": "Июнь",
        "date": 6
      },
      "longFly": [
        {
          "fly": "Трансатлантические рейсы",
          "flag": true
        }
      ],
      "otherTime": [
        {
          "time": "Переработки неприемлимы",
          "flag": true
        }
      ],
      "timeFly": [
        {
          "flyTime": "Короткая смена",
          "flag": false
        }
      ],
      "preferenceTimeFly": [
        {
          "dayTime": "Ночь(22: 00 - 06: 00)",
          "flag": true
        }
      ]
    },
    {
      "month": {
        "description": "Июль",
        "date": 7
      },
      "longFly": [
        {
          "fly": "Трансатлантические рейсы",
          "flag": true
        }
      ],
      "otherTime": [
        {
          "time": "Хочу работать с переработками",
          "flag": true
        }
      ],
      "timeFly": [
        {
          "flyTime": "Короткая смена",
          "flag": true
        }
      ],
      "preferenceTimeFly": [
        {
          "dayTime": "Вечер(17: 00 - 22: 00)",
          "flag": true
        }
      ]
    },
    {
      "month": {
        "description": "Август",
        "date": 8
      },
      "longFly": [
        {
          "fly": "Трансатлантические рейсы",
          "flag": true
        }
      ],
      "otherTime": [
        {
          "time": "Хочу работать с переработками",
          "flag": true
        }
      ],
      "timeFly": [
        {
          "flyTime": "Длительная смена",
          "flag": true
        }
      ],
      "preferenceTimeFly": [
        {
          "dayTime": "День(12: 00 - 17: 00)",
          "flag": false
        }
      ]
    }
  ]

  const standingFromDate = '2021.11.21';
  const standingFromDateInRole = '2021.11.21';
  const reliabilityIndex = '9';
  const rewardsAndPunishments = '3';
  const phone = '21-21-21';
  const flagVisit = false;
  const crewRole = "КВС"

  try {
    const anketa = new Pilot({
      email, firstName, lastName, crewRole, arrFlights, standingFromDate, standingFromDateInRole, reliabilityIndex, rewardsAndPunishments, phone, flagVisit, arrWish,
      password: await bcrypt.hash(password, saltRounds),
      keyForNewPassword: '',
    });

    req.session.user = anketa;

    await anketa.save();
    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: 'fail' });
  }
}).post('/newPassword', async (req, res) => {
  function gen_password(len) {
    var password = '';
    var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
  }

  let key = gen_password(20);

  const { email } = req.body;

  try {

    const userComander = await Comander.findOne({ email });

    const userPilot = await Pilot.findOne({ email });
    if (userComander) {
      userComander.keyForNewPassword = key;
      await userComander.save();
    } else if (userPilot) {
      userPilot.keyForNewPassword = key;
      await userPilot.save();
    } else {
      res.status(400).json({ response: 'Неправильно указан email!' });
    }

    async function main() {
      let testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'R00MR00M',
          pass: 'iremoormoor',
        },
      });

      let info = await transporter.sendMail({
        from: '"IBMiX 👻" <R00MR00M@yandex.ru>', // sender address
        to: `${email}`,  // list of receivers  user2.email,
        subject: 'IBMiX ✔', // Subject line
        text: 'Текст1', // plain text body
        html:
          `Для создания нового пароля перейдите по этой  <a href="http://домен нашего будущего сайта IBMiX/set_new_password/${key}">ссылке</a>
           
    `,
      });


    }

    main().catch(console.error);

    res.status(200).json({ response: 'success' });
  } catch (e) {


    res.status(400).json({ response: 'fail' });
  }
}).post('/set_new_password/', async (req, res) => {

  try {
    let keyForNewPassword = req.body.keyForNewPassword;
    const userComander = await Comander.findOne({ keyForNewPassword });

    const userPilot = await Pilot.findOne({ keyForNewPassword });
    if (userComander) {
      userComander.password = await bcrypt.hash(req.body.password, saltRounds);
      await userComander.save();
      res.status(200).send({ response: 'ok' });
    } else if (userPilot) {

      userPilot.password = await bcrypt.hash(req.body.password, saltRounds);
      await userPilot.save();
      res.status(200).send({ response: 'ok' });
    }

  } catch (e) {

    res.status(400).json({ response: 'fail' });
  }
}).post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userComander = await Comander.findOne({ email });

    const userPilot = await Pilot.findOne({ email });
    if (userComander &&
      (await bcrypt.compare(password, userComander.password))) {
      req.session.user = userComander;

      res.status(200).
        json({
          response: 'success',
          crewRole: userComander.crewRole,
          town: userComander.town,
        });
    } else if (userPilot &&
      (await bcrypt.compare(password, userPilot.password))) {
      req.session.user = userPilot;

      res.status(200).
        json({
          response: 'success',
          crewRole: userPilot.crewRole,
          town: userPilot.town,
        });
    } else {

      res.status(400).json({ response: 'fail' });
    }
  } catch (e) {
    res.status(400).json({ response: 'fail' });
  }
}).get('/api/logout', async (req, res, next) => {
  try {
    await req.session.destroy();
    res.clearCookie('user_sid');
    res.status(200).json({ response: 'success' });
  } catch (error) {
    res.status(400).json({ response: 'fail' });
  }
});

module.exports = router;
