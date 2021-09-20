import React, { useState, useEffect } from 'react';
import { getAllJSDocTags } from 'typescript';
import { server_calls } from '../api'

export const useGetData = () => {
    const [characterData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {characterData, getData:handleDataFetch}
}