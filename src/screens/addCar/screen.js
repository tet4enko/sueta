import React, {
    useState, useEffect, useMemo, useCallback,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUserId } from '../../entities/user/store/selectors/selectors';
import { addCarToUser } from '../../shared/store/actions/users';

import { SharedComponents } from '../../shared';
import { getCarPhoto, getCarsConfig, getCarThumbnail } from '../../shared/lib/cars';

const cars = getCarsConfig();

export const screen = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId);

    const [brands, setBrands] = useState(cars.map(({ name, id }) => (
        {
            label: name,
            value: id,
        }
    )));
    const [brand, setBrand] = useState(null);

    const [models, setModels] = useState(null);
    const [model, setModel] = useState(null);

    const [generations, setGenerations] = useState(null);
    const [generation, setGeneration] = useState(null);

    const [configurations, setConfigurations] = useState(null);
    const [configuration, setConfiguration] = useState(null);

    const isFormFulFilled = useMemo(() => {
        if (brands && brands.length && !brand) {
            return false;
        }

        if (models && models.length && !model) {
            return false;
        }

        if (generations && generations.length && !generation) {
            return false;
        }

        if (configurations && configurations.length && !configuration) {
            return false;
        }

        return true;
    }, [brands, brand, models, model, generations, generation, configurations, configuration]);

    const photo = useMemo(() => {
        if (!isFormFulFilled || !configuration) {
            return null;
        }

        return getCarPhoto({
            brand, model, generation, configuration,
        });
    }, [configuration, isFormFulFilled]);
    const thumbnail = useMemo(() => {
        if (!isFormFulFilled || !configuration) {
            return null;
        }

        return getCarThumbnail({
            brand, model, generation, configuration,
        });
    }, [configuration, isFormFulFilled]);

    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {
        if (brand) {
            setModels(
                cars
                    .find((cur) => cur.id === brand)
                    .models
                    .map((cur) => ({
                        label: cur.name,
                        value: cur.id,
                    })),
            );
        }
        setModel(null);
        setGeneration(null);
        setGenerations(null);
        setConfiguration(null);
        setConfigurations(null);
    }, [brand]);

    useEffect(() => {
        if (model) {
            const newGenerations = cars
                .find((cur) => cur.id === brand)
                .models
                .find((cur) => cur.id === model)
                .generations;

            if (newGenerations && newGenerations.length) {
                setGenerations(
                    newGenerations.map((cur) => ({
                        label: `${cur.name} (${cur.from} - ${cur.to})`,
                        value: cur.id,
                    })),
                );
            } else {
                setGenerations(null);
            }
        }
        setGeneration(null);
        setConfiguration(null);
        setConfigurations(null);
    }, [model]);

    useEffect(() => {
        if (generation) {
            const newConfigurations = cars
                .find((cur) => cur.id === brand)
                .models
                .find((cur) => cur.id === model)
                .generations
                .find((cur) => cur.id === generation)
                .configurations;

            if (newConfigurations && newConfigurations.length) {
                setConfigurations(
                    newConfigurations.map((cur) => ({
                        label: cur.type,
                        value: cur.id,
                    })),
                );
            } else {
                setConfigurations(null);
            }
        }
        setConfiguration(null);
    }, [generation]);

    const handleSubmit = useCallback(async () => {
        setIsProgress(true);

        await dispatch(addCarToUser(
            currentUserId,
            {
                brand,
                model,
                generation,
                configuration,
            },
        ));

        setIsProgress(false);

        navigation.goBack();
    }, [
        setIsProgress,
        currentUserId,
        brand,
        model,
        generation,
        configuration,
    ]);

    return (
        <View style={styles.default}>
            <SharedComponents.UI.Select
                style={styles.select}
                items={brands}
                setItems={setBrands}
                value={brand}
                setValue={setBrand}
                placeholder="Выберите марку"
                searchPlaceholder="Поиск по маркам"
            />
            {
                models && models.length && (
                    <SharedComponents.UI.Select
                        style={styles.select}
                        items={models}
                        setItems={setModels}
                        value={model}
                        setValue={setModel}
                        placeholder="Выберите модель"
                        searchPlaceholder="Поиск по моделям"
                    />
                )
            }
            {
                generations && generations.length && (
                    <SharedComponents.UI.Select
                        style={styles.select}
                        items={generations}
                        setItems={setGenerations}
                        value={generation}
                        setValue={setGeneration}
                        placeholder="Выберите поколение"
                        searchPlaceholder="Поиск по поколениям"
                    />
                )
            }
            {
                configurations && configurations.length && (
                    <SharedComponents.UI.Select
                        style={styles.select}
                        items={configurations}
                        setItems={setConfigurations}
                        value={configuration}
                        setValue={setConfiguration}
                        placeholder="Выберите конфигурацию"
                        searchPlaceholder="Поиск по конфигурациям"
                    />
                )
            }
            {isFormFulFilled && photo && (
                <SharedComponents.UI.ProgressiveImage
                    mainSource={{ uri: photo }}
                    thumbnailSource={{ uri: thumbnail }}
                    style={styles.image}
                />
            )}
            {isFormFulFilled && (
                <SharedComponents.UI.AppButton text="Добавить" style={styles.submit} onPress={handleSubmit} />
            )}
            <SharedComponents.UI.Loader visible={isProgress} />
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        padding: 20,
        height: '100%',
    },
    iconStyle: {
        width: 49,
        height: 49,
    },
    select: {
        marginVertical: 10,
    },
    submit: {
        top: 20,
    },
    image: {
        height: 220,
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
    },
});
