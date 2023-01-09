import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

export const getItem = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data) return data;
    } catch (error) {
        console.log(error);
    }
}