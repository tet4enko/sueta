import base from './base.json';

const CARS_HOST = 'http://194.58.111.214';

export const getCarsConfig = () => base;

export const getCar = ({
    brand, model, generation, configuration,
}) => {
    let result = null;

    try {
        result = base
            .find((cur) => cur.id === brand)
            .models
            .find((cur) => cur.id === model)
            .generations
            .find((cur) => cur.id === generation)
            .configurations
            .find((cur) => cur.id === configuration);
    } catch (error) {
        console.error(error);
    }

    return result;
};

export const getCarPhoto = (data) => {
    const car = getCar(data);

    if (!car) {
        return '';
    }

    return `${CARS_HOST}/cars/${car.photo}.jpg`;
};

export const getCarThumbnail = (data) => {
    const car = getCar(data);

    if (!car) {
        return '';
    }

    return `${CARS_HOST}/cars_mini/${car.photo}.jpg`;
};

export const getCarInfo = ({ brand, model, generation }) => {
    try {
        const brandData = base.find((cur) => cur.id === brand);
        const modelData = brandData.models.find((cur) => cur.id === model);
        const generationData = modelData.generations.find((cur) => cur.id === generation);

        return {
            brand: brandData.name,
            model: modelData.name,
            generation: `${generationData.name} (${generationData.from} - ${generationData.to})`,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
