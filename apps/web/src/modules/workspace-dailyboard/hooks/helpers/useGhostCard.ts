import { useState } from "react";

export const useGhostCard = () => {
    const [isActive, setIsActive] = useState(false);

    const start = () => {
        if(!isActive) {
            setIsActive(true);
            return true;
        }

        return false;
    }

    const finish = () => {
        if(isActive) {
            setIsActive(false);
            return true;
        }

        return false;
    }

    return { start, finish };
}