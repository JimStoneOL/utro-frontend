import { createContext } from "react";

function noop() {}

export const CustomerProductContext=createContext({
    update:noop
})