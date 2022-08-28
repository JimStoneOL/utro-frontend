import { createContext } from "react";

function noop() {}

export const DirectorProductContext=createContext({
    update:noop
})