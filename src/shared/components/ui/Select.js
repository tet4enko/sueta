import React, { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

export const Select = ({
    items,
    setItems,
    value,
    setValue,
    placeholder,
    searchPlaceholder,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropDownPicker
            searchable
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            open={isOpen}
            value={value}
            items={items}
            setOpen={setIsOpen}
            setValue={setValue}
            setItems={setItems}
            arrowIconStyle={{ width: 30, height: 30 }}
            listMode="MODAL"
            theme="DARK"
            mode="BADGE"
            labelProps={{
                color: 'red',
                fontSize: 40,
            }}
            modalProps={{
                animationType: 'fade',
            }}
            selectedItemLabelStyle={{
                fontWeight: 'bold',
                fontSize: 22,
            }}
            listItemLabelStyle={{
                color: 'white',
                fontSize: 18,
            }}
            listItemContainerStyle={{
                height: 50,
            }}
            searchTextInputStyle={{
                height: 50,
                fontSize: 21,
            }}
            searchContainerStyle={{
                borderBottomColor: 'white',
                height: 100,
            }}
            modalContentContainerStyle={{
                backgroundColor: '#2a284f',
            }}
            placeholderStyle={{
                fontSize: 18,
            }}
            textStyle={{
                fontSize: 20,
                fontFamily: 'centurygothic',
                color: 'white',
                backgroundColor: '#2a284f',
            }}
            style={{
                backgroundColor: '#2a284f',
                ...style,
            }}
        />
    );
};
