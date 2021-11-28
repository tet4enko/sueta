const fs = require('fs');

const json = require('./base.json');

const result = json.map(
    (brand) => ({
        id: brand.id,
        logo: brand.logo,
        name: brand.name,
        cyrillicName: brand['cyrillic-name'],
        models: brand.models.map((model) => ({
            id: model.id,
            name: model.name,
            cyrillicName: model['cyrillic-name'],
            generations: model.generations.map((generation) => ({
                id: generation.id,
                name: generation.name,
                from: generation['year-from'],
                to: generation['year-to'],
                configurations: generation.configurations.map((configuration) => ({
                    id: configuration.id,
                    type: configuration['body-type'],
                    photo: configuration.photo,
                })),
            })),
        })),
    }),
);

fs.writeFileSync('./result.json', JSON.stringify(result));
