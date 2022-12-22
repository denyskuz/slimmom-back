const j2s = require('joi-to-swagger');
const Joi = require('joi');

const userRegisterSchema = Joi.object({
  status: Joi.string().required().example('success'),
  data: Joi.object({
    message: Joi.string().required().example('Registration successful'),
    user: Joi.object({
      email: Joi.string().required().example('nic@gmail.com'),
      name: Joi.string().required().example('Nic'),
    }).required(),
  }).required(),
}).required();

const userLoginSchema = Joi.object({
  status: Joi.string().required().example('success'),
  data: Joi.object({
    accessToken: Joi.string()
      .required()
      .example(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTI2NDhkYmYwOWUwNzA3NTVkODliZSIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE2NzE1ODgxNDksImV4cCI6MTY3MTU5MTc0OX0.jJSyyA21txMSU4mw-TEPK1afpF2v9--jICFNDnuLwKM'
      ),
    user: Joi.object({
      email: Joi.string().required().example('nic@gmail.com'),
      name: Joi.string().required().example('Nic'),
      age: Joi.number().example(18),
      height: Joi.number().example(150),
      currentWeight: Joi.number().example(60),
      desiredWeight: Joi.number().example(50),
      currentWeight: Joi.number().example(1),
    }).required(),
  }).required(),
}).required();

const noteCreatedSchema = Joi.object({
  status: Joi.string().required().example('new note created'),
  note: Joi.object({
    owner: Joi.string().required().example('63a2648dbf09e070755d89be'),
    product: Joi.string().required().example('5d51694802b2373622ff554d'),
    weight: Joi.number().required().example(50),
    date: Joi.string().required().example('2022-12-21T00:00:00.000Z'),
    _id: Joi.string().required().example('63a363474bc5f3dc4fc951cb'),
  }).required(),
}).required();

const notesFindSchema = Joi.object({
  notes: Joi.array()
    .items({
      owner: Joi.string().required().example('63a2648dbf09e070755d89be'),
      product: Joi.string().required().example('5d51694802b2373622ff554d'),
      weight: Joi.number().required().example(50),
      date: Joi.string().required().example('2022-12-21T00:00:00.000Z'),
      _id: Joi.string().required().example('63a363474bc5f3dc4fc951cb'),
    })
    .required(),
}).required();

const noteDeletedSchema = Joi.object({
  status: Joi.string().required().example('note deleted'),
  note: Joi.object({
    owner: Joi.string().required().example('63a2648dbf09e070755d89be'),
    product: Joi.string().required().example('5d51694802b2373622ff554d'),
    weight: Joi.number().required().example(50),
    date: Joi.string().required().example('2022-12-21T00:00:00.000Z'),
    _id: Joi.string().required().example('63a363474bc5f3dc4fc951cb'),
  }).required(),
}).required();

const badProductsFindSchema = Joi.object({
  kCal: Joi.number().required().example(1186.5),
  products: Joi.array()
    .items({
      title: Joi.object({
        ru: Joi.string().required().example('Меланж яичный'),
        ua: Joi.string().required().example('Меланж яєчний'),
      }).required(),
      groupBloodNotAllowed: Joi.array()
        .items(Joi.boolean())
        .allow(null)
        .required()
        .example([null, true, false, false, false]),
        _id: Joi.string().required().example('5d51694802b2373622ff552c'),
        categories: Joi.array()
        .items(Joi.string())
        .required()
        .example(['яйца']),
        weight: Joi.number().required().example(100),
        calories: Joi.number().required().example(157),
        __v: Joi.number().required().example(0),
    })
    .required(),
}).required();

const { swagger: userRegister } = j2s(userRegisterSchema);
const { swagger: userLogin } = j2s(userLoginSchema);
const { swagger: noteCreated } = j2s(noteCreatedSchema);
const { swagger: notesFind } = j2s(notesFindSchema);
const { swagger: noteDeleted } = j2s(noteDeletedSchema);
const { swagger: badProductsFind } = j2s(badProductsFindSchema);

const responses = {
  userRegister,
  userLogin,
  noteCreated,
  notesFind,
  noteDeleted,
  badProductsFind,
};

module.exports = responses;
