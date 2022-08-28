import { createContext } from "react";

function noop() {}

export const ManagerProductContext=createContext({
    update:noop
})