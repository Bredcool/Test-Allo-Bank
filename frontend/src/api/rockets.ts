import axios from 'axios'
import type { Rocket } from '../types/Rocket'


const API = 'https://api.spacexdata.com/v4/rockets'


export async function fetchRockets(): Promise<Rocket[]> {
    const res = await axios.get<Rocket[]>(API)
    return res.data
}


export async function fetchRocketById(id: string): Promise<Rocket | null> {
    try {
        const res = await axios.get<Rocket>(`${API}/${id}`)
        return res.data
    } catch (e) {
        return null
    }
}