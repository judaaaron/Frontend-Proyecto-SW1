const datos = [
  {
    id: 1,
    name: 'ANTIGRIPAL ANCALMO',
    currency: 'L. ',
    price: 20.95,
   // like: true,
    img: require('../assets/bacaoliver-web.png'),

    about:
      'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
    formula: 
      '500 mg bla bla bla',
    dosis: 
        ' 2 tabletas al dia', 
  },

  {
    id: 2,
    name: 'BACAOLIVER EMULSION',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
    formula: 
    '500 mg bla bla bla',
    dosis: 
      ' 2 tabletas al dia',
  },

  {
    id: 3,
    name: 'CALAMINA ANTIALERGICA',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
    formula: 
    '500 mg bla bla bla',
    dosis: 
      ' 2 tabletas al dia',
  },

  {
    id: 4,
    name: 'CALAMINA MENTOLADA',
    currency: 'L. ',
    price: 20.95,
   // like: true,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 5,
    name: 'DOLO MARATON',
    currency: 'L. ',
    price: 20.95,
    //like: true,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },

  {
    id: 6,
    name: 'DORMABEN',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 7,
    name: 'ENTEROGUANIL ADULTO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 8,
    name: 'ENTEROGUANIL ADULTO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 9,
    name: 'LOMBRINIÑOS GRANULADO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 10,
    name: 'NERVOTIAMINA',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 11,
    name: 'OIDOL GOTAS ÓPTICAS',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
  {
    id: 12,
    name: 'ORAN-C MASTICABLE',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 13,
    name: 'RAPIDOL 500 MG',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 14,
    name: 'SUERO ORAL COCO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 15,
    name: 'SUERO ORAL FRESA GRANULADO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 16,
    name: 'SUERO ORAL NARANJA GRANULADO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 17,
    name: 'SUERO ORAL VITAMINADO ',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 18,
    name: 'TIAMINA 300',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 19,
    name: 'VINO TRES TOROS',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 20,
    name: 'ZORRITONE ANTIGRIPAL',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 21,
    name: 'ZORRITONE BALSAMO',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 22,
    name: 'ZORRITONE BARRA CEREZA',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 23,
    name: 'ZORRITONE BARRA MIEL LIMON',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  {
    id: 24,
    name: 'ZORRITONE CARAMELO BARRA',
    currency: 'L. ',
    price: 20.95,
    //like: false,
    img: require('../assets/bacaoliver-web.png'),
    about:
    'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
  formula: 
    '500 mg bla bla bla',
  dosis: 
      ' 2 tabletas al dia',
  },
  
];

export default datos;