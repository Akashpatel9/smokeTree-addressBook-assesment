import axios from "axios";

export const Client = axios.create({
    baseURL: "http://localhost:3000/user",
});

export const signin = async (data) => {
    try {   
        const res = await Client.post("/signin", {username: data});
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const signup = async (data) => {
    try {   
        const res = await Client.post("/signup", {username: data});
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addAddress = async (data, username) => {
    try {   
        const res = await Client(
            '/addAddress',
            {
                method: "POST",
                data: data,
                headers: {username}
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateAddress = async (data, username) => {
    try {   
        const res = await Client(
            '/updateAddress',
            {
                method: "PUT",
                data: data,
                headers: {username}
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAddress = async (data, username) => {
    try {   
        const res = await Client(
            '/deleteAddress',
            {
                method: "DELETE",
                data: {id: data},
                headers: {username}
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}