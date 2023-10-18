import {create} from 'zustand'

interface photoStore{
    photo:string
    updatePhoto:(uri:string)=>void
    status:boolean,
    updateStatus:(up:boolean)=>void
}

export const usePhotoStore = create<photoStore>()((set)=>({
    photo:'',
    updatePhoto : (uri)=>set((state)=>({photo:uri})),
    status:false,
    updateStatus : (up)=>set((state)=>({status:up}))

}))