import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseComics, chooseDesc, chooseIdentity, choosePower } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharacterFormProps{
    id?:string;
    data?: {};
}

interface CharacterState {
    hero_name: string;
    real_name: string;
    description: string;
    comics_appeared_in: string;
    super_power: string;
}

export const CharacterForm = (props:CharacterFormProps) => {
    const dispatch = useDispatch();

    let { characterData, getData } = useGetData();

    const store = useStore();

    const name = useSelector<CharacterState>(state => state.hero_name)
    const identity = useSelector<CharacterState>(state => state.real_name)
    const desc = useSelector<CharacterState>(state => state.description)
    const comics = useSelector<CharacterState>(state => state.comics_appeared_in)
    const power = useSelector<CharacterState>(state => state.super_power)

    const { register, handleSubmit } = useForm({ })

    const onSubmit = async(data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id, data)
            window.location.reload()
            console.log(`updated: ${data}`)
            event.target.reset();
        } else{
            dispatch(chooseIdentity(data.hero_name))
            dispatch(chooseName(data.real_name))
            dispatch(chooseDesc(data.description))
            dispatch(chooseComics(data.comics_appeared_in))
            dispatch(choosePower(data.super_power))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit= {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="hero_name">Character</label>
                    <Input {...register('hero_name')} name="hero_name" placeholder='Hero' />
                </div>
                <div>
                    <label htmlFor="real_name">Real Name</label>
                    <Input {...register('real_name')} name="real_name" placeholder="Real Name"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics Appeared In</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comics Appeared In"/>
                </div>
                <div>
                    <label htmlFor="super_power">Superpower</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Superpower"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}