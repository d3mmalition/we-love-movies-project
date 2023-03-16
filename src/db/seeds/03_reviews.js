const content = `Lorem markdownum priores iactate receptus margine in motu ferreus pastor. Teneat
tua opifex regina, adest; similisque nec, me convivia ortus.

Est sontes praemia fatorum diversosque innubere rursus. Tanto inter commenta
tremulasque tergo donec Apollinei mearum: Hector colorum horruit.

> Cur repulsa matrem frequentes parvum coniuge ad nisi leto, ira. Orbis levatus
> o coniugis longis confinia *bello* rursus quem Atridae indulgere! Sanguine o
> operi flammas sorores suffundit et ilia. Nais edentem tamen. Acta munera enixa
> ad terram!

Sint sed per oppugnant Medusae Pagasaeae undique rebus cernit terram delituit
dilapsa tigres. Ait omne conatur nomen cumque, ad Minoa magna *dolentes*,
ageret. Sum addat, et unum iunge, aberant his indigenae facundia?

> Perdidit astra, si maternis sibi, Phoebi protinus senecta digitos. Atque
> suique **Lyrnesia**, prosunt suae mihi aqua, te!

Subsedit tantaque vulnera totiens aptos vivit digna pectoraque mutua. Duro ante
tibi perhorruit praedelassat simulat turis loco hunc dederat viscera scilicet
transitus quam longius aenea, concussaque hoc mille.

Ut erat. Tibi Themin corpore saepes.`;

const crypto = require('crypto');

const generateReviews = (criticIds, movieIds) => {
  return Array.from(movieIds, ({ movie_id }) =>
    Array.from(criticIds, ({ critic_id }) => {
      const contentHash = crypto.createHash('sha256')
        .update(`${movie_id}-${critic_id}-${Date.now()}-${Math.random()}`)
        .digest('hex');
      return {
        id: contentHash,
        content,
        score: Math.ceil(Math.random() * 5),
        critic_id,
        movie_id,
      }
    })
  ).flat();
};


exports.seed = async function(knex) {
  const reviews = [
    { content: '...', critic_id: 1, movie_id: 1, score: 8 },
    { content: '...', critic_id: 1, movie_id: 2, score: 7 },
    // ...
  ];

  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < reviews.length; i += batchSize) {
    batches.push(reviews.slice(i, i + batchSize));
  }
  for (const batch of batches) {
    await knex.batchInsert('reviews', batch, batchSize);
  }
};
